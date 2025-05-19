"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import Link from "next/link";
import anime from "animejs";
import { ArrowLeft, Loader, Home, PhoneCall } from "lucide-react";
import { useInView } from "react-intersection-observer";
import NotFoundAnimation from "@/components/ui/NotFoundAnimation";
import "./not-found.css";

export default function NotFound() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { ref: containerRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const textRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const loaderRef = useRef(null);

  // Loading effect
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    if (loaderRef.current) {
      anime({
        targets: loaderRef.current,
        opacity: [0.6, 1],
        scale: [0.95, 1.05],
        duration: 1500,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        transformOrigin: 'center'
      });
    }

    return () => clearTimeout(timer);
  }, []);

  // Animation for text and button elements
  useEffect(() => {
    if (inView && !isLoading) {
      const timeline = anime.timeline({
        easing: "easeOutExpo",
      });

      timeline
        .add({
          targets: textRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
          delay: 300,
        })
        .add({
          targets: buttonContainerRef.current.children,
          opacity: [0, 1],
          translateY: [15, 0],
          duration: 600,
          delay: anime.stagger(150),
        }, '-=400');
    }
  }, [inView, isLoading]);

  // Apply hardware acceleration to smooth animations
  const hwStyles: CSSProperties = {
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    perspective: '1000px',
    transform: 'translateZ(0) rotate(0deg)'
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4" ref={containerRef} style={hwStyles}>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div ref={loaderRef} className="relative" style={hwStyles}>
            <div className="w-16 h-16 rounded-full border-4 border-color-charcoal-gray border-t-color-safety-orange" style={{ transformOrigin: 'center center', willChange: 'transform', transform: 'rotate(0deg)' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-color-safety-orange animate-error-pulse" style={{ willChange: 'opacity, transform' }}>404</span>
            </div>
          </div>
          <p className="text-color-charcoal-gray animate-pulse">Loading recovery page...</p>
        </div>
      ) : (
        <div className="max-w-3xl w-full mx-auto text-center" style={hwStyles}>
          {/* Custom equipment animation */}
          <div className="mb-8 relative" style={hwStyles}>
            <NotFoundAnimation />
          </div>

          <div ref={textRef} className="space-y-6" style={{ willChange: 'opacity, transform' }}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              {/* <span className="text-color-safety-orange  error-shadow" style={{ willChange: 'transform, opacity' }}>404</span> <span className="text-color-white">| </span> */}
              <span className="text-color-white">Page Not Found</span>
            </h1>

            <p className="text-xl md:text-2xl text-color-charcoal-gray max-w-2xl mx-auto">
              The equipment you&apos;re looking for might be on another job site. Let&apos;s get you back on track.
            </p>

            <div ref={buttonContainerRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8" style={{ willChange: 'opacity, transform' }}>
              <Link
                href="/"
                className="px-8 py-3 bg-gradient-primary rounded-lg flex items-center justify-center gap-2 text-color-white font-medium hover:shadow-lg hover-glow transition-all duration-300 animate-button-pulse error-button"
                aria-label="Return to Home Page"
              >
                <Home size={18} />
                Return Home
              </Link>

              <Link
                href="/contact"
                className="px-8 py-3 bg-color-charcoal-gray border border-color-charcoal-gray-light rounded-lg flex items-center justify-center gap-2 text-color-white font-medium hover:bg-color-charcoal-gray-light transition-all duration-300 error-button"
                aria-label="Contact Support"
              >
                <PhoneCall size={18} />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Equipment silhouette illustrations in the background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-10 -z-10 pointer-events-none industrial-pattern industrial-grid" style={{ willChange: 'transform' }}>
        <div className="relative w-full max-w-7xl mx-auto h-[30vh]">
          {/* These are stylized equipment silhouettes */}
          <div className="absolute left-[5%] bottom-0 w-32 h-48 border-t-2 border-r-2 border-color-safety-orange animate-float-scale animation-duration-slowest" style={{ transformOrigin: 'center bottom', willChange: 'transform', backfaceVisibility: 'hidden' }}></div>
          <div className="absolute left-[15%] bottom-0 w-48 h-24 border-t-2 border-color-safety-orange animate-float animation-duration-slow" style={{ transformOrigin: 'center bottom', willChange: 'transform', backfaceVisibility: 'hidden' }}></div>
          <div className="absolute left-[35%] bottom-0 w-64 h-64 rounded-tr-[50px] border-t-2 border-r-2 border-color-safety-orange animate-float animation-duration-slow" style={{ transformOrigin: 'center', willChange: 'transform', backfaceVisibility: 'hidden', transform: 'rotate(0deg)' }}></div>
          <div className="absolute right-[20%] bottom-0 w-40 h-32 border-t-2 border-l-2 border-color-safety-orange animate-float animation-duration-slower" style={{ transformOrigin: 'center bottom', willChange: 'transform', backfaceVisibility: 'hidden' }}></div>
          <div className="absolute right-[5%] bottom-0 w-16 h-56 border-t-2 border-color-safety-orange animate-float animation-duration-slowest" style={{ transformOrigin: 'center bottom', willChange: 'transform', backfaceVisibility: 'hidden' }}></div>
        </div>
      </div>

      {/* Dust particles for industrial feel */}
      {!isLoading && (
        <div className="fixed inset-0 pointer-events-none z-[-1]">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-color-safety-orange/20 animate-float animation-duration-slowest" style={{ willChange: 'transform', transform: 'rotate(0deg)' }}></div>
          <div className="absolute top-1/3 left-1/2 w-1 h-1 rounded-full bg-color-safety-orange/30 animate-float-scale animation-duration-slower" style={{ willChange: 'transform', transform: 'rotate(0deg)' }}></div>
          <div className="absolute bottom-1/4 left-2/3 w-3 h-3 rounded-full bg-color-safety-orange/10 animate-float animation-duration-slowest" style={{ willChange: 'transform', transform: 'rotate(0deg)' }}></div>
          <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-color-safety-orange/20 animate-float animation-duration-slow" style={{ willChange: 'transform', transform: 'rotate(0deg)' }}></div>
        </div>
      )}
    </div>
  );
}
