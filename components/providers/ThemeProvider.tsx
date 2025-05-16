"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ResolvedTheme | undefined; // Can be undefined initially
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

// Helper function (run outside component for stability)
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'dark'; // Default on server
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'seaton-web',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Initial state read CANNOT use localStorage directly here reliably for SSR/initial render
    // The inline script handles the *initial* DOM class.
    // We'll read localStorage later in useEffect for the *React state*.
    // For initial state, just use the default prop.
    return defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme | undefined>(undefined);

  // Function to apply theme class and color-scheme property
  const applyTheme = useCallback((themeToApply: ResolvedTheme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(themeToApply);
    root.style.setProperty('color-scheme', themeToApply);
    setResolvedTheme(themeToApply);
  }, []);

  // Effect to read storage and sync initial React state + apply initial theme
  useEffect(() => {
    let initialPreference: Theme = defaultTheme;
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
        initialPreference = storedTheme;
      }
    } catch (e) {
      console.error('Error reading localStorage in useEffect', e);
    }
    setThemeState(initialPreference); // Sync React state with storage/default

    // Determine and apply the resolved theme based on the preference
    const resolved = initialPreference === 'system' ? getSystemTheme() : initialPreference;
    applyTheme(resolved);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Effect to handle theme changes (from UI or system preference change)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = () => {
      if (theme === 'system') {
        applyTheme(getSystemTheme());
      }
    };

    // Apply theme whenever the React 'theme' state changes
    if (theme !== 'system') {
      applyTheme(theme);
    } else {
      applyTheme(getSystemTheme()); // Apply current system theme if 'system' is selected
    }

    // Listen for system changes only if preference is 'system'
    if (theme === 'system') {
      mediaQuery.addEventListener('change', handleSystemChange);
    }

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme, applyTheme]); // Rerun when theme state changes

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      console.error("Error setting localStorage:", e);
    }
    setThemeState(newTheme); // Update React state, triggering the effect above
  }, [storageKey]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
