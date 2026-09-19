import React, { useEffect, useMemo, useRef } from 'react';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { useCityBikes } from '../../context/CityBikesContext';
import { X, TrendingUp, Activity, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
    onClose: () => void;
}


export const SmartDashboard: React.FC<DashboardProps> = ({ onClose }) => {
    const { selectedNetwork, weather, airQuality } = useCityBikes();
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
    const pieData = [
        { name: 'Available Bikes', value: totalBikes },
        { name: 'Empty Slots', value: totalSlots },
    ];

    // Data for Top 5 Stations Bar Chart
    const topStations = [...(selectedNetwork?.stations ?? [])]
        .sort((a, b) => b.free_bikes - a.free_bikes)
        .slice(0, 5)
        .map(s => ({
            name: s.name.length > 15 ? s.name.substring(0, 12) + '...' : s.name,
            bikes: s.free_bikes
        }));

    // Demo trend data — deterministic, labelled as demonstration
    const trendData = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
        time: `${12 + i}:00`,
        bikes: Math.round(totalBikes * (0.85 + ((i % 3) / 10))),
        slots: Math.round(totalSlots * (0.85 + ((i % 3) / 10))),
    })), [totalBikes, totalSlots]);

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
                        {selectedNetwork.name} Analytics
                    </h2>
                     <p className="hidden md:block text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">Smart City Insights & Real-time Trends</p>
                </div>
                <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    aria-label="Close analytics"
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
                        <div className="text-xs font-black text-cyan-500 uppercase tracking-widest mb-2">Total Capacity</div>
                        <div className="text-5xl font-black text-white">{totalBikes + totalSlots}</div>
                        <div className="text-sm text-slate-500 mt-2 font-bold">Total docking points in network</div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/20 rounded-xl text-green-500">
                                    <PieIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-tight">Active Bikes</div>
                                    <div className="text-xl font-black text-white">{totalBikes}</div>
                                </div>
                            </div>
                            <div className="text-green-500 font-black text-sm">{totalBikes + totalSlots > 0 ? `+${Math.round((totalBikes / (totalBikes + totalSlots)) * 100)}%` : '-'}</div>
                        </div>

                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-tight">Empty Slots</div>
                                    <div className="text-xl font-black text-white">{totalSlots}</div>
                                </div>
                            </div>
                            <div className="text-blue-500 font-black text-sm">{totalBikes + totalSlots > 0 ? `${Math.round((totalSlots / (totalBikes + totalSlots)) * 100)}%` : '-'}</div>
                        </div>
                    </div>

                    {weather && (
                        <div className="p-6 glass-premium !bg-slate-900/80 rounded-3xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full" />
                            <div className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-4">Current Conditions</div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-white">{weather.temperature}°C</span>
                                <span className="text-slate-400 font-bold mb-1">{weather.description}</span>
                            </div>
                            {airQuality && (
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Air Quality Index</div>
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
                                <PieIcon className="w-4 h-4" /> Usage Distribution
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
                                <BarChart3 className="w-4 h-4" /> Top Available Stations
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
                                        <Bar dataKey="bikes" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Area Chart: Trend */}
                    <div className="p-4 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] h-[300px] md:h-[350px] flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> Demo Trend
                            </h3>
<div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-cyan-500" />
                                        <span className="text-[10px] font-black text-slate-500 uppercase">Demo Trend</span>
                                    </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorBikes" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="bikes"
                                        stroke="#06b6d4"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorBikes)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="hidden md:block p-6 bg-white/5 border-t border-white/5 text-center">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                    Powered by Open Data Networks
                </p>
            </div>
        </motion.div>
    );
};
