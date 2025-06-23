// src/components/ui/Button.tsx
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  animate?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  animate = true,
  fullWidth = false,
  ...props
}) => {
  const sizeClasses: Record<ButtonSize, string> = {
    xs: 'px-3 py-1.5 text-xs min-h-[28px]',
    sm: 'px-4 py-2 text-sm min-h-[32px]',
    md: 'px-6 py-2.5 text-sm min-h-[40px]',
    lg: 'px-8 py-3 text-base min-h-[48px]',
    xl: 'px-10 py-4 text-lg min-h-[56px]',
  };

  const getVariantClasses = (): string => {
    if (disabled) {
      return 'bg-theme-surface-tertiary text-theme-text-tertiary border-theme-surface-tertiary cursor-not-allowed';
    }

    switch (variant) {
      case 'primary':
        return 'bg-theme-primary text-white border-theme-primary shadow-[0_4px_16px_var(--color-primary)30] hover:shadow-[0_8px_24px_var(--color-primary)40] hover:-translate-y-0.5';
      case 'secondary':
        return 'bg-theme-secondary text-white border-theme-secondary shadow-[0_4px_16px_var(--color-secondary)30] hover:shadow-[0_8px_24px_var(--color-secondary)40] hover:-translate-y-0.5';
      case 'outline':
        return 'bg-transparent text-theme-primary border-theme-primary hover:bg-[var(--color-primary)10] hover:-translate-y-px';
      case 'ghost':
        return 'bg-theme-surface text-theme-text-primary border-transparent hover:bg-theme-surface';
      case 'danger':
        return 'bg-theme-accent text-white border-theme-accent shadow-[0_4px_16px_var(--color-accent)30] hover:shadow-[0_8px_24px_var(--color-accent)40] hover:-translate-y-0.5';
      default:
        return 'bg-theme-primary text-white border-theme-primary';
    }
  };

  const baseClasses = `
    inline-flex items-center justify-center font-medium border
    rounded-xl focus:outline-none transition-all duration-300
    ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
    ${getVariantClasses()}
    ${className}
  `;

  const motionProps = animate && !disabled && !loading
    ? {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
      }
    : {};

  const LoadingSpinner: React.FC = () => (
    <motion.div
      className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );

  if (animate) {
    return (
      <motion.button
        className={baseClasses}
        disabled={disabled || loading}
        {...motionProps}
        {...(props as any)}
      >
        {loading && <LoadingSpinner />}
        {children}
      </motion.button>
    );
  }

  return (
    <button
      className={baseClasses}
      disabled={disabled || loading}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
};

export default Button;
