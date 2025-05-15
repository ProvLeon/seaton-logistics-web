"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { motion } from 'framer-motion';

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-color-black/10 dark:bg-color-white/10 ${className}`}>
        <div className="w-5 h-5 bg-color-charcoal-gray/20 dark:bg-color-white/20 rounded-full animate-pulse"></div>
      </div>
    );
  }

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`cursor-pointer w-12 h-12 rounded-full flex items-center justify-center
        bg-gradient-to-br from-color-safety-orange/20 to-color-white/5 dark:from-color-white/20 dark:to-color-black/5
        backdrop-blur-sm border border-black/10
        shadow-lg hover:shadow-color-safety-orange/20
        transition-all duration-300 ${className}
        relative overflow-hidden
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Background glow effect */}
      <span className="absolute inset-0 bg-gradient-to-tr from-color-safety-orange/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 blur-md"></span>

      {/* The actual icons with animations */}
      <motion.div
        initial={false}
        animate={{ rotateZ: theme === 'dark' ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative"
      >
        {theme === 'dark' ? (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-color-white"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </motion.svg>
        ) : (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-color-black"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </motion.svg>
        )}
      </motion.div>
    </motion.button>
  );
}
