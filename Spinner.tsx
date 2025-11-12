import React from 'react';

const Spinner: React.FC<{ className?: string, size?: 'sm' | 'md' | 'lg' }> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
  }
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <style>{`
        .pulsing-dot {
          animation: pulse-spinner 1.4s infinite ease-in-out both;
          background-image: linear-gradient(45deg, #7B61FF, #00E5FF, #FF5CF0);
          background-size: 300% 300%;
          animation: pulse-spinner 1.4s infinite ease-in-out both, aurora 3s infinite linear;
        }
        .pulsing-dot:nth-of-type(1) {
          animation-delay: -0.32s;
        }
        .pulsing-dot:nth-of-type(2) {
          animation-delay: -0.16s;
        }
        @keyframes pulse-spinner {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1.0);
          }
        }
      `}</style>
      <div className={`pulsing-dot rounded-full ${sizeClasses[size]}`}></div>
      <div className={`pulsing-dot rounded-full ${sizeClasses[size]}`}></div>
      <div className={`pulsing-dot rounded-full ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default Spinner;