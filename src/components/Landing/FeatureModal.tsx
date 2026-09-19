import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FeatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

export const FeatureModal = ({ isOpen, onClose, title, content }: FeatureModalProps) => {
    const { t } = useTranslation();
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
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
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        closeButtonRef.current?.focus();
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="feature-modal-title"
                        onKeyDown={trapFocus}
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto bg-slate-50 dark:bg-[#0B0F19] border border-cyan-500/20 dark:border-cyan-500/30 p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] max-w-2xl w-full shadow-2xl dark:shadow-[0_0_50px_rgba(6,182,212,0.15)]"
                    >
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        <button
                            ref={closeButtonRef}
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors group z-10"
                        >
                            <X className="w-6 h-6 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                        </button>
                        <h3 id="feature-modal-title" className="relative z-10 pr-12 text-3xl md:text-4xl font-black mb-6 md:mb-8 neon-text">
                            {title}
                        </h3>
                        <div className="relative z-10 prose prose-invert max-w-none">
                            <p className="text-slate-600 dark:text-slate-300 text-xl leading-relaxed font-light">
                                {content}
                            </p>
                        </div>
                        <div className="relative z-10 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/50 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-10 py-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-2xl font-bold text-slate-800 dark:text-white transition-all hover:shadow-lg border border-slate-300 dark:border-white/5"
                            >
                                {t('modal_close')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
