import { Link } from 'react-router-dom';
import { Compass, Star, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../context/CityBikesContext';

export const MobileBottomNav = () => {
    const { t } = useTranslation();
    const { clearSelection } = useCityBikes();

    return (
        <nav aria-label={t('mobile_navigation')} className="mobile-bottom-nav md:hidden">
            <Link to="/app" aria-current="page" className="mobile-nav-item mobile-nav-item-active">
                <Compass aria-hidden="true" className="h-5 w-5" />
                <span>{t('nav_map', 'Map')}</span>
            </Link>
            <div className="mobile-nav-item">
                <ThemeToggle />
                <span>{t('nav_theme', 'Theme')}</span>
            </div>
            <Link to="/app#favorites" onClick={clearSelection} className="mobile-nav-item">
                <Star aria-hidden="true" className="h-5 w-5" />
                <span>{t('nav_favorites', 'Favorites')}</span>
            </Link>
            <Link to="/privacy" className="mobile-nav-item">
                <ShieldCheck aria-hidden="true" className="h-5 w-5" />
                <span>{t('nav_privacy', 'Privacy')}</span>
            </Link>
        </nav>
    );
};
