import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DeviceModeProvider } from './context/DeviceModeContext';
import { DriveProvider } from './context/DriveContext';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <DriveProvider>
        <AuthProvider>
          <DeviceModeProvider>
            <App />
          </DeviceModeProvider>
        </AuthProvider>
      </DriveProvider>
    </HashRouter>
  </React.StrictMode>
);
