"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';
import { motion, useAnimation } from 'framer-motion';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const features = [
  {
    icon: "/truck-icon.svg",
    title: "Premium Equipment",
    description: "Access to a wide range of high-quality equipment for construction, mining, agriculture, and security industries.",
    color: "#FF6600", // safety-orange
  },
  {
    icon: "/icons/tools.svg",
    title: "Expert Maintenance",
    description: "Professional maintenance services to keep your equipment in optimal working condition at all times.",
    color: "#FF8533", // safety-orange-light
  },
  {
    icon: "/file.svg",
    title: "Comprehensive Training",
    description: "Specialized training programs to ensure safe and efficient operation of all equipment.",
    color: "#CC5200", // safety-orange-dark
  },
  {
    icon: "/globe.svg",
    title: "Logistics Solutions",
    description: "End-to-end logistics services tailored to your specific needs across Ghana and beyond.",
    color: "#FF6600", // safety-orange
  }
];

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [isHovered, setIsHovered] = useState(false);
  const cardControls = useAnimation();
  const iconControls = useAnimation();

  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // Initial animation when card comes into view
  useEffect(() => {
    if (inView) {
      cardControls.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: index * 0.1
        }
      });

      iconControls.start({
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: index * 0.1 + 0.2
        }
      });
    }
  }, [inView, index, cardControls, iconControls]);

  // Card hover animations using anime.js for more complex effects
  useEffect(() => {
    if (!cardRef.current) return;

    if (isHovered) {
      anime({
        targets: cardRef.current,
        boxShadow: [
          '0 10px 30px rgba(255, 102, 0, 0.1)',
          '0 20px 40px rgba(255, 102, 0, 0.2)'
        ],
        translateY: -10,
        duration: 600,
        easing: 'easeOutExpo'
      });
    } else {
      anime({
        targets: cardRef.current,
        boxShadow: '0 10px 30px rgba(255, 102, 0, 0.1)',
        translateY: 0,
        duration: 600,
        easing: 'easeOutExpo'
      });
    }
  }, [isHovered]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col"
      initial={{ y: 40, opacity: 0 }}
      animate={cardControls}
    >
      <div
        ref={cardRef}
        className="bg-gradient-to-br from-color-black/30 to-color-black/50 backdrop-blur-lg p-6 md:p-8 rounded-2xl h-full border border-color-white/10 transition-all duration-500 group overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-color-safety-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Top right corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-color-safety-orange/20 blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>

        {/* Bottom left corner accent */}
        <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-color-safety-orange/10 blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>

        <motion.div
          ref={iconRef}
          className="w-16 h-16 rounded-2xl bg-color-safety-orange flex items-center justify-center mb-6 shadow-lg shadow-color-safety-orange/20 relative z-10"
          initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
          animate={iconControls}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.3, type: "spring", stiffness: 300 }
          }}
        >
          <Image
            src={icon}
            alt={title}
            width={32}
            height={32}
            className="text-color-black drop-shadow-xl"
          />

          {/* Icon glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-color-safety-orange opacity-60 blur-xl -z-10 animate-pulse-glow"></div>
        </motion.div>

        <h3 className="text-xl md:text-2xl font-bold text-color-black mb-4 relative z-10 transition-transform duration-300 group-hover:translate-x-2">{title}</h3>

        <p className="text-color-black/70 relative z-10 transition-all duration-300 group-hover:text-color-black/90">
          {description}
        </p>

        {/* Bottom learn more link with arrow */}
        <div className="mt-6 pt-4 border-t border-color-white/10 flex items-center">
          <span className="text-color-safety-orange font-medium text-sm transition-all duration-300 flex items-center gap-2 group-hover:gap-3">
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function FeaturesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const headerControls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse position for heading parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const container = headerRef.current?.getBoundingClientRect();

    if (container) {
      const x = (clientX - container.left - container.width / 2) / 20;
      const y = (clientY - container.top - container.height / 2) / 20;
      setMousePosition({ x, y });
    }
  };

  useEffect(() => {
    if (inView) {
      headerControls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          staggerChildren: 0.2
        }
      });
    }
  }, [inView, headerControls]);

  return (
    <section className="py-32 bg-gradient-to-b from-color-black to-color-charcoal-gray relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-color-safety-orange/10 blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-color-safety-orange/5 blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-color-white/5 blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={headerRef}
          className="text-center mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={headerControls}
          onMouseMove={handleMouseMove}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
        >
          <motion.div
            style={{
              rotateX: -mousePosition.y,
              rotateY: mousePosition.x,
              transformStyle: "preserve-3d"
            }}
          >
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-color-black mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Premium <span className="text-gradient">Logistics</span> Solutions
            </motion.h2>

            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-8"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.p
              className="text-color-black/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              We provide a full spectrum of services designed to empower your business operations with reliability,
              innovation, and expert support across Ghana and beyond.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
