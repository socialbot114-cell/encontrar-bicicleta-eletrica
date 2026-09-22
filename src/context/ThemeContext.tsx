import { createContext, useContext, useEffect, useState } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { trackEvent } from '../lib/analytics';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function isNative(): boolean {
    return !!window.Capacitor?.isNativePlatform?.();
}

async function setStatusBarStyle(theme: Theme) {
    if (!isNative()) return;
    await StatusBar.setStyle({
        // Capacitor names describe icon color, not the background theme.
        style: theme === 'dark' ? Style.Light : Style.Dark,
    });
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
        setStatusBarStyle(theme).catch((error: unknown) => {
            console.warn('Unable to update native status bar style', error);
        });
    }, [theme]);

    useEffect(() => {
        const handleCaptureTheme = (event: Event) => {
            const nextTheme = (event as CustomEvent<{ theme?: Theme }>).detail?.theme;
            if (nextTheme === 'light' || nextTheme === 'dark') setTheme(nextTheme);
        };

        window.addEventListener('citybikes:capture-theme', handleCaptureTheme);
        return () => window.removeEventListener('citybikes:capture-theme', handleCaptureTheme);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            const next = prev === 'light' ? 'dark' : 'light';
            trackEvent('THEME_CHANGED', { theme: next });
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
