"use client";

import { useRef, useEffect, useState } from 'react';
// import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';
import { motion, useAnimation } from 'framer-motion';
import Icon from '@/components/ui/icons/IconProvider';

interface FeatureCardProps {
  icon: keyof typeof import('lucide-react');
  title: string;
  description: string;
  index: number;
}

const features = [
  {
    icon: "Truck",
    title: "Premium Equipment",
    description: "Count on us for high-quality equipment that performs consistently, even in the toughest conditions across construction, mining, and agriculture.",
    color: "#FF6600", // safety-orange
  },
  {
    icon: "Wrench",
    title: "Expert Maintenance",
    description: "Our skilled technicians deliver dependable maintenance services that ensure your equipment operates reliably when you need it most.",
    color: "#FF8533", // safety-orange-light
  },
  {
    icon: "FileText",
    title: "Comprehensive Training",
    description: "Your safety is our priority. Our specialized training programs empower your team with the skills needed for safe and efficient equipment operation.",
    color: "#CC5200", // safety-orange-dark
  },
  {
    icon: "Globe",
    title: "Logistics Solutions",
    description: "We listen, understand, and deliver tailored logistics services that meet your unique needs, driving efficiency and growth across Ghana and beyond.",
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
          '0 4px 15px rgba(0, 0, 0, 0.2)',
          '0 15px 25px rgba(0, 0, 0, 0.3)'
        ],
        translateY: -6,
        duration: 400,
        easing: 'easeOutQuad'
      });
    } else {
      anime({
        targets: cardRef.current,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        translateY: 0,
        duration: 400,
        easing: 'easeOutQuad'
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
        className="feature-card p-6 md:p-8 h-full transition-all duration-300 group overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle highlight on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-color-safety-orange/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 translate-x-12 -translate-y-12 bg-color-safety-orange/5 blur-2xl rounded-full"></div>

        <motion.div
          ref={iconRef}
          className="feature-icon relative z-10"
          initial={{ scale: 0.5, rotate: -5, opacity: 0 }}
          animate={iconControls}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3, type: "spring", stiffness: 300 }
          }}
        >
          <Icon
            name={icon}
            size="xl"
            strokeWidth="regular"
            className="text-color-white drop-shadow-sm"
          />
        </motion.div>

        <h3 className="text-xl md:text-2xl font-bold text-color-white mb-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1">{title}</h3>

        <p className="text-color-white/70 relative z-10 transition-all duration-300 group-hover:text-color-white/90">
          {description}
        </p>

        {/* Bottom learn more link with arrow */}
        <div className="mt-6 pt-4 border-t border-color-charcoal-gray/15 flex items-center">
          <span className="text-color-safety-orange font-medium text-sm transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1">
            Learn more
            <Icon
              name="ArrowRight"
              size="sm"
              strokeWidth="medium"
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
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
    <section className="py-32 bg-gradient-to-b from-color-charcoal-gray-dark to-color-black relative overflow-hidden noise-bg">
      {/* Enhanced background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-color-safety-orange/8 blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-color-safety-orange/5 blur-3xl opacity-50"></div>

        {/* Professional grid pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,102,0,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
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
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-color-white mb-6 tracking-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Reliable <span className="text-gradient">Industry</span> Solutions
            </motion.h2>

            <motion.div
              className="h-0.5 w-24 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-8"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.p
              className="text-color-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Seaton Logistics empowers industries with reliable equipment, tailored solutions, and unparalleled support,
              ensuring seamless operations and long-term success for your business.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
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
