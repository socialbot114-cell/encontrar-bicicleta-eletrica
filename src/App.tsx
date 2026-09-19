import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CityBikesProvider } from './context/CityBikesContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { AppHome } from './components/AppHome';

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
    return (
        <BrowserRouter>
            <Suspense fallback={<AppLoading />}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/app" element={<AppLayout />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
