import { LocateFixed, MapPinned, ArrowUpRight, Star, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../context/CityBikesContext';
import { trackEvent } from '../lib/analytics';
import { distanceKm, formatCountryName } from '../lib/geo';
import { formatDistanceKm } from '../lib/navigation';

export const AppHome = () => {
    const { t, i18n } = useTranslation();
    const { networks, favorites, locationStatus, requestLocation, selectNetwork, loading, selectedNetwork, userLocation } = useCityBikes();
    const favoriteNetworks = networks.filter((network) => favorites.networks.includes(network.id)).slice(0, 3);
    const suggestedNetworks = (favoriteNetworks.length ? favoriteNetworks : networks)
        .map((network) => ({ network, distance: userLocation ? distanceKm(userLocation, network.location) : null }))
        .sort((a, b) => (a.distance ?? Number.POSITIVE_INFINITY) - (b.distance ?? Number.POSITIVE_INFINITY))
        .slice(0, 3);

    if (selectedNetwork) return null;

    return (
        <section id="favorites" className="app-home-panel" aria-label={t('app_home_title', 'Explore bike networks')}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                        {locationStatus === 'granted' ? t('location_active', 'Location active') : t('app_explore_label', 'CityBikes Explore')}
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                        {locationStatus === 'granted' ? t('app_home_nearby', 'Bikes near you') : t('app_home_title', 'Find your next ride')}
                    </h1>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {locationStatus === 'granted'
                            ? t('app_home_nearby_subtitle', 'Live availability from the networks around you.')
                            : t('app_home_subtitle', 'Explore bike-sharing networks in cities around the world.')}
                    </p>
                </div>
                {locationStatus !== 'granted' && (
                    <button
                        type="button"
                        onClick={() => { trackEvent('LOCATION_REQUESTED'); requestLocation(); }}
                        className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-3 text-xs font-black text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                    >
                        <LocateFixed className="h-4 w-4" />
                        <span className="hidden sm:inline">{t('location_enable', 'Use my location')}</span>
                    </button>
                )}
            </div>

            <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <MapPinned className="h-4 w-4 text-emerald-500" />
                    {favoriteNetworks.length ? t('app_favorites', 'Your favorites') : t('app_suggested', 'Suggested networks')}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{networks.length || '—'} {t('app_networks', 'networks')}</span>
            </div>

            <div className="app-home-networks mt-3 grid gap-2 sm:grid-cols-3">
                {suggestedNetworks.map(({ network, distance }) => (
                    <button
                        type="button"
                        key={network.id}
                        onClick={() => { trackEvent('NETWORK_SELECTED', { source: 'home' }); selectNetwork(network.id); }}
                        className="group flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/75 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-emerald-400/40"
                    >
                        <span className="min-w-0">
                            <span className="block truncate text-sm font-extrabold text-slate-800 dark:text-white">{network.name}</span>
                            <span className="mt-1 block truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">{network.location.city}, {formatCountryName(network.location.country, i18n.resolvedLanguage ?? i18n.language)}</span>
                            {distance !== null && <span className="mt-1 block text-[10px] font-bold text-emerald-600 dark:text-emerald-400">{t('distance_away', { distance: formatDistanceKm(distance, i18n.resolvedLanguage ?? i18n.language) })}</span>}
                        </span>
                        {favorites.networks.includes(network.id) ? <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" /> : <ArrowUpRight className="h-4 w-4 shrink-0 text-emerald-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                    </button>
                ))}
                {!suggestedNetworks.length && (
                    <div className="col-span-full flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-white/15 dark:text-slate-400">
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        {loading ? t('app_loading_networks', 'Finding bike networks...') : t('app_search_hint', 'Search for a city or network above to get started.')}
                    </div>
                )}
            </div>
        </section>
    );
};
