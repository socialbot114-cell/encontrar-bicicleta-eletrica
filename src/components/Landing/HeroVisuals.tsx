import { motion } from 'framer-motion';
import { ArrowUpRight, Bike, LocateFixed, Navigation, Sparkles } from 'lucide-react';

export const HeroVisuals = () => {
    return (
        <div className="lg:w-[54%] relative w-full">
            <div className="absolute -inset-12 bg-gradient-to-br from-emerald-400/20 via-teal-400/10 to-sky-500/20 rounded-[4rem] blur-[80px]" />
            <motion.div
                initial={{ opacity: 0, y: 24, rotate: 1 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative z-10 overflow-hidden rounded-[2rem] border border-slate-200/80 dark:border-white/10 bg-[#071923] shadow-2xl shadow-slate-900/20"
            >
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(84, 211, 140, .12) 1px, transparent 1px), linear-gradient(90deg, rgba(84, 211, 140, .12) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(17,157,139,.45),transparent_52%)]" />

                <div className="relative flex items-center justify-between px-5 pt-5 text-white">
                    <div className="flex items-center gap-2">
                        <img src="/branding/citybikes-logo.svg" alt="" className="h-8 w-8 rounded-lg" />
                        <span className="text-sm font-bold tracking-tight">CityBikes</span>
                    </div>
                    <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-200">Live network</span>
                </div>

                <div className="relative mx-5 mt-5 h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a2d35]">
                    <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'linear-gradient(28deg, transparent 48%, rgba(174, 244, 190, .35) 49%, transparent 50%), linear-gradient(118deg, transparent 46%, rgba(174, 244, 190, .25) 47%, transparent 48%)', backgroundSize: '110px 90px' }} />
                    <div className="absolute left-[18%] top-[20%] h-40 w-40 rounded-full border border-emerald-200/20 bg-emerald-300/10" />
                    <div className="absolute right-[8%] bottom-[12%] h-48 w-48 rounded-full border border-sky-200/20 bg-sky-300/10" />
                    <div className="absolute left-[14%] top-[58%] h-1 w-[72%] rotate-[-18deg] rounded-full bg-gradient-to-r from-emerald-300 via-lime-300 to-sky-300 shadow-[0_0_18px_rgba(102,230,166,.8)]" />
                    {[['20%', '28%'], ['48%', '21%'], ['68%', '57%'], ['30%', '70%'], ['78%', '35%']].map(([left, top]) => (
                        <div key={`${left}-${top}`} className="absolute flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white/70 bg-emerald-500 shadow-lg shadow-emerald-950/50" style={{ left, top }}>
                            <Bike className="h-4 w-4 text-white" />
                        </div>
                    ))}
                    <div className="absolute left-[47%] top-[42%] flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-sky-500 shadow-[0_0_0_12px_rgba(56,189,248,.18),0_8px_20px_rgba(2,132,199,.45)]">
                        <LocateFixed className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-[#08222b]/85 px-3 py-2 text-white backdrop-blur-md">
                        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-200">Nearby bikes</div>
                        <div className="mt-1 text-2xl font-black">24 <span className="text-xs font-semibold text-slate-300">available</span></div>
                    </div>
                </div>

                <div className="relative grid grid-cols-3 gap-px bg-white/10 p-px">
                    {[
                        [<Navigation className="h-4 w-4" />, 'Find a bike'],
                        [<Sparkles className="h-4 w-4" />, 'Smart layers'],
                        [<ArrowUpRight className="h-4 w-4" />, 'Go further'],
                    ].map(([icon, label]) => (
                        <div key={String(label)} className="bg-[#071923] px-3 py-4 text-white">
                            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">{icon}</div>
                            <div className="text-xs font-bold text-slate-200">{label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
