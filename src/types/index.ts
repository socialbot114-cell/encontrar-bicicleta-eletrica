export interface Location {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
}

export interface Network {
    id: string;
    name: string;
    company?: string | string[];
    href: string;
    location: Location;
}

export interface Station {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    timestamp: string;
    free_bikes: number;
    empty_slots: number | null;
    extra?: {
        uid?: string;
        last_updated?: number;
        payment?: string[];
        renting?: number;
        returning?: number;
        slots?: number;
        has_ebikes?: boolean;
        ebikes?: number;
        address?: string;
    };
}

export interface NetworkDetail extends Network {
    stations: Station[];
}

// --- Smart City Data Types ---

export interface WeatherCondition {
    temperature: number;
    windSpeed: number;
    precipitation: number;
    description: string;
    icon: string;
    timestamp: string;
}

export interface AirQuality {
    aqi: number;
    pm2_5: number;
    pm10: number;
    co: number;
    no2: number;
    o3: number;
    label: string;
}

export interface Earthquake {
    id: string;
    place: string;
    magnitude: number;
    time: number;
    latitude: number;
    longitude: number;
    depth: number;
    alert?: string;
    tsunami: boolean;
}

export interface ChargeStation {
    id: number;
    title: string;
    latitude: number;
    longitude: number;
    usageType?: string;
    operator?: string;
    statusType?: string;
    connections: {
        type: string;
        powerKW: number;
        quantity: number;
    }[];
}

export interface POI {
    id: string;
    type: 'toilet' | 'water' | 'parking' | 'bench' | 'pharmacy';
    name?: string;
    latitude: number;
    longitude: number;
    tags: Record<string, string>;
}
