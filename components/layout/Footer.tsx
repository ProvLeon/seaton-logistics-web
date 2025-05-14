"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es';

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const columnsRef = useRef<HTMLDivElement>(null);

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
  }, [inView]);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="bg-color-charcoal-gray relative z-10">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-10">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-color-navy-blue"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Footer top with logo and columns */}
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Logo and About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/seaton-logo.png"
                alt="Seaton Logistics"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div className="font-bold text-md text-color-white flex flex-col">
                Seaton <span className="-mt-2">Logistics</span>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-6">
              Premium equipment rentals, expert maintenance, and comprehensive training
              for construction, agriculture, mining, and security industries across Ghana.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  aria-label={link.label}
                  className="text-white/70 hover:text-color-safety-orange transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{link.label}</span>
                  <span dangerouslySetInnerHTML={{ __html: link.icon }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-color-white after:content-[''] after:block after:w-10 after:h-1 after:bg-color-safety-orange after:mt-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="text-white/70 hover:text-color-safety-orange transition-colors duration-300 flex items-center gap-2"
                  >
                    <span>&raquo;</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-color-white after:content-[''] after:block after:w-10 after:h-1 after:bg-color-safety-orange after:mt-2">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.url}
                    className="text-white/70 hover:text-color-safety-orange transition-colors duration-300 flex items-center gap-2"
                  >
                    <span>&raquo;</span> {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-color-white after:content-[''] after:block after:w-10 after:h-1 after:bg-color-safety-orange after:mt-2">
              Contact Us
            </h3>
            <address className="not-italic space-y-4 text-white/70">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-color-safety-orange mt-1" dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <span>{item.text}</span>
                </div>
              ))}
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-color-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Seaton Logistics. All rights reserved.
            </p>
            <div className="flex gap-5 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-white/60 text-sm hover:text-color-safety-orange transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-white/60 text-sm hover:text-color-safety-orange transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
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
