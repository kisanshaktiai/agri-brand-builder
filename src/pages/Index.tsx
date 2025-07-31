
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeatureCards from '../components/FeatureCards';
import HowItWorks from '../components/HowItWorks';
import StatsSection from '../components/StatsSection';
import InquiryForm from '../components/InquiryForm';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeatureCards />
      <HowItWorks />
      <StatsSection />
      <InquiryForm />
      <Footer />
    </div>
  );
};

export default Index;
