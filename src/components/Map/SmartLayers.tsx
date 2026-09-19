import React from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import { useCityBikes } from '../../context/CityBikesContext';
import { evIcon, waterIcon, toiletIcon, alertIcon, createCustomMarker } from './CustomMarkers';
import { Zap, AlertTriangle, Droplet, User } from 'lucide-react';

export const SmartLayers: React.FC = () => {
    const { earthquakes, evStations, pois, smartLayers } = useCityBikes();

    return (
        <>
            {/* EV Stations Layer */}
            {smartLayers.evStations && evStations.map(station => (
                <Marker
                    key={`ev-${station.id}`}
                    position={[station.latitude, station.longitude]}
                    icon={evIcon}
                >
                    <Popup className="premium-popup">
                        <div className="p-2 min-w-[150px]">
                            <h3 className="text-emerald-400 font-bold flex items-center gap-2">
                                <Zap className="w-4 h-4" /> {station.title}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{station.operator || 'Independent Operator'}</p>
                            <div className="mt-3 space-y-1">
                                {station.connections.map((c, i) => (
                                    <div key={i} className="text-[10px] bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-2 py-1.5 flex justify-between items-center">
                                        <span className="text-slate-600 dark:text-slate-300 font-medium">{c.type}</span>
                                        <span className="font-black text-emerald-500">{c.powerKW}kW</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* Earthquakes Layer */}
            {smartLayers.earthquakes && earthquakes.map(quake => (
                <React.Fragment key={quake.id}>
                    <Marker
                        position={[quake.latitude, quake.longitude]}
                        icon={createCustomMarker(quake.magnitude > 5 ? '#ef4444' : '#f97316', `<span class="text-[8px] font-black text-white">${quake.magnitude}</span>`)}
                    >
                        <Popup className="premium-popup">
                            <div className="p-2">
                                <h3 className="text-red-400 font-bold flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> Magnitude {quake.magnitude}
                                </h3>
                                <p className="text-xs text-slate-300 mt-1">{quake.place}</p>
                                <p className="text-[10px] text-slate-500 mt-1">{new Date(quake.time).toLocaleString()}</p>
                            </div>
                        </Popup>
                    </Marker>
                    <Circle
                        center={[quake.latitude, quake.longitude]}
                        radius={quake.magnitude * 10000}
                        pathOptions={{
                            color: quake.magnitude > 5 ? '#ef4444' : '#f97316',
                            fillColor: quake.magnitude > 5 ? '#ef4444' : '#f97316',
                            fillOpacity: 0.1,
                            weight: 1
                        }}
                    />
                </React.Fragment>
            ))}

            {/* POIs Layer */}
            {smartLayers.pois && pois.map(poi => (
                <Marker
                    key={`poi-${poi.id}`}
                    position={[poi.latitude, poi.longitude]}
                    icon={poi.type === 'water' ? waterIcon : (poi.type === 'toilet' ? toiletIcon : alertIcon)}
                >
                    <Popup className="premium-popup">
                        <div className="p-2">
                            <h3 className="text-slate-800 dark:text-white font-bold flex items-center gap-2 capitalize">
                                {poi.type === 'water' ? <Droplet className="w-4 h-4 text-blue-400" /> : <User className="w-4 h-4 text-orange-400" />}
                                {poi.type}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">{poi.name || 'Public Facility'}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                                {Object.entries(poi.tags).slice(0, 3).map(([k, v]) => (
                                    <span key={k} className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded uppercase font-bold">{k}: {v}</span>
                                ))}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};
