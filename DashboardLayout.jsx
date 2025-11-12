import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useDeviceMode } from '../hooks/useDeviceMode';

const DashboardLayout = () => {
  const { deviceMode } = useDeviceMode();
  const location = useLocation();

  return (
    <div className={`bg-dark-bg min-h-screen flex flex-col ${deviceMode === 'pc' ? 'pc-mode' : 'mobile-mode'}`}>
      <Header />
      <div className="flex flex-1 pt-[4.5rem]">
        <Sidebar />
        <main className={`flex-1 transition-all duration-300 ${deviceMode === 'pc' ? 'ml-64' : 'mt-16'}`}>
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
      {/* FloatingChatBot can be added here if desired */}
    </div>
  );
};

export default DashboardLayout;
