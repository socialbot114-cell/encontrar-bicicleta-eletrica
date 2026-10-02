import React, { useEffect, useRef } from 'react';
import {
    ResponsiveContainer, XAxis, YAxis, CartesianGrid,
    Tooltip, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { useCityBikes } from '../../context/CityBikesContext';
import { X, Bike, Activity, PieChart as PieIcon, BarChart3, ParkingSquare, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
    onClose: () => void;
}


export const SmartDashboard: React.FC<DashboardProps> = ({ onClose }) => {
    const { selectedNetwork, weather, airQuality } = useCityBikes();
    const { t } = useTranslation();
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== 'Tab') return;
        const dialog = event.currentTarget;
        const focusable = dialog.querySelectorAll<HTMLElement>('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        closeButtonRef.current?.focus();
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    // Data for Station Availability Pie Chart
    const totalBikes = selectedNetwork?.stations.reduce((acc, s) => acc + s.free_bikes, 0) ?? 0;
    const totalSlots = selectedNetwork?.stations.reduce((acc, s) => acc + (s.empty_slots || 0), 0) ?? 0;
    const totalCapacity = totalBikes + totalSlots;
    const percentOf = (value: number) => (totalCapacity > 0 ? Math.round((value / totalCapacity) * 100) : null);
    const bikesPercent = percentOf(totalBikes);
    const slotsPercent = percentOf(totalSlots);
    const pieData = [
        { name: t('dashboard_bikes'), value: totalBikes },
        { name: t('dashboard_docks'), value: totalSlots },
    ];

    // Station status from live data: stations reporting no free docks count as full.
    const stations = selectedNetwork?.stations ?? [];
    const stationStatus = [
        { key: 'with_bikes', label: t('dashboard_status_with_bikes'), count: stations.filter((s) => s.free_bikes > 0).length, color: 'bg-emerald-500' },
        { key: 'empty', label: t('dashboard_status_empty'), count: stations.filter((s) => s.free_bikes === 0).length, color: 'bg-rose-500' },
        { key: 'full', label: t('dashboard_status_full'), count: stations.filter((s) => s.empty_slots === 0).length, color: 'bg-amber-500' },
    ];

    // Data for Top 5 Stations Bar Chart
    const topStations = [...(selectedNetwork?.stations ?? [])]
        .sort((a, b) => b.free_bikes - a.free_bikes)
        .slice(0, 5)
        .map(s => ({
            name: s.name.length > 15 ? s.name.substring(0, 12) + '...' : s.name,
            bikes: s.free_bikes
        }));

    if (!selectedNetwork) return null;

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-title"
            onKeyDown={trapFocus}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 md:inset-10 z-[6000] rounded-none bg-slate-950 text-white md:rounded-[2rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
        >
            {/* Header */}
            <div className="pt-[calc(1rem+env(safe-area-inset-top))] px-4 pr-8 pb-4 md:p-8 border-b border-white/5 flex items-center justify-between gap-3">
                <div>
                        <h2 id="dashboard-title" className="min-w-0 truncate text-xl md:text-3xl font-black text-white tracking-tighter flex items-center gap-2 md:gap-3">
                        <Activity className="text-cyan-400 w-6 h-6 md:w-8 md:h-8 shrink-0" />
                        {t('dashboard_title', { network: selectedNetwork.name })}
                    </h2>
                     <p className="hidden md:block text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">{t('dashboard_subtitle')}</p>
                </div>
                <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    aria-label={t('dashboard_close')}
                    className="flex h-11 w-11 shrink-0 items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group"
                >
                    <X className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">

                {/* Column 1: Overview Stats */}
                <div className="space-y-6">
                    <div className="glass-premium !bg-slate-900/80 p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-cyan-500/10 to-transparent">
                        <div className="text-xs font-black text-cyan-500 uppercase tracking-widest mb-2">{t('dashboard_capacity')}</div>
                        <div className="text-5xl font-black text-white">{totalCapacity}</div>
                        <div className="text-sm text-slate-400 mt-2 font-bold">{t('dashboard_capacity_hint')}</div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/20 rounded-xl text-green-500">
                                    <Bike className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-tight">{t('dashboard_bikes')}</div>
                                    <div className="text-xl font-black text-white">{totalBikes}</div>
                                </div>
                            </div>
                            <div className="text-right text-green-500 font-black text-xs">{bikesPercent === null ? '–' : t('dashboard_share', { percent: bikesPercent })}</div>
                        </div>

                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
                                    <ParkingSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-tight">{t('dashboard_docks')}</div>
                                    <div className="text-xl font-black text-white">{totalSlots}</div>
                                </div>
                            </div>
                            <div className="text-right text-blue-400 font-black text-xs">{slotsPercent === null ? '–' : t('dashboard_share', { percent: slotsPercent })}</div>
                        </div>
                    </div>

                    {weather && (
                        <div className="p-6 glass-premium !bg-slate-900/80 rounded-3xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full" />
                            <div className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-4">{t('dashboard_conditions')}</div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-white">{weather.temperature}°C</span>
                                <span className="text-slate-400 font-bold mb-1">{weather.description}</span>
                            </div>
                            {airQuality && (
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('dashboard_air_quality')}</div>
                                    <div className="text-lg font-black text-cyan-400">{airQuality.label} ({airQuality.aqi})</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Column 2: Charts */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Pie Chart: Distribution */}
                        <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-3xl h-[260px] md:h-[300px] flex flex-col">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <PieIcon className="w-4 h-4" /> {t('dashboard_distribution')}
                            </h3>
                            <div className="flex-1">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={8}
                                            dataKey="value"
                                        >
                                            <Cell fill="#06b6d4" />
                                            <Cell fill="#1e293b" />
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Bar Chart: Top Stations */}
                        <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-3xl h-[260px] md:h-[300px] flex flex-col">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4" /> {t('dashboard_top_stations')}
                            </h3>
                            <div className="flex-1">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={topStations}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
                                        />
                                        <Bar dataKey="bikes" name={t('dashboard_bikes')} fill="#06b6d4" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Station status from live data */}
                    <div className="p-4 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem]">
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> {t('dashboard_station_status')}
                            </h3>
                            <span className="text-xs font-bold text-slate-400">{t('dashboard_status_total', { count: stations.length })}</span>
                        </div>
                        <div className="space-y-4">
                            {stationStatus.map((item) => (
                                <div key={item.key}>
                                    <div className="mb-2 flex items-center justify-between text-sm font-bold">
                                        <span className="text-slate-300">{item.label}</span>
                                        <span className="text-white">{item.count}</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                                        <div
                                            className={`h-full rounded-full ${item.color}`}
                                            style={{ width: `${stations.length ? (item.count / stations.length) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:p-6 bg-white/5 border-t border-white/5 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    {t('dashboard_source')}
                </p>
            </div>
        </motion.div>
    );
};
