import type { FavoriteStationSummary, Location, Network } from '../types';

export type ScreenshotCaptureMode =
    | 'map'
    | 'dark-map'
    | 'video-search'
    | 'brasilia-explore'
    | 'brasilia-favorites'
    | 'brasilia-station'
    | 'brasilia-route';

export const isScreenshotCaptureMode = (value: string | null): value is ScreenshotCaptureMode =>
    value === 'map'
    || value === 'dark-map'
    || value === 'video-search'
    || value === 'brasilia-explore'
    || value === 'brasilia-favorites'
    || value === 'brasilia-station'
    || value === 'brasilia-route';

export const isBrasiliaCaptureMode = (mode: ScreenshotCaptureMode | null): boolean =>
    mode === 'brasilia-explore' || mode === 'brasilia-favorites' || mode === 'brasilia-station' || mode === 'brasilia-route' || mode === 'video-search';

export const brasiliaCaptureLocation: Location = {
    latitude: -15.793889,
    longitude: -47.882778,
    city: 'Brasília',
    country: 'BR',
};

export const brasiliaCaptureStationName = '17 - Funarte';

export const brasiliaFavoriteStation: FavoriteStationSummary = {
    key: 'bikebrasilia::capture-funarte',
    stationId: 'capture-funarte',
    networkId: 'bikebrasilia',
    networkName: 'BikeBrasilia',
    city: 'Brasília',
    country: 'BR',
    name: brasiliaCaptureStationName,
    latitude: -15.7918,
    longitude: -47.8827,
};

export const screenshotNetworks: Network[] = [
    {
        id: 'capture-amsterdam',
        name: 'CityBikes Amsterdam',
        href: '/v2/networks/capture-amsterdam',
        location: { latitude: 52.3676, longitude: 4.9041, city: 'Amsterdam', country: 'Netherlands' },
    },
    {
        id: 'capture-barcelona',
        name: 'Bicing Barcelona',
        href: '/v2/networks/capture-barcelona',
        location: { latitude: 41.3874, longitude: 2.1686, city: 'Barcelona', country: 'Spain' },
    },
    {
        id: 'capture-new-york',
        name: 'Citi Bike New York',
        href: '/v2/networks/capture-new-york',
        location: { latitude: 40.7128, longitude: -74.006, city: 'New York', country: 'United States' },
    },
    {
        id: 'capture-london',
        name: 'Santander Cycles London',
        href: '/v2/networks/capture-london',
        location: { latitude: 51.5074, longitude: -0.1278, city: 'London', country: 'United Kingdom' },
    },
    {
        id: 'capture-lisbon',
        name: 'Gira Lisbon',
        href: '/v2/networks/capture-lisbon',
        location: { latitude: 38.7223, longitude: -9.1393, city: 'Lisbon', country: 'Portugal' },
    },
    {
        id: 'capture-tokyo',
        name: 'Docomo Bike Share Tokyo',
        href: '/v2/networks/capture-tokyo',
        location: { latitude: 35.6762, longitude: 139.6503, city: 'Tokyo', country: 'Japan' },
    },
];

export const videoSearchNetworks: Network[] = [
    {
        id: 'bikebrasilia',
        name: 'BikeBrasilia',
        href: '/v2/networks/bikebrasilia',
        location: { latitude: -15.795115, longitude: -47.887424, city: 'Brasília', country: 'BR' },
    },
];
