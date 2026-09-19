import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../../lib/analytics';

export const ContactSection = () => {
    const { t } = useTranslation();

    return (
        <div className="mt-28 mb-20">
            <div className="relative rounded-[2rem] p-px overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/60 via-teal-500/30 to-sky-500/50 opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                <div className="bg-[#f4f8f7] dark:bg-[#0B0F19] rounded-[2rem] p-8 md:p-14 relative overflow-hidden border border-white/70 dark:border-white/5 shadow-xl transition-colors duration-500">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <div className="grid md:grid-cols-2 gap-16 relative z-10">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 text-emerald-700 dark:text-emerald-400">{t('contact_title')}</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                                {t('contact_subtitle')}
                            </p>
                            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 glass-premium p-4 rounded-xl border border-slate-200 dark:border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                                    <Send className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">{t('email_us_at')}</div>
                                    <div className="font-bold text-slate-800 dark:text-white tracking-wide">contact@citybikes.premium</div>
                                </div>
                            </div>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => {
                             e.preventDefault();
                             trackEvent('CONTACT_FORM_SUBMITTED');
                            const form = e.currentTarget;
                            const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
                            const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
                            const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';
                            const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
                                    window.location.href = `mailto:contact@citybikes.premium?subject=${encodeURIComponent('Encontrar Bicicleta Eletrica - contato')}&body=${encodeURIComponent(body)}`;
                            alert(t('contact_success'));
                        }}>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('contact_name')}</label>
                                    <input required name="name" type="text" className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-700 text-slate-800 dark:text-white shadow-sm dark:shadow-inner" placeholder={t('contact_name')} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('contact_email')}</label>
                                    <input required name="email" type="email" className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-700 text-slate-800 dark:text-white shadow-sm dark:shadow-inner" placeholder={t('contact_email')} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('contact_message')}</label>
                                <textarea required name="message" rows={4} className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-700 text-slate-800 dark:text-white shadow-sm dark:shadow-inner" placeholder={t('contact_message')}></textarea>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                 className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_12px_24px_rgba(5,150,105,0.22)] transition-all flex items-center justify-center gap-2 transform"
                            >
                                {t('contact_submit')}
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
