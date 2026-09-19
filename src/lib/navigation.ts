import type { Location } from '../types';

export function buildCyclingDirectionsUrl(from: Location, toLat: number, toLon: number): string {
    const params = new URLSearchParams({
        api: '1',
        origin: `${from.latitude},${from.longitude}`,
        destination: `${toLat},${toLon}`,
        travelmode: 'bicycling',
    });
    return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function formatFreshness(timestamp: number, now = Date.now()): string {
    if (!timestamp) return 'Not updated yet';
    const elapsedMinutes = Math.max(0, Math.floor((now - timestamp) / 60_000));
    if (elapsedMinutes < 1) return 'Updated just now';
    if (elapsedMinutes === 1) return 'Updated 1 minute ago';
    if (elapsedMinutes < 60) return `Updated ${elapsedMinutes} minutes ago`;
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    return `Updated ${elapsedHours} ${elapsedHours === 1 ? 'hour' : 'hours'} ago`;
}
