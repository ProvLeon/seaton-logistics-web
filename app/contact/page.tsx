"use client";

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const { ref: pageRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const controls = useAnimation();
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: 'equipment-rental'
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      // In a real app, you'd handle the form submission here
      // For now, let's just simulate a successful submission
      setFormStatus('success');
      if (formRef.current) formRef.current.reset();
      setFormValues({
        name: '',
        email: '',
        company: '',
        message: '',
        service: 'equipment-rental'
      });
      
      // Reset the form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20" ref={pageRef}>
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-subtle noise-bg">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-mesh">
          <motion.div
            className="absolute top-20 -right-20 w-96 h-96 rounded-full bg-color-safety-orange/10 blur-3xl"
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
            className="absolute -bottom-20 left-1/4 w-64 h-64 rounded-full bg-color-safety-orange/10 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              className="inline-block text-color-safety-orange font-medium mb-3 tracking-wider"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              GET IN TOUCH
            </motion.span>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-color-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Let&apos;s <span className="text-gradient">Empower</span> Your Business
            </motion.h1>
            
            <motion.div
              className="h-1 w-40 bg-gradient-to-r from-color-safety-orange to-transparent mx-auto rounded-full mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            
            <motion.p
              className="text-lg text-color-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We're committed to understanding and exceeding your expectations. Contact us today 
              to discuss how we can provide tailored solutions for your business needs.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Information & Form Section */}
      <section className="py-20 bg-color-black relative">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,102,0,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-color-white mb-8">Contact Information</h2>
                <p className="text-color-white/70 text-lg mb-10">
                  Our team is ready to assist you with any questions about our equipment, maintenance services, or training programs. Reach out to us through any of the following channels.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-6 group">
                  <div className="p-4 rounded-lg bg-color-safety-orange/10 text-color-safety-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-color-white group-hover:text-color-safety-orange transition-colors">Our Location</h3>
                    <p className="text-color-white/70 mt-2">123 Business Avenue, Accra, Ghana</p>
                    <p className="text-color-white/70">Operating across Ghana with regional offices in Kumasi and Takoradi</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="p-4 rounded-lg bg-color-safety-orange/10 text-color-safety-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-color-white group-hover:text-color-safety-orange transition-colors">Phone Numbers</h3>
                    <p className="text-color-white/70 mt-2">Main Office: +233 (0) 30 123 4567</p>
                    <p className="text-color-white/70">Equipment Rentals: +233 (0) 30 123 4568</p>
                    <p className="text-color-white/70">Emergency Support: +233 (0) 30 123 4569</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="p-4 rounded-lg bg-color-safety-orange/10 text-color-safety-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-color-white group-hover:text-color-safety-orange transition-colors">Email Addresses</h3>
                    <p className="text-color-white/70 mt-2">General Inquiries: info@seatonlogistics.com</p>
                    <p className="text-color-white/70">Equipment Rentals: rentals@seatonlogistics.com</p>
                    <p className="text-color-white/70">Training Programs: training@seatonlogistics.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="p-4 rounded-lg bg-color-safety-orange/10 text-color-safety-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-color-white group-hover:text-color-safety-orange transition-colors">Business Hours</h3>
                    <p className="text-color-white/70 mt-2">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-color-white/70">Saturday: 9:00 AM - 2:00 PM</p>
                    <p className="text-color-white/70">24/7 Emergency Support Available</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="neo-card p-8 md:p-12 border border-color-safety-orange/10">
                <h2 className="text-2xl md:text-3xl font-bold text-color-white mb-8">Send Us a Message</h2>
                
                {formStatus === 'success' ? (
                  <div className="bg-color-safety-orange/20 p-6 rounded-lg text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-color-safety-orange mx-auto mb-4">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h3 className="text-xl font-bold text-color-white mb-2">Thank You!</h3>
                    <p className="text-color-white/80">
                      Your message has been received. Our team will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-color-white/90 mb-2">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formValues.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-color-charcoal-gray-light/30 border border-color-safety-orange/20 rounded-lg focus:outline-none focus:border-color-safety-orange text-color-white"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-color-white/90 mb-2">Your Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-color-charcoal-gray-light/30 border border-color-safety-orange/20 rounded-lg focus:outline-none focus:border-color-safety-orange text-color-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-color-white/90 mb-2">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formValues.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-color-charcoal-gray-light/30 border border-color-safety-orange/20 rounded-lg focus:outline-none focus:border-color-safety-orange text-color-white"
                        placeholder="Your Company Ltd."
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-color-white/90 mb-2">Service of Interest</label>
                      <select
                        id="service"
                        name="service"
                        value={formValues.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-color-charcoal-gray-light/30 border border-color-safety-orange/20 rounded-lg focus:outline-none focus:border-color-safety-orange text-color-white appearance-none"
                      >
                        <option value="equipment-rental">Equipment Rental</option>
                        <option value="maintenance">Maintenance Services</option>
                        <option value="training">Training Programs</option>
                        <option value="logistics">Logistics Solutions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-color-white/90 mb-2">Your Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formValues.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-color-charcoal-gray-light/30 border border-color-safety-orange/20 rounded-lg focus:outline-none focus:border-color-safety-orange text-color-white resize-none"
                        placeholder="Tell us about your requirements..."
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg"
                      fullWidth 
                      loading={formStatus === 'submitting'}
                      withGlow
                    >
                      {formStatus === 'submitting' ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-20 bg-gradient-subtle noise-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-color-white mb-4">Visit Our Office</h2>
            <p className="text-color-white/70 text-lg max-w-3xl mx-auto">
              Our headquarters is located in the heart of Accra, with easy access to major transportation routes.
            </p>
          </div>
          
          <div className="rounded-xl overflow-hidden h-[400px] relative glass-effect-dark p-2 neo-card">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-color-white/70 text-lg">Interactive map would be displayed here</p>
            </div>
            <Image
              src="/images/map-placeholder.jpg"
              alt="Seaton Logistics Office Location"
              fill
              style={{ objectFit: 'cover', opacity: 0.7 }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}