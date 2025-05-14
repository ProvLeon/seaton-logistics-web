"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';

const testimonials = [
  {
    quote: "Seaton Logistics has transformed our construction operations with their reliable equipment and excellent maintenance services. Their team always goes above and beyond.",
    author: "Michael Acheampong",
    position: "Operations Director",
    company: "GreenBuild Construction Ltd",
    image: "https://placehold.co/100x100?text=M.A",
  },
  {
    quote: "The training programs provided by Seaton Logistics have significantly improved our team's efficiency and safety standards. I couldn't recommend them more highly.",
    author: "Abena Mensah",
    position: "Safety Manager",
    company: "Golden Minerals Ghana",
    image: "https://placehold.co/100x100?text=A.M",
  },
  {
    quote: "We've been working with Seaton Logistics for three years now, and their consistent delivery and service quality has been exceptional. A true partner for our growth.",
    author: "Kwame Osei",
    position: "CEO",
    company: "Harvest Agro Solutions",
    image: "https://placehold.co/100x100?text=K.O",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Initialize animation when section comes into view
  useEffect(() => {
    if (inView && sliderRef.current) {
      anime({
        targets: sliderRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutQuad'
      });
    }
  }, [inView]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);

    const current = document.querySelector('.testimonial-active');
    const next = document.querySelector(`.testimonial-${index}`);

    if (current && next) {
      // Animate current slide out
      anime({
        targets: current,
        opacity: [1, 0],
        translateX: currentIndex < index ? [0, -30] : [0, 30],
        duration: 300,
        easing: 'easeInQuad',
      });

      // Animate next slide in
      anime({
        targets: next,
        opacity: [0, 1],
        translateX: currentIndex < index ? [30, 0] : [-30, 0],
        duration: 300,
        delay: 300,
        easing: 'easeOutQuad',
        complete: () => {
          setCurrentIndex(index);
          setIsAnimating(false);
        }
      });
    }
  };

  const nextSlide = () => {
    if (isAnimating) return;
    const nextIndex = (currentIndex + 1) % testimonials.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(prevIndex);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-color-charcoal-gray/90 to-color-navy-blue">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-color-white mb-5">
            What Our <span className="text-color-safety-orange">Clients</span> Say
          </h2>
          <p className="text-color-white/70 text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what some of our valued clients have to say about their experience working with Seaton Logistics.
          </p>
        </div>

        <div ref={sliderRef} className="max-w-4xl mx-auto relative">
          {/* Testimonials Slider */}
          <div className="relative h-[400px] md:h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-${index} absolute inset-0 p-8 md:p-12 bg-color-white/5 backdrop-blur-sm rounded-3xl border border-color-white/10 transition-opacity duration-300 ${index === currentIndex ? 'opacity-100 testimonial-active' : 'opacity-0 pointer-events-none'
                  }`}
                style={{ transform: 'translateX(0)' }}
              >
                <div className="flex flex-col md:flex-row gap-8 h-full">
                  <div className="md:w-1/4 flex flex-col items-center md:items-start">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-color-safety-orange">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="md:w-3/4 flex flex-col justify-center">
                    <div className="text-color-safety-orange text-6xl opacity-60">&ldquo;</div>
                    <p className="text-lg md:text-xl text-color-navy-blue italic mb-6">
                      {testimonial.quote}
                    </p>
                    <div>
                      <h4 className="font-bold text-color-navy-blue">{testimonial.author}</h4>
                      <p className="text-color-white/70 text-sm">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevSlide}
              className="bg-color-white/10 hover:bg-color-safety-orange/20 rounded-full p-3 transition-colors"
              disabled={isAnimating}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-color-white">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                    ? "bg-color-safety-orange w-8"
                    : "bg-color-white/30 hover:bg-color-white/50"
                    }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-color-white/10 hover:bg-color-safety-orange/20 rounded-full p-3 transition-colors"
              disabled={isAnimating}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-color-white">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
