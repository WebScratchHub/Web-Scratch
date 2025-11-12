import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom' // Changed from BrowserRouter
import { AuthProvider } from './context/AuthContext'
import { DeviceModeProvider } from './context/DeviceModeContext'
import { DriveProvider } from './context/DriveContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter> {/* Changed from BrowserRouter */}
      <DriveProvider>
        <AuthProvider>
          <DeviceModeProvider>
            <App />
          </DeviceModeProvider>
        </AuthProvider>
      </DriveProvider>
    </HashRouter> {/* Changed from BrowserRouter */}
  </React.StrictMode>,
)