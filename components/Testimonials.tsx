"use client";

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "Seaton Logistics has been instrumental in helping our construction company grow. Their equipment reliability and maintenance services are top-notch.",
    author: "Michael Acheampong",
    position: "Operations Director",
    company: "GreenBuild Construction Ltd",
    image: "https://placehold.co/200x200?text=M.A",
  },
  {
    quote: "The training programs provided by Seaton Logistics have significantly improved our team's efficiency and safety standards. Highly recommended!",
    author: "Abena Mensah",
    position: "Safety Manager",
    company: "Golden Minerals Ghana",
    image: "https://placehold.co/200x200?text=A.M",
  },
  {
    quote: "We've been working with Seaton Logistics for three years now, and their consistent delivery and service quality has been exceptional throughout.",
    author: "Kwame Osei",
    position: "CEO",
    company: "Harvest Agro Solutions",
    image: "https://placehold.co/200x200?text=K.O",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
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
    
    // Animation for testimonial card changes
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5 }
    );
  }, { scope: sectionRef, dependencies: [currentIndex] });

  return (
    <section ref={sectionRef} className="py-20 bg-navy-blue text-white" id="testimonials">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef} 
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
        >
          What Our Clients Say
        </h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div 
            ref={cardRef}
            key={currentIndex} 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden border-4 border-safety-orange">
                <Image 
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <div className="flex-1">
                <svg className="text-safety-orange w-12 h-12 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                
                <p className="text-xl mb-6 italic">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>
                
                <div>
                  <p className="font-bold text-lg">{testimonials[currentIndex].author}</p>
                  <p className="text-white/70">
                    {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            {/* Indicator dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-safety-orange w-6"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}