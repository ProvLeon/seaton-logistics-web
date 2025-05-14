"use client";

import React from 'react';
import Link from 'next/link';

type ServiceCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
};

const ServiceCard = ({ title, description, imageSrc, link }: ServiceCardProps) => {
  return (
    <div className="group bg-white dark:bg-navy-blue/20 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
      <div className="relative h-56 w-full overflow-hidden">
        {/* For demo purposes, we'll use a colored div since we don't have actual images */}
        <div 
          className="w-full h-full bg-gray-300 dark:bg-gray-700 group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundColor: imageSrc }}
        />
        {/* Uncomment this when you have actual images */}
        {/* <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        /> */}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-navy-blue dark:text-white">{title}</h3>
        <p className="text-charcoal-gray/80 dark:text-white/70 mb-4">{description}</p>
        <Link 
          href={link}
          className="inline-flex items-center font-medium text-safety-orange hover:text-safety-orange/80"
        >
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default function Services() {
  const services = [
    {
      title: "Equipment Rental",
      description: "High-quality construction, agriculture, mining, and security equipment available for short and long-term rental.",
      imageSrc: "#FF6600", // Replace with actual image path
      link: "/services/equipment-rental"
    },
    {
      title: "Maintenance & Repair",
      description: "Expert maintenance and repair services to keep your equipment running at optimal performance levels.",
      imageSrc: "#003366", // Replace with actual image path
      link: "/services/maintenance"
    },
    {
      title: "Operator Training",
      description: "Comprehensive training programs to ensure safe and efficient operation of specialized equipment.",
      imageSrc: "#333333", // Replace with actual image path
      link: "/services/training"
    },
    {
      title: "Logistics & Transport",
      description: "Efficient transportation of equipment to and from your project sites anywhere in Ghana.",
      imageSrc: "#555555", // Replace with actual image path
      link: "/services/logistics"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue dark:text-white">Our Services</h2>
          <p className="text-lg text-charcoal-gray/80 dark:text-white/70 max-w-2xl mx-auto">
            We provide comprehensive solutions tailored to your specific industry needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              link={service.link}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/services"
            className="inline-flex items-center justify-center bg-navy-blue text-white px-8 py-3 rounded-full font-medium hover:bg-navy-blue/90 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}