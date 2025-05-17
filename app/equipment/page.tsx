"use client";

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Icon from '@/components/ui/icons/IconProvider';
import { Button, LinkButton } from '@/components/ui/Button';

interface Equipment {
  name: string;
  category: string;
  description: string;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
  dailyRate: string;
  weeklyRate: string;
  monthlyRate: string;
  availability: 'available' | 'limited' | 'unavailable';
  features: string[];
}

interface CategoryFilter {
  name: string;
  icon: string;
  count: number;
}

const categories: CategoryFilter[] = [
  { name: 'All Equipment', icon: 'Package', count: 24 },
  { name: 'Construction', icon: 'Truck', count: 8 },
  { name: 'Mining', icon: 'Hammer', count: 6 },
  { name: 'Agriculture', icon: 'Tractor', count: 5 },
  { name: 'Material Handling', icon: 'Container', count: 3 },
  { name: 'Utility Vehicles', icon: 'Car', count: 2 },
];

const equipment: Equipment[] = [
  {
    name: 'Excavator X2000',
    category: 'Construction',
    description: 'Heavy-duty excavator perfect for large construction projects with advanced hydraulic system and superior digging capabilities.',
    image: '/images/equipment/excavator.jpg',
    specs: [
      { label: 'Operating Weight', value: '20,000 kg' },
      { label: 'Engine Power', value: '157 hp' },
      { label: 'Max Digging Depth', value: '6.5 m' },
      { label: 'Bucket Capacity', value: '0.8-1 m³' }
    ],
    dailyRate: '$450',
    weeklyRate: '$2,700',
    monthlyRate: '$9,000',
    availability: 'available',
    features: [
      'GPS tracking system',
      'Air-conditioned cabin',
      'LED work lights',
      'Quick coupler system',
      'Eco mode for fuel efficiency'
    ]
  },
  {
    name: 'Wheel Loader WL450',
    category: 'Construction',
    description: 'Versatile wheel loader with excellent maneuverability and lifting capacity, ideal for material handling and construction sites.',
    image: '/images/equipment/loader.jpg',
    specs: [
      { label: 'Operating Weight', value: '15,000 kg' },
      { label: 'Engine Power', value: '220 hp' },
      { label: 'Bucket Capacity', value: '3.0 m³' },
      { label: 'Lift Height', value: '4.2 m' }
    ],
    dailyRate: '$400',
    weeklyRate: '$2,400',
    monthlyRate: '$8,000',
    availability: 'limited',
    features: [
      'Joystick steering',
      'Reversing camera',
      'Auto-idle system',
      'Load weighing system',
      'Climate control'
    ]
  },
  {
    name: 'Mining Dump Truck MD800',
    category: 'Mining',
    description: 'High-capacity mining dump truck designed for heavy-duty applications with advanced safety features and reliable performance.',
    image: '/images/equipment/dump-truck.jpg',
    specs: [
      { label: 'Payload Capacity', value: '80 tons' },
      { label: 'Engine Power', value: '850 hp' },
      { label: 'Body Volume', value: '60 m³' },
      { label: 'Max Speed', value: '65 km/h' }
    ],
    dailyRate: '$800',
    weeklyRate: '$4,800',
    monthlyRate: '$16,000',
    availability: 'available',
    features: [
      'Advanced traction control',
      'Payload monitoring',
      'Collision avoidance system',
      'Tire monitoring system',
      'Hill assist'
    ]
  },
  // Add more equipment items...
];

function EquipmentCard({ 
  name, 
  category, 
  description, 
  image, 
  specs, 
  dailyRate, 
  weeklyRate, 
  monthlyRate,
  availability,
  features,
  index 
}: Equipment & { index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
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
          transition: { duration: 0.6, delay: index * 0.1 }
        }
      }}
    >
      <div className="relative h-64">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-color-black to-transparent opacity-60"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-color-safety-orange/90 backdrop-blur-sm text-color-white text-sm font-medium flex items-center gap-2">
          <Icon name="Tag" size="sm" strokeWidth="regular" />
          {category}
        </div>

        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-sm text-sm font-medium flex items-center gap-2 
          ${availability === 'available' ? 'bg-green-500/90 text-white' : 
            availability === 'limited' ? 'bg-yellow-500/90 text-white' : 
            'bg-red-500/90 text-white'}`}>
          <Icon 
            name={availability === 'available' ? 'Check' : 
              availability === 'limited' ? 'Clock' : 'X'} 
            size="sm" 
            strokeWidth="regular" 
          />
          {availability.charAt(0).toUpperCase() + availability.slice(1)}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6">
          <h3 className="text-2xl font-bold text-color-white mb-2">{name}</h3>
          <p className="text-color-white/90 line-clamp-2">{description}</p>
        </div>
      </div>

      <div className="p-6">
        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {specs.map((spec, index) => (
            <div key={index} className="text-color-white/70">
              <div className="text-sm font-medium text-color-safety-orange">{spec.label}</div>
              <div className="font-semibold">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Rates */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-color-charcoal-gray-dark rounded-xl mb-6">
          <div className="text-center">
            <div className="text-sm text-color-white/70">Daily</div>
            <div className="text-lg font-bold text-color-safety-orange">{dailyRate}</div>
          </div>
          <div className="text-center border-x border-color-white/10">
            <div className="text-sm text-color-white/70">Weekly</div>
            <div className="text-lg font-bold text-color-safety-orange">{weeklyRate}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-color-white/70">Monthly</div>
            <div className="text-lg font-bold text-color-safety-orange">{monthlyRate}</div>
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="border-t border-color-safety-orange/10 pt-4 mb-4">
            <h4 className="text-lg font-semibold text-color-white mb-3">Key Features</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-color-white/70">
                  <Icon name="Check" size="sm" className="text-color-safety-orange" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="glass"
            onClick={() => setIsExpanded(!isExpanded)}
            icon={{ 
              name: isExpanded ? "ChevronUp" : "ChevronDown",
              size: "sm"
            }}
            iconPosition="right"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
          
          <LinkButton
            href={`/contact?equipment=${encodeURIComponent(name)}`}
            variant="primary"
            withGlow
            icon={{ name: "MessageSquare", size: "sm" }}
            iconPosition="right"
          >
            Request Quote
          </LinkButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState('All Equipment');
  const [searchQuery, setSearchQuery] = useState('');
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredEquipment = equipment.filter(item => {
    const matchesCategory = activeCategory === 'All Equipment' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                OUR EQUIPMENT
              </motion.span>
              
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-color-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Premium <span className="text-gradient">Equipment</span><br />
                For Every Project
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
                Access our extensive fleet of well-maintained equipment for construction,
                mining, and agricultural operations. All equipment comes with comprehensive
                support and maintenance services.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                className="max-w-2xl mx-auto relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search equipment..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 rounded-full bg-color-black/50 border border-color-safety-orange/20 text-color-white placeholder-color-white/50 focus:outline-none focus:border-color-safety-orange/50 backdrop-blur-lg"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Icon name="Search" size="md" className="text-color-safety-orange" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-12 bg-gradient-radial relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300
                  ${activeCategory === category.name 
                    ? 'bg-color-safety-orange text-color-white shadow-lg'
                    : 'bg-color-black/50 text-color-white/70 hover:bg-color-safety-orange/10'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name={category.icon} size="sm" />
                <span>{category.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-color-black/20 text-sm">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="py-24 bg-gradient-radial relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEquipment.map((item, index) => (
              <EquipmentCard key={index} {...item} index={index} />
            ))}
          </div>

          {filteredEquipment.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Search" size="xl" className="text-color-safety-orange/50 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-color-white mb-2">No Equipment Found</h3>
              <p className="text-color-white/70">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
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
              Need Help Finding the Right <span className="text-gradient">Equipment</span>?
            </motion.h2>
            
            <motion.p
              className="text-color-white/70 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Our equipment specialists are here to help you choose the perfect equipment
              for your project needs and budget.
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
                Contact an Expert
              </LinkButton>
              
              <LinkButton
                href="/services"
                variant="glass"
                icon={{ name: "Wrench", size: "sm" }}
                iconPosition="right"
              >
                View Our Services
              </LinkButton>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}