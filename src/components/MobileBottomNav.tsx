import { Link, useLocation } from 'react-router-dom';
import { Compass, Star, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../context/CityBikesContext';

export const MobileBottomNav = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { clearSelection } = useCityBikes();
    const isFavorites = location.pathname === '/app' && location.hash === '#favorites';
    const isMap = location.pathname === '/app' && !isFavorites;

    return (
        <nav aria-label={t('mobile_navigation')} className="mobile-bottom-nav md:hidden">
            <Link to="/app" onClick={clearSelection} aria-current={isMap ? 'page' : undefined} className={`mobile-nav-item ${isMap ? 'mobile-nav-item-active' : ''}`}>
                <Compass aria-hidden="true" className="h-5 w-5" />
                <span>{t('nav_map', 'Map')}</span>
            </Link>
            <div className="mobile-nav-item">
                <ThemeToggle />
                <span>{t('nav_theme', 'Theme')}</span>
            </div>
            <Link to="/app#favorites" onClick={clearSelection} aria-current={isFavorites ? 'page' : undefined} className={`mobile-nav-item ${isFavorites ? 'mobile-nav-item-active' : ''}`}>
                <Star aria-hidden="true" className="h-5 w-5" />
                <span>{t('nav_favorites', 'Favorites')}</span>
            </Link>
            <Link to="/privacy" aria-current={location.pathname === '/privacy' ? 'page' : undefined} className={`mobile-nav-item ${location.pathname === '/privacy' ? 'mobile-nav-item-active' : ''}`}>
                <ShieldCheck aria-hidden="true" className="h-5 w-5" />
                <span>{t('nav_privacy', 'Privacy')}</span>
            </Link>
        </nav>
    );
};
