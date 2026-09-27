import { describe, expect, it } from 'vitest';
import { favoriteStationKey } from './favorites';

describe('favorite station identity', () => {
    it('keeps stations with the same provider ID distinct across networks', () => {
        expect(favoriteStationKey('network-one', 'station-1'))
            .not.toBe(favoriteStationKey('network-two', 'station-1'));
    });
});
