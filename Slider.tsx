import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  displayValue?: string;
}

const Slider: React.FC<SliderProps> = ({ label, id, value, displayValue, className, ...props }) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-text-secondary">{label}</label>
        <span className="text-sm font-mono text-text-main bg-dark-bg px-2 py-0.5 rounded">{displayValue || value}</span>
      </div>
      <input
        type="range"
        id={id}
        value={value}
        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
    </div>
  );
};

export default Slider;