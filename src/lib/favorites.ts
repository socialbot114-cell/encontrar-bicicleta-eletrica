export function favoriteStationKey(networkId: string, stationId: string): string {
    return `${networkId}::${stationId}`;
}
