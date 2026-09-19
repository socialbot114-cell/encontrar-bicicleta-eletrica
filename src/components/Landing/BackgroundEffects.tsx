import { motion } from 'framer-motion';

export const BackgroundEffects = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    x: [0, 20, 0],
                    y: [0, 20, 0],
                    rotate: [0, 2, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-emerald-400/10 dark:bg-emerald-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div
                animate={{
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                    rotate: [0, -2, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-teal-400/10 dark:bg-teal-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div
                animate={{
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                    rotate: [0, 2, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -bottom-[20%] left-[20%] w-[80%] h-[60%] bg-sky-400/10 dark:bg-sky-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
        </div>
    );
};
