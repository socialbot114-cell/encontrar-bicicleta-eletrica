import { describe, expect, it } from 'vitest';
import { buildCyclingDirectionsUrl, formatFreshness } from './navigation';

describe('cycling navigation', () => {
    it('creates an HTTPS cycling handoff without an OSRM route', () => {
        const url = new URL(buildCyclingDirectionsUrl(
            { latitude: 51.5, longitude: -0.12, city: '', country: '' },
            51.51,
            -0.1,
        ));

        expect(url.protocol).toBe('https:');
        expect(url.hostname).toBe('www.google.com');
        expect(url.searchParams.get('travelmode')).toBe('bicycling');
        expect(url.searchParams.get('origin')).toBe('51.5,-0.12');
        expect(url.href).not.toContain('osrm');
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
