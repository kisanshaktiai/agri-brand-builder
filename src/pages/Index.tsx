
import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeatureCards from '../components/FeatureCards';
import HowItWorks from '../components/HowItWorks';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    logger.info('Index page mounted');
    return () => {
      logger.debug('Index page unmounting');
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeatureCards />
      <HowItWorks />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
