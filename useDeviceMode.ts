import { useContext } from 'react';
import { DeviceModeContext, DeviceModeContextType } from '../context/DeviceModeContext';

export const useDeviceMode = (): DeviceModeContextType => {
  const context = useContext(DeviceModeContext);
  if (context === undefined) {
    throw new Error('useDeviceMode must be used within a DeviceModeProvider');
  }
  return context;
};