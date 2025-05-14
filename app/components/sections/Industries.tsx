"use client";

import React, { useState } from 'react';

type IndustryProps = {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  benefits: string[];
  isActive: boolean;
  onClick: () => void;
};

const IndustryCard = ({ title, description, icon, bgColor, benefits, isActive, onClick }: IndustryProps) => {
  return (
    <div 
      className={`rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'bg-navy-blue text-white shadow-lg transform scale-[1.02]' 
          : 'bg-white/70 dark:bg-charcoal-gray/20 text-charcoal-gray dark:text-white hover:bg-white dark:hover:bg-charcoal-gray/30'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
            isActive ? 'bg-white' : `bg-${bgColor}-100 dark:bg-${bgColor}-900/30`
          }`}
        >
          <div 
            className={isActive ? 'text-navy-blue' : `text-${bgColor}-600 dark:text-${bgColor}-400`} 
            dangerouslySetInnerHTML={{ __html: icon }} 
          />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      <p className={`mb-4 ${isActive ? 'text-white/90' : 'text-charcoal-gray/80 dark:text-white/70'}`}>
        {description}
      </p>
      
      {isActive && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Key Benefits:</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-safety-orange flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function Industries() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  
  const industries = [
    {
      title: "Construction",
      description: "Supporting construction projects with reliable heavy equipment and specialized vehicles.",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z"/></svg>',
      bgColor: "blue",
      benefits: [
        "Reduce downtime with reliable equipment",
        "Access to specialized machinery without capital investment",
        "On-site training for your operators",
        "Flexible rental terms to match project timelines"
      ]
    },
    {
      title: "Agriculture",
      description: "Empowering farmers with modern agricultural machinery and specialized equipment.",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>',
      bgColor: "green",
      benefits: [
        "Increase yield with modern farming equipment",
        "Seasonal rental options to match harvest cycles",
        "Reduced maintenance costs and operational expenses",
        "Expert advice on equipment selection for your crops"
      ]
    },
    {
      title: "Mining",
      description: "Providing robust mining equipment and safety solutions for the extractive industry.",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/></svg>',
      bgColor: "yellow",
      benefits: [
        "Safety-focused equipment and training solutions",
        "Durable machinery designed for harsh environments",
        "Comprehensive maintenance services to minimize downtime",
        "Customized solutions for different mining operations"
      ]
    },
    {
      title: "Security",
      description: "Enhancing security operations with specialized vehicles and equipment.",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>',
      bgColor: "red",
      benefits: [
        "Fleet solutions for security companies",
        "Advanced equipment for surveillance and monitoring",
        "Specialized training for security personnel",
        "24/7 support for mission-critical operations"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-light-gray to-white dark:from-charcoal-gray/10 dark:to-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue dark:text-white">Industries We Serve</h2>
          <p className="text-lg text-charcoal-gray/80 dark:text-white/70 max-w-2xl mx-auto">
            Tailored solutions to meet the specific needs of diverse industries across Ghana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              title={industry.title}
              description={industry.description}
              icon={industry.icon}
              bgColor={industry.bgColor}
              benefits={industry.benefits}
              isActive={index === activeIndustry}
              onClick={() => setActiveIndustry(index)}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/industries" 
            className="inline-flex items-center justify-center bg-safety-orange text-white px-8 py-3 rounded-full font-medium hover:bg-safety-orange/90 transition-colors"
          >
            Explore Industries
          </a>
        </div>
      </div>
    </section>
  );
}