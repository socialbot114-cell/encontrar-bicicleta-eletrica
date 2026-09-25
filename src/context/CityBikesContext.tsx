import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Network, NetworkDetail, Location, WeatherCondition, AirQuality, Earthquake, ChargeStation, POI } from '../types';
import { fetchNetworks, fetchNetworkDetails } from '../api/citybikes';
import * as smartCity from '../api/smartCity';
import { getCurrentPosition } from '../lib/geolocation';
import { trackEvent } from '../lib/analytics';
import {
    brasiliaCaptureLocation,
    isBrasiliaCaptureMode,
    screenshotNetworks,
    videoSearchNetworks,
    type ScreenshotCaptureMode,
} from '../lib/screenshotFixtures';

interface CityBikesContextProps {
    captureMode: ScreenshotCaptureMode | null;
    networks: Network[];
    loading: boolean;
    networksError: Error | null;
    networksUpdatedAt: number;
    refreshNetworks: () => void;
    userLocation: Location | null;
    locationStatus: 'idle' | 'requesting' | 'granted' | 'denied';
    requestLocation: () => Promise<void>;
    selectedNetwork: NetworkDetail | null;
    selectedNetworkError: Error | null;
    selectedNetworkUpdatedAt: number;
    refreshSelectedNetwork: () => void;
    selectNetwork: (id: string) => void;
    clearSelection: () => void;
    // Favorites
    favorites: {
        networks: string[];
        stations: string[];
    };
    toggleFavoriteNetwork: (id: string) => void;
    toggleFavoriteStation: (id: string) => void;
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
    smartDataEnabled: boolean;
    toggleSmartData: () => void;
    smartDataError: Error | null;
    smartDataUpdatedAt: number;
}

const CityBikesContext = createContext<CityBikesContextProps | undefined>(undefined);

export const CityBikesProvider: React.FC<{ children: React.ReactNode; captureMode?: ScreenshotCaptureMode | null }> = ({ children, captureMode = null }) => {
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
    const [selectedNetworkId, setSelectedNetworkId] = useState<string | null>(() =>
        captureMode === 'brasilia-station' || captureMode === 'brasilia-route' ? 'bikebrasilia' : null,
    );
    const [mapCenter, setMapCenter] = useState<{ lat: number, lon: number } | null>(() =>
        isBrasiliaCaptureMode(captureMode)
            ? { lat: brasiliaCaptureLocation.latitude, lon: brasiliaCaptureLocation.longitude }
            : null,
    );
    const captureLocationRequestedRef = React.useRef(false);
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
    const [smartDataEnabled, setSmartDataEnabled] = useState(() => !captureMode && localStorage.getItem('citybikes_smart_data') === 'enabled');

    // Persist favorites
    useEffect(() => {
        localStorage.setItem('citybikes_favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Queries
    const networksQuery = useQuery({
        queryKey: ['networks', captureMode ?? 'live'],
        queryFn: async () => {
            if (captureMode === 'map' || captureMode === 'dark-map') return screenshotNetworks;
            if (captureMode === 'video-search' || captureMode === 'brasilia-station' || captureMode === 'brasilia-route') {
                return videoSearchNetworks;
            }
            const liveNetworks = await fetchNetworks();
            return captureMode === 'brasilia-explore'
                ? liveNetworks.filter((network) => network.location.country.toUpperCase() === 'BR')
                : liveNetworks;
        },
    });

    const selectedNetworkQuery = useQuery({
        queryKey: ['network', selectedNetworkId],
        queryFn: () => fetchNetworkDetails(selectedNetworkId!),
        enabled: !!selectedNetworkId,
    });

    const weatherQuery = useQuery({
        queryKey: ['weather', mapCenter?.lat, mapCenter?.lon],
        queryFn: () => smartCity.fetchWeather(mapCenter!.lat, mapCenter!.lon),
        enabled: smartDataEnabled && !!mapCenter && smartLayers.weather,
    });

    const airQualityQuery = useQuery({
        queryKey: ['airQuality', mapCenter?.lat, mapCenter?.lon],
        queryFn: () => smartCity.fetchAirQuality(mapCenter!.lat, mapCenter!.lon),
        enabled: smartDataEnabled && !!mapCenter && smartLayers.weather,
    });

    const earthquakesQuery = useQuery({
        queryKey: ['earthquakes'],
        queryFn: smartCity.fetchRecentEarthquakes,
        enabled: smartDataEnabled && smartLayers.earthquakes,
    });

    const evStationsQuery = useQuery({
        queryKey: ['evStations', mapCenter?.lat, mapCenter?.lon],
        queryFn: () => smartCity.fetchChargeStations(mapCenter!.lat, mapCenter!.lon),
        enabled: smartDataEnabled && !!mapCenter && smartLayers.evStations,
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
        enabled: smartDataEnabled && !!mapCenter && smartLayers.pois,
    });

    const selectNetwork = (id: string) => {
        setSelectedNetworkId(id);
    };

    const fetchSmartData = useCallback((lat: number, lon: number) => {
        setMapCenter({ lat, lon });
    }, []);

    const toggleSmartData = () => {
        setSmartDataEnabled((enabled) => {
            const next = !enabled;
            localStorage.setItem('citybikes_smart_data', next ? 'enabled' : 'disabled');
            trackEvent('SMART_DATA_TOGGLED', { enabled: next });
            return next;
        });
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
    };

    const requestLocation = useCallback(async () => {
        if (locationStatus === 'requesting') return;
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
    }, [locationStatus]);

    useEffect(() => {
        if (!isBrasiliaCaptureMode(captureMode) || captureLocationRequestedRef.current) return;
        captureLocationRequestedRef.current = true;
        const timer = window.setTimeout(() => void requestLocation(), 0);
        return () => window.clearTimeout(timer);
    }, [captureMode, requestLocation]);

    const loading = networksQuery.isLoading || selectedNetworkQuery.isFetching;

    return (
        <CityBikesContext.Provider value={{
            captureMode,
            networks: networksQuery.data || [],
            loading,
            networksError: networksQuery.error ?? null,
            networksUpdatedAt: networksQuery.dataUpdatedAt,
            userLocation,
            locationStatus,
            requestLocation,
            refreshNetworks: () => networksQuery.refetch(),
            selectedNetwork: selectedNetworkQuery.data || null,
            selectedNetworkError: selectedNetworkQuery.error ?? null,
            selectedNetworkUpdatedAt: selectedNetworkQuery.dataUpdatedAt,
            refreshSelectedNetwork: () => selectedNetworkQuery.refetch(),
            selectNetwork,
            clearSelection,
            favorites,
            toggleFavoriteNetwork,
            toggleFavoriteStation,
            weather: weatherQuery.data || null,
            airQuality: airQualityQuery.data || null,
            earthquakes: earthquakesQuery.data || [],
            evStations: evStationsQuery.data || [],
            pois: poisQuery.data || [],
            smartLayers,
            toggleSmartLayer,
            fetchSmartData,
            smartDataEnabled,
            toggleSmartData,
            smartDataError: weatherQuery.error ?? airQualityQuery.error ?? earthquakesQuery.error ?? evStationsQuery.error ?? poisQuery.error ?? null,
            smartDataUpdatedAt: Math.max(weatherQuery.dataUpdatedAt, airQualityQuery.dataUpdatedAt, earthquakesQuery.dataUpdatedAt, evStationsQuery.dataUpdatedAt, poisQuery.dataUpdatedAt),
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
