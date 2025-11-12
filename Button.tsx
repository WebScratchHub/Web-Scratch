import React, { forwardRef } from 'react';
import Spinner from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'subtle';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  iconOnly?: boolean;
  children: React.ReactNode;
}

const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-bg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'text-white bg-gradient-to-r from-primary to-secondary hover:shadow-glow-cyan-md focus:ring-secondary disabled:bg-none disabled:bg-muted',
  secondary: 'bg-transparent text-text-main border border-primary/50 hover:bg-primary/10 hover:border-primary hover:shadow-glow-violet-md focus:ring-primary',
  ghost: 'text-text-secondary hover:text-text-main hover:bg-white/5 focus:ring-secondary',
  subtle: 'bg-black/20 text-white/80 hover:bg-black/40 hover:text-white backdrop-blur-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const iconOnlyClasses: Record<ButtonSize, string> = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    iconOnly = false,
    className = '',
    children,
    ...props
  }, ref) => {
    const combinedClasses = [
      baseClasses,
      variantClasses[variant],
      iconOnly ? iconOnlyClasses[size] : sizeClasses[size],
      className
    ].join(' ');

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Spinner className="mr-2" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;