import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';
import { CityBikesProvider } from './context/CityBikesContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { AppHome } from './components/AppHome';

const DeepLinkHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let listener: { remove: () => void } | null = null;
    CapacitorApp.addListener('appUrlOpen', (event) => {
      try {
        const url = event.url || '';
        if (url.includes('/app') || url.includes('#/app')) {
          navigate('/app');
        } else if (url.includes('/privacy')) {
          navigate('/privacy');
        }
      } catch {}
    }).then((l) => { listener = l; });
    return () => { listener?.remove(); };
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

const AppLayout = () => (
    <CityBikesProvider>
        <Layout>
            <Suspense fallback={<AppLoading />}>
                <NetworkSearch />
                <AppHome />
                <MapComponent />
            </Suspense>
        </Layout>
    </CityBikesProvider>
);

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
