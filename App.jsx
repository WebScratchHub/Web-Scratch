import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import RootLayout from './layouts/RootLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SelectDevicePage from './pages/SelectDevicePage';
import DashboardPage from './pages/DashboardPage';
import ImageStudioPage from './pages/ImageStudioPage';
import NotFoundPage from './pages/NotFoundPage';
// Import other pages as you create them
// import WebsiteBuilderPage from './pages/WebsiteBuilderPage';
// import LearningHubPage from './pages/LearningHubPage';
// etc...

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/select-device" element={<SelectDevicePage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="image-studio" element={<ImageStudioPage />} />
            {/* Add routes for other dashboard pages here */}
            {/* <Route path="website-builder" element={<WebsiteBuilderPage />} /> */}
            {/* <Route path="learning-hub" element={<LearningHubPage />} /> */}
          </Route>
        </Route>
        
        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
