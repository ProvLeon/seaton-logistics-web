"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  delay: number;
}

const StatItem = ({ value, label, prefix = '', suffix = '', delay }: StatItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.fromTo(
      itemRef.current,
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        delay,
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top bottom-=150",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate the number counting up
    gsap.fromTo(
      valueRef.current,
      { textContent: '0' },
      {
        textContent: value,
        duration: 2,
        delay: delay + 0.3,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: valueRef.current,
          start: "top bottom-=150",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: itemRef });

  return (
    <div ref={itemRef} className="text-center p-6">
      <div className="flex justify-center items-center">
        <span className="text-safety-orange text-4xl font-bold">{prefix}</span>
        <div ref={valueRef} className="text-4xl md:text-5xl font-bold mb-2 text-navy-blue dark:text-white">
          {value}
        </div>
        <span className="text-safety-orange text-4xl font-bold">{suffix}</span>
      </div>
      <p className="text-charcoal-gray/80 dark:text-white/80 text-lg">{label}</p>
    </div>
  );
};

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: sectionRef });
  
  return (
    <section ref={sectionRef} className="py-16 bg-light-gray dark:bg-navy-blue/20" id="stats">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef} 
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-navy-blue dark:text-white"
        >
          Our Impact in Numbers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatItem 
            value="500"
            label="Equipment Units"
            suffix="+"
            delay={0.1}
          />
          <StatItem 
            value="95"
            label="Client Satisfaction"
            suffix="%"
            delay={0.2}
          />
          <StatItem 
            value="12"
            label="Years of Experience"
            delay={0.3}
          />
          <StatItem 
            value="1500"
            label="Trained Professionals"
            suffix="+"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}