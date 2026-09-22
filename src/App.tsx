import { lazy, Suspense, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';
import { CityBikesProvider } from './context/CityBikesContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { AppHome } from './components/AppHome';
import { useTheme } from './context/ThemeContext';
import type { ScreenshotCaptureMode } from './lib/screenshotFixtures';

type CaptureDeepLink = ScreenshotCaptureMode | 'landing';

const captureModeFromUrl = (rawUrl: string): CaptureDeepLink | null => {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== 'citybikes:' || url.hostname !== 'capture') return null;
    const mode = url.pathname.replace(/^\//, '');
    return mode === 'landing' || mode === 'map' || mode === 'dark-map' || mode === 'video-search' ? mode : null;
  } catch {
    return null;
  }
};

const DeepLinkHandler = () => {
  const navigate = useNavigate();
  const handledUrl = useRef<string | null>(null);

  useEffect(() => {
    let listener: { remove: () => Promise<void> } | null = null;
    let active = true;

    const navigateToCapture = (captureMode: CaptureDeepLink) => {
        const theme = captureMode === 'dark-map' ? 'dark' : 'light';
        window.dispatchEvent(new CustomEvent('citybikes:capture-theme', { detail: { theme } }));
        if (captureMode === 'video-search') {
            window.sessionStorage.setItem('citybikes:capture-mode', captureMode);
            navigate('/');
            return;
        }
        navigate(captureMode === 'landing' ? '/' : `/app?capture=${captureMode}`);
    };

    const handleUrl = (rawUrl: string) => {
      if (!rawUrl || handledUrl.current === rawUrl) return;
      handledUrl.current = rawUrl;

      try {
        const captureMode = captureModeFromUrl(rawUrl);
        if (captureMode) {
          navigateToCapture(captureMode);
          return;
        }
        if (rawUrl.includes('privacy')) {
          navigate('/privacy');
        } else {
          navigate('/app');
        }
      } catch {
        return;
      }
    };

    const handleNativeCapture = (event: Event) => {
      const mode = (event as CustomEvent<{ mode?: string }>).detail?.mode;
       if (mode === 'landing' || mode === 'map' || mode === 'dark-map' || mode === 'video-search') navigateToCapture(mode);
    };

    CapacitorApp.addListener('appUrlOpen', (event: { url?: string }) => {
      handleUrl(event.url || '');
    }).then((l) => {
      if (active) listener = l;
      else void l.remove();
    });
    CapacitorApp.getLaunchUrl().then((result) => {
      if (result?.url) handleUrl(result.url);
    });
    window.addEventListener('citybikes:native-capture', handleNativeCapture);

    return () => {
      active = false;
      void listener?.remove();
      window.removeEventListener('citybikes:native-capture', handleNativeCapture);
    };
  }, [navigate]);
  return null;
};

const VideoCaptureSequence = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stageRef = useRef<'idle' | 'landing' | 'map' | 'typing' | 'done'>('idle');

  useEffect(() => {
    const queryCapture = new URLSearchParams(location.search).get('capture') === 'video-search';
    if (queryCapture) {
      window.sessionStorage.setItem('citybikes:capture-mode', 'video-search');
      navigate('/', { replace: true });
      return;
    }

    if (window.sessionStorage.getItem('citybikes:capture-mode') !== 'video-search') return;

    if (location.pathname === '/' && stageRef.current === 'idle') {
      stageRef.current = 'landing';
      const timer = window.setTimeout(() => navigate('/app'), 6000);
      return () => window.clearTimeout(timer);
    }

    if (location.pathname !== '/app' || stageRef.current !== 'landing') return;

    stageRef.current = 'map';
    let timer: number | undefined;
    let cancelled = false;
    const query = 'San Francisco';

    const typeQuery = (input: HTMLInputElement, index: number) => {
      if (cancelled) return;
      const nextIndex = index + 1;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      setter?.call(input, query.slice(0, nextIndex));
      input.dispatchEvent(new Event('input', { bubbles: true }));
      if (nextIndex < query.length) {
        timer = window.setTimeout(() => typeQuery(input, nextIndex), 120);
      } else {
        stageRef.current = 'done';
      }
    };

    const startTyping = () => {
      if (cancelled) return;
      const input = document.getElementById('network-search') as HTMLInputElement | null;
      if (!input || input.disabled) {
        timer = window.setTimeout(startTyping, 500);
        return;
      }
      stageRef.current = 'typing';
      input.focus();
      typeQuery(input, 0);
    };

    timer = window.setTimeout(startTyping, 7000);
    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [location.pathname, location.search, navigate]);

  return null;
};

const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const MapComponent = lazy(() => import('./components/Map/MapComponent').then(m => ({ default: m.default })));
const NetworkSearch = lazy(() => import('./components/NetworkSearch').then(m => ({ default: m.NetworkSearch })));
const AppLoading = () => (
    <div className="flex items-center justify-center h-full w-full bg-slate-50 dark:bg-[#0B0F19]">
        <div className="h-10 w-10 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" aria-label="Loading app" />
    </div>
);

const AppLayout = () => {
    const location = useLocation();
    const { setTheme } = useTheme();
    const captureMode = new URLSearchParams(location.search).get('capture');
    const storedCaptureMode = window.sessionStorage.getItem('citybikes:capture-mode');
    const validCaptureMode = captureMode === 'map' || captureMode === 'dark-map'
        ? captureMode
        : storedCaptureMode === 'video-search' ? storedCaptureMode : null;

    useEffect(() => {
        if (!validCaptureMode) return;
        setTheme(validCaptureMode === 'dark-map' ? 'dark' : 'light');
        window.dispatchEvent(new CustomEvent('citybikes:capture-theme', {
            detail: { theme: validCaptureMode === 'dark-map' ? 'dark' : 'light' },
        }));
    }, [setTheme, validCaptureMode]);

    return (
    <CityBikesProvider captureMode={validCaptureMode}>
        <Layout>
            <Suspense fallback={<AppLoading />}>
                <NetworkSearch />
                <AppHome />
                <MapComponent />
            </Suspense>
        </Layout>
    </CityBikesProvider>
    );
};

function App() {
    useEffect(() => {
        SplashScreen.hide().catch(() => {});
    }, []);

    return (
        <HashRouter>
            <DeepLinkHandler />
            <VideoCaptureSequence />
            <Suspense fallback={<AppLoading />}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/app" element={<AppLayout />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </HashRouter>
    );
}

export default App;
