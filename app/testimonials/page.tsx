"use client";

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Icon from '@/components/ui/icons/IconProvider';
import { LinkButton } from '@/components/ui/Button';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  services: string[];
  impact: {
    label: string;
    value: string;
    icon: string;
  }[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Acheampong",
    position: "Operations Director",
    company: "GreenBuild Construction Ltd",
    image: "/images/testimonials/michael-a.jpg",
    quote: "Seaton Logistics has transformed our construction operations. Their equipment is always in pristine condition, and their responsive support team ensures we never face significant downtime. A true partner in our success.",
    rating: 5,
    services: ["Equipment Rental", "Maintenance", "Training"],
    impact: [
      { label: "Efficiency Increase", value: "35%", icon: "TrendingUp" },
      { label: "Cost Reduction", value: "25%", icon: "PiggyBank" },
      { label: "Project Completion", value: "2x Faster", icon: "Timer" }
    ]
  },
  {
    id: 2,
    name: "Abena Mensah",
    position: "Safety Manager",
    company: "Golden Minerals Ghana",
    image: "/images/testimonials/abena-m.jpg",
    quote: "The comprehensive training programs provided by Seaton Logistics have significantly improved our safety standards. Their commitment to excellence and safety is unmatched in the industry.",
    rating: 5,
    services: ["Safety Training", "Equipment Rental"],
    impact: [
      { label: "Safety Incidents", value: "-75%", icon: "Shield" },
      { label: "Staff Certified", value: "100%", icon: "GraduationCap" },
      { label: "Compliance Rate", value: "100%", icon: "CheckCircle" }
    ]
  },
  {
    id: 3,
    name: "Kwame Osei",
    position: "CEO",
    company: "Harvest Agro Solutions",
    image: "/images/testimonials/kwame-o.jpg",
    quote: "Working with Seaton Logistics has been a game-changer for our agricultural operations. Their modern equipment and expert maintenance services have helped us achieve unprecedented growth.",
    rating: 5,
    services: ["Equipment Rental", "Consulting", "Maintenance"],
    impact: [
      { label: "Yield Increase", value: "40%", icon: "LineChart" },
      { label: "Operating Costs", value: "-30%", icon: "DollarSign" },
      { label: "Equipment Uptime", value: "98%", icon: "Activity" }
    ]
  }
];

const successStories = [
  {
    title: "Construction Excellence",
    description: "How we helped GreenBuild Construction reduce project timelines by 50% while maintaining the highest safety standards.",
    image: "/images/success-stories/construction.jpg",
    category: "Construction",
    results: [
      "50% faster project completion",
      "35% cost reduction",
      "Zero safety incidents",
      "Improved team efficiency"
    ]
  },
  {
    title: "Mining Innovation",
    description: "Transforming Golden Minerals' operations with cutting-edge equipment and comprehensive safety training programs.",
    image: "/images/success-stories/mining.jpg",
    category: "Mining",
    results: [
      "75% reduction in incidents",
      "100% compliance rate",
      "40% efficiency increase",
      "Enhanced safety culture"
    ]
  },
  {
    title: "Agricultural Growth",
    description: "Supporting Harvest Agro Solutions' expansion with tailored equipment solutions and expert consulting services.",
    image: "/images/success-stories/agriculture.jpg",
    category: "Agriculture",
    results: [
      "40% yield improvement",
      "30% cost reduction",
      "98% equipment uptime",
      "Sustainable practices"
    ]
  }
];

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
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
      className="neo-card overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.2 }
        }
      }}
      whileHover={{
        y: -5,
        boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3), 0 0 5px rgba(255, 102, 0, 0.2)"
      }}
    >
      <div className="p-8">
        {/* Quote and Rating */}
        <div className="relative mb-8">
          <Icon
            name="Quote"
            size="xl"
            className="absolute -top-4 -left-2 text-color-safety-orange/20"
          />
          <p className="text-color-white/90 text-lg italic relative z-10 mb-4">
            {testimonial.quote}
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size="sm"
                className={i < testimonial.rating ? "text-color-safety-orange" : "text-color-white/20"}
              />
            ))}
          </div>
        </div>

        {/* Client Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-color-white">{testimonial.name}</h3>
            <p className="text-color-safety-orange">{testimonial.position}</p>
            <p className="text-color-white/70">{testimonial.company}</p>
          </div>
        </div>

        {/* Services Used */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-color-white/50 mb-2">Services Used</h4>
          <div className="flex flex-wrap gap-2">
            {testimonial.services.map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-color-safety-orange/10 text-color-safety-orange text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-3 gap-4">
          {testimonial.impact.map((metric, index) => (
            <div
              key={index}
              className="text-center p-3 rounded-xl bg-color-black/20 backdrop-blur-sm"
            >
              <Icon
                name={metric.icon}
                size="md"
                className="text-color-safety-orange mb-2 mx-auto"
              />
              <div className="text-xl font-bold text-color-white mb-1">{metric.value}</div>
              <div className="text-xs text-color-white/50">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SuccessStoryCard({
  title,
  description,
  image,
  category,
  results,
  index
}: typeof successStories[0] & { index: number }) {
  // const cardRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={inViewRef}
      className="neo-card overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.2 }
        }
      }}
    >
      <div className="relative h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-color-black to-transparent opacity-60"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-color-safety-orange/90 backdrop-blur-sm text-color-white text-sm font-medium">
          {category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-color-white mb-3">{title}</h3>
        <p className="text-color-white/70 mb-6">{description}</p>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-color-white mb-2 flex items-center gap-2">
            <Icon name="Target" size="sm" className="text-color-safety-orange" />
            Key Results
          </h4>
          {results.map((result, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-color-white/70"
            >
              <Icon name="Check" size="sm" className="text-color-safety-orange" />
              {result}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-color-safety-orange/10">
          <LinkButton
            href="/contact"
            variant="glass"
            fullWidth
            icon={{ name: "ArrowRight", size: "sm" }}
            iconPosition="right"
          >
            Learn More
          </LinkButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsPage() {
  // const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
                CLIENT SUCCESS
              </motion.span>

              <motion.h1
                className="text-4xl md:text-6xl font-bold text-color-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Real Results from <br />
                <span className="text-gradient">Real Clients</span>
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
                Discover how we&apos;ve helped businesses across Ghana achieve their goals
                through our premium equipment solutions and expert services.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scrolling indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{ opacity }}
        >
          <div className="flex flex-col items-center gap-2 text-color-white/50">
            <span className="text-sm">Scroll to explore</span>
            <Icon name="ChevronDown" size="md" className="animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 bg-gradient-radial relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-color-white mb-6">
              Client <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="text-color-white/70 text-lg max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our clients have to say
              about their experience working with Seaton Logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-subtle relative overflow-hidden noise-bg">
        <div className="absolute inset-0 bg-gradient-mesh"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-color-white mb-6">
              Success <span className="text-gradient">Stories</span>
            </h2>
            <p className="text-color-white/70 text-lg max-w-2xl mx-auto">
              Explore detailed case studies of how we&apos;ve helped our clients overcome
              challenges and achieve remarkable results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <SuccessStoryCard
                key={index}
                {...story}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-radial relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="neo-card p-12 text-center max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-color-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Ready to Write Your <span className="text-gradient">Success Story</span>?
            </motion.h2>

            <motion.p
              className="text-color-white/70 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Join our growing list of satisfied clients and experience the Seaton difference
              in equipment solutions and expert services.
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
                Start Your Journey
              </LinkButton>

              <LinkButton
                href="/equipment"
                variant="glass"
                icon={{ name: "Package", size: "sm" }}
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
