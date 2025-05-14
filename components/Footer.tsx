"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-color-navy-blue text-color-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image 
                src="/truck-icon.svg" 
                alt="Seaton Logistics" 
                width={40} 
                height={40} 
                className="h-10 w-auto"
              />
              <span className="font-bold text-xl">Seaton Logistics</span>
            </div>
            <p className="text-color-white/80 text-sm">
              Premium equipment rentals, expert maintenance, and comprehensive training for construction, agriculture, mining, and security industries.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-color-white hover:text-color-safety-orange transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="text-color-white hover:text-color-safety-orange transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                </svg>
              </a>
              <a href="#" className="text-color-white hover:text-color-safety-orange transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'Equipment', 'About Us', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-color-white/80 hover:text-color-safety-orange transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {['Equipment Rentals', 'Maintenance', 'Training', 'Logistics Solutions', 'Consulting'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/services#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-color-white/80 hover:text-color-safety-orange transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic space-y-3 text-color-white/80">
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-color-safety-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Accra, Ghana</span>
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-color-safety-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+233 (0) 30 123 4567</span>
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-color-safety-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@seatonlogistics.com</span>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-color-white/20 text-center text-color-white/60 text-sm">
          <p>© {new Date().getFullYear()} Seaton Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}