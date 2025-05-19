"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

export default function NotFoundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const equipmentRef = useRef<SVGSVGElement>(null);
  const warningRef = useRef<SVGCircleElement>(null);
  const dust1Ref = useRef<HTMLDivElement>(null);
  const dust2Ref = useRef<HTMLDivElement>(null);
  const dust3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    // Equipment float animation - vertical only with no rotation
    anime({
      targets: equipmentRef.current,
      translateY: [-8, 0, -8],
      duration: 4000,
      loop: true,
      easing: 'easeInOutSine',
      update: function () {
        if (equipmentRef.current) {
          equipmentRef.current.style.rotate = '0deg';
        }
      }
    });

    // Pulsing warning
    anime({
      targets: warningRef.current,
      opacity: [0.6, 1],
      scale: [1, 1.1, 1],
      duration: 2000,
      loop: true,
      easing: 'easeInOutQuad'
    });

    // Text pulse
    anime({
      targets: textRef.current,
      opacity: [0.8, 1],
      textShadow: [
        '0 0 3px rgba(226, 52, 43, 0.5)',
        '0 0 8px rgba(226, 52, 43, 0.7)',
        '0 0 3px rgba(226, 52, 43, 0.5)'
      ],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine'
    });

    // Dust particles - simple vertical movements only
    const dustRefs = [dust1Ref, dust2Ref, dust3Ref];
    dustRefs.forEach((ref, i) => {
      if (ref.current) {
        anime({
          targets: ref.current,
          translateY: [-10, -15, -10],
          translateX: [-2, 2, -2],
          opacity: [0.2, 0.4, 0.2],
          delay: i * 400,
          duration: 3000 + (i * 500),
          loop: true,
          easing: 'easeInOutSine',
          update: function () {
            if (ref.current) {
              ref.current.style.rotate = '0deg';
            }
          }
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto h-60 relative overflow-visible">
      {/* Main equipment SVG */}
      <svg
        ref={equipmentRef}
        viewBox="0 0 300 150"
        className="w-full h-full"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d'
        }}
      >
        <defs>
          <linearGradient id="equipmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(226, 52, 43, 0.5)" />
            <stop offset="100%" stopColor="rgba(226, 52, 43, 0.2)" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Excavator Body Group */}
        <g className="excavator-body" style={{ transformOrigin: 'center' }}>
          {/* Tracks */}
          <rect x="60" y="115" width="120" height="15" rx="3" fill="rgba(40, 40, 40, 0.8)" stroke="rgba(226, 52, 43, 0.6)" strokeWidth="1" />
          <rect x="60" y="115" width="120" height="15" fill="none" stroke="rgba(226, 52, 43, 0.6)" strokeWidth="1" strokeDasharray="5 3" />

          {/* Wheels */}
          <circle cx="75" cy="122" r="8" fill="url(#equipmentGradient)" stroke="rgba(226, 52, 43, 0.7)" strokeWidth="1" />
          <circle cx="115" cy="122" r="8" fill="url(#equipmentGradient)" stroke="rgba(226, 52, 43, 0.7)" strokeWidth="1" />
          <circle cx="155" cy="122" r="8" fill="url(#equipmentGradient)" stroke="rgba(226, 52, 43, 0.7)" strokeWidth="1" />

          {/* Main body */}
          <rect x="65" y="90" width="110" height="30" rx="4" fill="url(#equipmentGradient)" stroke="rgba(226, 52, 43, 0.7)" strokeWidth="1" />

          {/* Cabin */}
          <rect x="85" y="65" width="45" height="35" rx="4" fill="url(#equipmentGradient)" stroke="rgba(226, 52, 43, 0.7)" strokeWidth="1" />
          <rect x="90" y="70" width="35" height="20" rx="2" fill="rgba(30, 30, 30, 0.6)" stroke="rgba(226, 52, 43, 0.3)" strokeWidth="0.5" />

          {/* Arm */}
          <rect x="130" y="80" width="70" height="12" rx="2" fill="url(#equipmentGradient)" stroke="rgba(226, 52, 43, 0.7)" strokeWidth="1" />
          <rect x="190" y="70" width="50" height="8" rx="2" fill="url(#equipmentGradient)" stroke="rgba(226, 52, 43, 0.7)" strokeWidth="1" />
          <rect x="235" y="65" width="15" height="20" rx="1" fill="url(#equipmentGradient)" stroke="rgba(226, 52, 43, 0.7)" strokeWidth="1" />
        </g>

        {/* Warning Sign */}
        <g style={{ transformOrigin: 'center' }}>
          <circle
            // ref={warningRef}
            cx="200"
            cy="40"
            r="18"
            fill="rgba(226, 52, 43, 0.2)"
            stroke="rgba(226, 52, 43, 0.8)"
            strokeWidth="2"
            filter="url(#glow)"
            style={{ transformOrigin: 'center' }}
          />
          <text
            x="200"
            y="45"
            fontFamily="Arial, sans-serif"
            fontSize="18"
            fontWeight="bold"
            fill="rgba(226, 52, 43, 0.9)"
            textAnchor="middle"
            filter="url(#glow)"
          >
            !
          </text>
        </g>

        {/* 404 Text */}
        <text
          ref={textRef}
          x="150"
          y="40"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="rgba(226, 52, 43, 0.9)"
          textAnchor="middle"
          filter="url(#glow)"
          style={{ transformOrigin: 'center' }}
        >
          404
        </text>
      </svg>

      {/* Dust particles */}
      <div
        ref={dust1Ref}
        className="absolute bottom-10 left-1/4 w-2 h-2 rounded-full bg-color-safety-orange/20"
        style={{ willChange: 'transform', transformOrigin: 'center' }}
      ></div>
      <div
        ref={dust2Ref}
        className="absolute bottom-8 left-1/2 w-1 h-1 rounded-full bg-color-safety-orange/30"
        style={{ willChange: 'transform', transformOrigin: 'center' }}
      ></div>
      <div
        ref={dust3Ref}
        className="absolute bottom-12 right-1/4 w-2 h-2 rounded-full bg-color-safety-orange/20"
        style={{ willChange: 'transform', transformOrigin: 'center' }}
      ></div>
    </div>
  );
}
