import { lazy, Suspense, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';
import { CityBikesProvider } from './context/CityBikesContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { AppHome } from './components/AppHome';
import type { ScreenshotCaptureMode } from './lib/screenshotFixtures';

type CaptureDeepLink = ScreenshotCaptureMode | 'landing';

const captureModeFromUrl = (rawUrl: string): CaptureDeepLink | null => {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== 'citybikes:' || url.hostname !== 'capture') return null;
    const mode = url.pathname.replace(/^\//, '');
    return mode === 'landing' || mode === 'map' || mode === 'dark-map' ? mode : null;
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
      if (mode === 'landing' || mode === 'map' || mode === 'dark-map') navigateToCapture(mode);
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
    const captureMode = new URLSearchParams(location.search).get('capture');
    const validCaptureMode = captureMode === 'map' || captureMode === 'dark-map' ? captureMode : null;

    useEffect(() => {
        if (!validCaptureMode) return;
        window.dispatchEvent(new CustomEvent('citybikes:capture-theme', {
            detail: { theme: validCaptureMode === 'dark-map' ? 'dark' : 'light' },
        }));
    }, [validCaptureMode]);

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
