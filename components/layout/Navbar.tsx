"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { animate } from 'framer-motion';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Equipment', path: '/equipment' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hover indicator
  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    const indicator = indicatorRef.current;

    if (!indicator || navItems.length === 0) return;

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const parentRect = navRef.current ? navRef.current.getBoundingClientRect() : null;

      if (!parentRect) return;

      animate(indicator, {
        opacity: 1,
        width: rect.width,
        x: rect.left - parentRect.left,
      }, { duration: 0.3, ease: [0.65, 0, 0.35, 1] });
    };

    const handleMouseLeave = () => {
      animate(indicator, {
        opacity: 0,
      }, { duration: 0.2 });
    };

    navItems.forEach((item) => {
      item.addEventListener('mouseenter', handleMouseEnter);
    });

    const currentNavRef = navRef.current;

    currentNavRef?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      navItems.forEach((item) => {
        item.removeEventListener('mouseenter', handleMouseEnter);
      });

      currentNavRef?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;

    if (mobileMenuOpen) {
      animate(menuRef.current, {
        opacity: 1,
        y: 0,
      }, { duration: 0.3, ease: "easeOut" });
    } else {
      animate(menuRef.current, {
        opacity: 0,
        y: -20,
      }, { duration: 0.2, ease: "easeIn" });
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500
      ${isScrolled
          ? 'py-3 bg-color-white/95 dark:bg-color-charcoal-gray/95 shadow-md backdrop-blur-sm'
          : 'py-5 bg-transparent'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-11 h-11">
              <Image
                src="/seaton-logo.png"
                alt="Seaton Logistics"
                fill
                className="object-contain"
              />
            </div>
            <div className="font-bold text-xl text-color-navy-blue dark:text-color-white flex flex-col">
              Seaton <span className="-mt-3">Logistics</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" ref={navRef}>
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`nav-item relative py-1 text-lg font-medium transition-colors
                  ${isScrolled
                      ? 'text-color-charcoal-gray dark:text-color-white'
                      : 'text-color-white'}
                  hover:text-color-safety-orange`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Hover indicator */}
              <div
                ref={indicatorRef}
                className="absolute bottom-0 h-0.5 bg-color-safety-orange opacity-0 pointer-events-none"
                style={{ width: 0 }}
              />

              {/* Theme Toggle */}
              <ThemeToggle className="mr-2" />

              {/* CTA Button */}
              <a
                href="/contact"
                className="px-6 py-2 bg-color-safety-orange text-color-white rounded-full hover:bg-opacity-90 transition-all font-medium"
              >
                Get a Quote
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`block h-0.5 w-6 bg-color-navy-blue dark:bg-color-white transition-transform duration-300
              ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 bg-color-navy-blue dark:bg-color-white transition-opacity duration-300
              ${mobileMenuOpen ? 'opacity-0 w-0' : 'opacity-100 w-6'}`}
            />
            <span
              className={`block h-0.5 w-6 bg-color-navy-blue dark:bg-color-white transition-transform duration-300
              ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden py-5 opacity-0"
            style={{ transform: 'translateY(-20px)' }}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-lg font-medium text-color-charcoal-gray dark:text-color-white hover:text-color-safety-orange transition-colors py-2 border-b border-color-charcoal-gray/10 dark:border-color-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-between mt-4 mb-2">
                <ThemeToggle />
                <span className="text-color-charcoal-gray/60 dark:text-color-white/60 text-sm">
                  Toggle Theme
                </span>
              </div>
              <a
                href="/contact"
                className="mt-2 text-center px-6 py-3 bg-color-safety-orange text-white rounded-full hover:bg-opacity-90 transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
