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
             ,"app_home_title": "Encontre sua próxima viagem"
             ,"app_home_nearby": "Bikes perto de você"
             ,"app_home_subtitle": "Explore redes de bicicletas compartilhadas em cidades do mundo todo."
             ,"app_home_nearby_subtitle": "Disponibilidade ao vivo nas redes ao seu redor."
             ,"app_favorites": "Suas favoritas"
             ,"app_suggested": "Redes sugeridas"
             ,"app_networks": "redes"
             ,"app_loading_networks": "Encontrando redes de bicicletas..."
             ,"app_search_hint": "Busque uma cidade ou rede acima para começar."
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

export default i18n;
