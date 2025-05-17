"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Define icon sizes
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type IconSizeMap = {
  [key in IconSize]: number;
};

const sizeMap: IconSizeMap = {
  'xs': 14,
  'sm': 16,
  'md': 20,
  'lg': 24,
  'xl': 32,
  '2xl': 48,
};

// Define stroke widths
export type StrokeWidth = 'thin' | 'regular' | 'medium' | 'bold';
type StrokeWidthMap = {
  [key in StrokeWidth]: number;
};

const strokeWidthMap: StrokeWidthMap = {
  'thin': 1,
  'regular': 1.5,
  'medium': 2,
  'bold': 2.5,
};

export interface IconProps {
  name: keyof typeof LucideIcons | string;
  size?: IconSize;
  strokeWidth?: StrokeWidth;
  className?: string;
  color?: string;
  ariaLabel?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  strokeWidth = 'regular',
  className = '',
  color,
  ariaLabel,
}) => {
  // Handle custom icon mappings
  const iconMap: Record<string, keyof typeof LucideIcons> = {
    "LinkedinIcon": "Linkedin",
    "TwitterIcon": "Twitter",
    "ShieldCheck": "Shield",
    "HeartHandshake": "Heart",
    "Flag": "Flag",
    "Map": "Map",
    "Lightbulb": "Lightbulb",
  };
  
  // Try to get the icon directly or via mapping
  let iconName = name as keyof typeof LucideIcons;
  if (!LucideIcons[iconName]) {
    iconName = (iconMap[name as string] || "HelpCircle") as keyof typeof LucideIcons;
  }
  
  const LucideIcon = LucideIcons[iconName] as LucideIcon;
  
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in Lucide icons and has no mapping`);
    return null;
  }

  return (
    <LucideIcon 
      size={sizeMap[size]} 
      strokeWidth={strokeWidthMap[strokeWidth]} 
      className={className}
      color={color}
      aria-label={ariaLabel}
    />
  );
};

export default Icon;