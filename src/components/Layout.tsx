import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { MobileBottomNav } from './MobileBottomNav';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="app-shell flex bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500 text-slate-900 dark:text-slate-100 overflow-hidden">
            <aside className="hidden md:flex w-20 flex-col items-center py-6 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-20 transition-colors">
                <div className="mb-8">
                    <img
                        src="/branding/citybikes-logo.svg"
                        alt="CityBikes"
                        className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    />
                </div>

                <nav className="flex-1 flex flex-col gap-6">
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50">
                        <ThemeToggle />
                    </div>
                </nav>

                <Link
                    to="/privacy"
                    aria-label="Privacy policy"
                    className="p-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-blue-600 dark:hover:text-white transition-all"
                >
                    Privacy
                </Link>
            </aside>

            <main className="flex-1 relative min-w-0 min-h-0">
                {children}
            </main>
            <MobileBottomNav />
        </div>
    );
};
