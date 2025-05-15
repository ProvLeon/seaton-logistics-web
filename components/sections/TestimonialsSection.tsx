"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const testimonials = [
  {
    quote: "Seaton Logistics has transformed our construction operations with their reliable equipment and excellent maintenance services. Their team always goes above and beyond.",
    author: "Michael Acheampong",
    position: "Operations Director",
    company: "GreenBuild Construction Ltd",
    image: "https://placehold.co/100x100?text=M.A",
    rating: 5,
  },
  {
    quote: "The training programs provided by Seaton Logistics have significantly improved our team's efficiency and safety standards. I couldn't recommend them more highly.",
    author: "Abena Mensah",
    position: "Safety Manager",
    company: "Golden Minerals Ghana",
    image: "https://placehold.co/100x100?text=A.M",
    rating: 5,
  },
  {
    quote: "We've been working with Seaton Logistics for three years now, and their consistent delivery and service quality has been exceptional. A true partner for our growth.",
    author: "Kwame Osei",
    position: "CEO",
    company: "Harvest Agro Solutions",
    image: "https://placehold.co/100x100?text=K.O",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const sliderRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Auto-rotate testimonials
  useEffect(() => {
    const autoRotateTimer = setInterval(() => {
      if (!isAnimating) {
        setDirection(1);
        const nextIndex = (currentIndex + 1) % testimonials.length;
        goToSlide(nextIndex);
      }
    }, 8000);

    return () => clearInterval(autoRotateTimer);
  }, [currentIndex, isAnimating]);

  // Initialize animation when section comes into view
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          staggerChildren: 0.2
        }
      });

      if (sliderRef.current) {
        anime({
          targets: sliderRef.current,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          easing: 'easeOutQuad'
        });
      }
    }
  }, [inView, controls]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);

    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 500);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setDirection(1);
    const nextIndex = (currentIndex + 1) % testimonials.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setDirection(-1);
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(prevIndex);
  };

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#FF6600" : "none"}
          stroke="#FF6600"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-300 ${i < rating ? 'scale-110' : 'opacity-50'}`}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-color-charcoal-gray/90 to-color-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-80 h-80 rounded-full bg-color-safety-orange/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute -left-20 bottom-40 w-64 h-64 rounded-full bg-color-safety-orange/10 blur-3xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        {/* Quote mark decorative element */}
        <div className="absolute right-10 md:right-20 top-40 opacity-5">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V15C10 16.0609 9.57857 17.0783 8.82843 17.8284C8.07828 18.5786 7.06087 19 6 19H5"
              stroke="#FF6600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V15C20 16.0609 19.5786 17.0783 18.8284 17.8284C18.0783 18.5786 17.0609 19 16 19H15"
              stroke="#FF6600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={controls}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
        >
          <motion.span
            className="inline-block text-color-safety-orange/60 font-medium mb-3 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            TESTIMONIALS
          </motion.span>

          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-color-black mb-5 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            What Our <span className="text-gradient relative">
              Clients
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-color-safety-orange to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span> Say
          </motion.h2>

          <motion.p
            className="text-color-black/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Don&apos;t just take our word for it. Here&apos;s what some of our valued clients have to say
            about their experience working with Seaton Logistics.
          </motion.p>
        </motion.div>

        <motion.div
          ref={sliderRef}
          className="max-w-4xl mx-auto relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Testimonials Slider */}
          <div className="relative h-[450px] md:h-[320px]">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              {testimonials.map((testimonial, index) => (
                index === currentIndex && (
                  <motion.div
                    key={index}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      x: direction > 0 ? 100 : -100
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    exit={{
                      opacity: 0,
                      x: direction > 0 ? -100 : 100,
                      transition: {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    className="absolute inset-0 p-8 md:p-12 rounded-3xl"
                  >
                    <div className="glass-effect dark:glass-effect-dark rounded-3xl p-8 border border-color-white/10 shadow-xl h-full">
                      <div className="flex flex-col md:flex-row gap-8 h-full">
                        <div className="md:w-1/4 flex flex-col items-center md:items-start">
                          <motion.div
                            className="relative w-24 h-24 rounded-xl overflow-hidden shadow-lg"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Image
                              src={testimonial.image}
                              alt={testimonial.author}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-color-black/50 to-transparent"></div>
                          </motion.div>
                          <StarRating rating={testimonial.rating} />
                        </div>

                        <div className="md:w-3/4 flex flex-col justify-center">
                          <div className="text-color-safety-orange text-7xl opacity-70 absolute -top-2 -left-2">&ldquo;</div>
                          <p className="text-lg md:text-xl text-color-black italic mb-6 relative z-10">
                            {testimonial.quote}
                          </p>
                          <div className="border-t border-color-white/10 pt-4">
                            <h4 className="font-bold text-color-black text-lg">{testimonial.author}</h4>
                            <p className="text-color-safety-orange/80 text-sm font-medium">
                              {testimonial.position}
                            </p>
                            <p className="text-color-black/60 text-sm">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Enhanced Navigation Controls */}
          <div className="flex justify-between items-center mt-10">
            <motion.button
              onClick={prevSlide}
              className="glass-effect dark:glass-effect-dark rounded-full p-4 transition-all duration-300 hover:scale-110"
              disabled={isAnimating}
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-color-black">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>

            <div className="flex gap-4">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`relative h-3 rounded-full transition-all ${index === currentIndex
                    ? "bg-color-safety-orange w-10"
                    : "bg-color-white/30 w-3 hover:bg-color-white/50"
                    }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentIndex && (
                    <motion.span
                      className="absolute inset-0 bg-color-safety-orange rounded-full opacity-50"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="glass-effect dark:glass-effect-dark rounded-full p-4 transition-all duration-300 hover:scale-110"
              disabled={isAnimating}
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-color-black">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
