import { motion } from 'framer-motion';
import { Leaf, Bike, Heart, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FeaturesGridProps {
    onOpenModal: (id: string) => void;
}

export const FeaturesGrid = ({ onOpenModal }: FeaturesGridProps) => {
    const { t } = useTranslation();

    const features = [
        {
            id: 'esg',
            icon: <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />,
            title: t('esg_title'),
            desc: t('esg_desc'),
            gradient: 'from-emerald-500/10 to-teal-500/5',
            border: 'group-hover:border-emerald-500/50'
        },
        {
            id: 'green',
            icon: <Bike className="w-8 h-8 text-teal-600 dark:text-teal-400" />,
            title: t('green_title'),
            desc: t('green_desc'),
            gradient: 'from-teal-500/10 to-sky-500/5',
            border: 'group-hover:border-teal-500/50'
        },
        {
            id: 'health',
            icon: <Heart className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
            title: t('health_title'),
            desc: t('health_desc'),
            gradient: 'from-lime-500/10 to-emerald-500/5',
            border: 'group-hover:border-lime-500/50'
        },
        {
            id: 'community',
            icon: <Users className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
            title: t('community_title'),
            desc: t('community_desc'),
            gradient: 'from-sky-500/10 to-teal-500/5',
            border: 'group-hover:border-sky-500/50'
        }
    ];

    return (
        <div id="features" className="mt-24 md:mt-32">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-950 dark:text-white tracking-tight">{t('why_choose')}</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">{t('why_choose_subtitle')}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {features.map((item, index) => (
                    <motion.button
                        type="button"
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onOpenModal(item.id)}
                        className={`relative w-full text-left glass-premium p-7 rounded-3xl border border-slate-200 dark:border-white/5 ${item.border} hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative z-10 mb-6 p-3.5 bg-slate-100/90 dark:bg-slate-900/40 rounded-2xl w-fit group-hover:scale-105 group-hover:bg-slate-200 dark:group-hover:bg-slate-900/60 transition-all duration-300 shadow-inner">
                            {item.icon}
                        </div>
                        <h3 className="relative z-10 text-xl font-bold mb-4 text-slate-800 dark:text-white group-hover:translate-x-1 transition-transform">{item.title}</h3>
                        <p className="relative z-10 text-slate-600 dark:text-slate-400 leading-relaxed mb-6 group-hover:text-slate-800 dark:group-hover:text-slate-300 line-clamp-3">{item.desc}</p>
                        <div className="relative z-10 flex items-center text-sm font-bold text-slate-500 dark:text-white/50 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors uppercase tracking-wider">
                            {t('learn_more')} <span className="ml-2 text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
