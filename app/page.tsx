"use client";

import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CallToActionSection from '@/components/sections/CallToActionSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Statistics Section */}
        <StatisticsSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Call to Action Section */}
        <CallToActionSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}