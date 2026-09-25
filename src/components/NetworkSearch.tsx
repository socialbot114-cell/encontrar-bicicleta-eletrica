import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Star, Loader2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../context/CityBikesContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { trackEvent } from '../lib/analytics';
import { distanceKm, formatCountryName } from '../lib/geo';
import { formatDistanceKm } from '../lib/navigation';

export const NetworkSearch = ({ captureQuery = '' }: { captureQuery?: string }) => {
    const { networks, selectNetwork, favorites, loading, userLocation } = useCityBikes();
    const { t, i18n } = useTranslation();
    const [query, setQuery] = useState(captureQuery);
    const [isFocused, setIsFocused] = useState(Boolean(captureQuery));
    const searchRef = useRef<HTMLDivElement>(null);

    const results = useMemo(() => {
        if (query.length < 2) return [];
        const q = query.toLowerCase();
        const filtered = networks.filter(n => {
            const name = (n.name || '').toLowerCase();
            const city = (n.location.city || '').toLowerCase();
            const country = (n.location.country || '').toLowerCase();
            return name.includes(q) || city.includes(q) || country.includes(q);
        });
        const sorted = [...filtered].sort((a, b) => {
            const aFav = favorites.networks.includes(a.id);
            const bFav = favorites.networks.includes(b.id);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            if (userLocation) return distanceKm(userLocation, a.location) - distanceKm(userLocation, b.location);
            return a.name.localeCompare(b.name);
        });
        return sorted.slice(0, 10);
    }, [query, networks, favorites, userLocation]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const clearSearch = () => setQuery('');

    return (
        <div className="network-search-shell absolute top-[calc(0.75rem+env(safe-area-inset-top))] md:top-6 left-1/2 -translate-x-1/2 z-[5000] flex items-center gap-2 md:gap-4 font-sans w-full max-w-2xl px-3 md:px-4 pointer-events-none">
            <div className="relative flex-1 w-full md:max-w-md pointer-events-auto" ref={searchRef}>
                <div className="relative group w-full">
                    {/* Glow Effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl blur opacity-20 transition duration-500 ${isFocused ? 'opacity-70' : 'group-hover:opacity-60'}`}></div>

                    <div className="relative flex items-center">
<label htmlFor="network-search" className="sr-only">
                        {t('search_placeholder')}
                    </label>
                    <input
                        id="network-search"
                        type="text"
                        aria-label={t('search_placeholder')}
                        className="w-full min-h-12 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl py-3 pl-12 pr-10 shadow-xl focus:outline-none focus:ring-0 placeholder-slate-400 border border-slate-200 dark:border-slate-800 transition-all font-medium"
                        placeholder={loading ? t('loading_networks') : t('search_placeholder')}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        disabled={loading}
                    />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin text-emerald-500" /> : <Search className="w-5 h-5" />}
                        </div>

                        {query && (
                            <button
                                type="button"
                                aria-label={t('clear_search')}
                                onClick={clearSearch}
                                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Dropdown */}
                {query.length >= 2 && isFocused && (
                    <div className="network-search-results absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden max-h-[50dvh] overflow-y-auto border border-slate-200 dark:border-slate-800 transition-all animate-in fade-in zoom-in-95 duration-200">
                        {results.length > 0 ? (
                            results.map(network => (
                                <button
                                    key={network.id}
                                    data-testid={`network-result-${network.id}`}
                                    className="w-full text-left px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors duration-200 flex items-center justify-between group"
onClick={() => {
    trackEvent('NETWORK_SELECTED', { source: 'search' });
    selectNetwork(network.id);
    setQuery('');
    setIsFocused(false);
}}
                                >
                                    <div>
                                         <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {network.name}
                                        </div>
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                                            {network.location.city}, {formatCountryName(network.location.country, i18n.resolvedLanguage ?? i18n.language)}{userLocation && ` · ${t('distance_away', { distance: formatDistanceKm(distanceKm(userLocation, network.location), i18n.resolvedLanguage ?? i18n.language) })}`}
                                        </div>
                                    </div>
                                    {favorites.networks.includes(network.id) && (
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-slate-500 text-sm font-medium">
                                {t('no_networks_found', { query })}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="hidden md:block pointer-events-auto">
                <LanguageSwitcher />
            </div>
        </div>
    );
};
