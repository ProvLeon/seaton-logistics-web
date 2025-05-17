"use client";

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '../ui/Button';
import Icon from '@/components/ui/icons/IconProvider';

export default function CallToActionSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  // Handle mouse position for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const container = contentRef.current?.getBoundingClientRect();

    if (container) {
      const x = (clientX - container.left - container.width / 2) / 30;
      const y = (clientY - container.top - container.height / 2) / 30;
      setMousePosition({ x, y });
    }
  };

  useEffect(() => {
    if (inView) {
      // Animate with framer motion
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      });

      // Animate with anime.js for more complex animations
      if (contentRef.current) {
        anime({
          targets: contentRef.current.children,
          translateY: [40, 0],
          opacity: [0, 1],
          delay: anime.stagger(150),
          easing: 'easeOutQuad',
          duration: 800
        });
      }
    }
  }, [inView, controls]);

  return (
    <section className="py-32 relative overflow-hidden noise-bg">
      {/* Background gradient with enhanced visuals */}
      <div className="absolute inset-0 bg-gradient-subtle z-0 bg-gradient-glow"></div>

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 z-0 opacity-40 bg-gradient-mesh">
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full border-2 border-color-safety-orange/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full border border-color-safety-orange/15"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.15, 0.3],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full border-2 border-color-safety-orange/25 animate-border-glow"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [-20, 20, -20]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-color-safety-orange shadow-glow"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${15 + ((i % 5) * 15)}%`,
              opacity: 0.3 + (i % 5) * 0.15,
              filter: `blur(${i % 3}px)`
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, i % 2 === 0 ? 30 : -30, 0],
              scale: [1, 1.8, 1]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto glass-effect-dark p-10 md:p-16 rounded-3xl border border-color-safety-orange/10 shadow-2xl animate-glow-pulse relative overflow-hidden neo-card"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(255, 102, 0, 0.25)" }}
          onMouseMove={handleMouseMove}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Decorative geometric shapes */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-color-safety-orange/30 blur-xl animate-pulse-glow"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-color-safety-orange/30 blur-xl animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>

          <motion.div
            ref={contentRef}
            className="text-center relative z-10"
            style={{
              rotateX: -mousePosition.y,
              rotateY: mousePosition.x,
              transformStyle: "preserve-3d"
            }}
          >
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-color-white mb-6 tracking-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Empowering Your <span className="text-gradient">Success</span>, Every Step of the Way
            </motion.h2>

            <motion.p
              className="text-color-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Partner with Seaton Logistics for premium equipment solutions, expert maintenance,
              and comprehensive training that ensures your long-term success.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-5 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button
                variant='primary'
                size="xl"
                withGlow
                icon={{
                  name: "ArrowRight",
                  size: "md",
                  strokeWidth: "medium"
                }}
                iconPosition="right"
              >
                <a
                  href="/contact"
                >
                  Start Your Journey
                </a>
              </Button>

              <Button
                variant='glass'
                size="xl"
                icon={{
                  name: "Package",
                  size: "md",
                  strokeWidth: "medium"
                }}
                iconPosition="left"
              >
                <a
                  href="/equipment"
                >
                  Browse Equipment
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
