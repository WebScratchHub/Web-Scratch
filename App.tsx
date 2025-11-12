
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { useDeviceMode } from './hooks/useDeviceMode';

import Header from './components/shared/Header';
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ImageStudioPage from './components/pages/ImageStudioPage';
import TextToVoicePage from './components/pages/TextToVoicePage';
import WebsiteBuilderPage from './components/pages/WebsiteBuilderPage';
import LearningHubPage from './components/pages/LearningHubPage';
import LessonPage from './components/pages/LessonPage';
import ProfilePage from './components/pages/SettingsPage';
import AboutPage from './components/pages/AboutPage';
import DisclaimerPage from './components/pages/DisclaimerPage';
import AIToolsPage from './components/pages/AIToolsPage';
import ContentWriterPage from './components/pages/ContentWriterPage';
import SelectDevicePage from './components/pages/SelectDevicePage';
import DashboardLayout from './components/layout/DashboardLayout';

const App: React.FC = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const { deviceMode } = useDeviceMode();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) {
      return; // Wait until auth state is resolved
    }

    const isAuthPage = ['/', '/login', '/signup'].includes(location.pathname);

    if (isLoggedIn) {
      // --- LOGGED IN USER ---
      if (!deviceMode) {
        // If no device mode is set, the only allowed page is the selection page.
        if (location.pathname !== '/select-device') {
          navigate('/select-device', { replace: true });
        }
      } else {
        // If device mode IS set, user should be in the dashboard area.
        // Redirect them out of auth pages or the selection page.
        if (isAuthPage || location.pathname === '/select-device') {
          navigate('/dashboard', { replace: true });
        }
      }
    } else {
      // --- LOGGED OUT USER ---
      // If a logged-out user tries to access any page that requires login, redirect them.
      if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/select-device')) {
        navigate('/login', { replace: true });
      }
    }
  }, [isLoggedIn, isLoading, deviceMode, navigate, location.pathname]);

  // A placeholder for routes that require authentication
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (isLoading) return null; // Or a loading spinner
    if (!isLoggedIn) {
      // This is a fallback, main useEffect should handle it first
      navigate('/login', { replace: true });
      return null;
    }
    if (!deviceMode) {
       // This is a fallback, main useEffect should handle it first
      navigate('/select-device', { replace: true });
      return null;
    }
    return <>{children}</>;
  };

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />

          {/* Device Selection Route */}
          <Route path="/select-device" element={<SelectDevicePage />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="image-studio" element={<ImageStudioPage />} />
            <Route path="text-to-voice" element={<TextToVoicePage />} />
            <Route path="website-builder" element={<WebsiteBuilderPage project={null}/>} />
            <Route path="learning-hub" element={<LearningHubPage />} />
            <Route path="learning-hub/:courseId" element={<LessonPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="ai-tools" element={<AIToolsPage />} />
            <Route path="content-writer" element={<ContentWriterPage />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
