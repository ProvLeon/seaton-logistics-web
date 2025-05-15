"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      }
    });
    
    tl.fromTo(
      imageRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    ).fromTo(
      contentRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "-=0.8"
    );
  }, { scope: sectionRef });
  
  return (
    <section ref={sectionRef} className="py-20" id="about">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <Image 
              src="https://placehold.co/800x600?text=Logistics+Warehouse" 
              alt="Seaton Logistics Warehouse" 
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-700 hover:scale-105"
              priority
            />
            
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <p className="text-color-white text-lg font-bold">
                &ldquo;Driving Efficiency, Safety, and Growth.&rdquo;
              </p>
            </div>
          </div>
          
          <div ref={contentRef} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-color-black dark:text-color-white">
              About Seaton Logistics
            </h2>
            
            <p className="text-lg text-color-charcoal-gray/80 dark:text-color-white/80">
              Seaton Logistics was founded with a simple yet powerful vision: to empower 
              industries with the tools and knowledge they need to thrive. From our humble 
              beginnings as a local equipment provider, we&apos;ve grown into a trusted partner 
              for businesses across Ghana.
            </p>
            
            <p className="text-lg text-color-charcoal-gray/80 dark:text-color-white/80">
              Our journey has been driven by a commitment to reliability, innovation, and 
              sustainability. Today, we&apos;re proud to support construction, agriculture, mining, 
              and security industries, helping them achieve their goals safely and efficiently.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="bg-color-black/10 dark:bg-color-black/30 p-5 rounded-lg">
                <h3 className="text-color-black dark:text-color-white text-xl font-semibold mb-1">Our Vision</h3>
                <p className="text-color-charcoal-gray/80 dark:text-color-white/80">
                  To be the leading provider of innovative and reliable equipment solutions.
                </p>
              </div>
              
              <div className="bg-color-safety-orange/10 dark:bg-color-safety-orange/30 p-5 rounded-lg">
                <h3 className="text-color-safety-orange text-xl font-semibold mb-1">Our Mission</h3>
                <p className="text-color-black/80 dark:text-color-white/80">
                  To deliver high-quality equipment and specialized vehicles with unmatched support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}