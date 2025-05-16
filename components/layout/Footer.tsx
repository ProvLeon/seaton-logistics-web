"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';
import { motion } from 'framer-motion';

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });


  const columnsRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (inView && columnsRef.current) {
      anime({
        targets: columnsRef.current.children,
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuad'
      });
    }

    // Animate the wave
    if (waveRef.current) {
      anime({
        targets: waveRef.current,
        d: [
          'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z',
          'M321.39,76.44c58-15.79,114.16-40.13,172-51.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,45,906.67,82,985.66,102.83c70.05,18.48,146.53,26.09,214.34,3V0H0V37.35A600.21,600.21,0,0,0,321.39,76.44Z',
          'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
        ],
        duration: 8000,
        easing: 'easeInOutSine',
        loop: true
      });
    }
  }, [inView]);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="bg-gradient-subtle relative z-10 noise-bg ">
      {/* Top wave decoration with animation */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-color-safety-orange">
          <path ref={waveRef} d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-color-safety-orange/20"></path>
        </svg>
      </div>

      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-mesh">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-color-safety-orange/8 blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-color-safety-orange/8 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        {/* Footer top with logo and columns */}
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Logo and About */}
          <div>
            <div className="flex items-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ rotate: [0, -10, 0, -10, 0], scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-xl"
              >
                <Image
                  src="/seaton-logo.png"
                  alt="Seaton Logistics"
                  width={50}
                  height={50}
                  className="h-12 w-auto drop-shadow-lg group-hover:brightness-125 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-color-safety-orange/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              <div className="font-bold text-lg text-color-black flex flex-col tracking-wider">
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{ y: -2, x: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Seaton
                </motion.span>
                <motion.span
                  className="-mt-2"
                  initial={{ opacity: 1 }}
                  whileHover={{ y: 2, x: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Logistics
                </motion.span>
              </div>
            </div>
            <p className="text-color-white/70 text-sm mb-6 leading-relaxed">
              Premium equipment rentals, expert maintenance, and comprehensive training
              for construction, agriculture, mining, and security industries across Ghana.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  aria-label={link.label}
                  className="text-color-white/70 hover:text-color-safety-orange transition-colors duration-300 p-2 bg-color-black/30 hover:bg-color-safety-orange/10 rounded-lg hover-glow"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="sr-only">{link.label}</span>
                  <span dangerouslySetInnerHTML={{ __html: link.icon }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-color-white flex items-center">
              <span className="relative">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-3/4 h-1 bg-gradient-to-r from-color-safety-orange to-transparent rounded-full animate-pulse-glow"></span>
              </span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.url}
                    className="text-color-white/70 hover:text-color-safety-orange transition-colors duration-300 flex items-center gap-2 group hover-text-glow"
                  >
                    <span className="text-color-safety-orange transform group-hover:rotate-90 transition-transform duration-300">&raquo;</span>
                    <span className="group-hover:underline decoration-color-safety-orange/30 underline-offset-4">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-color-white flex items-center">
              <span className="relative">
                Our Services
                <span className="absolute -bottom-2 left-0 w-3/4 h-1 bg-gradient-to-r from-color-safety-orange to-transparent rounded-full animate-pulse-glow"></span>
              </span>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={service.url}
                    className="text-color-white/70 hover:text-color-safety-orange transition-colors duration-300 flex items-center gap-2 group hover-text-glow"
                  >
                    <span className="text-color-safety-orange transform group-hover:rotate-90 transition-transform duration-300">&raquo;</span>
                    <span className="group-hover:underline decoration-color-safety-orange/30 underline-offset-4">{service.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-color-white flex items-center">
              <span className="relative">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-3/4 h-1 bg-gradient-to-r from-color-safety-orange to-transparent rounded-full animate-pulse-glow"></span>
              </span>
            </h3>
            <address className="not-italic space-y-2 text-color-white/70">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 group p-2 rounded-lg hover:bg-color-safety-orange/10 transition-colors duration-300 hover-glow"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-color-safety-orange mt-1 group-hover:scale-110 transition-transform duration-300" dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-color-safety-orange/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-white/60 text-sm relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <span>&copy; {currentYear} Seaton Logistics. All rights reserved.</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-color-safety-orange group-hover:w-full transition-all duration-300"></span>
            </motion.p>
            <div className="flex gap-5 mt-4 md:mt-0">
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="/privacy-policy" className="text-white/60 text-sm hover:text-color-safety-orange hover-text-glow transition-colors relative group">
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-color-safety-orange group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="/terms" className="text-white/60 text-sm hover:text-color-safety-orange hover-text-glow transition-colors relative group">
                  Terms & Conditions
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-color-safety-orange group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-color-safety-orange/50 to-transparent animate-pulse-glow"></div>
      </div>
    </footer>
  );
}

// Data
const socialLinks = [
  {
    label: "Twitter",
    url: "#",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>'
  },
  {
    label: "LinkedIn",
    url: "#",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>'
  },
  {
    label: "Facebook",
    url: "#",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>'
  },
  {
    label: "Instagram",
    url: "#",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>'
  }
];

const quickLinks = [
  { label: "Home", url: "/" },
  { label: "About Us", url: "/about" },
  { label: "Equipment", url: "/equipment" },
  { label: "Testimonials", url: "/testimonials" },
  { label: "Contact", url: "/contact" }
];

const services = [
  { label: "Equipment Rentals", url: "/services#equipment-rentals" },
  { label: "Maintenance", url: "/services#maintenance" },
  { label: "Training", url: "/services#training" },
  { label: "Logistics Solutions", url: "/services#logistics-solutions" },
  { label: "Consulting", url: "/services#consulting" }
];

const contactInfo = [
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    text: "123 Business Avenue, Accra, Ghana"
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    text: "+233 (0) 30 123 4567"
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
    text: "info@seatonlogistics.com"
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    text: "Mon-Fri: 8:00 AM - 6:00 PM"
  }
];
