import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import * as Icons from './Icons';

interface OnboardingModalProps {
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
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
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, type: 'spring', damping: 25, stiffness: 120 }}
        className="w-full max-w-lg rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-glow-cyan-lg p-8 text-center"
      >
        <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary rounded-full opacity-30 blur-2xl animate-pulse"></div>
            <Icons.SparklesIcon className="w-24 h-24 text-secondary animate-shimmer"/>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
            Welcome to Web Scratch!
        </h1>
        <p className="text-text-secondary mb-8">
            You're all set. Explore the dashboard to generate images, create videos, and bring your ideas to life with AI.
        </p>
        <Button 
            className="w-full sm:w-auto text-lg px-8 py-3 animate-pulse-subtle"
            onClick={onClose}
        >
            Let's Get Started
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingModal;
