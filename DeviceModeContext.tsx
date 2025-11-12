import React, { createContext, useState, ReactNode, useCallback } from 'react';

export type DeviceMode = 'pc' | 'mobile';

export interface DeviceModeContextType {
  deviceMode: DeviceMode | null;
  setDeviceMode: (mode: DeviceMode) => void;
  clearDeviceMode: () => void;
}

export const DeviceModeContext = createContext<DeviceModeContextType | undefined>(undefined);

export const DeviceModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deviceMode, setDeviceModeState] = useState<DeviceMode | null>(() => {
    try {
      const savedMode = localStorage.getItem('deviceMode');
      return savedMode ? (savedMode as DeviceMode) : null;
    } catch (error) {
      console.error("Could not access localStorage:", error);
      return null;
    }
  });

  const setDeviceMode = useCallback((mode: DeviceMode) => {
    try {
      localStorage.setItem('deviceMode', mode);
    } catch (error) {
      console.error("Could not write to localStorage:", error);
    }
    setDeviceModeState(mode);
  }, []);

  const clearDeviceMode = useCallback(() => {
    try {
      localStorage.removeItem('deviceMode');
    } catch (error) {
      console.error("Could not remove from localStorage:", error);
    }
    setDeviceModeState(null);
  }, []);

  const value = {
    deviceMode,
    setDeviceMode,
    clearDeviceMode,
  };

  return <DeviceModeContext.Provider value={value}>{children}</DeviceModeContext.Provider>;
};