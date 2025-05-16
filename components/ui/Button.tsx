import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  rounded?: boolean;
  loading?: boolean;
  withRipple?: boolean;
  withHoverScale?: boolean;
  withGlow?: boolean;
}

interface LinkButtonProps extends Omit<ButtonProps, 'onClick'> {
  href: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-color-safety-orange hover:bg-opacity-90 text-color-white shadow-md hover:shadow-lg hover:shadow-color-safety-orange/30 border border-color-safety-orange/20 backdrop-blur-sm',
  secondary: 'bg-gradient-subtle hover:bg-opacity-90 text-color-white shadow-md hover:shadow-lg hover:shadow-color-black/40 border border-color-black/20',
  outline: 'bg-transparent border-2 border-color-safety-orange text-color-safety-orange hover:bg-color-safety-orange/10 backdrop-blur-sm',
  ghost: 'bg-transparent text-color-white hover:bg-color-white/5 hover:text-color-safety-orange transition-colors',
  glass: 'glass-effect-dark text-color-white border border-color-safety-orange/20 hover:border-color-safety-orange/40 hover:bg-color-black/50 shadow-lg'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'py-1 px-4 text-sm',
  md: 'py-2 px-6 text-base',
  lg: 'py-3 px-8 text-lg',
  xl: 'py-4 px-10 text-xl'
};

interface RippleEffect {
  x: number;
  y: number;
  size: number;
  id: number;
}

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
  withRipple = true,
  withHoverScale = true,
  withGlow = variant === 'primary',
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  // const [isHovered, setIsHovered] = useState(false);

  const baseStyles = 'group inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-color-safety-orange focus:ring-offset-color-black disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer overflow-hidden relative';
  const width = fullWidth ? 'w-full' : '';
  const radius = rounded ? 'rounded-full' : 'rounded-md';
  const scale = withHoverScale ? 'hover:scale-105' : '';
  const glow = withGlow ? 'hover:after:opacity-100 after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-r after:from-color-safety-orange/40 after:to-color-safety-orange-dark/20 after:opacity-0 after:blur-xl after:transition-opacity after:duration-500 after:-z-10 animate-glow-pulse' : '';

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!withRipple || disabled || loading) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const id = Date.now();

    setRipples([...ripples, { x, y, size, id }]);

    // Clean up ripple after animation
    setTimeout(() => {
      setRipples(ripples => ripples.filter(ripple => ripple.id !== id));
    }, 1000);
  };

  return (
    <motion.button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${width}
        ${radius}
        ${scale}
        ${glow}
        ${className}
      `}
      disabled={disabled || loading}
      type={type}
      onClick={handleRipple}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-color-safety-orange/20 rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}

      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}

      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2 group-hover:translate-x-[-2px] transition-transform duration-300">{icon}</span>
      )}

      <span className="relative z-10">{children}</span>

      {icon && iconPosition === 'right' && (
        <span className="ml-2 group-hover:translate-x-[2px] transition-transform duration-300">{icon}</span>
      )}
    </motion.button>
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
  withHoverScale = true,
  withGlow = variant === 'primary',
  ...props
}: LinkButtonProps) {
  const baseStyles = 'group inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-color-safety-orange focus:ring-offset-color-black relative overflow-hidden';
  const width = fullWidth ? 'w-full' : '';
  const radius = rounded ? 'rounded-full' : 'rounded-md';
  const scale = withHoverScale ? 'hover:scale-105' : '';
  const glow = withGlow ? 'hover:after:opacity-100 after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-r after:from-color-safety-orange/50 after:to-color-white/30 after:opacity-0 after:blur-xl after:transition-opacity after:duration-500 after:-z-10' : '';

  return (
    <motion.div
      className="inline-block"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${width}
          ${radius}
          ${scale}
          ${glow}
          ${className}
        `}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="mr-2 group-hover:translate-x-[-2px] transition-transform duration-300">{icon}</span>
        )}

        <span className="relative z-10">{children}</span>

        {icon && iconPosition === 'right' && (
          <span className="ml-2 group-hover:translate-x-[2px] transition-transform duration-300">{icon}</span>
        )}
      </Link>
    </motion.div>
  );
}
