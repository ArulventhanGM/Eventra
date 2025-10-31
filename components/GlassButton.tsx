'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fullWidth?: boolean;
  href?: string;
  icon?: ReactNode;
  loading?: boolean;
}

const getVariantStyles = (variant: string, disabled: boolean) => {
  const baseStyles = "backdrop-blur-md border transition-all duration-300 font-medium";
  
  if (disabled) {
    return `${baseStyles} bg-gray-500/20 border-gray-400/30 text-gray-400 cursor-not-allowed`;
  }

  const variants = {
    primary: `${baseStyles} bg-white/10 border-white/30 text-white hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/25`,
    
    secondary: `${baseStyles} bg-white/5 border-white/20 text-white/90 hover:bg-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10`,
    
    outline: `${baseStyles} bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white/60 hover:shadow-lg hover:shadow-white/20`,
    
    gradient: `${baseStyles} bg-gradient-to-r from-pink-500/80 to-purple-500/80 border-pink-300/50 text-white hover:from-pink-600/90 hover:to-purple-600/90 hover:shadow-lg hover:shadow-purple-500/30`,
    
    danger: `${baseStyles} bg-red-500/20 border-red-400/40 text-red-200 hover:bg-red-500/40 hover:border-red-300/60 hover:shadow-lg hover:shadow-red-500/25`
  };

  return variants[variant as keyof typeof variants] || variants.primary;
};

const getSizeStyles = (size: string) => {
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3 text-base rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-xl',
    xl: 'px-8 py-5 text-xl rounded-2xl'
  };

  return sizes[size as keyof typeof sizes] || sizes.md;
};

export default function GlassButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  icon,
  loading = false
}: GlassButtonProps) {
  const variantStyles = getVariantStyles(variant, disabled);
  const sizeStyles = getSizeStyles(size);
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variantStyles} 
        ${sizeStyles} 
        ${widthClass}
        ${className}
        relative overflow-hidden
        ${!disabled ? 'transform hover:scale-105 active:scale-95' : ''}
        flex items-center justify-center gap-2
      `}
      whileHover={!disabled ? { 
        y: -2,
        boxShadow: variant === 'gradient' 
          ? "0 10px 25px rgba(168, 85, 247, 0.4)" 
          : "0 10px 25px rgba(255, 255, 255, 0.1)"
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Animated background glow */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Inner glow border effect */}
      {!disabled && variant === 'gradient' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-400/30 to-purple-400/30 blur-sm opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : icon ? (
          <span className="flex items-center">{icon}</span>
        ) : null}
        
        <span>{children}</span>
      </div>

      {/* Shimmer effect on hover */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}

// Specialized button variants for common use cases

export function GlassPrimaryButton(props: Omit<GlassButtonProps, 'variant'>) {
  return <GlassButton {...props} variant="primary" />;
}

export function GlassSecondaryButton(props: Omit<GlassButtonProps, 'variant'>) {
  return <GlassButton {...props} variant="secondary" />;
}

export function GlassGradientButton(props: Omit<GlassButtonProps, 'variant'>) {
  return <GlassButton {...props} variant="gradient" />;
}

export function GlassOutlineButton(props: Omit<GlassButtonProps, 'variant'>) {
  return <GlassButton {...props} variant="outline" />;
}

export function GlassDangerButton(props: Omit<GlassButtonProps, 'variant'>) {
  return <GlassButton {...props} variant="danger" />;
}