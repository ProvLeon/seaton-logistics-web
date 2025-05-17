"use client";

import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ValuesSection from '@/components/sections/ValuesSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CallToActionSection from '@/components/sections/CallToActionSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />
        
        {/* Values Section */}
        <ValuesSection />

        {/* Statistics Section */}
        <StatisticsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Call to Action Section */}
        <CallToActionSection />
      </main>

      {/* Footer */}
    </div>
  );
}
