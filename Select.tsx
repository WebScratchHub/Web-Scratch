

import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, className, children, ...props }) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>}
      <select
        id={id}
        className={`w-full pl-3 pr-10 py-2 border border-primary/40 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:border-secondary focus:ring-secondary hover:border-secondary bg-white/5 text-white transition-all duration-200 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;