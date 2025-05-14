"use client";

import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  index: number;
  inView: boolean;
}

const stats = [
  { value: 500, suffix: '+', label: 'Equipment Units' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: '', label: 'Years of Experience' },
  { value: 1500, suffix: '+', label: 'Trained Professionals' }
];

const StatItem = ({ value, suffix = '', label, index, inView }: StatItemProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={itemRef}
      className="relative opacity-0"
    >
      <div className="p-8 text-center">
        <div className="flex justify-center mb-2">
          <div className="text-5xl md:text-6xl font-bold text-color-white flex items-end">
            <span ref={counterRef}>0</span>
            <span className="text-color-safety-orange">{suffix}</span>
          </div>
        </div>
        <h3 className="text-lg text-color-white/70">{label}</h3>
      </div>

      {/* Decorative circle */}
      <div className="absolute -z-10 w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="w-54 h-42 rounded-2xl border-2 border-text-color-safety-orange opacity-30"></div>
      </div>
    </div>
  );
};

export default function StatisticsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (inView && headingRef.current) {
      anime({
        targets: headingRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad'
      });
    }
  }, [inView]);

  return (
    <section className="py-24 bg-color-navy-blue relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-40 h-40 bg-color-safety-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-color-safety-orange/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center text-color-white mb-16 opacity-0"
        >
          Our Impact in <span className="text-color-safety-orange">Numbers</span>
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
