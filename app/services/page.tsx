"use client";

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Icon from '@/components/ui/icons/IconProvider';
import { LinkButton } from '@/components/ui/Button';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  index: number;
}

const services = [
  {
    title: "Equipment Rental",
    description: "Access our premium fleet of well-maintained construction, mining, and agricultural equipment to power your operations.",
    icon: "Truck",
    image: "/images/sustainability-hero.jpg",
    features: [
      "Extensive fleet of modern equipment",
      "Flexible rental terms",
      "24/7 technical support",
      "GPS tracking and telematics",
      "Nationwide delivery",
      "Regular maintenance included"
    ],
    benefits: [
      "Reduce capital expenditure",
      "Scale operations efficiently",
      "Access latest technology",
      "Minimize downtime"
    ]
  },
  {
    title: "Expert Maintenance",
    description: "Keep your equipment running at peak performance with our comprehensive maintenance services and technical expertise.",
    icon: "Wrench",
    image: "/images/maintenance.jpg",
    features: [
      "Preventive maintenance programs",
      "Emergency repairs",
      "Performance optimization",
      "Component rebuilding",
      "Oil analysis and diagnostics",
      "Digital maintenance tracking"
    ],
    benefits: [
      "Extend equipment lifespan",
      "Prevent costly breakdowns",
      "Optimize performance",
      "Ensure safety compliance"
    ]
  },
  {
    title: "Safety Training",
    description: "Empower your team with comprehensive safety training and certification programs for optimal equipment operation.",
    icon: "GraduationCap",
    image: "/images/maintenance.jpg",
    features: [
      "Certified instructors",
      "Hands-on training",
      "Safety certifications",
      "Custom training programs",
      "Virtual reality simulations",
      "Regular refresher courses"
    ],
    benefits: [
      "Improve workplace safety",
      "Enhance operator skills",
      "Reduce accidents",
      "Meet regulatory requirements"
    ]
  },
  {
    title: "Industry Consulting",
    description: "Optimize your operations with our expert consulting services tailored to your industry needs and challenges.",
    icon: "LightbulbIcon",
    image: "/images/consulting.jpg",
    features: [
      "Equipment fleet planning",
      "Operational efficiency audits",
      "Sustainability planning",
      "Cost optimization",
      "Technology integration",
      "Safety program development"
    ],
    benefits: [
      "Optimize operations",
      "Reduce operating costs",
      "Improve sustainability",
      "Enhance productivity"
    ]
  }
];

function ServiceCard({ title, description, icon, image, features, benefits, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const setRefs = (element: HTMLDivElement | null) => {
    cardRef.current = element;
    inViewRef(element);
  };

  return (
    <motion.div
      ref={setRefs}
      className="neo-card overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.2 }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-color-black to-transparent opacity-60"></div>

        <motion.div
          className="absolute bottom-0 left-0 w-full p-6 flex items-center gap-4"
          animate={{
            y: isHovered ? -10 : 0,
            opacity: isHovered ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 rounded-xl bg-color-safety-orange/90 backdrop-blur-sm flex items-center justify-center">
            <Icon name={icon} size="lg" strokeWidth="regular" className="text-color-white" />
          </div>
          <h3 className="text-2xl font-bold text-color-white">{title}</h3>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center p-6 bg-color-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-color-white/90 text-lg text-center">{description}</p>
        </motion.div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold text-color-white mb-4 flex items-center gap-2">
              <Icon name="Check" size="sm" className="text-color-safety-orange" />
              Features
            </h4>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 text-color-white/70"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon name="ChevronRight" size="sm" className="text-color-safety-orange mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-color-white mb-4 flex items-center gap-2">
              <Icon name="Trophy" size="sm" className="text-color-safety-orange" />
              Benefits
            </h4>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 text-color-white/70"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Icon name="Star" size="sm" className="text-color-safety-orange mt-1 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-color-safety-orange/10">
          <LinkButton
            href={`/contact?service=${encodeURIComponent(title)}`}
            variant="glass"
            fullWidth
            icon={{ name: "ArrowRight", size: "sm" }}
            iconPosition="right"
          >
            Learn More About {title}
          </LinkButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const container = headerRef.current?.getBoundingClientRect();

    if (container) {
      const x = (clientX - container.left - container.width / 2) / 20;
      const y = (clientY - container.top - container.height / 2) / 20;
      setMousePosition({ x, y });
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-subtle relative overflow-hidden noise-bg">
        <div className="absolute inset-0 bg-gradient-mesh"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={headerRef}
            className="text-center max-w-4xl mx-auto"
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
              <motion.span
                className="inline-block text-color-safety-orange font-medium mb-3 tracking-wider"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                OUR SERVICES
              </motion.span>

              <motion.h1
                className="text-4xl md:text-6xl font-bold text-color-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Comprehensive <span className="text-gradient">Solutions</span><br />
                for Your Success
              </motion.h1>

              <motion.div
                className="h-1 w-40 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              <motion.p
                className="text-lg md:text-xl text-color-white/90 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                From premium equipment rentals to expert maintenance and comprehensive training,
                we provide end-to-end solutions that empower your business to operate efficiently,
                safely, and sustainably.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-gradient-radial relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            ref={ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-subtle relative overflow-hidden noise-bg">
        <div className="absolute inset-0 bg-gradient-mesh"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="neo-card p-12 text-center max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-color-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Ready to Transform Your <span className="text-gradient">Operations</span>?
            </motion.h2>

            <motion.p
              className="text-color-white/70 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Contact us today to discuss how our comprehensive services can help you achieve
              your business goals with enhanced efficiency and safety.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <LinkButton
                href="/contact"
                variant="primary"
                withGlow
                icon={{ name: "MessageSquare", size: "sm" }}
                iconPosition="right"
              >
                Get Started Today
              </LinkButton>

              <LinkButton
                href="/equipment"
                variant="glass"
                icon={{ name: "Truck", size: "sm" }}
                iconPosition="right"
              >
                View Equipment
              </LinkButton>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
