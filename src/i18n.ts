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
             ,"favorites_label": "Saved for later"
             ,"favorites_title": "Your favorites"
             ,"favorites_subtitle": "Your favorite networks and stations, ready to open on the map."
             ,"favorites_empty": "Save a network or station with the star to find it here."
             ,"favorites_legacy_station_notice": "{{count}} older station favorite(s) need to be opened once to add their details to this list."
             ,"open_favorite_network": "Open {{network}} on the map"
             ,"open_favorite_station": "Open {{station}} on the map"
             ,"expand_network_suggestions": "Show nearby networks"
             ,"collapse_network_suggestions": "Hide nearby networks"
             ,"expand_network_details": "Expand network details"
             ,"collapse_network_details": "Collapse network details"
             ,"air_quality": "Air quality"
             ,"wind": "Wind"
             ,"weather_clear_sky": "Clear sky"
             ,"weather_partly_cloudy": "Partly cloudy"
             ,"weather_foggy": "Foggy"
             ,"weather_drizzle": "Drizzle"
             ,"weather_rainy": "Rainy"
             ,"weather_snowy": "Snowy"
             ,"weather_rain_showers": "Rain showers"
             ,"weather_stormy": "Stormy"
             ,"air_quality_healthy": "Healthy"
             ,"air_quality_sensitive": "Sensitive groups"
             ,"air_quality_unhealthy": "Unhealthy"
             ,"air_quality_hazardous": "Hazardous"
             ,"station_availability_legend": "Station availability"
             ,"station_stock_available": "Available"
             ,"station_stock_low": "Low"
             ,"station_stock_empty": "Empty"
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
               ,"favorites_label": "Salvas para depois"
               ,"favorites_title": "Suas favoritas"
               ,"favorites_subtitle": "Suas redes e estações favoritas, prontas para abrir no mapa."
               ,"favorites_empty": "Toque na estrela de uma rede ou estação para encontrá-la aqui."
               ,"favorites_legacy_station_notice": "Abra {{count}} estação(ões) favorita(s) antiga(s) uma vez para adicionar os detalhes a esta lista."
               ,"open_favorite_network": "Abrir {{network}} no mapa"
               ,"open_favorite_station": "Abrir {{station}} no mapa"
               ,"expand_network_suggestions": "Mostrar redes próximas"
               ,"collapse_network_suggestions": "Ocultar redes próximas"
               ,"expand_network_details": "Expandir detalhes da rede"
               ,"collapse_network_details": "Recolher detalhes da rede"
               ,"air_quality": "Qualidade do ar"
               ,"wind": "Vento"
               ,"weather_clear_sky": "Céu limpo"
               ,"weather_partly_cloudy": "Parcialmente nublado"
               ,"weather_foggy": "Neblina"
               ,"weather_drizzle": "Garoa"
               ,"weather_rainy": "Chuvoso"
               ,"weather_snowy": "Neve"
               ,"weather_rain_showers": "Pancadas de chuva"
               ,"weather_stormy": "Tempestade"
               ,"air_quality_healthy": "Saudável"
               ,"air_quality_sensitive": "Atenção a grupos sensíveis"
               ,"air_quality_unhealthy": "Insalubre"
               ,"air_quality_hazardous": "Perigosa"
               ,"station_availability_legend": "Disponibilidade da estação"
               ,"station_stock_available": "Disponível"
               ,"station_stock_low": "Poucas"
               ,"station_stock_empty": "Vazia"
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
              ,"favorites_label": "Guardados"
              ,"favorites_title": "Tus favoritos"
              ,"favorites_subtitle": "Tus redes y estaciones favoritas, listas para abrir en el mapa."
              ,"favorites_empty": "Pulsa la estrella de una red o estación para encontrarla aquí."
              ,"favorites_legacy_station_notice": "Abre {{count}} estación(es) favorita(s) antigua(s) una vez para añadir sus datos a esta lista."
              ,"open_favorite_network": "Abrir {{network}} en el mapa"
              ,"open_favorite_station": "Abrir {{station}} en el mapa"
              ,"expand_network_suggestions": "Mostrar redes cercanas"
              ,"collapse_network_suggestions": "Ocultar redes cercanas"
              ,"expand_network_details": "Expandir detalles de la red"
              ,"collapse_network_details": "Contraer detalles de la red"
              ,"air_quality": "Calidad del aire"
              ,"wind": "Viento"
              ,"weather_clear_sky": "Cielo despejado"
              ,"weather_partly_cloudy": "Parcialmente nublado"
              ,"weather_foggy": "Niebla"
              ,"weather_drizzle": "Llovizna"
              ,"weather_rainy": "Lluvioso"
              ,"weather_snowy": "Nieve"
              ,"weather_rain_showers": "Chubascos"
              ,"weather_stormy": "Tormenta"
              ,"air_quality_healthy": "Saludable"
              ,"air_quality_sensitive": "Grupos sensibles"
              ,"air_quality_unhealthy": "Insalubre"
              ,"air_quality_hazardous": "Peligrosa"
              ,"station_availability_legend": "Disponibilidad de la estación"
              ,"station_stock_available": "Disponible"
              ,"station_stock_low": "Pocas"
              ,"station_stock_empty": "Vacía"
              ,"nav_map": "Mapa"
              ,"nav_theme": "Tema"
              ,"nav_favorites": "Favoritos"
              ,"nav_privacy": "Privacidad"
              ,"language_label": "Seleccionar idioma"
              ,"toggle_theme": "Cambiar tema"
              ,"mobile_navigation": "Navegación móvil"
              ,"loading_networks": "Cargando redes..."
              ,"clear_search": "Borrar búsqueda"
              ,"no_networks_found": "No se encontraron redes para {{query}}"
              ,"distance_away": "a {{distance}} km"
              ,"map_layers": "Capas del mapa"
              ,"enable": "Activar"
              ,"disable": "Desactivar"
              ,"smart_data_toggle": "{{action}} compartir coordenadas de Smart Data"
              ,"smart_data_on": "Datos activados"
              ,"smart_data_off": "Datos desactivados"
              ,"smart_data_title": "Smart Data usa el centro aproximado del mapa para consultar el tiempo y servicios cercanos"
              ,"smart_data_notice": "Se comparte el centro aproximado del mapa con los proveedores de datos."
              ,"smart_data_failed": "No se pudieron actualizar los datos inteligentes."
              ,"layer_ev": "Carga para VE"
              ,"layer_alerts": "Alertas"
              ,"layer_amenities": "Servicios"
              ,"find_nearby": "Buscar cerca de mí"
              ,"toggle_layer": "Alternar capa {{layer}}"
              ,"network_refresh_error": "No se pudieron actualizar las estaciones de esta red. Los datos pueden estar desactualizados."
              ,"network_list_error": "No se pudo cargar la lista de redes. Comprueba la conexión e inténtalo de nuevo."
              ,"retry": "Reintentar"
              ,"favorite_network": "Alternar red favorita"
              ,"favorite_station": "Alternar estación favorita"
              ,"view_analytics": "Ver estadísticas"
              ,"close_network": "Cerrar detalles de la red"
              ,"ebike_filter_show": "Mostrar estaciones con bicicletas eléctricas"
              ,"ebike_filter_active": "Mostrando bicicletas eléctricas"
              ,"route_loading": "Calculando la ruta ciclista…"
              ,"route_error_generic": "No se pudo calcular la ruta. Comprueba la conexión e inténtalo de nuevo."
              ,"route_title": "Ruta ciclista"
              ,"route_summary": "Resumen de la ruta ciclista"
              ,"route_to": "Hacia {{station}}"
              ,"route_distance": "{{distance}} km"
              ,"route_minutes": "{{minutes}} min"
              ,"plan_route_accessibility": "Planificar una ruta ciclista hasta {{station}}"
              ,"dismiss_message": "Cerrar aviso"
              ,"route_clear": "Borrar ruta"
              ,"route_preview_safety": "Vista previa de OpenStreetMap. Sigue las señales y normas de tráfico locales."
              ,"plan_route": "Planificar ruta"
              ,"route_shown": "Ruta mostrada"
              ,"use_location": "Usar ubicación"
              ,"route_location_denied": "La ubicación está desactivada. Permite el acceso en Ajustes para planificar una ruta."
              ,"route_location_hint": "Usa tu ubicación para ver una ruta dentro de la aplicación."
              ,"finding_location": "Buscando tu ubicación…"
              ,"share_station": "Compartir {{station}}"
              ,"share_station_title": "Compartir estación de bicicletas"
              ,"share_station_text": "{{station}} — {{city}}. {{bikes}} bicicletas disponibles; {{docks}} plazas libres."
              ,"availability_not_reported": "disponibilidad no indicada"
              ,"share_feedback": "Detalles de la estación compartidos."
              ,"share_copied": "Detalles de la estación copiados."
              ,"share_unavailable": "No se puede compartir en este dispositivo."
              ,"share_failed": "No se pudo compartir esta estación."
              ,"station_freshness": "Estación {{freshness}}"
              ,"your_location": "Tu ubicación actual"
              ,"station_alt": "Estación {{station}}, {{count}} bicicletas disponibles"
              ,"network_alt": "Red de bicicletas {{network}}"
              ,"network_marker_title": "{{network}}, {{city}}"
              ,"station_marker_title": "{{station}}: {{count}} bicicletas disponibles"
              ,"cluster_alt": "Grupo con {{count}} redes de bicicletas"
              ,"ebike_availability_reported": "Disponibilidad de bicicletas eléctricas indicada"
              ,"ebikes_label": "bicicletas eléctricas"
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
              ,"favorites_label": "Enregistrés"
              ,"favorites_title": "Vos favoris"
              ,"favorites_subtitle": "Vos réseaux et stations favoris, prêts à ouvrir sur la carte."
              ,"favorites_empty": "Touchez l’étoile d’un réseau ou d’une station pour le retrouver ici."
              ,"favorites_legacy_station_notice": "Ouvrez une fois {{count}} ancienne(s) station(s) favorite(s) pour ajouter leurs détails à cette liste."
              ,"open_favorite_network": "Ouvrir {{network}} sur la carte"
              ,"open_favorite_station": "Ouvrir {{station}} sur la carte"
              ,"expand_network_suggestions": "Afficher les réseaux proches"
              ,"collapse_network_suggestions": "Masquer les réseaux proches"
              ,"expand_network_details": "Développer les détails du réseau"
              ,"collapse_network_details": "Réduire les détails du réseau"
              ,"air_quality": "Qualité de l’air"
              ,"wind": "Vent"
              ,"weather_clear_sky": "Ciel dégagé"
              ,"weather_partly_cloudy": "Partiellement nuageux"
              ,"weather_foggy": "Brouillard"
              ,"weather_drizzle": "Bruine"
              ,"weather_rainy": "Pluvieux"
              ,"weather_snowy": "Neige"
              ,"weather_rain_showers": "Averses"
              ,"weather_stormy": "Orageux"
              ,"air_quality_healthy": "Sain"
              ,"air_quality_sensitive": "Groupes sensibles"
              ,"air_quality_unhealthy": "Mauvais pour la santé"
              ,"air_quality_hazardous": "Dangereux"
              ,"station_availability_legend": "Disponibilité de la station"
              ,"station_stock_available": "Disponible"
              ,"station_stock_low": "Peu de vélos"
              ,"station_stock_empty": "Vide"
              ,"nav_map": "Carte"
              ,"nav_theme": "Thème"
              ,"nav_favorites": "Favoris"
              ,"nav_privacy": "Confidentialité"
              ,"language_label": "Choisir la langue"
              ,"toggle_theme": "Changer le thème"
              ,"mobile_navigation": "Navigation mobile"
              ,"loading_networks": "Chargement des réseaux..."
              ,"clear_search": "Effacer la recherche"
              ,"no_networks_found": "Aucun réseau trouvé pour {{query}}"
              ,"distance_away": "à {{distance}} km"
              ,"map_layers": "Couches de la carte"
              ,"enable": "Activer"
              ,"disable": "Désactiver"
              ,"smart_data_toggle": "{{action}} le partage des coordonnées Smart Data"
              ,"smart_data_on": "Données activées"
              ,"smart_data_off": "Données désactivées"
              ,"smart_data_title": "Smart Data utilise le centre approximatif de la carte pour la météo et les services proches"
              ,"smart_data_notice": "Le centre approximatif de la carte est partagé avec les fournisseurs de données."
              ,"smart_data_failed": "Échec de la mise à jour des données intelligentes."
              ,"layer_ev": "Recharge électrique"
              ,"layer_alerts": "Alertes"
              ,"layer_amenities": "Services"
              ,"find_nearby": "Me localiser"
              ,"toggle_layer": "Activer/désactiver la couche {{layer}}"
              ,"network_refresh_error": "Impossible d’actualiser les stations de ce réseau. Les données peuvent être obsolètes."
              ,"network_list_error": "Impossible de charger les réseaux. Vérifiez votre connexion et réessayez."
              ,"retry": "Réessayer"
              ,"favorite_network": "Ajouter ou retirer le réseau des favoris"
              ,"favorite_station": "Ajouter ou retirer la station des favoris"
              ,"view_analytics": "Voir les statistiques"
              ,"close_network": "Fermer les détails du réseau"
              ,"ebike_filter_show": "Afficher les stations avec vélos électriques"
              ,"ebike_filter_active": "Vélos électriques affichés"
              ,"route_loading": "Calcul de l’itinéraire cyclable…"
              ,"route_error_generic": "Impossible de calculer l’itinéraire. Vérifiez votre connexion et réessayez."
              ,"route_title": "Itinéraire cyclable"
              ,"route_summary": "Résumé de l’itinéraire cyclable"
              ,"route_to": "Vers {{station}}"
              ,"route_distance": "{{distance}} km"
              ,"route_minutes": "{{minutes}} min"
              ,"plan_route_accessibility": "Calculer un itinéraire cyclable vers {{station}}"
              ,"dismiss_message": "Fermer le message"
              ,"route_clear": "Effacer l’itinéraire"
              ,"route_preview_safety": "Aperçu OpenStreetMap. Respectez la signalisation et le code de la route."
              ,"plan_route": "Calculer l’itinéraire"
              ,"route_shown": "Itinéraire affiché"
              ,"use_location": "Utiliser la position"
              ,"route_location_denied": "La localisation est désactivée. Autorisez l’accès dans les réglages pour calculer un itinéraire."
              ,"route_location_hint": "Utilisez votre position pour afficher un itinéraire dans l’application."
              ,"finding_location": "Recherche de votre position…"
              ,"share_station": "Partager {{station}}"
              ,"share_station_title": "Partager une station de vélos"
              ,"share_station_text": "{{station}} — {{city}}. {{bikes}} vélos disponibles ; {{docks}} places libres."
              ,"availability_not_reported": "disponibilité non indiquée"
              ,"share_feedback": "Détails de la station partagés."
              ,"share_copied": "Détails de la station copiés."
              ,"share_unavailable": "Le partage n’est pas disponible sur cet appareil."
              ,"share_failed": "Impossible de partager cette station."
              ,"station_freshness": "Station {{freshness}}"
              ,"your_location": "Votre position actuelle"
              ,"station_alt": "Station {{station}}, {{count}} vélos disponibles"
              ,"network_alt": "Réseau de vélos {{network}}"
              ,"network_marker_title": "{{network}}, {{city}}"
              ,"station_marker_title": "{{station}} : {{count}} vélos disponibles"
              ,"cluster_alt": "Groupe de {{count}} réseaux de vélos"
              ,"ebike_availability_reported": "Disponibilité des vélos électriques indiquée"
              ,"ebikes_label": "vélos électriques"
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
