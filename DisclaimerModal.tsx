import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface DisclaimerModalProps {
  onClose: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.5, type: 'spring', damping: 25, stiffness: 120 }}
        className="w-full max-w-[700px] rounded-2xl animate-glowing-border"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
            <h1 className="text-4xl font-bold text-center text-white animate-shimmer">
                Disclaimer
            </h1>
            <div className="max-h-60 overflow-y-auto pr-4 text-text-secondary space-y-4 disclaimer-scroll">
                <p>Web Scratch is an independent AI platform that connects users with various AI tools and APIs.</p>
                <p>We do not own, host, or directly control any third-party AI tools featured on our platform.</p>
                <p>Prices, credits, and features shown are based on information provided by each AI service and may change at any time.</p>
                <p>By using Web Scratch, you agree that we act solely as an intermediary and that you are responsible for reviewing the respective service’s Terms and Privacy Policy.</p>
            </div>
            <div className="flex flex-col items-center justify-center pt-4">
                <Button 
                    className="w-full sm:w-auto text-lg px-8 py-3 !rounded-full bg-error hover:bg-opacity-80 text-white focus:ring-error" 
                    onClick={onClose}
                >
                    I Understand
                </Button>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DisclaimerModal;