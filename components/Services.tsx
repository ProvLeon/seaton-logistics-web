"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, delay }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        delay: delay,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef} 
      className="bg-white dark:bg-charcoal-gray p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
    >
      <div className="mb-4 text-safety-orange">
        <Image src={icon} alt={title} width={64} height={64} />
      </div>
      <h3 className="text-xl font-bold mb-2 text-navy-blue dark:text-white">{title}</h3>
      <p className="text-charcoal-gray/80 dark:text-white/80">{description}</p>
    </div>
  );
};

export default function Services() {
  const services = [
    {
      icon: "/truck-icon.svg",
      title: "Equipment Rentals",
      description: "Premium equipment for construction, agriculture, mining, and security industries.",
      delay: 0.1
    },
    {
      icon: "/file.svg",
      title: "Expert Maintenance",
      description: "Professional maintenance services to keep your equipment in optimal condition.",
      delay: 0.2
    },
    {
      icon: "/window.svg",
      title: "Comprehensive Training",
      description: "Specialized training programs for efficient and safe equipment operation.",
      delay: 0.3
    },
    {
      icon: "/globe.svg", 
      title: "Logistics Solutions",
      description: "End-to-end logistics services tailored to your specific business needs.",
      delay: 0.4
    },
  ];
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  
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
    
    gsap.fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 bg-light-gray dark:bg-charcoal-gray/20" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue dark:text-white">
            Our Premium Services
          </h2>
          <p ref={textRef} className="text-lg text-charcoal-gray/80 dark:text-white/80 max-w-3xl mx-auto">
            We provide top-tier equipment solutions tailored to your business needs,
            ensuring efficiency, safety, and growth across various industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}