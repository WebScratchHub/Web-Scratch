
import { useContext } from 'react';
import { DriveContext, DriveContextType } from '../context/DriveContext';

export const useDrive = (): DriveContextType => {
  const context = useContext(DriveContext);
  if (context === undefined) {
    throw new Error('useDrive must be used within a DriveProvider');
  }
  return context;
};
