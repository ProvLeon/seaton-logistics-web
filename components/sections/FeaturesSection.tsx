"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';

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
    description: "Access to a wide range of high-quality equipment for construction, mining, agriculture, and security industries."
  },
  {
    icon: "/icons/tools.svg",
    title: "Expert Maintenance",
    description: "Professional maintenance services to keep your equipment in optimal working condition at all times."
  },
  {
    icon: "/file.svg",
    title: "Comprehensive Training",
    description: "Specialized training programs to ensure safe and efficient operation of all equipment."
  },
  {
    icon: "/globe.svg",
    title: "Logistics Solutions",
    description: "End-to-end logistics services tailored to your specific needs across Ghana and beyond."
  }
];

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && cardRef.current) {
      anime({
        targets: cardRef.current,
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutCubic',
        delay: index * 150
      });
    }
  }, [inView, index]);

  useEffect(() => {
    if (inView && iconRef.current) {
      anime({
        targets: iconRef.current,
        scale: [0.5, 1],
        rotate: ['-20deg', '0deg'],
        opacity: [0, 1],
        duration: 800,
        easing: 'spring(1, 80, 10, 0)',
        delay: index * 150 + 300
      });
    }
  }, [inView, index]);

  return (
    <div
      ref={ref}
      className="flex flex-col"
    >
      <div
        ref={cardRef}
        className="bg-gradient-to-br from-color-navy-blue/20 to-color-navy-blue/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl h-full border border-color-white/10 hover:border-color-safety-orange/30 transition-all duration-300 hover:shadow-lg hover:shadow-color-safety-orange/10"
      >
        <div
          ref={iconRef}
          className="w-16 h-16 rounded-xl bg-color-safety-orange flex items-center justify-center mb-5"
        >
          <Image
            src={icon}
            alt={title}
            width={32}
            height={32}
            className="text-color-white"
          />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-color-navy-blue mb-3">{title}</h3>
        <p className="text-color-white/70">{description}</p>
      </div>
    </div>
  );
};

export default function FeaturesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && headerRef.current) {
      anime({
        targets: headerRef.current.childNodes,
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 800,
        easing: 'easeOutQuad',
      });
    }
  }, [inView]);

  return (
    <section className="py-24 bg-gradient-to-b from-color-navy-blue to-color-charcoal-gray relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-color-safety-orange/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-color-navy-blue/10 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-color-navy-blue mb-5">
            Premium <span className="text-color-safety-orange">Logistics</span> Solutions
          </h2>
          <p className="text-color-white/70 text-lg">
            We provide a full spectrum of services designed to empower your business operations with reliability,
            innovation, and expert support.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
