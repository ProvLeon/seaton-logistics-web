"use client";

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs/lib/anime.es';
import { motion, useScroll, useTransform } from 'framer-motion';
import BackgroundVideo from '@/components/ui/BackgroundVideo';
import { Button } from '../ui/Button';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  // Parallax values based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Handle mouse move for parallax effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate mouse position as percentages from center
      const x = (clientX - windowWidth / 2) / windowWidth;
      const y = (clientY - windowHeight / 2) / windowHeight;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP animations for text elements with enhanced reveal
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: false,
      }
    });

    // Split heading text into words for staggered animation - USING CHILDREN INSTEAD
    const headingElement = headingRef.current;
    if (headingElement && headingElement.children.length === 0) {
      const words = headingElement.textContent?.split(" ") || [];
      headingElement.innerHTML = '';
      words.forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'inline-block overflow-hidden mx-1';
        const innerSpan = document.createElement('span');
        innerSpan.className = 'inline-block';
        innerSpan.textContent = word;
        wordSpan.appendChild(innerSpan);
        headingElement.appendChild(wordSpan);
      });
    }

    tl.fromTo(
      headingRef.current?.querySelectorAll('span > span'),
      { y: 70, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.08 }
    )
      .fromTo(
        subHeadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.6"
      );

    // Create a separate timeline for scroll-based animations
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      backgroundPositionY: "30%",
      ease: "none"
    });

  }, { scope: heroRef });

  /* Anime.JS for enhanced floating particles with 3D depth effect */
  useEffect(() => {
    if (!particlesRef.current) return;

    // Create particles with improved visual aesthetic
    const particlesContainer = particlesRef.current;
    // Use brand colors with different opacities for depth
    const particleTypes = [
      { color: 'var(--color-safety-orange)', size: [5, 12], count: 10, depth: 1.5, blur: '0px' },
      { color: 'var(--color-white)', size: [3, 8], count: 15, depth: 1, blur: '1px' },
      { color: 'var(--color-black)', size: [6, 14], count: 8, depth: 2, blur: '0.5px' }
    ];

    const particles: HTMLElement[] = [];

    // Create particles with different depths
    particleTypes.forEach(type => {
      for (let i = 0; i < type.count; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * (type.size[1] - type.size[0]) + type.size[0];

        particle.className = 'absolute rounded-full';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = type.color;
        particle.style.opacity = `${0.2 + Math.random() * 0.5}`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.filter = `blur(${type.blur})`;
        particle.dataset.depth = type.depth.toString();

        particlesContainer.appendChild(particle);
        particles.push(particle);
      }
    });

    // Animate each particle with varying speeds based on depth
    particles.forEach((particle) => {
      const depth = parseFloat(particle.dataset.depth || "1");
      animateParticle(particle, depth);
    });

    function animateParticle(particle: HTMLElement, depth: number) {
      const duration = anime.random(4000, 8000) / depth;

      anime({
        targets: particle,
        translateX: () => anime.random(-100, 100) / depth,
        translateY: () => anime.random(-100, 100) / depth,
        scale: () => anime.random(0.8, 1.5),
        opacity: [0.2, 0.7, 0.2],
        duration: duration,
        easing: 'easeInOutSine',
        complete: () => animateParticle(particle, depth), // Loop animation
      });
    }

    // Update particle positions based on mouse movement for parallax effect
    const handleMouseParallax = () => {
      particles.forEach(particle => {
        const depth = parseFloat(particle.dataset.depth || "1");
        const translateX = mousePosition.x * 20 * depth;
        const translateY = mousePosition.y * 20 * depth;

        gsap.to(particle, {
          x: translateX,
          y: translateY,
          duration: 1,
          ease: "power1.out"
        });
      });
    };

    // Set up animation frame for mouse parallax
    let animationFrame: number;
    const updateParallax = () => {
      handleMouseParallax();
      animationFrame = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    return () => {
      cancelAnimationFrame(animationFrame);
      particles.forEach(particle => {
        if (particle.parentNode === particlesContainer) {
          particlesContainer.removeChild(particle);
        }
      });
    };
  }, [mousePosition]);

  return (
    <section
      ref={heroRef}
      className="h-screen relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Video background with 3D model overlay and parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <BackgroundVideo
          sources={
            [{ src: "/videos/equipment-demo.webm", type: "video/webm", media: "(min-width: 768px)" }]}
          poster="/images/logistics-warehouse.jpg"
          priority={true}
          fallbackImage="/images/logistics-warehouse.jpg"
          className="scale-110"
        />
        <div className="absolute inset-0 z-10">
          {/* Space for 3D model if needed */}
        </div>
      </motion.div>

      {/* Enhanced gradient overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-color-black/70 via-color-black/80 to-color-black/95 z-10 noise-bg"></div>

      {/* Geometric shape decorations */}
      <div className="absolute inset-0 z-15 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 border border-color-safety-orange/40 rounded-full animate-glow-pulse"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 border-2 border-color-safety-orange/20 rounded-full animate-border-glow"></div>
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 border border-color-safety-orange/30 rounded-full animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Enhanced floating particles with depth */}
      <div ref={particlesRef} className="absolute inset-0 z-20 opacity-80 pointer-events-none"></div>

      {/* Hero Content with 3D tilt effect */}
      <motion.div
        className="container mx-auto px-6 relative z-30 max-w-5xl"
        style={{
          rotateX: mousePosition.y * -5,
          rotateY: mousePosition.x * 5,
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="flex flex-col items-center text-center">
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-color-white mb-6 tracking-tight leading-tight drop-shadow-lg"
          >
            Empowering Your
            <span className="text-color-safety-orange mx-2 md:mx-4 relative">
              Success
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-color-safety-orange/50 rounded-full animate-pulse-glow"></span>
            </span>
            Every Step of the Way
          </h1>
          <p
            ref={subHeadingRef}
            className="text-lg md:text-xl text-color-white/90 mb-12 max-w-3xl backdrop-blur-md bg-color-black/30 p-4 rounded-lg border border-color-safety-orange/10 shadow-lg"
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
              className="group transform hover:scale-105 transition-all duration-300"
            >
              <a
                href="/services"
                className="flex gap-2 items-center"
              >
                <span>Explore Services</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </Button>

            <Button
              variant='outline'
              className="transform hover:scale-105 transition-all duration-300"
            >
              <a
                href="/contact"
                className="flex items-center gap-2"
              >
                <span>Get a Quote</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-y-1 transition-transform duration-300">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-100 cursor-pointer hidden md:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-color-white/80 text-sm font-medium tracking-wide">Scroll to explore</span>
          <div className="w-8 h-12 border-2 border-color-safety-orange/50 rounded-full flex justify-center pt-2 relative overflow-hidden animate-glow-pulse">
            <div className="w-1.5 h-1.5 bg-color-safety-orange rounded-full animate-bounce"></div>
            <span className="absolute inset-0 bg-gradient-to-t from-color-safety-orange/30 to-transparent opacity-70"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
