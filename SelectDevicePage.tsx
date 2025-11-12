
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from '../ui/Icons';
import { useDeviceMode } from '../../hooks/useDeviceMode';
import { useAuth } from '../../hooks/useAuth';

interface SelectDevicePageProps {
}

const DeviceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}> = ({ icon, title, subtitle, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="w-full sm:w-80 h-96 bg-white/5 border border-white/[.08] rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 229, 255, 0.4), 0 0 20px rgba(123, 97, 255, 0.3)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
    >
      <div className="text-secondary mb-6">
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-white animate-shimmer mb-2">{title}</h2>
      <p className="text-text-secondary">{subtitle}</p>
    </motion.div>
  );
};


const SelectDevicePage: React.FC<SelectDevicePageProps> = () => {
  const { user, updateDeviceModePreference } = useAuth();
  const { setDeviceMode } = useDeviceMode();
  const [selected, setSelected] = useState<'pc' | 'mobile' | null>(null);
  const userName = user?.fullName?.split(' ')[0] || null;


  const handleSelect = (mode: 'pc' | 'mobile') => {
    setSelected(mode);
    updateDeviceModePreference(mode); // Save to DB
    setDeviceMode(mode); // This triggers re-render in App.tsx immediately
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg p-4 overflow-hidden">
      <AnimatePresence>
        {!selected && (
            <motion.div
                key="selection"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center"
            >
                <div className="text-center mb-12">
                    <h1 className="text-2xl font-semibold text-text-main">
                    Welcome back, {userName || 'Creator'}!
                    </h1>
                    <p className="text-text-secondary">Please select your device experience.</p>
                </div>

                <motion.div
                    className="flex flex-col sm:flex-row gap-8"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
                        }
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    <DeviceCard
                        icon={<Icons.MonitorIcon className="w-24 h-24" />}
                        title="PC Mode"
                        subtitle="Optimized for large screens and keyboard/mouse interaction."
                        onClick={() => handleSelect('pc')}
                    />
                    <DeviceCard
                        icon={<Icons.MobileIcon className="w-24 h-24" />}
                        title="Mobile Mode"
                        subtitle="Compact and touch-friendly interface for smaller screens."
                        onClick={() => handleSelect('mobile')}
                    />
                </motion.div>

                <p className="text-muted text-sm mt-12 text-center">
                    Your selection helps us optimize your experience.
                </p>
            </motion.div>
        )}

        {selected && (
             <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="flex flex-col items-center justify-center"
            >
                <Icons.CheckCircleIcon className="w-32 h-32 text-success animate-pulse-subtle" />
                <h2 className="text-3xl font-bold text-white mt-4">
                    {selected === 'pc' ? 'PC Mode' : 'Mobile Mode'} Selected
                </h2>
                <p className="text-text-secondary">Redirecting to your dashboard...</p>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectDevicePage;
