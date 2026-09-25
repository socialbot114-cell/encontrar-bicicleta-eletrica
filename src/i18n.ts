import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Simple language detector
const getSavedLanguage = () => {
    const saved = localStorage.getItem('i18nextLng');
    if (saved) return saved;
    const browser = navigator.language.split('-')[0];
    return ['en', 'pt', 'es', 'fr'].includes(browser) ? browser : 'pt';
};

const resources = {
    en: {
        translation: {
            "app_title": "Encontrar Bicicleta Elétrica",
            "subtitle": "Select a network to begin.",
            "search_placeholder": "Search city or network...",
            "bikes": "Bikes",
            "slots": "Slots",
            "start_over": "Start Over",
            "current_location": "Current Location",
            "near_me": "Near Me",
            "loading": "Loading networks...",
            "hero_title_1": "Urban",
            "hero_title_2": "Revolution",
            "hero_subtitle": "Connect with the greenest way to move around your city.",
            "future_of_mobility": "Future of Mobility",
            "enter_app": "Explore Map",
            "esg_title": "Sustainability & ESG",
            "esg_desc": "We are committed to reducing carbon footprints by promoting bike-sharing networks globally. Our commitment goes beyond just providing bikes. We actively partner with cities to reduce traffic congestion and lower emissions. Every ride counts towards a greener planet.",
            "green_title": "Green Vehicles",
            "green_desc": "Check live availability reported by bike-sharing networks, including e-bike counts where a network provides them.",
            "health_title": "Health & Wellness",
            "health_desc": "Active mobility improves physical health and mental well-being. Cycling decreases stress levels and improves cardiovascular health. Integrating active travel into your routine is the easiest way to stay fit.",
            "community_title": "Community Connect",
            "community_desc": "Explore bike-sharing data from cities around the world and plan your next ride with current station availability.",
            "footer_links": "Quick Links",
            "contact_title": "Contact Us",
            "contact_name": "Name",
            "contact_email": "Email",
            "contact_message": "Message",
            "contact_submit": "Send Message",
            "contact_success": "Message sent!",
            "modal_close": "Close",
            "learn_more": "Learn More",
            "stats_zero_emissions": "Zero Emissions",
            "stats_global_tribe": "Global Tribe",
            "stats_tech_first": "Tech First",
            "stats_vitality": "Vitality",
            "why_choose": "Why Choose CityBikes?",
            "why_choose_subtitle": "Discover the benefits of joining the largest interconnected urban mobility network.",
            "contact_subtitle": "Ready to transform your daily commute? Get in touch with us for enterprise solutions or general inquiries.",
            "email_us_at": "Email us at",
            "footer_about": "About Us",
            "footer_cities": "Cities",
            "footer_api": "API",
            "footer_privacy": "Privacy Policy",
            "footer_connect": "Connect",
            "footer_all_rights": "All rights reserved.",
            "location_prompt": "Find bikes near you?",
            "location_enable": "Enable location",
             "location_denied_hint": "Location off — showing world view."
             ,"location_active": "Location active"
             ,"app_explore_label": "CityBikes Explore"
             ,"app_home_title": "Find your next ride"
             ,"app_home_nearby": "Bikes near you"
             ,"app_home_subtitle": "Explore bike-sharing networks in cities around the world."
             ,"app_home_nearby_subtitle": "Live availability from the networks around you."
             ,"app_favorites": "Your favorites"
             ,"app_suggested": "Suggested networks"
             ,"app_networks": "networks"
             ,"app_loading_networks": "Finding bike networks..."
             ,"app_search_hint": "Search for a city or network above to get started."
             ,"nav_map": "Map"
             ,"nav_theme": "Theme"
             ,"nav_favorites": "Favorites"
             ,"nav_privacy": "Privacy"
             ,"language_label": "Select language"
             ,"toggle_theme": "Toggle theme"
             ,"mobile_navigation": "Mobile navigation"
             ,"loading_networks": "Loading networks..."
             ,"clear_search": "Clear search"
             ,"no_networks_found": "No networks found matching {{query}}"
             ,"distance_away": "{{distance}} km away"
             ,"map_layers": "Map layers"
             ,"enable": "Enable"
             ,"disable": "Disable"
             ,"smart_data_toggle": "{{action}} Smart Data coordinate sharing"
             ,"smart_data_on": "Data on"
             ,"smart_data_off": "Data off"
             ,"smart_data_title": "Smart Data uses the approximate map center for weather and nearby amenities"
             ,"smart_data_notice": "Approximate map center is shared with data providers."
             ,"smart_data_failed": "Smart Data failed to update."
             ,"layer_ev": "EV Power"
             ,"layer_alerts": "Alerts"
             ,"layer_amenities": "Amenities"
             ,"find_nearby": "Find near me"
             ,"toggle_layer": "Toggle {{layer}} layer"
             ,"network_refresh_error": "Could not refresh stations for this network. Existing data may be stale."
             ,"network_list_error": "Could not load the bike-network list. Check your connection and retry."
             ,"retry": "Retry"
             ,"favorite_network": "Toggle favorite network"
             ,"favorite_station": "Toggle favorite station"
             ,"view_analytics": "View analytics"
             ,"close_network": "Close network details"
             ,"ebike_filter_show": "Show e-bike stations"
             ,"ebike_filter_active": "Showing e-bikes"
             ,"route_loading": "Planning a cycling route…"
             ,"route_error_generic": "Could not plan this cycling route. Check your connection and try again."
             ,"route_title": "Cycling route"
             ,"route_summary": "Cycling route summary"
             ,"route_to": "To {{station}}"
             ,"route_distance": "{{distance}} km"
             ,"route_minutes": "{{minutes}} min"
             ,"plan_route_accessibility": "Plan an in-app cycling route to {{station}}"
             ,"dismiss_message": "Dismiss message"
             ,"route_clear": "Clear cycling route"
             ,"route_preview_safety": "Route preview by OpenStreetMap. Follow local road signs and safety rules."
             ,"plan_route": "Plan route"
             ,"route_shown": "Route shown"
             ,"use_location": "Use location"
             ,"route_location_denied": "Location is off. Allow access in Settings to plan a route."
             ,"route_location_hint": "Use your location to preview a cycling route inside the app."
             ,"finding_location": "Finding your location…"
             ,"share_station": "Share {{station}}"
             ,"share_station_title": "Share bike station"
             ,"share_station_text": "{{station}} — {{city}}. {{bikes}} bikes available; {{docks}} empty docks."
             ,"availability_not_reported": "availability not reported"
             ,"share_feedback": "Station details shared."
             ,"share_copied": "Station details copied."
             ,"share_unavailable": "Sharing is not available on this device."
             ,"share_failed": "Could not share this station."
             ,"station_freshness": "Station {{freshness}}"
             ,"your_location": "Your current location"
             ,"station_alt": "{{station}} bike station, {{count}} bikes available"
             ,"network_alt": "{{network}} bike network"
             ,"network_marker_title": "{{network}}, {{city}}"
             ,"station_marker_title": "{{station}}: {{count}} bikes available"
             ,"cluster_alt": "Cluster of {{count}} bike networks"
             ,"ebike_availability_reported": "E-bike availability reported"
             ,"ebikes_label": "e-bikes"
        }
    },
    pt: {
        translation: {
            "app_title": "Encontrar Bicicleta Elétrica",
            "subtitle": "Selecione uma rede para começar.",
            "search_placeholder": "Buscar cidade ou rede...",
            "bikes": "Bicicletas",
            "slots": "Vagas",
            "start_over": "Reiniciar",
            "current_location": "Localização Atual",
            "near_me": "Perto de Mim",
            "loading": "Carregando redes...",
            "hero_title_1": "Revolução",
            "hero_title_2": "Urbana",
            "hero_subtitle": "Conecte-se com a forma mais ecológica de se mover pela sua cidade.",
            "future_of_mobility": "O Futuro da Mobilidade",
            "enter_app": "Explorar Mapa",
            "esg_title": "Sustentabilidade & ESG",
            "esg_desc": "Estamos comprometidos em reduzir a pegada de carbono promovendo redes de compartilhamento de bicicletas globalmente. Nosso compromisso vai além de apenas fornecer bicicletas. Fazemos parcerias ativas com cidades para reduzir o congestionamento e as emissões. Cada viagem conta para um planeta mais verde.",
            "green_title": "Veículos Verdes",
            "green_desc": "Consulte a disponibilidade informada pelas redes de bicicletas, incluindo contagens de e-bikes quando fornecidas.",
            "health_title": "Saúde & Bem-estar",
            "health_desc": "Mobilidade ativa melhora a saúde física e o bem-estar mental. O ciclismo diminui os níveis de estresse e melhora a saúde cardiovascular. Integrar o transporte ativo em sua rotina é a maneira mais fácil de manter a forma.",
            "community_title": "Conexão Comunitária",
            "community_desc": "Explore dados de bicicletas compartilhadas em cidades do mundo todo e planeje seu próximo passeio com a disponibilidade atual das estações.",
            "footer_links": "Links Rápidos",
            "contact_title": "Fale Conosco",
            "contact_name": "Nome",
            "contact_email": "E-mail",
            "contact_message": "Mensagem",
            "contact_submit": "Enviar Mensagem",
            "contact_success": "Mensagem enviada!",
            "modal_close": "Fechar",
            "learn_more": "Saiba Mais",
            "stats_zero_emissions": "Zero Emissões",
            "stats_global_tribe": "Tribo Global",
            "stats_tech_first": "Tecnologia",
            "stats_vitality": "Vitalidade",
            "why_choose": "Por que CityBikes?",
            "why_choose_subtitle": "Descubra os benefícios de participar da maior rede de mobilidade urbana interconectada.",
            "contact_subtitle": "Pronto para transformar seu trajeto diário? Entre em contato conosco para soluções empresariais ou dúvidas gerais.",
            "email_us_at": "Envie um e-mail",
            "footer_about": "Sobre Nós",
            "footer_cities": "Cidades",
            "footer_api": "API",
            "footer_privacy": "Política de Privacidade",
            "footer_connect": "Conectar",
            "footer_all_rights": "Todos os direitos reservados.",
            "location_prompt": "Encontrar bikes perto de você?",
            "location_enable": "Ativar localização",
             "location_denied_hint": "Localização desligada — mostrando visão mundial."
             ,"location_active": "Localização ativa"
              ,"app_explore_label": "Explorar CityBikes"
              ,"app_home_title": "Encontre sua próxima pedalada"
               ,"app_home_nearby": "Bicicletas perto de você"
              ,"app_home_subtitle": "Encontre redes de bicicletas compartilhadas em cidades do mundo todo."
              ,"app_home_nearby_subtitle": "Disponibilidade atualizada das redes ao seu redor."
             ,"app_favorites": "Suas favoritas"
             ,"app_suggested": "Redes sugeridas"
             ,"app_networks": "redes"
              ,"app_loading_networks": "Encontrando redes de bicicletas..."
              ,"app_search_hint": "Busque uma cidade ou rede acima para começar."
               ,"nav_map": "Mapa"
               ,"nav_theme": "Tema"
               ,"nav_favorites": "Favoritas"
               ,"nav_privacy": "Privacidade"
               ,"language_label": "Selecionar idioma"
               ,"toggle_theme": "Alternar tema"
               ,"mobile_navigation": "Navegação inferior"
              ,"loading_networks": "Carregando redes..."
              ,"clear_search": "Limpar busca"
              ,"no_networks_found": "Nenhuma rede encontrada para {{query}}"
              ,"distance_away": "a {{distance}} km"
              ,"map_layers": "Camadas do mapa"
              ,"enable": "Ativar"
              ,"disable": "Desativar"
              ,"smart_data_toggle": "{{action}} compartilhamento de coordenadas do Smart Data"
              ,"smart_data_on": "Dados ligados"
              ,"smart_data_off": "Dados desligados"
              ,"smart_data_title": "O Smart Data usa o centro aproximado do mapa para consultar o clima e serviços próximos"
              ,"smart_data_notice": "O centro aproximado do mapa é compartilhado com os provedores de dados."
              ,"smart_data_failed": "Não foi possível atualizar os dados inteligentes."
              ,"layer_ev": "Recarga elétrica"
              ,"layer_alerts": "Alertas"
              ,"layer_amenities": "Serviços próximos"
              ,"find_nearby": "Centralizar na minha localização"
              ,"toggle_layer": "Alternar camada {{layer}}"
              ,"network_refresh_error": "Não foi possível atualizar as estações desta rede. Os dados exibidos podem estar desatualizados."
              ,"network_list_error": "Não foi possível carregar as redes de bicicletas. Verifique a conexão e tente novamente."
              ,"retry": "Tentar novamente"
              ,"favorite_network": "Alternar rede favorita"
              ,"favorite_station": "Alternar estação favorita"
              ,"view_analytics": "Ver indicadores"
              ,"close_network": "Fechar detalhes da rede"
              ,"ebike_filter_show": "Mostrar estações com bicicletas elétricas"
              ,"ebike_filter_active": "Mostrando bicicletas elétricas"
              ,"route_loading": "Calculando a rota ciclável…"
              ,"route_error_generic": "Não foi possível calcular a rota. Verifique a conexão e tente novamente."
              ,"route_title": "Rota ciclável"
              ,"route_summary": "Resumo da rota ciclável"
              ,"route_to": "Para {{station}}"
              ,"route_distance": "{{distance}} km"
              ,"route_minutes": "{{minutes}} min"
              ,"plan_route_accessibility": "Planejar rota ciclável no app até {{station}}"
              ,"dismiss_message": "Fechar aviso"
              ,"route_clear": "Limpar rota"
              ,"route_preview_safety": "Prévia de rota do OpenStreetMap. Siga a sinalização e as regras de trânsito."
              ,"plan_route": "Planejar rota"
              ,"route_shown": "Rota exibida"
              ,"use_location": "Usar localização"
              ,"route_location_denied": "A localização está desativada. Permita o acesso nos Ajustes para planejar uma rota."
              ,"route_location_hint": "Use sua localização para ver uma rota dentro do app."
              ,"finding_location": "Buscando sua localização…"
              ,"share_station": "Compartilhar {{station}}"
              ,"share_station_title": "Compartilhar estação de bicicletas"
              ,"share_station_text": "{{station}} — {{city}}. {{bikes}} bicicletas disponíveis; {{docks}} vagas livres."
              ,"availability_not_reported": "disponibilidade não informada"
              ,"share_feedback": "Detalhes da estação compartilhados."
              ,"share_copied": "Detalhes da estação copiados."
              ,"share_unavailable": "O compartilhamento não está disponível neste dispositivo."
              ,"share_failed": "Não foi possível compartilhar esta estação."
              ,"station_freshness": "Estação: {{freshness}}"
              ,"your_location": "Sua localização atual"
              ,"station_alt": "Estação {{station}}, {{count}} bicicletas disponíveis"
              ,"network_alt": "Rede de bicicletas {{network}}"
              ,"network_marker_title": "{{network}}, {{city}}"
              ,"station_marker_title": "{{station}}: {{count}} bicicletas disponíveis"
              ,"cluster_alt": "Grupo com {{count}} redes de bicicletas"
              ,"ebike_availability_reported": "Disponibilidade de bicicletas elétricas informada"
              ,"ebikes_label": "bicicletas elétricas"
        }
    },
    es: {
        translation: {
            "app_title": "Encontrar Bicicleta Elétrica",
            "subtitle": "Seleccione una red para comenzar.",
            "search_placeholder": "Buscar ciudad o red...",
            "bikes": "Bicicletas",
            "slots": "Espacios",
            "start_over": "Reiniciar",
            "current_location": "Ubicación Actual",
            "near_me": "Cerca de Mí",
            "loading": "Cargando redes...",
            "hero_title_1": "Revolución",
            "hero_title_2": "Urbana",
            "hero_subtitle": "Conéctese con la forma más ecológica de moverse por su ciudad.",
            "future_of_mobility": "El Futuro de la Movilidad",
            "enter_app": "Explorar Mapa",
            "esg_title": "Sostenibilidad y ESG",
            "esg_desc": "Estamos comprometidos a reducir la huella de carbono promoviendo redes de bicicletas compartidas globalmente. Nuestro compromiso va más allá de proporcionar bicicletas. Colaboramos activamente con las ciudades para reducir la congestión del tráfico y las emisiones. Cada viaje cuenta para un planeta más verde.",
            "green_title": "Vehículos Verdes",
            "green_desc": "Consulta la disponibilidad informada por las redes de bicicletas, incluidos los conteos de e-bikes cuando estén disponibles.",
            "health_title": "Salud y Bienestar",
            "health_desc": "La movilidad activa mejora la salud física y el bienestar mental. El ciclismo reduce los niveles de estrés y mejora la salud cardiovascular. Integrar el transporte activo en su rutina es la forma más fácil de mantenerse en forma.",
            "community_title": "Conexión Comunitaria",
            "community_desc": "Explora datos de bicicletas compartidas en ciudades de todo el mundo y planifica tu próximo viaje con la disponibilidad actual.",
            "footer_links": "Enlaces Rápidos",
            "contact_title": "Contáctenos",
            "contact_name": "Nombre",
            "contact_email": "Correo",
            "contact_message": "Mensaje",
            "contact_submit": "Enviar Mensaje",
            "contact_success": "¡Mensaje enviado!",
            "modal_close": "Cerrar",
            "learn_more": "Saber Más",
            "stats_zero_emissions": "Cero Emisiones",
            "stats_global_tribe": "Tribu Global",
            "stats_tech_first": "Tecnología",
            "stats_vitality": "Vitalidad",
            "why_choose": "¿Por qué CityBikes?",
            "why_choose_subtitle": "Descubra los beneficios de unirse a la mayor red de movilidad urbana interconectada.",
            "contact_subtitle": "¿Listo para transformar su viaje diario? Contáctenos para soluciones empresariales o consultas generales.",
            "email_us_at": "Envíenos un correo",
            "footer_about": "Sobre Nosotros",
            "footer_cities": "Ciudades",
            "footer_api": "API",
            "footer_privacy": "Política de Privacidad",
            "footer_connect": "Conectar",
            "footer_all_rights": "Todos los derechos reservados.",
            "location_prompt": "¿Encontrar bicis cerca de ti?",
            "location_enable": "Activar ubicación",
             "location_denied_hint": "Ubicación desactivada — mostrando vista mundial."
             ,"location_active": "Ubicación activa"
             ,"app_explore_label": "Explorar CityBikes"
             ,"app_home_title": "Encuentra tu próximo viaje"
             ,"app_home_nearby": "Bicis cerca de ti"
             ,"app_home_subtitle": "Explora redes de bicicletas compartidas en ciudades de todo el mundo."
             ,"app_home_nearby_subtitle": "Disponibilidad en tiempo real de las redes cercanas."
             ,"app_favorites": "Tus favoritas"
             ,"app_suggested": "Redes sugeridas"
             ,"app_networks": "redes"
             ,"app_loading_networks": "Buscando redes de bicicletas..."
             ,"app_search_hint": "Busca una ciudad o red arriba para comenzar."
        }
    },
    fr: {
        translation: {
            "app_title": "Encontrar Bicicleta Elétrica",
            "subtitle": "Sélectionnez un réseau pour commencer.",
            "search_placeholder": "Rechercher une ville ou un réseau...",
            "bikes": "Vélos",
            "slots": "Places",
            "start_over": "Recommencer",
            "current_location": "Localisation Actuelle",
            "near_me": "Près de Moi",
            "loading": "Chargement des réseaux...",
            "hero_title_1": "Révolution",
            "hero_title_2": "Urbaine",
            "hero_subtitle": "Connectez-vous à la manière la plus écologique de vous déplacer dans votre ville.",
            "future_of_mobility": "L'Avenir de la Mobilité",
            "enter_app": "Explorer la Carte",
            "esg_title": "Durabilité & ESG",
            "esg_desc": "Nous nous engageons à réduire l'empreinte carbone en promouvant les réseaux de vélos en libre-service dans le monde entier. Notre engagement va au-delà de la simple fourniture de vélos. Nous travaillons activement avec les villes pour réduire les embouteillages et les émissions. Chaque trajet compte pour une planète plus verte.",
            "green_title": "Véhicules Verts",
            "green_desc": "Consultez les disponibilités communiquées par les réseaux de vélos, y compris les comptages de vélos électriques lorsqu'ils sont fournis.",
            "health_title": "Santé & Bien-être",
            "health_desc": "La mobilité active améliore la santé physique et le bien-être mental. Le cyclisme réduit le niveau de stress et améliore la santé cardiovasculaire. Intégrer les déplacements actifs à votre routine est le moyen le plus simple de rester en forme.",
            "community_title": "Connexion Communautaire",
            "community_desc": "Explorez les données de vélos en libre-service dans des villes du monde entier et planifiez votre prochain trajet avec les disponibilités actuelles.",
            "footer_links": "Liens Rapides",
            "contact_title": "Contactez-nous",
            "contact_name": "Nom",
            "contact_email": "E-mail",
            "contact_message": "Message",
            "contact_submit": "Envoyer le Message",
            "contact_success": "Message envoyé !",
            "modal_close": "Fermer",
            "learn_more": "En Savoir Plus",
            "stats_zero_emissions": "Zéro Émission",
            "stats_global_tribe": "Tribu Mondiale",
            "stats_tech_first": "Technologie",
            "stats_vitality": "Vitalité",
            "why_choose": "Pourquoi CityBikes ?",
            "why_choose_subtitle": "Découvrez les avantages de rejoindre le plus grand réseau de mobilité urbaine interconnecté.",
            "contact_subtitle": "Prêt à transformer votre trajet quotidien ? Contactez-nous pour des solutions d'entreprise ou des demandes générales.",
            "email_us_at": "Envoyez-nous un e-mail",
            "footer_about": "À Propos de Nous",
            "footer_cities": "Villes",
            "footer_api": "API",
            "footer_privacy": "Politique de Confidentialité",
            "footer_connect": "Se Connecter",
            "footer_all_rights": "Tous droits réservés.",
            "location_prompt": "Trouver des vélos près de vous ?",
            "location_enable": "Activer la localisation",
             "location_denied_hint": "Localisation désactivée — vue mondiale."
             ,"location_active": "Localisation active"
             ,"app_explore_label": "Explorer CityBikes"
             ,"app_home_title": "Trouvez votre prochain trajet"
             ,"app_home_nearby": "Vélos près de vous"
             ,"app_home_subtitle": "Explorez les réseaux de vélos en libre-service du monde entier."
             ,"app_home_nearby_subtitle": "Disponibilité en temps réel des réseaux autour de vous."
             ,"app_favorites": "Vos favoris"
             ,"app_suggested": "Réseaux suggérés"
             ,"app_networks": "réseaux"
             ,"app_loading_networks": "Recherche de réseaux de vélos..."
             ,"app_search_hint": "Recherchez une ville ou un réseau ci-dessus pour commencer."
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getSavedLanguage(),
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

const updateDocumentLanguage = (language = i18n.language) => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
};

updateDocumentLanguage();
i18n.on('languageChanged', updateDocumentLanguage);

export default i18n;
