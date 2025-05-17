"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';

interface ValueCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const coreValues = [
  {
    title: "Reliability",
    description: "We deliver dependable equipment and services that our customers can trust to perform consistently, even in the most demanding conditions.",
    icon: "/icons/reliability.svg"
  },
  {
    title: "Innovation",
    description: "We embrace technology and creativity to provide cutting-edge solutions that meet the evolving needs of our clients and industries.",
    icon: "/icons/innovation.svg"
  },
  {
    title: "Safety",
    description: "We prioritize the well-being of our customers and employees by promoting safe equipment handling practices and providing comprehensive training.",
    icon: "/icons/safety.svg"
  },
  {
    title: "Customer-Centricity",
    description: "We are committed to understanding and exceeding our customers' expectations, offering tailored solutions and exceptional service at every touchpoint.",
    icon: "/icons/customer.svg"
  },
  {
    title: "Sustainability",
    description: "We strive to minimize our environmental impact by promoting eco-friendly equipment and practices, ensuring a better future for our communities.",
    icon: "/icons/sustainability.svg"
  }
];

const ValueCard = ({ title, description, icon, index }: ValueCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="neo-card p-6 md:p-8 transition-all duration-300"
      whileHover={{ y: -8, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 102, 0, 0.2)" }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-5 mb-3 group">
        <motion.div 
          className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-color-safety-orange to-color-safety-orange-dark flex items-center justify-center shadow-lg"
          whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-8 h-8">
            <Image 
              src={icon} 
              alt={title} 
              fill 
              className="text-color-white filter invert drop-shadow-sm" 
            />
          </div>
        </motion.div>
        
        <h3 className="text-xl md:text-2xl font-bold text-color-white group-hover:text-color-safety-orange transition-colors duration-300">
          {title}
        </h3>
      </div>
      
      <div className="relative mb-5">
        <div className="absolute top-0 left-0 w-12 h-0.5 bg-color-safety-orange/50 rounded-full"></div>
      </div>
      
      <p className="text-color-white/70">
        {description}
      </p>
      
      {/* Decorative corner accent */}
      <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute w-16 h-16 -bottom-8 -right-8 bg-gradient-to-tl from-color-safety-orange to-transparent rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default function ValuesSection() {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-gradient-radial relative overflow-hidden noise-bg">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-gradient-mesh">
        <div className="absolute -top-40 -right-20 w-96 h-96 rounded-full bg-color-safety-orange/10 blur-3xl"></div>
        <div className="absolute bottom-20 -left-32 w-80 h-80 rounded-full bg-color-safety-orange/10 blur-3xl"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,102,0,0.2) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <motion.span 
            className="inline-block text-color-safety-orange font-medium mb-3 tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            OUR CORE VALUES
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-color-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            The Principles That <span className="text-gradient relative">Drive</span> Us
          </motion.h2>
          
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-8"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          
          <motion.p
            className="text-color-white/80 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Our core values shape everything we do at Seaton Logistics, from the way we interact with our clients
            to how we maintain our equipment and train our teams.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <ValueCard 
              key={index}
              title={value.title}
              description={value.description}
              icon={value.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}