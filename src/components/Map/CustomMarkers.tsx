import * as L from 'leaflet';

export const createCustomMarker = (color: string, iconHtml?: string) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="relative flex items-center justify-center w-7 h-7">
                <div class="absolute inset-0 rounded-full animate-ping opacity-20" style="background-color: ${color}"></div>
                <div class="absolute inset-0 rounded-full blur-md opacity-40" style="background-color: ${color}"></div>
                <div class="relative w-[18px] h-[18px] rounded-full border-2 border-white shadow-lg transition-transform hover:scale-125 flex items-center justify-center" style="background-color: ${color}">
                    ${iconHtml || ''}
                </div>
            </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
    });
};

export const bikeIcon = createCustomMarker('#22c55e');
const stationBikeGlyph = '<svg viewBox="0 0 24 24" width="12" height="12" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-3l-3 7h7l-3-7ZM8 17.5l4-8 3 8M11 9.5H8"/></svg>';
const availableStationIcon = createCustomMarker('#16a34a', stationBikeGlyph);
const lowStationIcon = createCustomMarker('#f59e0b', stationBikeGlyph);
const emptyStationIcon = createCustomMarker('#64748b', stationBikeGlyph);

export const stationIconForAvailability = (freeBikes: number) => {
    if (freeBikes <= 0) return emptyStationIcon;
    if (freeBikes <= 2) return lowStationIcon;
    return availableStationIcon;
};

export const evIcon = createCustomMarker('#06b6d4', '<svg viewBox="0 0 24 24" width="10" height="10" stroke="white" stroke-width="3" fill="none"><path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z"/></svg>');
export const poiIcon = createCustomMarker('#a855f7');
export const waterIcon = createCustomMarker('#3b82f6', '<svg viewBox="0 0 24 24" width="10" height="10" stroke="white" stroke-width="3" fill="none"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>');
export const toiletIcon = createCustomMarker('#f97316', '<svg viewBox="0 0 24 24" width="10" height="10" stroke="white" stroke-width="3" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>');
export const alertIcon = createCustomMarker('#ef4444');
