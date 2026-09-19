import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Network, NetworkDetail, Location, WeatherCondition, AirQuality, Earthquake, ChargeStation, POI } from '../types';
import { fetchNetworks, fetchNetworkDetails } from '../api/citybikes';
import * as smartCity from '../api/smartCity';
import { getCurrentPosition } from '../lib/geolocation';
import { trackEvent } from '../lib/analytics';

interface CityBikesContextProps {
    networks: Network[];
    loading: boolean;
    networksError: Error | null;
    refreshNetworks: () => void;
    userLocation: Location | null;
    locationStatus: 'idle' | 'requesting' | 'granted' | 'denied';
    requestLocation: () => Promise<void>;
    selectedNetwork: NetworkDetail | null;
    selectNetwork: (id: string) => void;
    clearSelection: () => void;
    // Favorites
    favorites: {
        networks: string[];
        stations: string[];
    };
    toggleFavoriteNetwork: (id: string) => void;
    toggleFavoriteStation: (id: string) => void;
    // Routing
    currentRoute: [number, number][] | null;
    fetchRoute: (toLat: number, toLon: number) => Promise<void>;
    clearRoute: () => void;
    // Smart City Data
    weather: WeatherCondition | null;
    airQuality: AirQuality | null;
    earthquakes: Earthquake[];
    evStations: ChargeStation[];
    pois: POI[];
    smartLayers: {
        weather: boolean;
        earthquakes: boolean;
        evStations: boolean;
        pois: boolean;
    };
    toggleSmartLayer: (layer: keyof CityBikesContextProps['smartLayers']) => void;
    fetchSmartData: (lat: number, lon: number) => void;
}

const CityBikesContext = createContext<CityBikesContextProps | undefined>(undefined);

export const CityBikesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
    const [selectedNetworkId, setSelectedNetworkId] = useState<string | null>(null);
    const [mapCenter, setMapCenter] = useState<{ lat: number, lon: number } | null>(null);
    const [currentRoute, setCurrentRoute] = useState<[number, number][] | null>(null);
    const [favorites, setFavorites] = useState<{ networks: string[], stations: string[] }>(() => {
        try {
            const saved = localStorage.getItem('citybikes_favorites');
            const parsed = saved ? JSON.parse(saved) : { networks: [], stations: [] };
            if (!parsed || !Array.isArray(parsed.networks) || !Array.isArray(parsed.stations)) {
                return { networks: [], stations: [] };
            }
            return parsed;
        } catch {
            return { networks: [], stations: [] };
        }
    });
    const [smartLayers, setSmartLayers] = useState({
        weather: true,
        earthquakes: false,
        evStations: false,
        pois: false
    });

    // Persist favorites
    useEffect(() => {
        localStorage.setItem('citybikes_favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Queries
    const networksQuery = useQuery({
        queryKey: ['networks'],
        queryFn: fetchNetworks,
    });

    const selectedNetworkQuery = useQuery({
        queryKey: ['network', selectedNetworkId],
        queryFn: () => fetchNetworkDetails(selectedNetworkId!),
        enabled: !!selectedNetworkId,
    });

    const weatherQuery = useQuery({
        queryKey: ['weather', mapCenter?.lat, mapCenter?.lon],
        queryFn: () => smartCity.fetchWeather(mapCenter!.lat, mapCenter!.lon),
        enabled: !!mapCenter && smartLayers.weather,
    });

    const airQualityQuery = useQuery({
        queryKey: ['airQuality', mapCenter?.lat, mapCenter?.lon],
        queryFn: () => smartCity.fetchAirQuality(mapCenter!.lat, mapCenter!.lon),
        enabled: !!mapCenter && smartLayers.weather,
    });

    const earthquakesQuery = useQuery({
        queryKey: ['earthquakes'],
        queryFn: smartCity.fetchRecentEarthquakes,
        enabled: smartLayers.earthquakes,
    });

    const evStationsQuery = useQuery({
        queryKey: ['evStations', mapCenter?.lat, mapCenter?.lon],
        queryFn: () => smartCity.fetchChargeStations(mapCenter!.lat, mapCenter!.lon),
        enabled: !!mapCenter && smartLayers.evStations,
    });

    const poisQuery = useQuery({
        queryKey: ['pois', mapCenter?.lat, mapCenter?.lon],
        queryFn: async () => {
            const [p_toilet, p_water] = await Promise.all([
                smartCity.fetchPOIs(mapCenter!.lat, mapCenter!.lon, 'toilet'),
                smartCity.fetchPOIs(mapCenter!.lat, mapCenter!.lon, 'water')
            ]);
            return [...p_toilet, ...p_water];
        },
        enabled: !!mapCenter && smartLayers.pois,
    });

    const selectNetwork = (id: string) => {
        setSelectedNetworkId(id);
        setCurrentRoute(null);
    };

    const fetchSmartData = (lat: number, lon: number) => {
        setMapCenter({ lat, lon });
    };

    const routeControllerRef = useRef<AbortController | null>(null);

    const clearRoute = () => {
        routeControllerRef.current?.abort();
        routeControllerRef.current = null;
        setCurrentRoute(null);
    };

    const fetchRoute = async (toLat: number, toLon: number) => {
        if (!userLocation) return;
        clearRoute();
        const controller = new AbortController();
        routeControllerRef.current = controller;
        const timeout = setTimeout(() => controller.abort(), 15000);
        try {
            const url = `https://router.project-osrm.org/route/v1/cycling/${userLocation.longitude},${userLocation.latitude};${toLon},${toLat}?overview=full&geometries=geojson`;
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error(`OSRM ${response.status}`);
            const data = await response.json();
            if (data?.routes?.length && data.routes[0].geometry?.coordinates?.length) {
                const coords: [number, number][] = data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
                setCurrentRoute(coords);
                trackEvent('ROUTE_REQUESTED', { result: 'success' });
            } else {
                setCurrentRoute(null);
                trackEvent('ROUTE_REQUESTED', { result: 'empty' });
            }
        } catch (error: unknown) {
            const reason = error instanceof Error && error.name === 'AbortError' ? 'route request cancelled or timed out' : error;
            console.error("Failed to fetch route", reason);
            setCurrentRoute(null);
        } finally {
            clearTimeout(timeout);
            if (routeControllerRef.current === controller) {
                routeControllerRef.current = null;
            }
        }
    };

    const toggleFavoriteNetwork = (id: string) => {
        trackEvent('FAVORITE_NETWORK_TOGGLED');
        setFavorites(prev => {
            const exists = prev.networks.includes(id);
            return {
                ...prev,
                networks: exists ? prev.networks.filter(n => n !== id) : [...prev.networks, id]
            };
        });
    };

    const toggleFavoriteStation = (id: string) => {
        trackEvent('FAVORITE_STATION_TOGGLED');
        setFavorites(prev => {
            const exists = prev.stations.includes(id);
            return {
                ...prev,
                stations: exists ? prev.stations.filter(s => s !== id) : [...prev.stations, id]
            };
        });
    };

    const toggleSmartLayer = (layer: keyof typeof smartLayers) => {
        trackEvent('SMART_LAYER_TOGGLED', { layer });
        setSmartLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    };

    const clearSelection = () => {
        setSelectedNetworkId(null);
        setCurrentRoute(null);
    };

    const requestLocation = async () => {
        if (locationStatus === 'requesting' || locationStatus === 'granted') return;
        setLocationStatus('requesting');
        try {
            const coords = await getCurrentPosition();
            const loc: Location = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                city: 'Current Location',
                country: ''
            };
            setUserLocation(loc);
            setMapCenter({ lat: coords.latitude, lon: coords.longitude });
            setLocationStatus('granted');
            trackEvent('LOCATION_PERMISSION_RESULT', { result: 'granted' });
        } catch (error) {
            console.error('Location denied or unavailable', error);
            setLocationStatus('denied');
            trackEvent('LOCATION_PERMISSION_RESULT', { result: 'denied' });
        }
    };

    const loading = networksQuery.isLoading || selectedNetworkQuery.isFetching;

    return (
        <CityBikesContext.Provider value={{
            networks: networksQuery.data || [],
            loading,
            networksError: networksQuery.error ?? null,
            userLocation,
            locationStatus,
            requestLocation,
            refreshNetworks: () => networksQuery.refetch(),
            selectedNetwork: selectedNetworkQuery.data || null,
            selectNetwork,
            clearSelection,
            favorites,
            toggleFavoriteNetwork,
            toggleFavoriteStation,
            currentRoute,
            fetchRoute,
            clearRoute,
            weather: weatherQuery.data || null,
            airQuality: airQualityQuery.data || null,
            earthquakes: earthquakesQuery.data || [],
            evStations: evStationsQuery.data || [],
            pois: poisQuery.data || [],
            smartLayers,
            toggleSmartLayer,
            fetchSmartData
        }}>
            {children}
        </CityBikesContext.Provider>
    );
};

export const useCityBikes = () => {
    const context = useContext(CityBikesContext);
    if (!context) throw new Error("useCityBikes must be used within CityBikesProvider");
    return context;
};
