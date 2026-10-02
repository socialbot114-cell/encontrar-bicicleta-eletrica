import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Provider = { name: string; description: string };

type PolicyContent = {
    back: string;
    title: string;
    effective: string;
    overviewTitle: string;
    overview: string;
    accessTitle: string;
    access: { label: string; text: string }[];
    thirdPartyTitle: string;
    thirdPartyIntro: string;
    providers: Provider[];
    sharing: string;
    providerPolicies: string;
    permissionsTitle: string;
    permissionsIntro: string;
    permissions: { label: string; text: string }[];
    permissionsDeny: string;
    storageTitle: string;
    storage: string;
    childrenTitle: string;
    children: string;
    rightsTitle: string;
    rights: string;
    contactTitle: string;
    contact: (email: ReactNode) => ReactNode;
    changesTitle: string;
    changes: string;
};

const content: Record<'en' | 'pt', PolicyContent> = {
    en: {
        back: 'Back to CityBikes',
        title: 'Privacy Policy',
        effective: 'Effective',
        overviewTitle: '1. Overview',
        overview: 'Encontrar Bicicleta Eletrica ("we", "us", "the app") is a mapping application that helps you locate shared bikes, charging stations, weather, air quality, and nearby points of interest. This privacy policy explains what data we access and how that data is handled.',
        accessTitle: '2. Data We Access',
        access: [
            { label: 'Device location', text: "With your explicit permission, we access your device's approximate or precise location to center the map on your position and to search for nearby services. We do not store your location on our servers — location data is processed on your device and transmitted directly to third-party service providers." },
            { label: 'Map coordinates', text: 'When you manually pan or zoom the map, we send the centre coordinates of the map view to third-party service providers to retrieve weather, air quality, EV charging stations, and points of interest. This transmission occurs regardless of whether location permission is granted.' },
            { label: 'Favourites', text: 'Bike networks and stations you star are stored exclusively on your device (localStorage). They are never transmitted to us.' },
        ],
        thirdPartyTitle: '3. Third-Party Services',
        thirdPartyIntro: 'The app sends internet requests to the following external providers. The data transmitted may include your device location or map-centre coordinates, depending on the feature used:',
        providers: [
            { name: 'OpenStreetMap / Leaflet', description: 'Map tiles for the interactive map. The tile server may log the IP address and tile coordinates of each request. Tile imagery copyright © OpenStreetMap contributors.' },
            { name: 'CityBikes API (api.citybik.es)', description: 'Bike network and station data. The API is called without location; any location context is derived from the network selected by the user.' },
            { name: 'Open-Meteo', description: 'Weather and air quality forecasts. The map-centre coordinates are sent whenever the map is panned, and only when Smart Data display is enabled.' },
            { name: 'OpenStreetMap Routing Service (routing.openstreetmap.de)', description: 'A bicycle route is requested only when you choose Plan route for a station. Your current coordinates and the selected station coordinates are sent to calculate and display the route inside the app.' },
            { name: 'Open Charge Map (api.openchargemap.io)', description: 'EV charging station data. Map-centre coordinates are sent when the EV charges layer is switched on.' },
            { name: 'Overpass API (overpass-api.de)', description: 'Nearby toilets, water fountains and bicycle parking from OpenStreetMap. Map-centre coordinates are sent when the Amenities layer is switched on.' },
            { name: 'USGS', description: 'Recent global earthquake data. Requests are sent without location coordinates.' },
        ],
        sharing: 'If you choose to share a station, its name, reported bike and dock counts, and map link are passed to the iOS or Android system share sheet. The app does not send shared station details to its own server.',
        providerPolicies: 'These providers may log requests subject to their own privacy policies. We do not control their data practices. We rely exclusively on their public, free-of-charge facilities.',
        permissionsTitle: '4. Permissions',
        permissionsIntro: 'The app requests the following permissions:',
        permissions: [
            { label: 'Internet', text: 'required to load map graphics and exchange network data.' },
            { label: 'Location while using the app (iOS) / ACCESS_FINE_LOCATION (Android)', text: 'centre the map on your position and provide area-specific services.' },
            { label: 'ACCESS_COARSE_LOCATION (Android)', text: 'approximate positioning when precise location is not required.' },
        ],
        permissionsDeny: 'You can deny location permissions – the app will still work, defaulting to a global overview and manual city searches.',
        storageTitle: '5. Data Storage & Retention',
        storage: "Location is used in memory only for the current session and is not stored or uploaded by us. Third-party providers may log requests according to their own retention policies. For details, please refer to the individual provider's privacy policy. Favourites, language, and theme preferences are retained on your device and are cleared when app data is cleared through system settings.",
        childrenTitle: "6. Children's Privacy",
        children: 'The app is not directed at children under 13 and we do not knowingly collect data from them.',
        rightsTitle: '7. Your Rights',
        rights: 'You can revoke location permission in your device settings at any time. Clearing app data removes all locally stored favourites and preferences.',
        contactTitle: '8. Contact',
        contact: (email) => <>If you have questions about this policy or wish to exercise your data rights, please email {email}.</>,
        changesTitle: '9. Changes',
        changes: 'We may update this policy periodically. Revisions will be reflected in the effective date above. Continued use of the app after changes means acceptance of the updated policy.',
    },
    pt: {
        back: 'Voltar ao CityBikes',
        title: 'Política de Privacidade',
        effective: 'Vigente desde',
        overviewTitle: '1. Visão geral',
        overview: 'O Encontrar Bicicleta Elétrica ("nós", "o app") é um aplicativo de mapas que ajuda você a localizar bicicletas compartilhadas, pontos de recarga, clima, qualidade do ar e pontos de interesse próximos. Esta política explica quais dados acessamos e como eles são tratados.',
        accessTitle: '2. Dados que acessamos',
        access: [
            { label: 'Localização do dispositivo', text: 'Com a sua permissão explícita, acessamos a localização aproximada ou precisa do dispositivo para centralizar o mapa na sua posição e buscar serviços próximos. Não armazenamos sua localização em servidores próprios: ela é processada no dispositivo e enviada diretamente aos provedores terceiros.' },
            { label: 'Coordenadas do mapa', text: 'Quando você move ou aproxima o mapa, enviamos as coordenadas do centro da visualização a provedores terceiros para obter clima, qualidade do ar, pontos de recarga e pontos de interesse. Esse envio ocorre mesmo sem permissão de localização.' },
            { label: 'Favoritos', text: 'As redes e estações que você marca com estrela ficam armazenadas apenas no seu dispositivo (localStorage) e nunca são enviadas para nós.' },
        ],
        thirdPartyTitle: '3. Serviços de terceiros',
        thirdPartyIntro: 'O app faz requisições aos provedores externos abaixo. Dependendo do recurso usado, os dados enviados podem incluir a localização do dispositivo ou as coordenadas do centro do mapa:',
        providers: [
            { name: 'OpenStreetMap / Leaflet', description: 'Imagens do mapa interativo. O servidor de mapas pode registrar o endereço IP e as coordenadas de cada requisição. Imagens © colaboradores do OpenStreetMap.' },
            { name: 'API CityBikes (api.citybik.es)', description: 'Dados de redes e estações de bicicletas. A API é chamada sem localização; o contexto de local vem da rede escolhida por você.' },
            { name: 'Open-Meteo', description: 'Previsão do tempo e qualidade do ar. As coordenadas do centro do mapa são enviadas quando o mapa é movido, apenas com a exibição de dados inteligentes ativada.' },
            { name: 'Serviço de rotas do OpenStreetMap (routing.openstreetmap.de)', description: 'A rota de bicicleta só é solicitada quando você escolhe Planejar rota para uma estação. Suas coordenadas atuais e as da estação escolhida são enviadas para calcular e exibir a rota no app.' },
            { name: 'Open Charge Map (api.openchargemap.io)', description: 'Dados de pontos de recarga de veículos elétricos. As coordenadas do centro do mapa são enviadas quando a camada de recarga está ativada.' },
            { name: 'Overpass API (overpass-api.de)', description: 'Banheiros, bebedouros e bicicletários próximos, do OpenStreetMap. As coordenadas do centro do mapa são enviadas quando a camada de serviços próximos está ativada.' },
            { name: 'USGS', description: 'Dados recentes de terremotos no mundo. As requisições são feitas sem coordenadas de localização.' },
        ],
        sharing: 'Ao compartilhar uma estação, o nome, as quantidades informadas de bicicletas e vagas e o link do mapa são passados para a folha de compartilhamento do iOS ou do Android. O app não envia esses dados a um servidor próprio.',
        providerPolicies: 'Esses provedores podem registrar requisições conforme suas próprias políticas de privacidade. Não controlamos suas práticas de dados e usamos apenas os serviços públicos e gratuitos que eles oferecem.',
        permissionsTitle: '4. Permissões',
        permissionsIntro: 'O app solicita as seguintes permissões:',
        permissions: [
            { label: 'Internet', text: 'necessária para carregar o mapa e trocar dados de rede.' },
            { label: 'Localização durante o uso (iOS) / ACCESS_FINE_LOCATION (Android)', text: 'centraliza o mapa na sua posição e oferece serviços da região.' },
            { label: 'ACCESS_COARSE_LOCATION (Android)', text: 'posição aproximada quando a localização precisa não é necessária.' },
        ],
        permissionsDeny: 'Você pode negar a permissão de localização: o app continua funcionando, com visão global do mapa e busca manual por cidade.',
        storageTitle: '5. Armazenamento e retenção',
        storage: 'A localização fica apenas na memória durante a sessão atual e não é armazenada nem enviada por nós. Os provedores terceiros podem registrar requisições conforme suas próprias políticas de retenção; consulte a política de cada um para detalhes. Favoritos, idioma e tema ficam no seu dispositivo e são apagados quando os dados do app são limpos nas configurações do sistema.',
        childrenTitle: '6. Privacidade de crianças',
        children: 'O app não é direcionado a menores de 13 anos e não coletamos dados deles intencionalmente.',
        rightsTitle: '7. Seus direitos',
        rights: 'Você pode revogar a permissão de localização a qualquer momento nas configurações do dispositivo. Limpar os dados do app remove todos os favoritos e preferências salvos localmente.',
        contactTitle: '8. Contato',
        contact: (email) => <>Se tiver dúvidas sobre esta política ou quiser exercer seus direitos sobre dados, envie um e-mail para {email}.</>,
        changesTitle: '9. Alterações',
        changes: 'Podemos atualizar esta política periodicamente. As revisões serão indicadas na data de vigência acima. O uso contínuo do app após as alterações significa a aceitação da política atualizada.',
    },
};

const contactEmail = 'contact@citybikes.premium';

export const PrivacyPolicy = () => {
    const { i18n } = useTranslation();
    const effectiveDate = '2026-08-27';
    const language = (i18n.resolvedLanguage ?? i18n.language ?? 'en').toLowerCase();
    const policy = language.startsWith('pt') ? content.pt : content.en;
    const sectionTitle = 'text-xl font-bold text-slate-800 dark:text-white mb-3';

    return (
        <div lang={language.startsWith('pt') ? 'pt-BR' : 'en'} className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-500">
            <div className="container mx-auto max-w-3xl px-6 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-16 pt-[calc(1.5rem+env(safe-area-inset-top))]">
                <Link to="/" className="mb-10 inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white">
                    <ArrowLeft className="h-4 w-4" />
                    {policy.back}
                </Link>
                <h1 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-400 dark:to-blue-500">
                    {policy.title}
                </h1>
                <p className="text-sm text-slate-500 mb-12">{policy.effective}: {effectiveDate}</p>
                <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
                    <section>
                        <h2 className={sectionTitle}>{policy.overviewTitle}</h2>
                        <p>{policy.overview}</p>
                    </section>

                    <section>
                        <h2 className={sectionTitle}>{policy.accessTitle}</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            {policy.access.map((item) => (
                                <li key={item.label}><strong>{item.label}:</strong> {item.text}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className={sectionTitle}>{policy.thirdPartyTitle}</h2>
                        <p className="mb-4">{policy.thirdPartyIntro}</p>

                        <div className="space-y-4 text-sm">
                            {policy.providers.map((provider) => (
                                <div key={provider.name} className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                    <div className="font-bold text-slate-800 dark:text-white">{provider.name}</div>
                                    <div className="text-slate-500">{provider.description}</div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">{policy.sharing}</p>
                        <p className="mt-4">{policy.providerPolicies}</p>
                    </section>

                    <section>
                        <h2 className={sectionTitle}>{policy.permissionsTitle}</h2>
                        <p className="mb-2">{policy.permissionsIntro}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            {policy.permissions.map((item) => (
                                <li key={item.label}><strong>{item.label}</strong> — {item.text}</li>
                            ))}
                        </ul>
                        <p className="mt-2">{policy.permissionsDeny}</p>
                    </section>

                    <section>
                        <h2 className={sectionTitle}>{policy.storageTitle}</h2>
                        <p>{policy.storage}</p>
                    </section>

                    <section>
                        <h2 className={sectionTitle}>{policy.childrenTitle}</h2>
                        <p>{policy.children}</p>
                    </section>

                    <section>
                        <h2 className={sectionTitle}>{policy.rightsTitle}</h2>
                        <p>{policy.rights}</p>
                    </section>

                    <section>
                        <h2 className={sectionTitle}>{policy.contactTitle}</h2>
                        <p>{policy.contact(<a href={`mailto:${contactEmail}`} className="text-cyan-600 dark:text-cyan-400 underline">{contactEmail}</a>)}</p>
                    </section>

                    <section>
                        <h2 className={sectionTitle}>{policy.changesTitle}</h2>
                        <p>{policy.changes}</p>
                    </section>
                </div>
            </div>
        </div>
    );
};
