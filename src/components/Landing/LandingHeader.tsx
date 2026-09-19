import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher';

export const LandingHeader = () => {
    const { t } = useTranslation();

    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-2xl border-b border-slate-200/70 dark:border-white/10 transition-all duration-300">
            <div className="container mx-auto px-5 sm:px-6 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3.5 flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                    <img src="/branding/citybikes-logo.svg" alt="CityBikes" className="h-10 w-10 rounded-xl shadow-md shadow-emerald-900/10" />
                    <div className="hidden sm:block text-base sm:text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">
                        {t('app_title')}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
};
