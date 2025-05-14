"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Equipment', path: '/equipment' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-charcoal-gray/90 shadow-lg backdrop-blur-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-48">
            {/* Replace with your actual logo */}
            <div className="font-bold text-2xl text-navy-blue dark:text-white">SEATON<span className="text-safety-orange">LOGISTICS</span></div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className="text-charcoal-gray dark:text-white hover:text-safety-orange font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/get-quote" 
            className="bg-safety-orange text-white px-5 py-2 rounded-full font-medium hover:bg-opacity-80 transition-all"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-charcoal-gray dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-charcoal-gray absolute top-full left-0 w-full shadow-lg">
          <div className="container mx-auto px-6 py-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-charcoal-gray dark:text-white hover:text-safety-orange font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/get-quote" 
              onClick={() => setMenuOpen(false)}
              className="block mt-4 bg-safety-orange text-white px-5 py-2 rounded-full font-medium hover:bg-opacity-80 transition-all text-center"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}