import axios, { AxiosError } from 'axios';
import type { WeatherCondition, AirQuality, Earthquake, ChargeStation, POI } from '../types';

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1';
const AIR_QUALITY_BASE = 'https://air-quality-api.open-meteo.com/v1';
const USGS_BASE = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';
const OCM_BASE = 'https://api.openchargemap.io/v3/poi';
const OVERPASS_BASE = 'https://overpass-api.de/api/interpreter';

const smartClient = axios.create({ timeout: 15000 });

export class SmartCityError extends Error {
    statusCode?: number;
    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = 'SmartCityError';
        this.statusCode = statusCode;
    }
}

function handleAxiosError(err: AxiosError, label: string): never {
    if (err.code === 'ECONNABORTED') {
        throw new SmartCityError(`${label} request timed out.`);
    }
    throw new SmartCityError(
        `${label} failed${err.response?.status ? ` (${err.response.status})` : ''}.`,
        err.response?.status,
    );
}

function getWeatherDescription(code: number): string {
    if (code === 0) return 'Clear Sky';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 55) return 'Drizzle';
    if (code <= 65) return 'Rainy';
    if (code <= 75) return 'Snowy';
    if (code <= 82) return 'Rain Showers';
    return 'Stormy';
}

function getAqiLabel(pm25: number): string {
    if (pm25 <= 12) return 'Healthy Area';
    if (pm25 <= 35) return 'Sensitive Alert';
    if (pm25 <= 55) return 'Unhealthy Air';
    return 'Hazardous';
}

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherCondition> => {
    try {
        const url = `${OPEN_METEO_BASE}/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=precipitation,windspeed_10m`;
        const response = await smartClient.get<{
            current_weather: { temperature: number; windspeed: number; weathercode: number; time: string };
            hourly?: { precipitation?: number[] };
        }>(url);

        const { current_weather } = response.data;
        if (!current_weather || typeof current_weather.temperature !== 'number') {
            throw new SmartCityError('Invalid weather response');
        }

        return {
            temperature: current_weather.temperature,
            windSpeed: current_weather.windspeed ?? 0,
            precipitation: response.data.hourly?.precipitation?.[0] ?? 0,
            description: getWeatherDescription(current_weather.weathercode),
            icon: `weather-${current_weather.weathercode}`,
            timestamp: current_weather.time,
        };
    } catch (e) {
        if (e instanceof SmartCityError) throw e;
        handleAxiosError(e as AxiosError, 'Fetch weather');
        throw e;
    }
};

export const fetchAirQuality = async (lat: number, lon: number): Promise<AirQuality> => {
    try {
        const url = `${AIR_QUALITY_BASE}/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone`;
        const response = await smartClient.get<{
            current: { pm2_5: number; pm10: number; carbon_monoxide: number; nitrogen_dioxide: number; ozone: number };
        }>(url);
        const { current } = response.data;
        if (!current || typeof current.pm2_5 !== 'number') {
            throw new SmartCityError("Invalid air-quality response");
        }
        return {
            aqi: Math.round(current.pm2_5),
            pm2_5: current.pm2_5,
            pm10: current.pm10,
            co: current.carbon_monoxide,
            no2: current.nitrogen_dioxide,
            o3: current.ozone,
            label: getAqiLabel(current.pm2_5),
        };
    } catch (e) {
        if (e instanceof SmartCityError) throw e;
        handleAxiosError(e as AxiosError, 'Fetch air quality');
        throw e;
    }
};

export const fetchRecentEarthquakes = async (): Promise<Earthquake[]> => {
    try {
        const url = `${USGS_BASE}/2.5_day.geojson`;
        const response = await smartClient.get<{
            features: Array<{
                id: string;
                properties: { place: string; mag: number; time: number; alert: string | null; tsunami: number; };
                geometry: { coordinates: [number, number, number] };
            }>;
        }>(url);
        if (!Array.isArray(response.data.features)) throw new SmartCityError("Invalid earthquake response");
        return response.data.features.map((f) => ({
            id: f.id,
            place: f.properties.place,
            magnitude: f.properties.mag,
            time: f.properties.time,
            latitude: f.geometry.coordinates[1],
            longitude: f.geometry.coordinates[0],
            depth: f.geometry.coordinates[2],
            alert: f.properties.alert ?? undefined,
            tsunami: f.properties.tsunami === 1,
        }));
    } catch (e) {
        if (e instanceof SmartCityError) throw e;
        handleAxiosError(e as AxiosError, 'Fetch earthquakes');
        throw e;
    }
};

export const fetchChargeStations = async (lat: number, lon: number, dist = 10): Promise<ChargeStation[]> => {
    try {
        const url = `${OCM_BASE}/?output=json&latitude=${lat}&longitude=${lon}&distance=${dist}&maxresults=50&compact=true&verbose=false`;
        const response = await smartClient.get<
            Array<{
                ID: number;
                AddressInfo: { Title: string; Latitude: number; Longitude: number };
                UsageType?: { Title: string };
                OperatorInfo?: { Title: string };
                StatusType?: { Title: string };
                Connections?: Array<{ ConnectionType?: { Title: string }; PowerKW: number; Quantity: number }>;
            }>
        >(url);
        return (response.data ?? []).map((item) => ({
            id: item.ID,
            title: item.AddressInfo?.Title ?? 'Unknown',
            latitude: item.AddressInfo?.Latitude ?? 0,
            longitude: item.AddressInfo?.Longitude ?? 0,
            usageType: item.UsageType?.Title,
            operator: item.OperatorInfo?.Title,
            statusType: item.StatusType?.Title,
            connections: (item.Connections ?? []).map((c) => ({
                type: c.ConnectionType?.Title ?? 'Unknown',
                powerKW: c.PowerKW ?? 0,
                quantity: c.Quantity ?? 0,
            })),
        }));
    } catch (e) {
        if (e instanceof SmartCityError) throw e;
        handleAxiosError(e as AxiosError, 'Fetch charge stations');
        throw e;
    }
};

export const fetchPOIs = async (lat: number, lon: number, type: POI['type'], radius = 1000): Promise<POI[]> => {
    const typeMap: Record<string, string> = {
        toilet: 'amenity=toilets',
        water: 'amenity=drinking_water',
        parking: 'amenity=bicycle_parking',
        bench: 'amenity=bench',
        pharmacy: 'amenity=pharmacy',
    };
    try {
        const [key, value] = typeMap[type].split('=');
        const query = `[out:json];node["${key}"="${value}"](around:${radius},${lat},${lon});out;`;
        const url = `${OVERPASS_BASE}?data=${encodeURIComponent(query)}`;
        const response = await smartClient.get<{ elements: Array<{ id: number; lat: number; lon: number; tags: Record<string, string> }> }>(url);
        return (response.data.elements ?? []).map((el) => ({
            id: el.id.toString(),
            type,
            name: el.tags?.name,
            latitude: el.lat,
            longitude: el.lon,
            tags: el.tags,
        }));
    } catch (e) {
        if (e instanceof SmartCityError) throw e;
        handleAxiosError(e as AxiosError, 'Fetch POIs');
        throw e;
    }
};
