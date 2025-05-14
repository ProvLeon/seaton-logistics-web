import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  rounded?: boolean;
  loading?: boolean;
}

interface LinkButtonProps extends Omit<ButtonProps, 'onClick'> {
  href: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-color-safety-orange hover:bg-opacity-90 text-color-white shadow-sm',
  secondary: 'bg-color-navy-blue hover:bg-opacity-90 text-color-white shadow-sm',
  outline: 'bg-transparent border-2 border-color-navy-blue text-color-navy-blue hover:bg-color-navy-blue/5',
  ghost: 'bg-transparent text-color-navy-blue hover:bg-color-navy-blue/10'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-5 text-base',
  lg: 'py-3 px-7 text-lg'
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  rounded = true,
  disabled,
  loading,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-navy-blue disabled:opacity-60 disabled:cursor-not-allowed';
  const width = fullWidth ? 'w-full' : '';
  const radius = rounded ? 'rounded-full' : 'rounded-md';

  return (
    <button
      className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${width} 
        ${radius} 
        ${className}
      `}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  rounded = true,
  target,
  rel,
  ...props
}: LinkButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-navy-blue';
  const width = fullWidth ? 'w-full' : '';
  const radius = rounded ? 'rounded-full' : 'rounded-md';

  return (
    <Link
      href={href}
      className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${width} 
        ${radius} 
        ${className}
      `}
      target={target}
      rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </Link>
  );
}