import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, icon, endIcon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
          <input
            id={id}
            ref={ref}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
              ${icon ? 'pl-10' : ''}
              ${endIcon ? 'pr-10' : ''}
              ${error ? 'border-error focus:border-error focus:ring-error' : 'border-white/[.08] focus:border-secondary focus:ring-secondary'}
              bg-white/5 text-white placeholder:text-muted ${className}`}
            {...props}
          />
          {endIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{endIcon}</div>}
        </div>
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;