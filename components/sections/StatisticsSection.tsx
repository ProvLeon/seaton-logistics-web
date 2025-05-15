"use client";

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';
import { motion, useAnimation } from 'framer-motion';

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  index: number;
  inView: boolean;
  color?: string;
  icon?: string;
}

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Equipment Units',
    color: '#FF6600',
    icon: 'M16 3h4a1 1 0 0 1 1 1v14h-2 M10 17h6m-2-14v14 M7 17h1 M3 5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v12h-1'
  },
  {
    value: 95,
    suffix: '%',
    label: 'Client Satisfaction',
    color: '#FF8533',
    icon: 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3'
  },
  {
    value: 12,
    suffix: '',
    label: 'Years of Experience',
    color: '#CC5200',
    icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'
  },
  {
    value: 1500,
    suffix: '+',
    label: 'Trained Professionals',
    color: '#FF6600',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75'
  }
];

const StatItem = ({ value, suffix = '', label, index, inView, color = '#FF6600', icon }: StatItemProps) => {
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
    if (inView && counterRef.current && itemRef.current) {
      // Animate the item container
      anime({
        targets: itemRef.current,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad',
        delay: index * 100
      });

      // Animate the counter
      anime({
        targets: counterRef.current,
        innerHTML: [0, value],
        easing: 'easeInOutExpo',
        duration: 2000,
        delay: index * 100 + 300,
        round: true // Round to whole numbers
      });
    }
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
      <div className="p-8 text-center relative z-10 backdrop-blur-sm bg-color-white/5 rounded-2xl border border-color-white/10 hover:border-color-safety-orange/30 transition-all duration-300 shadow-lg">
        {/* Icon at the top */}
        {icon && (
          <motion.div
            className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center relative"
            animate={{
              scale: hovered ? 1.1 : 1,
              rotate: hovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10"
            >
              <path d={icon} />
            </svg>
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
          <div className="text-5xl md:text-7xl font-bold text-color-black/30 flex items-end drop-shadow-lg">
            <span ref={counterRef} className="tracking-tight">0</span>
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
          </div>
        </motion.div>

        <motion.h3
          className="text-xl text-white/80 font-medium"
          animate={{ y: hovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
        >
          {label}
        </motion.h3>

        {/* Animated border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: hovered
              ? `0 0 20px 2px ${color}30, inset 0 0 10px 1px ${color}20`
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
            opacity: hovered ? 0.6 : 0.3
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

export default function StatisticsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const headingRef = useRef<HTMLHeadingElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      });

      if (headingRef.current) {
        anime({
          targets: headingRef.current,
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutQuad'
        });
      }
    }
  }, [inView, controls]);

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-color-black via-color-charcoal-gray/90 to-color-black relative overflow-hidden">
      {/* Enhanced Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-color-safety-orange/15 rounded-full blur-3xl"
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
          className="absolute bottom-10 right-10 w-80 h-80 bg-color-safety-orange/15 rounded-full blur-3xl"
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
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #FF6600 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block relative mb-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 opacity-70">
              <circle cx="30" cy="30" r="29" stroke="#FF6600" strokeWidth="2" />
              <path d="M20 30 L26 36 L40 22" stroke="#FF6600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <h2
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-center text-color-white mb-4 opacity-0 tracking-tight"
          >
            Our Impact in <span className="text-gradient">Numbers</span>
          </h2>

          <motion.div
            className="h-1 w-40 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <motion.p
            className="text-color-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We've built a strong track record of excellence in equipment rentals and logistics
            support across Ghana and beyond.
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
              index={index}
              inView={inView}
              color={stat.color}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
