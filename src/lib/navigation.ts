type SupportedLanguage = 'en' | 'pt' | 'es' | 'fr';

export function parseDataTimestamp(value: string | number | null | undefined): number | null {
    if (typeof value === 'number') {
        if (!Number.isFinite(value) || value <= 0) return null;
        return value < 1_000_000_000_000 ? value * 1000 : value;
    }
    if (!value) return null;

    const normalized = value.trim().replace(/([+-]\d{2}:\d{2})Z$/, '$1');
    const withTimezone = /(?:Z|[+-]\d{2}:\d{2})$/i.test(normalized) ? normalized : `${normalized}Z`;
    const parsed = Date.parse(withTimezone);
    return Number.isFinite(parsed) ? parsed : null;
}

const freshnessCopy: Record<SupportedLanguage, {
    notUpdated: string;
    justNow: string;
    oneMinute: string;
    minutes: (count: number) => string;
    hours: (count: number) => string;
}> = {
    en: {
        notUpdated: 'Not updated yet',
        justNow: 'Updated just now',
        oneMinute: 'Updated 1 minute ago',
        minutes: (count) => `Updated ${count} minutes ago`,
        hours: (count) => `Updated ${count} ${count === 1 ? 'hour' : 'hours'} ago`,
    },
    pt: {
        notUpdated: 'Ainda não atualizado',
        justNow: 'Atualizado agora',
        oneMinute: 'Atualizado há 1 minuto',
        minutes: (count) => `Atualizado há ${count} minutos`,
        hours: (count) => `Atualizado há ${count} ${count === 1 ? 'hora' : 'horas'}`,
    },
    es: {
        notUpdated: 'Aún no actualizado',
        justNow: 'Actualizado ahora',
        oneMinute: 'Actualizado hace 1 minuto',
        minutes: (count) => `Actualizado hace ${count} minutos`,
        hours: (count) => `Actualizado hace ${count} ${count === 1 ? 'hora' : 'horas'}`,
    },
    fr: {
        notUpdated: 'Pas encore mis à jour',
        justNow: 'Mis à jour à l’instant',
        oneMinute: 'Mis à jour il y a 1 minute',
        minutes: (count) => `Mis à jour il y a ${count} minutes`,
        hours: (count) => `Mis à jour il y a ${count} heures`,
    },
};

function copyFor(language: string) {
    const key = language.split('-')[0] as SupportedLanguage;
    return freshnessCopy[key] ?? freshnessCopy.en;
}

export function formatFreshness(timestamp: number, now = Date.now(), language = 'en'): string {
    const copy = copyFor(language);
    if (!timestamp) return copy.notUpdated;
    const elapsedMinutes = Math.max(0, Math.floor((now - timestamp) / 60_000));
    if (elapsedMinutes < 1) return copy.justNow;
    if (elapsedMinutes === 1) return copy.oneMinute;
    if (elapsedMinutes < 60) return copy.minutes(elapsedMinutes);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    return copy.hours(elapsedHours);
}

export function formatDistanceKm(distanceKm: number, language = 'en'): string {
    const languageCode = language.startsWith('pt') ? 'pt-BR' : language;
    return new Intl.NumberFormat(languageCode, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(distanceKm);
}
