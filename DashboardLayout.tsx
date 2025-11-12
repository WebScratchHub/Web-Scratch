import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/shared/Sidebar';
import { useDeviceMode } from '@/hooks/useDeviceMode';

const DashboardLayout: React.FC = () => {
    const { deviceMode } = useDeviceMode();
    const isPcMode = deviceMode === 'pc';
    const location = useLocation();

  return (
    <div className="flex">
      <Sidebar />
      <div className={`w-full ${isPcMode ? 'ml-64' : ''}`}>
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
