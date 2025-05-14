"use client";

import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VideoScrollAnimation from './components/VideoScrollAnimation';
import CoreValues from './components/sections/CoreValues';
import Services from './components/sections/Services';
import Industries from './components/sections/Industries';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Video Hero Section */}
        <section className="relative">
          <VideoScrollAnimation />
        </section>

        {/* Core Values Section */}
        <CoreValues />

        {/* Services Section */}
        <Services />

        {/* Industries Section */}
        <Industries />

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-navy-blue text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Empower Your Business?</h2>
            <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
              Partner with Seaton Logistics for reliable equipment solutions that drive efficiency, safety, and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-safety-orange text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all text-center"
              >
                Get a Quote
              </a>
              <a
                href="/equipment"
                className="bg-white text-navy-blue px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all text-center"
              >
                Browse Equipment
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
