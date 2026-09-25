import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Share } from '@capacitor/share';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../../context/CityBikesContext';
import { SmartLayers } from './SmartLayers';
import { bikeIcon } from './CustomMarkers';
import { Cloud, Zap, AlertTriangle, Droplet, Star, LocateFixed, Navigation, LayoutDashboard, X, BatteryCharging, Share2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartDashboard } from '../Dashboard/SmartDashboard';
import { trackEvent } from '../../lib/analytics';
import { fetchCyclingRoute, type CyclingRoute } from '../../api/cyclingRouting';
import { formatFreshness } from '../../lib/navigation';

// Fix Leaflet default icon logic for Vite/Webpack
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Internal component to handle view updates and event listeners
const MapEventListener = () => {
    const map = useMap();
    const { fetchSmartData } = useCityBikes();
    const lastCenter = useRef<{ lat: number; lng: number } | null>(null);
    const timer = useRef<number | null>(null);

    useEffect(() => {
        const handleMoveEnd = () => {
            const center = map.getCenter();
            // Round to ~0.05 degree grid and ignore tiny pans
            const round = (v: number) => Math.round(v * 20) / 20;
            const lat = round(center.lat);
            const lng = round(center.lng);

            const last = lastCenter.current;
            if (last && Math.abs(last.lat - lat) < 0.001 && Math.abs(last.lng - lng) < 0.001) return;

            if (timer.current) window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                lastCenter.current = { lat, lng };
                fetchSmartData(lat, lng);
            }, 600);
        };

        map.on('moveend', handleMoveEnd);
        return () => {
            map.off('moveend', handleMoveEnd);
            if (timer.current) window.clearTimeout(timer.current);
        };
    }, [map, fetchSmartData]);

    return null;
};

const MapComponent = () => {
    const {
        networks, networksError, networksUpdatedAt, refreshNetworks, selectedNetwork, selectedNetworkError,
        selectedNetworkUpdatedAt, refreshSelectedNetwork, selectNetwork, userLocation, clearSelection,
        locationStatus, weather, airQuality, smartLayers, toggleSmartLayer, favorites,
        toggleFavoriteNetwork, toggleFavoriteStation, requestLocation, smartDataEnabled,
        toggleSmartData, smartDataError, smartDataUpdatedAt,
    } = useCityBikes();
    const { t } = useTranslation();
    const [mapRef, setMapRef] = useState<L.Map | null>(null);
    const [showDashboard, setShowDashboard] = useState(false);
    const [onlyEbikes, setOnlyEbikes] = useState(false);
    const [activeRoute, setActiveRoute] = useState<{ route: CyclingRoute; stationName: string } | null>(null);
    const [routeLoadingStationId, setRouteLoadingStationId] = useState<string | null>(null);
    const [routeError, setRouteError] = useState<string | null>(null);
    const [shareFeedback, setShareFeedback] = useState<string | null>(null);
    const didInitialViewRef = useRef(false);
    const routeRequestIdRef = useRef(0);

    // Initial world view (shown before any location is available)
    useEffect(() => {
        if (mapRef && !didInitialViewRef.current) {
            mapRef.setView([20, 0], 2);
            didInitialViewRef.current = true;
        }
    }, [mapRef]);

    // Recenter on user location once it becomes available
    useEffect(() => {
        if (mapRef && userLocation) {
            mapRef.setView([userLocation.latitude, userLocation.longitude], 11, { animate: true });
        }
    }, [mapRef, userLocation]);

    // Focus on Selected Network
    useEffect(() => {
        if (mapRef && selectedNetwork) {
            mapRef.setView(
                [selectedNetwork.location.latitude, selectedNetwork.location.longitude],
                13,
                { animate: true }
            );
        }
    }, [mapRef, selectedNetwork]);

    useEffect(() => {
        if (mapRef && activeRoute) {
            mapRef.fitBounds(activeRoute.route.coordinates, {
                paddingTopLeft: [36, 112],
                paddingBottomRight: [36, 140],
                maxZoom: 16,
                animate: true,
            });
        }
    }, [mapRef, activeRoute]);

    useEffect(() => {
        routeRequestIdRef.current += 1;
        setActiveRoute(null);
        setRouteLoadingStationId(null);
        setRouteError(null);
    }, [selectedNetwork?.id]);

    const handleLocateMe = () => {
        if (userLocation && mapRef) {
            mapRef.setView([userLocation.latitude, userLocation.longitude], 13, { animate: true });
        } else {
            requestLocation();
        }
    };

    const handlePlanRoute = async (station: { id: string; name: string; latitude: number; longitude: number }) => {
        if (!userLocation) {
            void requestLocation();
            return;
        }

        setRouteError(null);
        setActiveRoute(null);
        const requestId = ++routeRequestIdRef.current;
        setRouteLoadingStationId(station.id);
        try {
            const route = await fetchCyclingRoute(userLocation, station);
            if (requestId !== routeRequestIdRef.current) return;
            setActiveRoute({ route, stationName: station.name });
            mapRef?.closePopup();
            trackEvent('CYCLING_ROUTE_PLANNED');
        } catch (error) {
            if (requestId !== routeRequestIdRef.current) return;
            setRouteError(error instanceof Error ? error.message : 'Could not plan this cycling route.');
        } finally {
            if (requestId === routeRequestIdRef.current) setRouteLoadingStationId(null);
        }
    };

    const clearCyclingRoute = () => {
        routeRequestIdRef.current += 1;
        setActiveRoute(null);
        setRouteLoadingStationId(null);
        setRouteError(null);
    };

    const handleShareStation = async (station: { name: string; latitude: number; longitude: number; free_bikes: number; empty_slots: number | null }) => {
        const mapUrl = `https://www.openstreetmap.org/?mlat=${station.latitude}&mlon=${station.longitude}#map=18/${station.latitude}/${station.longitude}`;
        const text = `${station.name} — ${selectedNetwork?.location.city ?? ''}. ${station.free_bikes} bikes available; ${station.empty_slots ?? 'availability not reported'} empty docks.`;

        try {
            const { value } = await Share.canShare();
            let feedback = 'Station details shared.';
            if (value) {
                await Share.share({ title: station.name, text, url: mapUrl, dialogTitle: 'Share bike station' });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(`${text}\n${mapUrl}`);
                feedback = 'Station details copied.';
            } else {
                throw new Error('Sharing is not available on this device.');
            }
            trackEvent('BIKE_STATION_SHARED');
            setShareFeedback(feedback);
            window.setTimeout(() => setShareFeedback(null), 2500);
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') return;
            setShareFeedback(error instanceof Error ? error.message : 'Could not share this station.');
            window.setTimeout(() => setShareFeedback(null), 3500);
        }
    };

    const defaultCenter: [number, number] = [20, 0]; // world view

    return (
        <div className="h-full w-full relative group">
            {/* Header / Context Information */}
            <AnimatePresence>
                {(selectedNetwork || (weather && airQuality)) && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="map-context-overlay fixed bottom-[calc(76px+env(safe-area-inset-bottom))] md:absolute md:top-[calc(5.5rem+env(safe-area-inset-top))] md:bottom-auto left-0 md:left-6 right-0 md:right-auto z-[1000] flex flex-col gap-3 px-3 md:px-0 max-w-none md:max-w-sm pointer-events-none max-h-[42dvh] overflow-y-auto"
                    >
                        {/* Selected Network Info */}
                        {selectedNetwork && (
                            <div className="glass-premium p-3 md:p-4 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div className="flex items-start gap-2 min-w-0">
                                        <button
                                            aria-label="Toggle favorite network"
                                            onClick={() => toggleFavoriteNetwork(selectedNetwork.id)}
                                            className="flex h-11 w-11 shrink-0 items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            <Star className={`w-5 h-5 ${favorites.networks.includes(selectedNetwork.id) ? 'fill-yellow-400 text-yellow-500' : 'text-slate-400'}`} />
                                        </button>
                                        <div className="min-w-0">
                                            <h2 className="text-base md:text-xl font-black text-slate-800 dark:text-white leading-tight break-words">{selectedNetwork.name}</h2>
                                             <p className="text-xs text-slate-500 dark:text-emerald-400 font-bold uppercase tracking-widest">{selectedNetwork.location.city}</p>
                                             <p className="mt-1 text-[10px] font-semibold text-slate-400">{formatFreshness(selectedNetworkUpdatedAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button
                                            aria-label="View analytics"
                                            onClick={() => { trackEvent('DASHBOARD_OPENED'); setShowDashboard(true); }}
                                             className="flex h-11 w-11 items-center justify-center bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-xl transition-all"
                                            title="View Analytics"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                        </button>
                                        <button
                                            aria-label="Close network details"
                                            onClick={clearSelection}
                                            className="flex h-11 w-11 items-center justify-center bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 rounded-xl transition-all"
                                        >
                                            <X className="w-4 h-4 text-slate-700 dark:text-white" />
                                        </button>
                                    </div>
                                </div>
                                {routeLoadingStationId && (
                                    <div className="mb-3 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300" role="status">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Planning a cycling route…
                                    </div>
                                )}
                                {routeError && (
                                    <div className="mb-3 flex items-start justify-between gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-700 dark:text-red-200" role="alert">
                                        <span>{routeError}</span>
                                        <button type="button" className="shrink-0 p-1" aria-label="Dismiss route error" onClick={() => setRouteError(null)}><X className="h-4 w-4" /></button>
                                    </div>
                                )}
                                {activeRoute && (
                                    <div className="mb-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3" aria-label="Cycling route summary">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Cycling route</div>
                                                <div className="mt-1 truncate text-sm font-extrabold text-slate-800 dark:text-white">To {activeRoute.stationName}</div>
                                            </div>
                                            <button type="button" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl hover:bg-emerald-500/10" aria-label="Clear cycling route" onClick={clearCyclingRoute}><X className="h-4 w-4" /></button>
                                        </div>
                                        <div className="mt-2 flex items-baseline gap-3 text-sm font-black text-slate-800 dark:text-white">
                                            <span>{(activeRoute.route.distanceMeters / 1000).toFixed(1)} km</span>
                                            <span>{Math.max(1, Math.round(activeRoute.route.durationSeconds / 60))} min</span>
                                        </div>
                                        <p className="mt-1 text-[10px] leading-snug text-slate-500 dark:text-slate-400">Route preview by OpenStreetMap. Follow local road signs and safety rules.</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-2 text-center">
                                    <div className="rounded-xl border border-green-500/10 bg-green-500/5 p-2">
                                        <div className="text-[10px] font-bold uppercase text-green-600 dark:text-green-400">{t('bikes')}</div>
                                        <div className="text-lg font-black dark:text-white">{selectedNetwork.stations.reduce((acc, s) => acc + s.free_bikes, 0)}</div>
                                    </div>
                                    <div className="rounded-xl border border-teal-500/10 bg-teal-500/5 p-2">
                                        <div className="text-[10px] font-bold uppercase text-teal-600 dark:text-teal-400">{t('slots')}</div>
                                        <div className="text-lg font-black dark:text-white">{selectedNetwork.stations.reduce((acc, s) => acc + (s.empty_slots || 0), 0)}</div>
                                    </div>
                                </div>
                                {selectedNetwork.stations.some((station) => station.extra?.has_ebikes || (station.extra?.ebikes ?? 0) > 0) && (
                                    <button
                                        type="button"
                                        aria-pressed={onlyEbikes}
                                        onClick={() => setOnlyEbikes((value) => !value)}
                                        className={`mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-black uppercase tracking-widest transition ${onlyEbikes ? 'bg-emerald-600 text-white' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'}`}
                                    >
                                        <BatteryCharging className="h-4 w-4" />
                                        {onlyEbikes ? 'Showing e-bikes' : 'Show e-bike stations'}
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Weather & Air Quality Glow Card */}
                        {selectedNetwork && weather && airQuality && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-premium p-4 md:p-5 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto overflow-hidden relative w-full"
                            >
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20 shadow-inner">
                                                 <Cloud className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-none">{weather.temperature}°C</div>
                                                 <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">{weather.description}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px] ${airQuality.label.includes('Healthy') ? 'bg-green-500 shadow-green-500/50' :
                                                    airQuality.label.includes('Alert') ? 'bg-yellow-500 shadow-yellow-500/50' : 'bg-red-500 shadow-red-500/50'
                                                    }`} />
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Air Quality</span>
                                            </div>
                                            <div className="text-xs font-black text-slate-800 dark:text-white bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg">
                                                {airQuality.label}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                                            <span>Wind: {weather.windSpeed} km/h</span>
                                            <span>PM2.5: {airQuality.pm2_5.toFixed(1)} µg/m³</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedNetworkError && (
                    <motion.div
                        role="alert"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="fixed top-[calc(5rem+env(safe-area-inset-top))] left-3 right-3 md:absolute md:left-6 md:right-auto md:max-w-sm z-[1002] glass-premium px-4 py-3 rounded-2xl border border-red-500/30 shadow-2xl flex items-center gap-3"
                    >
                        <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
                        <span className="min-w-0 flex-1 text-sm text-red-700 dark:text-red-200">Could not refresh stations for this network. Existing data may be stale.</span>
                        <button onClick={refreshSelectedNetwork} className="shrink-0 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white">Retry</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* API error banner */}
            <AnimatePresence>
                {networksError && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-[calc(5rem+env(safe-area-inset-top))] md:absolute md:top-6 left-3 right-3 md:left-6 md:right-auto z-[1001] glass-premium px-4 py-3 rounded-2xl border border-red-500/30 shadow-2xl flex items-center gap-3 max-w-none md:max-w-sm pointer-events-auto"
                    >
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                        <div className="min-w-0 text-sm text-red-700 dark:text-red-200 break-words">
                            Could not load the bike-network list. Check your connection and retry.
                            {networksUpdatedAt > 0 && <span className="ml-1 text-xs text-slate-500">{formatFreshness(networksUpdatedAt)}</span>}
                        </div>
                        <button
                            onClick={() => refreshNetworks()}
                            className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors shrink-0"
                        >
                            Retry
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Layer Control Panel */}
            <div className="map-layer-controls fixed top-[calc(4.75rem+env(safe-area-inset-top))] md:absolute md:top-[calc(1.5rem+env(safe-area-inset-top))] md:bottom-auto right-3 md:right-6 z-[1000] flex flex-col gap-2">
                <div
                    role="group"
                    aria-label="Map layers"
                    className="glass-premium p-1.5 md:p-2 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-1"
                >
                    <button
                        type="button"
                        aria-pressed={smartDataEnabled}
                        aria-label={`${smartDataEnabled ? 'Disable' : 'Enable'} Smart Data coordinate sharing`}
                        title="Smart Data uses the approximate map center for weather and nearby amenities"
                        onClick={toggleSmartData}
                        className={`flex min-h-11 items-center gap-2 rounded-xl px-3 text-[10px] font-black uppercase tracking-wide transition ${smartDataEnabled ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'}`}
                    >
                        <Cloud className="h-4 w-4 shrink-0" />
                        <span>Data {smartDataEnabled ? 'on' : 'off'}</span>
                    </button>
                    <LayerToggle
                        active={smartLayers.evStations}
                        icon={<Zap className="w-4 h-4" />}
                        label="EV Power"
                        onClick={() => toggleSmartLayer('evStations')}
                    />
                    <LayerToggle
                        active={smartLayers.earthquakes}
                        icon={<AlertTriangle className="w-4 h-4" />}
                        label="Alerts"
                        onClick={() => toggleSmartLayer('earthquakes')}
                    />
                    <LayerToggle
                        active={smartLayers.pois}
                        icon={<Droplet className="w-4 h-4" />}
                        label="Amenities"
                        onClick={() => toggleSmartLayer('pois')}
                    />
                </div>

                {smartDataEnabled && (
                    <div className="glass-premium max-w-40 rounded-xl px-3 py-2 text-[9px] font-semibold leading-tight text-slate-600 shadow-xl dark:text-slate-300" role="status">
                        Approximate map center is shared with data providers.
                        {smartDataError && <span className="mt-1 block text-red-500">Smart Data failed to update.</span>}
                        {!smartDataError && smartDataUpdatedAt > 0 && <span className="mt-1 block text-emerald-600">{formatFreshness(smartDataUpdatedAt)}</span>}
                    </div>
                )}

                <div className="glass-premium p-1 rounded-xl border border-white/10 shadow-2xl flex flex-col pointer-events-auto overflow-hidden">
                    <button
                        onClick={handleLocateMe}
                        className="w-12 h-12 flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                        aria-label="Find near me"
                        title="Find Near Me"
                    >
                         <LocateFixed className="w-5 h-5 text-emerald-500" />
                    </button>
                </div>
            </div>

            <MapContainer
                center={defaultCenter} // Initial center only
                zoom={3} // Initial zoom only
                zoomControl={false}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
                ref={setMapRef}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <ZoomControl position="bottomright" />
                {/* MapUpdater removed to prevent snap-back loop */}
                <MapEventListener />
                <SmartLayers />

                {activeRoute && (
                    <Polyline
                        positions={activeRoute.route.coordinates}
                        pathOptions={{ color: '#059669', weight: 6, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }}
                    />
                )}

                {/* User Location Marker */}
                {userLocation && (
                    <Marker
                        position={[userLocation.latitude, userLocation.longitude]}
                        icon={L.divIcon({
                            className: 'user-location-marker',
                            html: '<div class="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg pulse"></div>'
                        })}
                        alt="Your current location"
                        title="Your current location"
                    />
                )}

                {/* Show Networks if none selected */}
                {!selectedNetwork && (
                    <MarkerClusterGroup
                        chunkedLoading
                        maxClusterRadius={50}
                        spiderfyOnMaxZoom={true}
                         iconCreateFunction={(cluster: { getChildCount: () => number }) => {
                            const count = cluster.getChildCount();
                            let size = 'w-10 h-10';
                             let color = 'bg-emerald-500';

                            if (count > 100) {
                                size = 'w-14 h-14';
                                 color = 'bg-teal-600';
                            } else if (count > 20) {
                                size = 'w-12 h-12';
                                 color = 'bg-emerald-600';
                            }

                            return L.divIcon({
                                html: `<div role="img" aria-label="Cluster of ${count} bike networks" class="${size} ${color} rounded-full flex items-center justify-center text-white font-black border-4 border-white/20 shadow-xl backdrop-blur-sm transition-transform hover:scale-110">
                                        ${count}
                                       </div>`,
                                className: 'custom-cluster-marker',
                                iconSize: L.point(40, 40, true),
                            });
                        }}
                    >
                        {networks.map((network) => (
                            <Marker
                                key={network.id}
                                position={[network.location.latitude, network.location.longitude]}
                                icon={bikeIcon}
                                alt={`${network.name} bike network`}
                                title={`${network.name}, ${network.location.city}`}
                                eventHandlers={{
                                    click: () => selectNetwork(network.id),
                                }}
                            >
                                <Popup className="premium-popup">
                                    <div className="p-2 min-w-[150px]">
                                        <div className="flex items-center justify-between mb-2">
                                            <strong className="text-slate-800 dark:text-white">{network.name}</strong>
                                            <Star className={`w-3.5 h-3.5 ${favorites.networks.includes(network.id) ? 'fill-yellow-400 text-yellow-500' : 'text-slate-300'}`} />
                                        </div>
                                        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{network.location.city}, {network.location.country}</span>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                )}

                {/* Show Stations if Network selected */}
                {selectedNetwork && selectedNetwork.stations && (
                    <MarkerClusterGroup
                        chunkedLoading
                        maxClusterRadius={40}
                    >
                        {selectedNetwork.stations.filter((station) => !onlyEbikes || station.extra?.has_ebikes || (station.extra?.ebikes ?? 0) > 0).map((station) => (
                            <Marker
                                key={station.id}
                                position={[station.latitude, station.longitude]}
                                icon={bikeIcon}
                                alt={`${station.name} bike station, ${station.free_bikes} bikes available`}
                                title={`${station.name}: ${station.free_bikes} bikes available`}
                            >
                                <Popup className="premium-popup">
                                    <div className="p-2 min-w-[180px]">
                                        <div className="flex items-center justify-between gap-4 mb-3">
                                            <strong className="text-slate-800 dark:text-white leading-tight">{station.name}</strong>
                                            <button
                                                onClick={() => toggleFavoriteStation(station.id)}
                                                 aria-label="Toggle favorite station"
                                                 className="flex h-11 w-11 items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors"
                                            >
                                                <Star className={`w-4 h-4 ${favorites.stations.includes(station.id) ? 'fill-yellow-400 text-yellow-500' : 'text-slate-400'}`} />
                                            </button>
                                         </div>
                                         {((station.extra?.ebikes ?? 0) > 0 || station.extra?.has_ebikes) && (
                                             <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                                                 <BatteryCharging className="h-4 w-4" />
                                                 {station.extra?.ebikes ?? 'E-bike availability reported'}
                                             </div>
                                         )}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="flex flex-col">
                                                <span className={`text-xl font-black ${station.free_bikes > 0 ? "text-green-500" : "text-red-500"}`}>
                                                    {station.free_bikes}
                                                </span>
                                                <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{t('bikes')}</span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-xl font-black text-slate-700 dark:text-slate-300">
                                                    {station.empty_slots}
                                                </span>
                                                <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{t('slots')}</span>
                                            </div>
                                        </div>

                                        <p className="mb-3 text-[10px] font-semibold text-slate-400">
                                            Station {formatFreshness(new Date(station.timestamp).getTime())}
                                        </p>

                                        <div className="grid grid-cols-[1fr_auto] gap-2">
                                            <button
                                                type="button"
                                                disabled={routeLoadingStationId === station.id || locationStatus === 'requesting'}
                                                onClick={() => void handlePlanRoute(station)}
                                                aria-label={`Plan an in-app cycling route to ${station.name}`}
                                                className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {routeLoadingStationId === station.id || locationStatus === 'requesting'
                                                    ? <Loader2 className="h-4 w-4 animate-spin" />
                                                    : <Navigation className="h-4 w-4" />}
                                                {userLocation
                                                    ? activeRoute?.stationName === station.name ? 'Route shown' : 'Plan route'
                                                    : 'Use location'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => void handleShareStation(station)}
                                                aria-label={`Share ${station.name}`}
                                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
                                            >
                                                <Share2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        {!userLocation && (
                                            <p className="mt-2 text-[9px] leading-snug text-slate-500">
                                                {locationStatus === 'denied'
                                                    ? 'Location is off. Allow access in Settings to plan a route.'
                                                    : locationStatus === 'requesting'
                                                        ? 'Finding your location…'
                                                        : 'Use your location to preview a cycling route inside the app.'}
                                            </p>
                                        )}
                                        {shareFeedback && <p role="status" className="mt-2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-300">{shareFeedback}</p>}
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                )}
            </MapContainer>

            <AnimatePresence>
                {showDashboard && (
                    <SmartDashboard onClose={() => setShowDashboard(false)} />
                )}
            </AnimatePresence>
        </div>
    );
};

const LayerToggle = ({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        aria-pressed={active}
        aria-label={`Toggle ${label} layer`}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group/btn ${active
             ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
            }`}
    >
        <span className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover/btn:scale-110'}`}>{icon}</span>
        <span className="hidden lg:inline text-xs font-bold uppercase tracking-widest">{label}</span>
    </button>
);

export default MapComponent;
