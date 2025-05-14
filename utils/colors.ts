// colors.ts - Utility functions for working with Seaton Logistics brand colors

/**
 * Brand color definitions for consistent usage across the application
 */
export const COLORS = {
  navyBlue: '#003366',
  charcoalGray: '#333333',
  safetyOrange: '#FF6600',
  white: '#FFFFFF',
  lightGray: '#f7f7f7',
};

/**
 * Utility function to get a color with opacity
 * @param color The base color (use COLORS constants)
 * @param opacity Value between 0 and 1
 * @returns RGBA color string
 */
export function withOpacity(color: string, opacity: number): string {
  // Convert hex to rgb
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Returns CSS variable reference for use in inline styles
 * @param colorName Color variable name (without the --color- prefix)
 * @returns CSS variable reference
 */
export function cssVar(colorName: 'navy-blue' | 'charcoal-gray' | 'safety-orange' | 'white' | 'light-gray'): string {
  return `var(--color-${colorName})`;
}

/**
 * Get the appropriate text color (white or dark) based on background color
 * @param bgColor Background color to check against
 * @returns Text color that provides adequate contrast
 */
export function getContrastText(bgColor: string): string {
  // Convert hex to rgb
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  
  // Calculate luminance using the formula: 0.299R + 0.587G + 0.114B
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark backgrounds, and dark for light backgrounds
  return luminance > 0.5 ? COLORS.charcoalGray : COLORS.white;
}

/**
 * Return CSS class name for brand-specific styling
 */
export function getBrandClasses(options: {
  element: 'button' | 'card' | 'heading' | 'text';
  variant?: 'primary' | 'secondary' | 'outline';
}): string {
  const { element, variant = 'primary' } = options;
  
  switch (element) {
    case 'button':
      if (variant === 'primary') {
        return 'bg-color-safety-orange text-color-white hover:bg-opacity-90 font-medium transition-all';
      } else if (variant === 'secondary') {
        return 'bg-color-navy-blue text-color-white hover:bg-opacity-90 font-medium transition-all';
      } else {
        return 'bg-transparent border-2 border-color-white text-color-navy-blue hover:bg-color-light-gray font-medium transition-all';
      }
    case 'card':
      return 'border border-color-light-gray rounded-lg shadow-sm overflow-hidden';
    case 'heading':
      return 'text-color-navy-blue font-bold';
    case 'text':
      return 'text-color-charcoal-gray';
    default:
      return '';
  }
}