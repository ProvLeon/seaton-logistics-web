"use client";

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Scene from '../three/Scene';
import anime from 'animejs/lib/anime.es';
import BackgroundVideo from '@/components/ui/BackgroundVideo';
import { Button } from '../ui/Button';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // GSAP animations for text elements
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



  /* Anime.JS for floating particles */
  useEffect(() => {
    if (!particlesRef.current) return;

    // Create particles
    const particlesContainer = particlesRef.current;
    // Use brand colors
    const colors = ['var(--color-safety-orange)', 'var(--color-navy-blue)', 'var(--color-white)'];
    const particles = [];

    // Create 20 particle elements
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 10 + 5;
      particle.className = 'absolute rounded-full opacity-70';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      particlesContainer.appendChild(particle);
      particles.push(particle);
    }

    // Animate each particle
    particles.forEach((particle) => {
      animateParticle(particle);
    });

    function animateParticle(particle: HTMLElement) {
      anime({
        targets: particle,
        translateX: () => anime.random(-70, 70),
        translateY: () => anime.random(-70, 70),
        scale: () => anime.random(0.6, 1.4),
        opacity: [0.4, 0.7, 0.4],
        duration: () => anime.random(3000, 6000),
        easing: 'easeInOutQuad',
        complete: () => animateParticle(particle), // Loop animation
      });
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode === particlesContainer) {
          particlesContainer.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Video background with 3D model overlay */}
      <div className="absolute inset-0 z-0">
        <BackgroundVideo
          sources={[
            { src: "/videos/equipment-demo.webm", type: "video/webm", media: "(min-width: 768px)" }
          ]}
          poster="/images/logistics-warehouse.jpg"
          priority={true}
          fallbackImage="/images/logistics-warehouse.jpg"
        />
        <div className="absolute inset-0 z-10">
          {/* <Scene
            cameraPosition={[5, 2, 8]}
            modelPosition={[0, 0, 0]}
            modelRotation={[0, Math.PI / 4, 0]}
            modelScale={1.8}
            autoRotate={true}
            environment="sunset"
          /> */}
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-color-charcoal-gray/40 to-color-navy-blue/90 z-10"></div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 z-20 opacity-60 pointer-events-none"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-30 max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-color-charcoal-grey mb-6 tracking-tight"
          >
            Empowering Your
            <span className="text-color-safety-orange mx-4">Success</span>
            Every Step of the Way
          </h1>
          <p
            ref={subHeadingRef}
            className="text-lg md:text-xl text-color-white/90 mb-10 max-w-3xl"
          >
            Premium equipment rentals, expert maintenance, and comprehensive training
            for construction, agriculture, mining, and security industries across Ghana.
          </p>
          <div
            ref={ctaRef}
            className="flex flex-wrap justify-center gap-6"
          >
            <Button
              variant='primary'
            >

              <a
                href="/services"
                className="flex gap-2 items-center"
              >
                <span>Explore Services</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </Button>

            <Button
              variant='outline'
            >

              <a
                href="/contact"
                className=" flex items-center gap-2"
              >
                <span>Get a Quote</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="hidden md:absolute bottom-10 left-1/2 transform -translate-x-1/2 z-100 cursor-cursor">
        <div className="flex flex-col items-center gap-2">
          <span className="text-color-white/70 text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-color-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-color-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
