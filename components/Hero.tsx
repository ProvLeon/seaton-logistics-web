"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Scene from './three/Scene';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        subHeadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );

  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="h-screen relative overflow-hidden flex flex-col items-center justify-center text-center bg-gradient-to-b from-color-charcoal-gray/30 to-color-navy-blue/80"
    >
      {/* 3D Scene as background */}
      <div className="absolute inset-0 z-0">
        {/* <Scene
          cameraPosition={[5, 2, 8]}
          modelPosition={[0, 0, 0]}
          modelRotation={[0, Math.PI / 4, 0]}
          modelScale={2}
          autoRotate={true}
        // environment="park"
        /> */}
      </div>

      {/* Dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-color-charcoal-gray/30 to-color-navy-blue/80 z-10"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-20 max-w-5xl">
        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          Empowering Your Success, <br />
          <span className="text-color-safety-orange">Every Step of the Way</span>
        </h1>
        <p
          ref={subHeadingRef}
          className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto"
        >
          Premium equipment rentals, expert maintenance, and comprehensive training for construction,
          agriculture, mining, and security industries.
        </p>
        <div
          ref={ctaRef}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="/services"
            className="bg-color-safety-orange text-color-white px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all"
          >
            Explore Services
          </a>
          <a
            href="/contact"
            className="bg-color-white text-color-navy-blue px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all"
          >
            Get a Quote
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white opacity-80"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
