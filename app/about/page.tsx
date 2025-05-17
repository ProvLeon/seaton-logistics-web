"use client";

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { LinkButton } from '@/components/ui/Button';
import Icon from '@/components/ui/icons/IconProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExtendedIconName } from '@/types/icon-types';

// GSAP will be registered in useEffect

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Team members data
const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Chief Executive Officer',
    bio: 'Visionary leader with 15+ years in the logistics industry',
    image: '/images/team/jane-doe.jpg',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'John Smith',
    role: 'Operations Director',
    bio: 'Expert in optimizing logistics workflows and safety protocols',
    image: '/images/team/john-smith.jpg',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Sarah Johnson',
    role: 'Fleet Manager',
    bio: 'Specializes in fleet optimization and maintenance strategies',
    image: '/images/team/sarah-johnson.jpg',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Michael Addo',
    role: 'Finance Director',
    bio: 'Financial strategist with deep knowledge of the African market',
    image: '/images/team/michael-addo.jpg',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  }
];

// Company values
const values: {icon: ExtendedIconName; title: string; description: string}[] = [
  {
    icon: "ShieldCheck",
    title: 'Safety First',
    description: 'We prioritize safety in every aspect of our operations, from equipment maintenance to training programs.'
  },
  {
    icon: "HeartHandshake",
    title: 'Customer Focus',
    description: 'We build lasting relationships by understanding and exceeding our customers\' expectations.'
  },
  {
    icon: "Award",
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, continuously improving our services.'
  },
  {
    icon: "Leaf",
    title: 'Sustainability',
    description: 'Environmental responsibility is at the core of our operations and future planning.'
  }
];

// Company milestones
const milestones: {year: string; title: string; description: string; icon: ExtendedIconName}[] = [
  {
    year: '2005',
    title: 'Foundation of Excellence',
    description: 'Seaton Logistics was founded with a powerful vision to revolutionize equipment logistics in Ghana with reliability and innovation at its core.',
    icon: "Flag"
  },
  {
    year: '2010',
    title: 'Strategic Regional Growth',
    description: 'Expanded our reliable services across West Africa, establishing Seaton as a trusted name in equipment logistics throughout the region.',
    icon: "Map"
  },
  {
    year: '2015',
    title: 'Innovation in Action',
    description: 'Embraced cutting-edge technology with a comprehensive fleet modernization program, enhancing safety and operational efficiency.',
    icon: "Lightbulb"
  },
  {
    year: '2020',
    title: 'Sustainability Leadership',
    description: 'Pioneered the industry\'s most comprehensive eco-friendly logistics program, aligning with our core value of environmental responsibility.',
    icon: "Leaf"
  },
  {
    year: '2023',
    title: 'Customer-Centric Digitalization',
    description: 'Transformed customer experience with end-to-end digital solutions for real-time tracking, showcasing our commitment to innovation and excellence.',
    icon: "Smartphone"
  }
];

export default function AboutPage() {
  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Values section animations
  const valuesControls = useAnimation();
  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: true,
  });

  // Team section animations
  const teamControls = useAnimation();
  const { ref: teamRef, inView: teamInView } = useInView({
    triggerOnce: true,
  });

  // Timeline section animations
  const timelineControls = useAnimation();
  const { ref: timelineRef, inView: timelineInView } = useInView({
    triggerOnce: true,
  });

  // Initialize GSAP animations when component mounts
  useEffect(() => {
    // ScrollTrigger is already registered at the top level
    return () => {
      // Clean up scroll triggers when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Trigger animations when sections come into view
  useEffect(() => {
    if (valuesInView) {
      valuesControls.start('visible');
    }
    if (teamInView) {
      teamControls.start('visible');
    }
    if (timelineInView) {
      timelineControls.start('visible');
    }
  }, [valuesInView, teamInView, timelineInView, valuesControls, teamControls, timelineControls]);

  // Custom CSS animation for pulsing effect
  return (
    <div className="min-h-screen pt-20">
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 102, 0, 0.7); transform: scale(1); }
          70% { box-shadow: 0 0 0 10px rgba(255, 102, 0, 0); transform: scale(1.05); }
          100% { box-shadow: 0 0 0 0 rgba(255, 102, 0, 0); transform: scale(1); }
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        .shadow-glow-sm:hover {
          box-shadow: 0 0 15px 1px rgba(255, 102, 0, 0.3);
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="About Seaton Logistics"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-color-safety-orange font-medium mb-3 tracking-wider">
              OUR STORY
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-color-white mb-6">
              Driving <span className="text-gradient">Progress</span> Through Innovation
            </h1>

            <p className="text-lg md:text-xl text-color-white/90 mb-8">
              Since 2005, we&apos;ve been revolutionizing equipment logistics in Ghana and West Africa,
              building a legacy of excellence, safety, and sustainable growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-radial relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-color-safety-orange font-medium mb-3 tracking-wider">
              OUR VALUES
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-color-white mb-6">
              What Drives <span className="text-gradient">Us</span>
            </h2>

            <div className="h-1 w-40 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-8"></div>
          </div>

            {/* Styles are now defined at the page level */}

          <motion.div
            ref={valuesRef}
            variants={containerVariants}
            initial="hidden"
            animate={valuesControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-item p-8 neo-card text-center"
                variants={itemVariants}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-color-safety-orange/20 flex items-center justify-center">
                  <Icon
                    name={value.icon}
                    size="xl"
                    strokeWidth="regular"
                    className="text-color-safety-orange"
                  />
                </div>

                <h3 className="text-xl font-bold text-color-white mb-4">{value.title}</h3>
                <p className="text-color-white/70">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-color-safety-orange font-medium mb-3 tracking-wider">
              OUR JOURNEY
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-color-white mb-6">
              Driving <span className="text-gradient">Progress</span> Since 2005
            </h2>

            <p className="text-lg text-color-white/80 max-w-2xl mx-auto mb-8">
              Our journey of innovation, reliability, and excellence has shaped us into the trusted industry leader we are today.
            </p>
          </div>

          <motion.div
            ref={timelineRef}
            variants={containerVariants}
            initial="hidden"
            animate={timelineControls}
            className="max-w-5xl mx-auto relative"
          >
            {/* Modern vertical timeline with hex nodes */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-color-safety-orange/80 to-color-safety-orange/20 rounded-full"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="timeline-item relative flex items-stretch mb-24 last:mb-0"
              >
                {/* Timeline hexagonal node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-14 h-14 bg-color-black z-10 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-radial from-color-safety-orange to-color-safety-orange/80 rounded-lg rotate-45 flex items-center justify-center">
                    <div className="absolute -rotate-45">
                      <Icon name={milestone.icon} size="md" strokeWidth="regular" className="text-color-white" />
                    </div>
                  </div>
                </div>

                {/* Content box - alternating left and right with enhanced styling */}
                <motion.div
                  className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-10' : 'ml-auto pl-10'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`neo-card p-8 group border-l-4 border-color-safety-orange hover:shadow-glow-sm transition-all duration-300 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`text-color-safety-orange font-bold text-3xl ${index % 2 === 0 ? 'ml-auto' : ''}`}>{milestone.year}</div>
                      {index % 2 === 0 ? 
                        <div className="h-px w-16 bg-gradient-to-l from-color-safety-orange to-transparent mr-2"></div> : 
                        <div className="h-px w-16 bg-gradient-to-r from-color-safety-orange to-transparent ml-2"></div>
                      }
                    </div>
                    <h3 className="text-2xl font-bold text-color-white mb-3">{milestone.title}</h3>
                    <p className="text-color-white/80">{milestone.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
            
            {/* Future indicator */}
            <motion.div 
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-radial from-color-safety-orange to-color-safety-orange/80 rounded-full flex items-center justify-center pulse-animation">
                <Icon name="ArrowDown" size="sm" strokeWidth="regular" className="text-color-white" />
              </div>
              <span className="absolute mt-14 text-color-white/80 whitespace-nowrap">Continuing Our Journey</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-radial relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-color-safety-orange font-medium mb-3 tracking-wider">
              OUR TEAM
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-color-white mb-6">
              Meet Our <span className="text-gradient">Leadership</span>
            </h2>

            <div className="h-1 w-40 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-8"></div>
          </div>

          <motion.div
            ref={teamRef}
            variants={containerVariants}
            initial="hidden"
            animate={teamControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative h-80 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-center gap-4">
                        <motion.a
                          href={member.socials.linkedin}
                          className="w-10 h-10 rounded-full bg-color-safety-orange/20 flex items-center justify-center text-color-white hover:bg-color-safety-orange transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon name="Linkedin" size="sm" strokeWidth="regular" />
                        </motion.a>
                        <motion.a
                          href={member.socials.twitter}
                          className="w-10 h-10 rounded-full bg-color-safety-orange/20 flex items-center justify-center text-color-white hover:bg-color-safety-orange transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon name="Twitter" size="sm" strokeWidth="regular" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-color-white mb-1">{member.name}</h3>
                  <p className="text-color-safety-orange font-medium mb-2">{member.role}</p>
                  <p className="text-color-white/70 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="neo-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-color-white mb-6">
              Ready to Experience the <span className="text-gradient">Seaton Difference</span>?
            </h2>

            <p className="text-color-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join the growing number of businesses that trust Seaton Logistics for their equipment
              and logistics needs. Let&apos;s build something great together.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <LinkButton
                href="/contact"
                variant="primary"
                withGlow
                icon={{ name: "ArrowRight", size: "sm", strokeWidth: "regular" }}
                iconPosition="right"
              >
                Get Started
              </LinkButton>

              <LinkButton
                href="/services"
                variant="glass"
                icon={{ name: "ChevronRight", size: "sm", strokeWidth: "regular" }}
                iconPosition="right"
              >
                Our Services
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
