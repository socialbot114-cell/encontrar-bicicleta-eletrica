import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeroVisuals } from './HeroVisuals';
import { trackEvent } from '../../lib/analytics';

export const HeroSection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <main className="relative z-10 pt-40 pb-32">
            <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-[46%] text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-black uppercase tracking-[0.16em] mb-7 border border-emerald-500/20 shadow-sm backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <Globe className="w-4 h-4" />
                            {t('future_of_mobility')}
                        </div>
                        <h1 className="text-[3.6rem] sm:text-7xl lg:text-[5.5rem] font-black mb-7 leading-[0.94] tracking-[-0.06em]">
                            <span className="text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-2xl">{t('hero_title_1')}</span> <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-emerald-400 dark:via-teal-400 dark:to-sky-400">
                                {t('hero_title_2')}
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-9 max-w-xl leading-relaxed border-l-2 border-emerald-500 pl-5">
                            {t('hero_subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <motion.button
                                whileHover={{ y: -2, boxShadow: "0 12px 24px rgba(5,150,105,0.22)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { trackEvent('LANDING_CTA_CLICKED', { action: 'explore_map' }); navigate('/app'); }}
                                className="relative group px-7 py-4 text-base font-black text-white bg-emerald-600 rounded-xl overflow-hidden transition-all duration-300 border border-emerald-500 shadow-lg shadow-emerald-600/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-100 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                <div className="relative flex items-center gap-3">
                                    {t('enter_app')} <Globe className="w-5 h-5" />
                                </div>
                            </motion.button>
                            <button
                                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-7 py-4 text-base font-black text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white/80 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-400/40 transition-all duration-300 shadow-sm"
                            >
                                {t('learn_more')}
                            </button>
                        </div>
                    </motion.div>

                    <HeroVisuals />
                </div>
            </div>
        </main>
    );
};
