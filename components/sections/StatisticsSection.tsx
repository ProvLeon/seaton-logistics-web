"use client";

import { useRef, useEffect, useState, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';
import { motion, useAnimation } from 'framer-motion';
import {
  Truck,
  ThumbsUp,
  Clock,
  Users,
  // Award,
  TrendingUp
} from 'lucide-react';

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
  index: number;
  inView: boolean;
  color?: string;
  iconName: string;
}

const stats = [
  {
    value: 600,
    suffix: '+',
    label: 'Equipment Units',
    description: 'Modern fleet serving diverse industries',
    color: '#E2342b',
    iconName: 'truck'
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Based on recent customer surveys',
    color: '#E2342b',
    iconName: 'thumbsUp'
  },
  {
    value: 15,
    suffix: '',
    label: 'Years of Experience',
    description: 'Delivering excellence since 2009',
    color: '#E2342b',
    iconName: 'clock'
  },
  {
    value: 2000,
    suffix: '+',
    label: 'Trained Professionals',
    description: 'Experts in logistics and operations',
    color: '#E2342b',
    iconName: 'users'
  }
];

// Map of icon names to their components
const IconMap = {
  truck: Truck,
  thumbsUp: ThumbsUp,
  clock: Clock,
  users: Users
};

const StatItem = memo(({ value, suffix = '', label, description, index, inView, color = '#E2342b', iconName }: StatItemProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: index * 0.1
        }
      });
    }
  }, [inView, index, controls]);

  useEffect(() => {
    let counterAnimation: anime.AnimeInstance | null = null;
    let itemAnimation: anime.AnimeInstance | null = null;

    if (inView && counterRef.current && itemRef.current) {
      // Animate the item container
      itemAnimation = anime({
        targets: itemRef.current,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad',
        delay: index * 100
      });

      // Animate the counter
      counterAnimation = anime({
        targets: counterRef.current,
        innerHTML: [0, value],
        easing: 'easeInOutExpo',
        duration: 2000,
        delay: index * 100 + 300,
        round: true // Round to whole numbers
      });
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (counterAnimation) counterAnimation.pause();
      if (itemAnimation) itemAnimation.pause();
    };
  }, [inView, value, index]);

  return (
    <motion.div
      ref={itemRef}
      className="relative opacity-0"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="p-8 text-center relative z-10 glass-effect-dark rounded-2xl border border-color-white/5 hover:border-color-safety-orange/30 transition-all duration-300 shadow-lg">
        {/* Icon at the top */}
        {iconName && (
          <motion.div
            className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center relative"
            animate={{
              scale: hovered ? 1.1 : 1,
              rotate: hovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const IconComponent = IconMap[iconName];
              return (
                <IconComponent
                  size={32}
                  color={color}
                  strokeWidth={2}
                  className="relative z-10"
                />
              );
            })()}
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-lg"
              style={{ backgroundColor: color }}
            />
          </motion.div>
        )}

        <motion.div
          className="flex justify-center mb-3"
          animate={{ y: hovered ? -5 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-5xl md:text-7xl font-bold text-color-white/30 flex items-end drop-shadow-lg">
            <span ref={counterRef} className="tracking-tight">0</span>
            {suffix && (
              <motion.span
                className="text-color-safety-orange"
                animate={{
                  scale: hovered ? 1.2 : 1,
                  x: hovered ? 2 : 0
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {suffix}
              </motion.span>
            )}
          </div>
        </motion.div>

        <motion.h3
          className="text-xl text-color-white/90 font-medium mb-2"
          animate={{ y: hovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
        >
          {label}
        </motion.h3>

        {description && (
          <motion.p
            className="text-sm text-color-white/60 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}

        {/* Animated border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: hovered
              ? `0 0 25px 4px ${color}40, inset 0 0 15px 2px ${color}30`
              : 'none'
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Background shape */}
      <div className="absolute -z-10 w-full h-full top-0 left-0 flex items-center justify-center opacity-50">
        <motion.div
          className="w-full h-full rounded-2xl"
          style={{ border: `1px solid ${color}` }}
          animate={{
            rotate: hovered ? 5 : 0,
            scale: hovered ? 1.05 : 1,
            borderWidth: hovered ? '2px' : '1px',
            opacity: hovered ? 0.8 : 0.4
          }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
        />
      </div>
      {hovered && (
        <motion.div
          className="absolute -z-20 w-full h-full top-0 left-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.15, scale: 1.1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <TrendingUp
            size={120}
            color={color}
            className="absolute right-0 bottom-0 -translate-x-1/3 translate-y-1/3 opacity-40"
            strokeWidth={1}
          />
        </motion.div>
      )}
    </motion.div>
  );
});

StatItem.displayName = 'StatItem';

export default function StatisticsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const headingRef = useRef<HTMLHeadingElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    let headingAnimation: anime.AnimeInstance | null = null;

    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      });

      if (headingRef.current) {
        headingAnimation = anime({
          targets: headingRef.current,
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutQuad'
        });
      }
    }

    return () => {
      if (headingAnimation) headingAnimation.pause();
    };
  }, [inView, controls]);

  return (
    <section className="py-24 md:py-32 bg-gradient-subtle relative overflow-hidden noise-bg" id="statistics-section" aria-labelledby="statistics-heading">
      {/* Enhanced Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-color-safety-orange/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-color-safety-orange/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>

      {/* Grid pattern for texture */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #FF6600 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}>
      </div>

      <div className="container mx-auto px-4 relative z-10" aria-label="Statistics Section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          className="text-center mb-20"
        >
          {/* <motion.div
            className="inline-block relative mb-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="mx-auto mb-4 opacity-90 relative group">
              <Award size={60} color="#E2342b" strokeWidth={1.5} className="relative z-10 animate-subtle-pulse group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-300" style={{ backgroundColor: "#E2342b", borderRadius: "50%" }} />
            </div>
          </motion.div> */}

          <h2
            id="statistics-heading"
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-center text-color-white mb-4 opacity-0 tracking-tight"
          >
            Our <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-color-safety-orange to-yellow-500">Reliability</span> in Numbers
          </h2>

          <motion.div
            className="h-1 w-40 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />

          <motion.p
            className="text-color-white/80 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We deliver dependable equipment and services that our customers can trust to perform consistently,
            even in the most demanding conditions across Ghana and beyond. Our track record speaks for itself.
          </motion.p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              index={index}
              inView={inView}
              color={stat.color}
              iconName={stat.iconName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
