"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { animate, motion, useScroll, useTransform, MotionStyle, MotionValue } from 'framer-motion';
import Image from 'next/image';
// import ThemeToggle from '@/components/ui/ThemeToggle';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/providers/ThemeProvider';
import { LinkButton } from '../ui/Button';
import Icon from '@/components/ui/icons/IconProvider';

// Define a type for the navbar's custom CSS properties
interface NavbarCustomCSS extends MotionStyle {
  '--nav-opacity': MotionValue<number>;
  '--nav-blur': MotionValue<number>;
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Equipment', path: '/equipment' },
  { name: 'About', path: '/about' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [activeItem, setActiveItem] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { theme } = useTheme();
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [isHomePage ? 0.2 : 0.85, 0.95]);
  const navBlur = useTransform(scrollY, [0, 100], [4, 16]);

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
  // useEffect(() => {
  //   const path = pathname === '/' ? '/' : `/${pathname.split('/')[1]}`;
  //   const active = navLinks.find(link => link.path === path)?.name || '';
  //   setActiveItem(active);
  // }, [pathname]);

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
          ? 'py-3 shadow-lg border-b border-color-charcoal-gray'
          : isHomePage
            ? 'py-5 bg-transparent'
            : 'py-5'}`}
      style={{
        backgroundColor: 'rgba(10, 10, 10, var(--nav-opacity))',
        backdropFilter: `blur(var(--nav-blur)px)`,
        WebkitBackdropFilter: `blur(var(--nav-blur)px)`,
        '--nav-opacity': navOpacity,
        '--nav-blur': navBlur,
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'
      } as NavbarCustomCSS}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-11 h-11 overflow-hidden rounded-full shadow-md shadow-color-safety-orange/20">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="animate-glow-pulse"
              >
                <Image
                  src="/seaton-logo.png"
                  alt="Seaton Logistics"
                  fill
                  className="object-contain group-hover:filter group-hover:brightness-125 transition-all duration-300"
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
                {/* <span className="text-color-safety-orange text-xs">Reliability</span> */}
              </motion.span>
              <motion.span
                className="-mt-3"
                initial={{ y: 0 }}
                whileHover={{ y: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Logistics
                {/* <span className="text-color-safety-orange text-xs">Excellence</span> */}
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
                      'text-color-white hover:text-color-safety-orange hover-text-glow'}`}
                >
                  {link.name}
                  {isLinkActive(link.path) && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-color-safety-orange rounded-full shadow-glow animate-glow-pulse"
                      layoutId="navIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {/* Hover indicator */}
              <div
                ref={indicatorRef}
                className="absolute bottom-1 h-0.5 bg-color-safety-orange opacity-0 pointer-events-none rounded-full shadow-glow"
                style={{ width: 0 }}
              />

              {/* Theme Toggle */}
              {/* <ThemeToggle className="mr-2" /> */}

              {/* CTA Button */}
              <LinkButton
                href='/contact'
                variant="glass"
                withGlow
                icon={
                  <Icon 
                    name="MessageSquare" 
                    size="sm" 
                    strokeWidth="medium"
                  />
                }
                iconPosition="right"
              >
                Empower Your Business
              </LinkButton>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex items-center justify-center p-2 relative z-50 hover:bg-color-safety-orange/10 rounded-full"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <Icon 
              name={mobileMenuOpen ? "X" : "Menu"} 
              size="lg" 
              strokeWidth="regular"
              className="text-color-white"
            />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          ref={menuRef}
          className={`fixed inset-0 md:hidden z-40 bg-gradient-to-b from-color-black to-color-charcoal-gray-dark/95 backdrop-blur-lg p-6 pt-24 flex flex-col border-t border-color-safety-orange/10`}
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
                      ? 'text-color-safety-orange bg-color-safety-orange/10 shadow-glow'
                      : 'text-color-white hover:bg-color-safety-orange/5 hover:text-color-safety-orange'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-auto border-t border-color-safety-orange/10 pt-5 flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 20 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="flex items-center justify-between py-2">
                <span className="text-base font-medium text-color-white">
                  Toggle Theme
                </span>
                {/* <ThemeToggle /> */}
              </div>

              <LinkButton
                href="/contact"
                // onClick={() => setMobileMenuOpen(false)}
                variant="outline"
                className="w-full justify-center py-4"
                fullWidth
                withGlow
                icon={
                  <Icon 
                    name="MessageSquare" 
                    size="sm" 
                    strokeWidth="medium"
                  />
                }
                iconPosition="right"
              >
                Empower Your Business
              </LinkButton>
            </motion.div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
