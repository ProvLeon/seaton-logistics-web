"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { animate, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button, LinkButton } from '../ui/Button';

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
  const [activeItem, setActiveItem] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { theme } = useTheme();
  const router = useRouter();
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [isHomePage ? 0 : 0.8, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 8]);

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Call once on theme change to force update
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]); // Re-run when theme changes

  // Set active item based on pathname
  useEffect(() => {
    const path = pathname === '/' ? '/' : `/${pathname.split('/')[1]}`;
    const active = navLinks.find(link => link.path === path)?.name || '';
    setActiveItem(active);
  }, [pathname]);

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
    <motion.header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500
      ${isScrolled
          ? 'py-3 shadow-lg'
          : isHomePage
            ? 'py-5 bg-transparent'
            : 'py-5'}`}
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, var(--nav-opacity))' : 'rgba(255, 255, 255, var(--nav-opacity))',
        backdropFilter: `blur(var(--nav-blur)px)`,
        WebkitBackdropFilter: `blur(var(--nav-blur)px)`,
        '--nav-opacity': navOpacity,
        '--nav-blur': navBlur
      } as any}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-11 h-11 overflow-hidden rounded-full">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/seaton-logo.png"
                  alt="Seaton Logistics"
                  fill
                  className="object-contain group-hover:filter group-hover:brightness-110 transition-all duration-300"
                />
              </motion.div>
            </div>
            <div className={`font-bold text-xl flex flex-col text-color-black dark:text-color-white`}>
              <motion.span
                initial={{ y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Seaton
              </motion.span>
              <motion.span
                className="-mt-3"
                initial={{ y: 0 }}
                whileHover={{ y: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Logistics
              </motion.span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" ref={navRef}>
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`nav-item relative py-1 text-lg font-semibold transition-all duration-300
                  ${isLinkActive(link.path)
                      ? 'text-color-safety-orange' :
                      'text-color-black dark:text-color-white hover:text-color-safety-orange'}`}
                >
                  {link.name}
                  {isLinkActive(link.path) && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-color-safety-orange rounded-full"
                      layoutId="navIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {/* Hover indicator */}
              <div
                ref={indicatorRef}
                className="absolute bottom-0 h-0.5 bg-color-safety-orange opacity-0 pointer-events-none rounded-full"
                style={{ width: 0 }}
              />

              {/* Theme Toggle */}
              <ThemeToggle className="mr-2" />

              {/* CTA Button */}
              <LinkButton
                href='/contact'
                variant="glass"
                withGlow
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                }
                iconPosition="right"
              >
                Get a Quote
              </LinkButton>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className={`block h-0.5 transition-all duration-300 rounded-full
              ${theme === 'dark' ? 'bg-color-white' : 'bg-color-black'}`}
              animate={{
                width: mobileMenuOpen ? '6px' : '24px',
                rotate: mobileMenuOpen ? '45deg' : '0deg',
                translateY: mobileMenuOpen ? '8px' : '0px',
                translateX: mobileMenuOpen ? '8px' : '0px'
              }}
            />
            <motion.span
              className={`block h-0.5 transition-all duration-300 rounded-full
              ${theme === 'dark' ? 'bg-color-white' : 'bg-color-black'}`}
              animate={{
                width: mobileMenuOpen ? '0px' : '18px',
                opacity: mobileMenuOpen ? 0 : 1
              }}
            />
            <motion.span
              className={`block h-0.5 transition-all duration-300 rounded-full
              ${theme === 'dark' ? 'bg-color-white' : 'bg-color-black'}`}
              animate={{
                width: mobileMenuOpen ? '6px' : '12px',
                rotate: mobileMenuOpen ? '-45deg' : '0deg',
                translateY: mobileMenuOpen ? '-8px' : '0px',
                translateX: mobileMenuOpen ? '8px' : '0px'
              }}
            />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          ref={menuRef}
          className={`fixed inset-0 md:hidden z-40 bg-gradient-to-b ${theme === 'dark' ? 'from-color-black to-color-black/95' : 'from-color-white to-color-white/95'} backdrop-blur-md p-6 pt-24 flex flex-col`}
          initial={{ clipPath: 'circle(0% at calc(100% - 32px) 32px)', opacity: 0 }}
          animate={{
            clipPath: mobileMenuOpen ? 'circle(150% at calc(100% - 32px) 32px)' : 'circle(0% at calc(100% - 32px) 32px)',
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{
            type: "spring",
            damping: 40,
            stiffness: 300,
            duration: 0.5
          }}
        >
          <nav className="flex flex-col gap-4 h-full">
            <motion.div className="space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : -20 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.path}
                    className={`block text-xl font-medium transition-all duration-300 py-3 px-2 rounded-lg ${isLinkActive(link.path)
                      ? 'text-color-safety-orange bg-color-safety-orange/10'
                      : theme === 'dark' ? 'text-color-white hover:bg-color-white/5' : 'text-color-black hover:bg-color-black/5'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-5 flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 20 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="flex items-center justify-between py-2">
                <span className={`text-base font-medium ${theme === 'dark' ? 'text-color-white' : 'text-color-black'}`}>
                  Toggle Theme
                </span>
                <ThemeToggle />
              </div>

              <LinkButton
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                variant="outline"
                className="w-full justify-center py-4"
                fullWidth
                withGlow
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                }
                iconPosition="right"
              >
                Get a Quote
              </LinkButton>
            </motion.div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
