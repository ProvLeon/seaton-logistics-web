"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white dark:bg-charcoal-gray shadow-md py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10">
            <Image
              src="/seaton-logo.png"
              alt="Seaton Logistics"
              fill
              className="object-contain"
            />
          </div>
          <span className={`font-bold text-xl ${isScrolled ? 'text-navy-blue dark:text-white' : 'text-white'
            }`}>
            Seaton Logistics
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-8">
            {['Services', 'Equipment', 'About Us', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`font-medium transition-colors ${isScrolled
                    ? 'text-navy-blue dark:text-white hover:text-safety-orange'
                    : 'text-white hover:text-safety-orange'
                    }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className={isScrolled ? 'text-navy-blue dark:text-white' : 'text-white'}>
            {isMenuOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy-blue dark:bg-charcoal-gray">
          <nav className="container mx-auto px-4 py-5">
            <ul className="flex flex-col space-y-4">
              {['Services', 'Equipment', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-white hover:text-safety-orange font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
