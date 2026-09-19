import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from './Footer';
import { BackgroundEffects } from './Landing/BackgroundEffects';
import { FeatureModal } from './Landing/FeatureModal';
import { FeaturesGrid } from './Landing/FeaturesGrid';
import { ContactSection } from './Landing/ContactSection';
import { LandingHeader } from './Landing/LandingHeader';
import { HeroSection } from './Landing/HeroSection';

export const LandingPage = () => {
    const { t } = useTranslation();
    const [activeModal, setActiveModal] = useState<'esg' | 'green' | 'health' | 'community' | null>(null);

    const modalContent = {
        esg: {
            title: t('esg_title'),
            content: t('esg_desc')
        },
        green: {
            title: t('green_title'),
            content: t('green_desc')
        },
        health: {
            title: t('health_title'),
            content: t('health_desc')
        },
        community: {
            title: t('community_title'),
            content: t('community_desc')
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500 text-slate-900 dark:text-white overflow-hidden relative font-sans">
            <BackgroundEffects />
            <LandingHeader />

            <HeroSection />

            <div className="container mx-auto px-6 max-w-7xl">
                <FeaturesGrid onOpenModal={(id) => setActiveModal(id as any)} />
                <ContactSection />
            </div>

            <Footer />

            <FeatureModal
                isOpen={!!activeModal}
                onClose={() => setActiveModal(null)}
                title={activeModal ? modalContent[activeModal].title : ''}
                content={activeModal ? modalContent[activeModal].content : ''}
            />
        </div>
    );
};
