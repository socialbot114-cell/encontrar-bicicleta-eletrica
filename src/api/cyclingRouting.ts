import type { Location } from '../types';

export interface CyclingRoute {
    coordinates: [number, number][];
    distanceMeters: number;
    durationSeconds: number;
}

const ROUTING_URL = 'https://routing.openstreetmap.de/routed-bike/route/v1/driving';

export async function fetchCyclingRoute(from: Location, to: Pick<Location, 'latitude' | 'longitude'>): Promise<CyclingRoute> {
    const coordinates = [from, to].map(({ latitude, longitude }) => `${longitude},${latitude}`).join(';');
    const url = new URL(`${ROUTING_URL}/${coordinates}`);
    url.searchParams.set('overview', 'full');
    url.searchParams.set('geometries', 'geojson');
    url.searchParams.set('steps', 'false');
    url.searchParams.set('alternatives', 'false');

    const controller = new AbortController();
    const timeout = globalThis.setTimeout(() => controller.abort(), 15_000);

    try {
        const response = await fetch(url, {
            headers: { Accept: 'application/json' },
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(response.status === 429
                ? 'The cycling route service is busy. Please try again shortly.'
                : `Cycling route request failed (${response.status}).`);
        }

        const data = await response.json() as {
            code?: string;
            routes?: Array<{
                distance?: number;
                duration?: number;
                geometry?: { coordinates?: unknown };
            }>;
        };
        const route = data.routes?.[0];
        const rawCoordinates = route?.geometry?.coordinates;

        if (data.code !== 'Ok' || !route || !Array.isArray(rawCoordinates)) {
            throw new Error('No cycling route was found for this station.');
        }

        const routeCoordinates: [number, number][] = rawCoordinates.flatMap((point) => {
            if (!Array.isArray(point) || point.length < 2) return [];
            const [longitude, latitude] = point;
            if (typeof longitude !== 'number' || typeof latitude !== 'number'
                || !Number.isFinite(longitude) || !Number.isFinite(latitude)) return [];
            return [[latitude, longitude]];
        });

        if (routeCoordinates.length < 2 || !Number.isFinite(route.distance) || !Number.isFinite(route.duration)) {
            throw new Error('The cycling route service returned incomplete directions.');
        }

        return {
            coordinates: routeCoordinates,
            distanceMeters: route.distance!,
            durationSeconds: route.duration!,
        };
    } catch (error) {
        if (controller.signal.aborted) {
            throw new Error('Cycling route request timed out. Check your connection and try again.');
        }
        throw error;
    } finally {
        globalThis.clearTimeout(timeout);
    }
}
