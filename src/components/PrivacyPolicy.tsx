import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicy = () => {
    const effectiveDate = '2026-08-27';
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-500">
            <div className="container mx-auto max-w-3xl px-6 pb-16 pt-[calc(1.5rem+env(safe-area-inset-top))]">
                <Link to="/" className="mb-10 inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white">
                    <ArrowLeft className="h-4 w-4" />
                    Back to CityBikes
                </Link>
                <h1 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-400 dark:to-blue-500">
                    Privacy Policy
                </h1>
                <p className="text-sm text-slate-500 mb-12">Effective: {effectiveDate}</p>
                <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">1. Overview</h2>
                        <p>
                            Encontrar Bicicleta Eletrica ("we", "us", "the app") is a mapping application that helps you locate
                            shared bikes, charging stations, weather, air quality, and nearby points of interest.
                            This privacy policy explains what data we access and how that data is handled.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">2. Data We Access</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Device location:</strong> With your explicit permission, we access your device's approximate or precise location to center the map on your position and to search for nearby services. We do not store your location on our servers — location data is processed on your device and transmitted directly to third-party service providers.</li>
                            <li><strong>Map coordinates:</strong> When you manually pan or zoom the map, we send the centre coordinates of the map view to third-party service providers to retrieve weather, air quality, EV charging stations, and points of interest. This transmission occurs regardless of whether location permission is granted.</li>
                            <li><strong>Favourites:</strong> Bike networks and stations you star are stored exclusively on your device (localStorage). They are never transmitted to us.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">3. Third-Party Services</h2>
                        <p className="mb-4">The app sends internet requests to the following external providers. The data transmitted may include your device location or map-centre coordinates, depending on the feature used:</p>

                        <div className="space-y-4 text-sm">
                            <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                <div className="font-bold text-slate-800 dark:text-white">OpenStreetMap / Leaflet</div>
                                <div className="text-slate-500">Map tiles for the interactive map. The tile server may log the IP address and tile coordinates of each request. Tile imagery copyright &copy; OpenStreetMap contributors.</div>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                <div className="font-bold text-slate-800 dark:text-white">CityBikes API (api.citybik.es)</div>
                                <div className="text-slate-500">Bike network and station data. The API is called without location; any location context is derived from the network selected by the user.</div>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                <div className="font-bold text-slate-800 dark:text-white">Open-Meteo</div>
                                <div className="text-slate-500">Weather and air quality forecasts. The map-centre coordinates are sent whenever the map is panned, and only when Smart Data display is enabled.</div>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                <div className="font-bold text-slate-800 dark:text-white">OSRM (router.project-osrm.org)</div>
                                <div className="text-slate-500">Cycling routing from your current location to a selected station. The user triggers this explicitly by tapping a Get Directions action.</div>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                <div className="font-bold text-slate-800 dark:text-white">Open Charge Map (api.openchargemap.io)</div>
                                <div className="text-slate-500">EV charging station data. Map-centre coordinates are sent when the EV charges layer is switched on.</div>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                <div className="font-bold text-slate-800 dark:text-white">Overpass API (overpass-api.de)</div>
                                <div className="text-slate-500">Nearby toilets, water fountains and bicycle parking from OpenStreetMap. Map-centre coordinates are sent when the Amenities layer is switched on.</div>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                <div className="font-bold text-slate-800 dark:text-white">USGS</div>
                                <div className="text-slate-500">Recent global earthquake data. Requests are sent without location coordinates.</div>
                            </div>
                        </div>
                        <p className="mt-4">These providers may log requests subject to their own privacy policies. We do not control their data practices. We rely exclusively on their public, free-of-charge facilities.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">4. Permissions</h2>
                        <p className="mb-2">The app requests the following Android permissions:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>INTERNET</strong> — required to load map graphics and exchange network data.</li>
                            <li><strong>ACCESS_FINE_LOCATION</strong> — centre the map on your position and provide area-specific services.</li>
                            <li><strong>ACCESS_COARSE_LOCATION</strong> — approximate positioning when precise location is not required.</li>
                        </ul>
                        <p className="mt-2">You can deny location permissions – the app will still work, defaulting to a global overview and manual city searches.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">5. Data Storage &amp; Retention</h2>
                        <p>
                            Location is used in memory only for the current session and is not stored or uploaded by us.
                            Third-party providers may log requests according to their own retention policies. For details,
                            please refer to the individual provider's privacy policy.
                             Favourites, language, and theme preferences are retained on your device and are cleared when
                            app data is cleared through system settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">6. Children's Privacy</h2>
                        <p>The app is not directed at children under 13 and we do not knowingly collect data from them.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">7. Your Rights</h2>
                         <p>You can revoke location permission in your device settings at any time. Clearing app data removes all locally stored favourites and preferences.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">8. Contact</h2>
                        <p>If you have questions about this policy or wish to exercise your data rights, please email <a href="mailto:contact@citybikes.premium" className="text-cyan-600 dark:text-cyan-400 underline">contact@citybikes.premium</a>.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">9. Changes</h2>
                        <p>We may update this policy periodically. Revisions will be reflected in the effective date above. Continued use of the app after changes means acceptance of the updated policy.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};
