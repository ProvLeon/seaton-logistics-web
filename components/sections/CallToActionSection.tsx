"use client";

import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';
import { Button } from '../ui/Button';

export default function CallToActionSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && contentRef.current) {
      anime({
        targets: contentRef.current.children,
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        easing: 'easeOutQuad',
        duration: 800
      });
    }
  }, [inView]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-color-black via-color-black to-color-safety-orange/30 z-0"></div>

      {/* Animated background circles */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-color-white/20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full border border-color-white/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full border border-color-white/20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className="max-w-4xl mx-auto bg-color-white/10 backdrop-blur-sm p-10 md:p-16 rounded-3xl border border-color-white/10"
        >
          <div ref={contentRef} className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-color-white mb-6">
              Ready to Elevate Your Operations?
            </h2>
            <p className="text-color-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Partner with Seaton Logistics for premium equipment solutions that
              drive efficiency, safety, and growth across your business.
            </p>
            <div className="flex flex-wrap justify-center gap-5">

              <Button
                // className="px-8 py-4 bg-color-safety-orange text-color-white font-medium rounded-full hover:bg-opacity-90 hover:scale-105 transition-all shadow-lg"
                variant='primary'
              >
                <a
                  href="/contact"
                >
                  Get Started Today
                </a>
              </Button>

              <Button
                // className="px-8 py-4 bg-transparent border-2 border-color-white  hover:bg-color-white/10 hover:scale-105 transition-all"
                variant='outline'
              >
                <a
                  href="/equipment"
                // className="text-color-navy-blue font-medium  rounded-full"
                >
                  Browse Equipment
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
