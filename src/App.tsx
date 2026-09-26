import { lazy, Suspense, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';
import { CityBikesProvider } from './context/CityBikesContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { AppHome } from './components/AppHome';
import { useTheme } from './context/ThemeContext';
import i18n from './i18n';
import { isScreenshotCaptureMode, type ScreenshotCaptureMode } from './lib/screenshotFixtures';

type CaptureDeepLink = ScreenshotCaptureMode | 'landing';
type VideoCaptureStage = 'idle' | 'landing' | 'typing' | 'finding-network' | 'opening-station' | 'planning-route' | 'done';

const captureModeFromUrl = (rawUrl: string): CaptureDeepLink | null => {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== 'citybikes:' || url.hostname !== 'capture') return null;
    const mode = url.pathname.replace(/^\//, '');
    return mode === 'landing' || isScreenshotCaptureMode(mode) ? mode : null;
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
       if (mode === 'landing' || (mode && isScreenshotCaptureMode(mode))) {
           document.documentElement.dataset.citybikesCaptureMode = mode;
           navigateToCapture(mode);
       }
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
    document.documentElement.dataset.citybikesCaptureReady = 'true';

    return () => {
      active = false;
      void listener?.remove();
      window.removeEventListener('citybikes:native-capture', handleNativeCapture);
      delete document.documentElement.dataset.citybikesCaptureReady;
      delete document.documentElement.dataset.citybikesCaptureMode;
    };
  }, [navigate]);
  return null;
};

const VideoCaptureSequence = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stageRef = useRef<VideoCaptureStage>('idle');

  useEffect(() => {
    const queryCapture = new URLSearchParams(location.search).get('capture') === 'video-search';
    if (queryCapture) {
      window.sessionStorage.setItem('citybikes:capture-mode', 'video-search');
      if (Capacitor.isNativePlatform()) stageRef.current = 'landing';
      navigate(Capacitor.isNativePlatform() ? '/app' : '/', { replace: true });
      return;
    }

    if (window.sessionStorage.getItem('citybikes:capture-mode') !== 'video-search') return;

    if (location.pathname === '/' && stageRef.current === 'idle') {
      stageRef.current = 'landing';
      if (Capacitor.isNativePlatform()) {
        navigate('/app', { replace: true });
        return;
      }
      const timer = window.setTimeout(() => navigate('/app'), 6000);
      return () => window.clearTimeout(timer);
    }

    if (location.pathname !== '/app' || stageRef.current !== 'landing') return;

    stageRef.current = 'typing';
    let timer: number | undefined;
    let cancelled = false;
    const startedAt = Date.now();
    const query = 'Brasília';

    const waitForAndClick = (selector: string, stage: VideoCaptureStage, timeoutMs = 30_000, startedAt = Date.now()) => {
      if (cancelled) return;
      const target = document.querySelector(selector) as HTMLElement | null;
      if (target) {
        stageRef.current = stage;
        target.click();
        return;
      }
      if (Date.now() - startedAt >= timeoutMs) {
        document.documentElement.dataset.citybikesVideoState = `failed-${stage}`;
        return;
      }
      timer = window.setTimeout(() => waitForAndClick(selector, stage, timeoutMs, startedAt), 350);
    };

    const typeQuery = (input: HTMLInputElement, index: number) => {
      if (cancelled) return;
      const nextIndex = index + 1;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      setter?.call(input, query.slice(0, nextIndex));
      input.dispatchEvent(new Event('input', { bubbles: true }));
      if (nextIndex < query.length) {
        timer = window.setTimeout(() => typeQuery(input, nextIndex), 120);
      } else {
        input.blur();
        stageRef.current = 'finding-network';
        timer = window.setTimeout(() => waitForAndClick('[data-testid="network-result-bikebrasilia"]', 'opening-station'), 700);
      }
    };

    const waitForRouteSummary = (routeStartedAt = Date.now()) => {
      if (cancelled) return;
      if (document.querySelector('[data-testid="cycling-route-summary"]')) {
        stageRef.current = 'done';
        document.documentElement.dataset.citybikesVideoState = 'route-ready';
        return;
      }
      if (Date.now() - routeStartedAt > 30_000) {
        document.documentElement.dataset.citybikesVideoState = 'failed-route';
        return;
      }
      timer = window.setTimeout(() => waitForRouteSummary(routeStartedAt), 500);
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

    timer = window.setTimeout(startTyping, 5000);

    const stationTimer = window.setInterval(() => {
      if (cancelled || stageRef.current !== 'opening-station') return;
      const selectedNetwork = Array.from(document.querySelectorAll('h2'))
        .some((heading) => heading.textContent?.trim() === 'BikeBrasilia');
      if (!selectedNetwork) {
        if (Date.now() - startedAt >= 50_000) {
          window.clearInterval(stationTimer);
          document.documentElement.dataset.citybikesVideoState = 'failed-network-details';
        }
        return;
      }
      const stationMarkers = Array.from(document.querySelectorAll<HTMLElement>('.leaflet-marker-icon.custom-marker'));
      const marker = stationMarkers.find((element) => element.title.includes('Funarte')) ?? stationMarkers[0];
      if (marker) {
        window.clearInterval(stationTimer);
        marker.click();
        stageRef.current = 'planning-route';
        const clickPlanRoute = () => {
          if (cancelled) return;
          const button = document.querySelector('[data-testid="plan-route-button"]') as HTMLButtonElement | null;
          if (button) {
            if (button.disabled || button.textContent?.toLowerCase().includes('usar localização')) {
              if (!button.disabled) button.click();
              if (Date.now() - startedAt > 45_000) {
                document.documentElement.dataset.citybikesVideoState = 'failed-location';
                return;
              }
              timer = window.setTimeout(clickPlanRoute, 700);
              return;
            }
            button.click();
            waitForRouteSummary();
            return;
          }
          if (Date.now() - startedAt > 45_000) {
            document.documentElement.dataset.citybikesVideoState = 'failed-route-button';
            return;
          }
          timer = window.setTimeout(clickPlanRoute, 350);
        };
        timer = window.setTimeout(clickPlanRoute, 400);
        return;
      }
      if (Date.now() - startedAt >= 50_000) {
        window.clearInterval(stationTimer);
        document.documentElement.dataset.citybikesVideoState = 'failed-station';
      }
    }, 500);
    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
      window.clearInterval(stationTimer);
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
    const validCaptureMode = isScreenshotCaptureMode(captureMode)
        ? captureMode
        : storedCaptureMode === 'video-search' ? 'video-search' : null;

    useEffect(() => {
        if (!validCaptureMode) return;
        setTheme(validCaptureMode === 'dark-map' ? 'dark' : 'light');
        if (validCaptureMode === 'video-search' || validCaptureMode.startsWith('brasilia-')) {
            localStorage.setItem('i18nextLng', 'pt');
            void i18n.changeLanguage('pt');
        }
        window.dispatchEvent(new CustomEvent('citybikes:capture-theme', {
            detail: { theme: validCaptureMode === 'dark-map' ? 'dark' : 'light' },
        }));
    }, [setTheme, validCaptureMode]);

    return (
    <CityBikesProvider key={validCaptureMode ?? 'live'} captureMode={validCaptureMode}>
        <Layout>
            <Suspense fallback={<AppLoading />}>
                <NetworkSearch captureQuery={validCaptureMode === 'brasilia-explore' ? 'Brasília' : ''} />
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
                    <Route path="/" element={Capacitor.isNativePlatform() ? <Navigate to="/app" replace /> : <LandingPage />} />
                    <Route path="/app" element={<AppLayout />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </HashRouter>
    );
}

export default App;
