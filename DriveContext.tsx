
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as driveService from '../services/driveService';

export interface DriveContextType {
  isDriveReady: boolean;
  driveService: typeof driveService;
}

export const DriveContext = createContext<DriveContextType | undefined>(undefined);

export const DriveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDriveReady, setIsDriveReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await driveService.init();
        setIsDriveReady(true);
      } catch (error) {
        console.error("Failed to initialize Google Drive service:", error);
      }
    };
    initialize();
  }, []);

  const value = { isDriveReady, driveService };

  return (
    <DriveContext.Provider value={value}>
      {children}
    </DriveContext.Provider>
  );
};
