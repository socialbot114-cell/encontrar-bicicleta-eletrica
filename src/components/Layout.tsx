import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { MobileBottomNav } from './MobileBottomNav';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { useCityBikes } from '../context/CityBikesContext';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const { clearSelection } = useCityBikes();
    const isFavorites = location.pathname === '/app' && location.hash === '#favorites';

    return (
        <div className="app-shell flex bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500 text-slate-900 dark:text-slate-100 overflow-hidden">
            <aside className="hidden md:flex w-20 flex-col items-center py-6 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-20 transition-colors">
                <Link to="/app" onClick={clearSelection} aria-label={t('nav_map')} title={t('nav_map')} className="mb-8 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
                    <img
                        src="/branding/citybikes-logo.svg"
                        alt="CityBikes"
                        className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    />
                </Link>

                <nav className="flex-1 flex flex-col gap-6">
                    <Link
                        to="/app#favorites"
                        onClick={clearSelection}
                        aria-label={t('nav_favorites')}
                        aria-current={isFavorites ? 'page' : undefined}
                        title={t('nav_favorites')}
                        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${isFavorites ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700/50 dark:hover:text-white'}`}
                    >
                        <Star aria-hidden="true" className="h-5 w-5" />
                    </Link>
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50">
                        <ThemeToggle />
                    </div>
                </nav>

                <Link
                    to="/privacy"
                    aria-label={t('nav_privacy')}
                    className="p-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-blue-600 dark:hover:text-white transition-all"
                >
                    {t('nav_privacy')}
                </Link>
            </aside>

            <main className="flex-1 relative min-w-0 min-h-0">
                {children}
            </main>
            <MobileBottomNav />
        </div>
    );
};
