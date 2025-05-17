"use client";

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Icon from '@/components/ui/icons/IconProvider';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const sustainabilityInitiatives = [
  {
    title: "Eco-Friendly Equipment",
    description: "We're continuously expanding our fleet with fuel-efficient and low-emission vehicles and machinery that reduce environmental impact without compromising performance.",
    icon: "Truck"
  },
  {
    title: "Responsible Waste Management",
    description: "Our maintenance facilities implement comprehensive recycling programs and proper disposal of hazardous materials, minimizing waste sent to landfills.",
    icon: "Recycle"
  },
  {
    title: "Energy Efficiency",
    description: "We've invested in energy-efficient lighting, solar power at our facilities, and smart energy management systems to reduce our carbon footprint.",
    icon: "Zap"
  },
  {
    title: "Water Conservation",
    description: "Our equipment washing facilities utilize water recycling systems that reduce freshwater consumption by up to 85% compared to traditional methods.",
    icon: "Droplet"
  },
  {
    title: "Community Engagement",
    description: "We regularly organize and participate in local environmental initiatives, from tree planting to cleanup campaigns across communities in Ghana.",
    icon: "Users"
  },
];

export default function SustainabilityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations for scrolling effects
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    tl.to(".parallax-bg", {
      y: 150,
      ease: "none"
    });

    // Animate content sections
    const sections = contentRef.current?.querySelectorAll('.content-section');
    if (sections) {
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            end: "center center",
            scrub: true
          }
        });
      });
    }
  }, { scope: [heroRef, contentRef] });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-[60vh] overflow-hidden flex items-center justify-center"
      >
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 parallax-bg">
          <Image
            src="/images/sustainability-hero.jpg"
            alt="Sustainable Logistics"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-color-black/70 to-color-black/90 z-10"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span 
              className="inline-block text-color-safety-orange font-medium mb-3 tracking-wider"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              COMMITTED TO A GREENER FUTURE
            </motion.span>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-color-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Our <span className="text-gradient">Sustainability</span> Commitment
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-color-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              We strive to minimize our environmental impact by promoting eco-friendly equipment and practices,
              ensuring a better future for our communities while empowering your business to operate sustainably.
            </motion.p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-color-black to-transparent"></div>
      </section>
      
      {/* Mission Statement */}
      <section className="py-20 bg-gradient-subtle noise-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-8">
              <Icon
                name="TreePine"
                size="2xl"
                strokeWidth="thin"
                className="text-color-safety-orange"
              />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-color-white mb-8">
              "We believe sustainability is not just a responsibility but a business opportunity.
              By embracing eco-friendly practices, we help our clients achieve sustainable growth."
            </h2>
            
            <p className="text-color-white/70 text-lg mb-10">
              — James Seaton, Founder & CEO
            </p>
            
            <div className="h-0.5 w-40 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-8"></div>
          </div>
        </div>
      </section>
      
      {/* Initiatives Section */}
      <section className="py-24 bg-color-black relative overflow-hidden" ref={contentRef}>
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,102,0,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 content-section">
            <span className="inline-block text-color-safety-orange font-medium mb-3 tracking-wider">
              OUR INITIATIVES
            </span>
            
            <h2 className="text-3xl md:text-5xl font-bold text-color-white mb-6">
              Sustainable <span className="text-gradient">Practices</span>
            </h2>
            
            <div className="h-1 w-40 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-8"></div>
            
            <p className="text-color-white/80 text-lg max-w-3xl mx-auto">
              We're committed to eco-friendly practices that support your business and the environment,
              implementing sustainable solutions across all our operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sustainabilityInitiatives.map((initiative, index) => (
              <InitiativeCard 
                key={index}
                title={initiative.title}
                description={initiative.description}
                icon={initiative.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Goals Section */}
      <section className="py-24 bg-gradient-radial relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="content-section">
              <span className="inline-block text-color-safety-orange font-medium mb-3 tracking-wider">
                OUR GOALS
              </span>
              
              <h2 className="text-3xl md:text-5xl font-bold text-color-white mb-6">
                2030 Sustainability <span className="text-gradient">Targets</span>
              </h2>
              
              <div className="h-1 w-40 bg-gradient-to-r from-color-safety-orange to-transparent rounded-full mb-8"></div>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-color-safety-orange/20 p-3 rounded-lg">
                    <Icon
                      name="TrendingUp"
                      size="md"
                      strokeWidth="regular"
                      className="text-color-safety-orange"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-color-white mb-2">40% Carbon Reduction</h3>
                    <p className="text-color-white/70">Reducing our carbon emissions by 40% through equipment modernization and operational efficiency.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-color-safety-orange/20 p-3 rounded-lg">
                    <Icon
                      name="Battery"
                      size="md"
                      strokeWidth="regular"
                      className="text-color-safety-orange"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-color-white mb-2">75% Electric Fleet</h3>
                    <p className="text-color-white/70">Transitioning 75% of our light equipment fleet to electric or hybrid alternatives.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-color-safety-orange/20 p-3 rounded-lg">
                    <Icon
                      name="ArrowDown01"
                      size="md"
                      strokeWidth="regular"
                      className="text-color-safety-orange"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-color-white mb-2">Zero Landfill Waste</h3>
                    <p className="text-color-white/70">Achieving zero waste to landfill across all our maintenance facilities.</p>
                  </div>
                </div>
                
                <Button variant="outline" withGlow className="mt-6">
                  <a href="/contact" className="flex items-center gap-2">
                    <span>Partner with us on sustainability</span>
                    <Icon
                      name="ArrowRight"
                      size="sm"
                      strokeWidth="regular"
                      className="text-color-white"
                    />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="content-section relative">
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/sustainability-goals.jpg"
                  alt="Seaton Logistics Sustainability Goals"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <p className="text-color-white text-xl font-bold">
                    "Committed to sustainable practices and a greener future."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-color-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="neo-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-color-white mb-6">
              Ready to make your operations more <span className="text-gradient">sustainable</span>?
            </h2>
            
            <p className="text-color-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Partner with Seaton Logistics for eco-friendly equipment solutions that reduce environmental impact while maximizing operational efficiency.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" withGlow>
                <a href="/contact">
                  Request Eco-Friendly Equipment
                </a>
              </Button>
              
              <Button variant="glass">
                <a href="/services">
                  Explore Green Solutions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Initiative Card Component
function InitiativeCard({ title, description, icon, index }: { title: string; description: string; icon: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      className="feature-card p-8 h-full overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } },
        hidden: { opacity: 0, y: 50 }
      }}
      whileHover={{ y: -10 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="feature-icon">
          <Icon
            name={icon}
            size="xl"
            strokeWidth="regular"
            className="text-color-white"
          />
        </div>
        <h3 className="text-xl font-bold text-color-white">{title}</h3>
      </div>
      
      <p className="text-color-white/70">{description}</p>
      
      <div className="absolute bottom-0 right-0 h-40 w-40 opacity-5">
        <div className="relative h-full w-full">
          <Icon
            name={icon}
            size="2xl"
            strokeWidth="thin"
            className="text-color-white w-full h-full"
          />
        </div>
      </div>
    </motion.div>
  );
}