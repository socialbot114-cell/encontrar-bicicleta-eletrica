import { describe, expect, it } from 'vitest';
import { vi } from 'vitest';
import { fetchCyclingRoute } from '../api/cyclingRouting';
import { formatFreshness } from './navigation';

describe('in-app cycling routes', () => {
    it('requests a bicycle route and converts GeoJSON coordinates for the map', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                code: 'Ok',
                routes: [{
                    distance: 1180.8,
                    duration: 316.9,
                    geometry: { coordinates: [[-122.4194, 37.7749], [-122.41, 37.78]] },
                }],
            }),
        });
        vi.stubGlobal('fetch', fetchMock);

        try {
            const route = await fetchCyclingRoute(
                { latitude: 37.7749, longitude: -122.4194, city: '', country: '' },
                { latitude: 37.78, longitude: -122.41 },
            );
            const url = new URL(fetchMock.mock.calls[0][0] as string);

            expect(url.hostname).toBe('routing.openstreetmap.de');
            expect(url.pathname).toContain('/routed-bike/route/v1/driving/-122.4194,37.7749;-122.41,37.78');
            expect(url.searchParams.get('geometries')).toBe('geojson');
            expect(route.coordinates).toEqual([[37.7749, -122.4194], [37.78, -122.41]]);
            expect(route.distanceMeters).toBe(1180.8);
            expect(route.durationSeconds).toBe(316.9);
        } finally {
            vi.unstubAllGlobals();
        }
    });

    it('reports unavailable route responses clearly', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ code: 'NoRoute', routes: [] }),
        }));

        try {
            await expect(fetchCyclingRoute(
                { latitude: 37.7749, longitude: -122.4194, city: '', country: '' },
                { latitude: 37.78, longitude: -122.41 },
            )).rejects.toThrow('No cycling route was found');
        } finally {
            vi.unstubAllGlobals();
        }
    });
});

describe('freshness labels', () => {
    const now = new Date('2026-09-19T12:00:00Z').getTime();

    it('reports recent and older updates deterministically', () => {
        expect(formatFreshness(now - 30_000, now)).toBe('Updated just now');
        expect(formatFreshness(now - 5 * 60_000, now)).toBe('Updated 5 minutes ago');
        expect(formatFreshness(now - 2 * 60 * 60_000, now)).toBe('Updated 2 hours ago');
    });
});
