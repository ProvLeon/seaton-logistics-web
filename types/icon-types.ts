// icon-types.ts
import { LucideIcon } from 'lucide-react';

// Extend the IconNames type to include our custom icons
declare module 'lucide-react' {
  // This allows string-based icon names in our codebase
  interface IconProps {
    name?: string;
  }
}

/**
 * Define our custom icon names for better type safety
 * Include all icon names used in the application
 */
export type CustomIconName = 
  | 'Linkedin'
  | 'Twitter' 
  | 'LinkedinIcon'
  | 'TwitterIcon'
  | 'Flag'
  | 'Map'
  | 'Lightbulb'
  | 'Leaf'
  | 'ShieldCheck'
  | 'HeartHandshake'
  | 'Award'
  | 'Smartphone'
  | 'ArrowDown'
  | 'ArrowRight'
  | 'ChevronRight'
  | 'Shield'
  | 'Heart'
  | 'HelpCircle'
  | 'Star'
  | 'TreePine'
  | 'TrendingUp'
  | 'Battery'
  | 'ArrowDown01'
  | 'Truck'
  | 'Recycle'
  | 'Zap'
  | 'Droplet'
  | 'Users'
  | 'MessageSquare'
  | 'X'
  | 'Facebook'
  | 'Instagram'
  | 'Package'
  | string; // Allow any string for backward compatibility

export type ExtendedIconName = CustomIconName;