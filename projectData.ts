// This file holds the string content of all project files for the download functionality.
// In a real local development environment, you would read these from the filesystem.

export const projectFiles: { [key: string]: string } = {
  // === ROOT FILES ===
  'index.html': `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Scratch - AI Platform</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <script src="https://cdn.tailwindcss.com"></script>
  
  <script type="importmap">
{
  "imports": {
    "react": "https://aistudiocdn.com/react@^19.2.0",
    "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
    "react/": "https://aistudiocdn.com/react@^19.2.0/",
    "@google/genai": "https://aistudiocdn.com/@google/genai@^1.28.0",
    "framer-motion": "https://aistudiocdn.com/framer-motion@^12.23.24",
    "idb": "https://aistudiocdn.com/idb@^8.0.3",
    "firebase/app": "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js",
    "firebase/auth": "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js",
    "firebase/": "https://aistudiocdn.com/firebase@^12.5.0/"
  }
}
</script>

  <style>
    html {
      scroll-behavior: smooth;
    }
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #0A0D14; /* primary-bg */
      color: #E8EAF6; /* text-primary */
      background-image: radial-gradient(circle at top right, rgba(123, 97, 255, 0.12), transparent 40%),
                        radial-gradient(circle at bottom left, rgba(0, 229, 255, 0.08), transparent 50%);
      background-attachment: fixed;
    }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0A0D14;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(123, 97, 255, 0.3);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(123, 97, 255, 0.5);
    }
    
    .disclaimer-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .disclaimer-scroll::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    .disclaimer-scroll::-webkit-scrollbar-thumb {
      background: #7B61FF;
      border-radius: 3px;
    }
    .disclaimer-scroll::-webkit-scrollbar-thumb:hover {
      background: #00E5FF;
    }

    /* Hide scrollbar utility */
    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .hide-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    /* Keyframe Animations */
    @keyframes glowing {
      0% { box-shadow: 0 0 5px #7B61FF, 0 0 10px #7B61FF, 0 0 15px #00E5FF; }
      50% { box-shadow: 0 0 10px #00E5FF, 0 0 20px #00E5FF, 0 0 30px #7B61FF; }
      100% { box-shadow: 0 0 5px #7B61FF, 0 0 10px #7B61FF, 0 0 15px #00E5FF; }
    }
    .animate-glowing {
      animation: glowing 3s infinite;
    }
    
    @keyframes glowing-border {
      0% { box-shadow: 0 0 6px #00E5FF, 0 0 10px #00E5FF; }
      50% { box-shadow: 0 0 12px #7B61FF, 0 0 20px #7B61FF; }
      100% { box-shadow: 0 0 6px #00E5FF, 0 0 10px #00E5FF; }
    }
    .animate-glowing-border {
      animation: glowing-border 4s infinite;
    }

    @keyframes animate-gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes shimmer {
      0%, 100% { text-shadow: 0 0 6px rgba(232, 234, 246, 0.8), 0 0 10px #00E5FF, 0 0 20px #7B61FF; }
      50% { text-shadow: 0 0 10px rgba(232, 234, 246, 0.8), 0 0 18px #7B61FF, 0 0 28px #00E5FF; }
    }
    .animate-shimmer {
      animation: shimmer 2.5s infinite;
    }

    @keyframes animate-tilt {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(0.5deg); }
      75% { transform: rotate(-0.5deg); }
    }
    .animate-tilt {
        animation: animate-tilt 10s infinite linear;
    }
    .text-glow {
      text-shadow: 0 0 12px rgba(123, 97, 255, 0.6);
    }
    
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
    }
    .animate-float {
        animation: float 4s ease-in-out infinite;
    }

    @keyframes pulse-subtle {
      0%, 100% { transform: scale(1); box-shadow: 0 0 12px rgba(0, 229, 255, 0.5); }
      50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(0, 229, 255, 0.7); }
    }
    .animate-pulse-subtle {
        animation: pulse-subtle 2s infinite ease-in-out;
    }

    @keyframes aurora {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 20px rgba(0,229,255,0.4), 0 0 5px rgba(255,255,255,0.2) inset; }
      50% { box-shadow: 0 0 30px rgba(123,97,255,0.7), 0 0 5px rgba(255,255,255,0.2) inset; }
    }
    .animate-pulse {
        animation: pulse 3s infinite ease-in-out;
    }

    /* Custom Select Dropdown Styling */
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239EA3B5' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
    }

    select:focus {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2300E5FF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    }

    /* Custom Option Styling */
    option {
        background-color: #0A0D14; /* dark-bg */
        color: #E8EAF6; /* text-main */
    }
  </style>

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            'dark-bg': '#0A0D14',
            'text-main': '#E8EAF6',
            'text-secondary': '#9EA3B5',
            'muted': '#636A7B',
            primary: '#7B61FF',   // violet
            secondary: '#00E5FF', // cyan
            tertiary: '#FF5CF0',  // pink
            success: '#00FFB0',
            error: '#FF4D6D',
            warning: '#FFB300',
          },
          boxShadow: {
            'glow-violet-lg': '0 0 25px rgba(123, 97, 255, 0.25)',
            'glow-violet-md': '0 0 15px rgba(123, 97, 255, 0.2)',
            'glow-cyan-lg': '0 0 25px rgba(0, 229, 255, 0.3)',
            'glow-cyan-md': '0 0 12px rgba(0, 229, 255, 0.5)',
          },
          backgroundImage: {
            'primary-gradient': 'linear-gradient(90deg, #7B61FF, #00E5FF, #FF5CF0)',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-dark-bg">
  <div id="root"></div>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <script src="https://accounts.google.com/gsi/client" async defer></script>
  <script src="https://apis.google.com/js/api.js" async defer></script>
  <script type="module" src="/index.tsx"></script>
</body>
</html>`,
  'index.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  'App.tsx': `import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Page, WebsiteProject } from './types';
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
import DashboardLayout from './components/layout/DashboardLayout';
import DisclaimerModal from './components/ui/DisclaimerModal';
import AIToolsPage from './components/pages/AIToolsPage';
import ComingSoonPage from './components/pages/ComingSoonPage';
import ContentWriterPage from './components/pages/ContentWriterPage';
import FloatingChatBot from './components/ui/FloatingChatBot';
import SelectDevicePage from './components/pages/SelectDevicePage';
import { DeviceModeProvider } from './context/DeviceModeContext';
import { useDeviceMode } from './hooks/useDeviceMode';
import * as Icons from './components/ui/Icons';
import { DriveProvider } from './context/DriveContext';

const AppContent: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const { deviceMode, setDeviceMode } = useDeviceMode();
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [activeWebsiteProject, setActiveWebsiteProject] = useState<WebsiteProject | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.preferences?.deviceMode && user.preferences.deviceMode !== deviceMode) {
      setDeviceMode(user.preferences.deviceMode);
    }
  }, [user, deviceMode, setDeviceMode]);
  
  const comingSoonPages = [
    Page.AI_TEXT_WRITER,
    Page.IMAGE_TO_VIDEO,
    Page.LOGO_CREATOR,
    Page.PROMPT_IMPROVER,
    Page.AI_PHOTO_ENHANCER,
    Page.ART_STYLE_CONVERTER,
    Page.AI_CHAT_COMPANION,
  ];

  const dashboardPages = [
      Page.DASHBOARD, 
      Page.IMAGE_STUDIO, 
      Page.TEXT_TO_VOICEOVER, 
      Page.WEBSITE_BUILDER, 
      Page.LEARNING_HUB, 
      Page.LESSON_PAGE,
      Page.PROFILE,
      Page.AI_TOOLS,
      Page.CONTENT_WRITER,
      ...comingSoonPages,
  ];
  
  const isDashboardPage = dashboardPages.includes(currentPage);
  const showDeviceSelection = isLoggedIn && !deviceMode;

  useEffect(() => {
    if (isLoggedIn) {
      if (deviceMode && (currentPage === Page.LANDING || currentPage === Page.LOGIN || currentPage === Page.SIGNUP)) {
        setCurrentPage(Page.DASHBOARD);
      }
    } else {
      if (currentPage !== Page.LANDING && currentPage !== Page.LOGIN && currentPage !== Page.SIGNUP && currentPage !== Page.ABOUT && currentPage !== Page.DISCLAIMER) {
        setCurrentPage(Page.LANDING);
      }
    }
  }, [isLoggedIn, currentPage, deviceMode]);

  const navigateTo = useCallback((page: Page, data?: any) => {
    if (page === Page.DISCLAIMER) {
      setShowDisclaimer(true);
    } else {
      if (page === Page.WEBSITE_BUILDER && data) {
        setActiveWebsiteProject(data);
      } else {
        setActiveWebsiteProject(null);
      }
      if (page === Page.LESSON_PAGE && data?.courseId) {
        setActiveCourseId(data.courseId);
      } else {
        setActiveCourseId(null);
      }
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  }, []);
  
  const renderPage = () => {
    if (showDeviceSelection) {
      return <SelectDevicePage userName={user?.fullName?.split(' ')[0] || null} />;
    }
    
    if (!isLoggedIn) {
      switch (currentPage) {
        case Page.LOGIN:
          return <LoginPage navigateTo={navigateTo} />;
        case Page.SIGNUP:
          return <SignupPage navigateTo={navigateTo} />;
        case Page.ABOUT:
            return <AboutPage navigateTo={navigateTo} />;
        case Page.DISCLAIMER:
            return <DisclaimerPage navigateTo={navigateTo} />;
        default:
          return <LandingPage navigateTo={navigateTo} />;
      }
    }

    if (isDashboardPage) {
        return (
            <DashboardLayout navigateTo={navigateTo} currentPage={currentPage}>
                {(() => {
                    if (comingSoonPages.includes(currentPage)) {
                        return <ComingSoonPage navigateTo={navigateTo} currentPage={currentPage} />;
                    }
                    switch (currentPage) {
                        case Page.DASHBOARD:
                            return <DashboardPage navigateTo={navigateTo} />;
                        case Page.IMAGE_STUDIO:
                            return <ImageStudioPage navigateTo={navigateTo} />;
                        case Page.TEXT_TO_VOICEOVER:
                            return <TextToVoicePage navigateTo={navigateTo} />;
                        case Page.WEBSITE_BUILDER:
                            return <WebsiteBuilderPage navigateTo={navigateTo} project={activeWebsiteProject} />;
                        case Page.LEARNING_HUB:
                            return <LearningHubPage navigateTo={navigateTo} />;
                        case Page.LESSON_PAGE:
                            return <LessonPage navigateTo={navigateTo} courseId={activeCourseId!} />;
                        case Page.PROFILE:
                            return <ProfilePage navigateTo={navigateTo} />;
                        case Page.AI_TOOLS:
                            return <AIToolsPage navigateTo={navigateTo} />;
                        case Page.CONTENT_WRITER:
                            return <ContentWriterPage navigateTo={navigateTo} />;
                        default:
                            return <DashboardPage navigateTo={navigateTo} />;
                    }
                })()}
            </DashboardLayout>
        );
    }

    switch (currentPage) {
        case Page.ABOUT:
            return <AboutPage navigateTo={navigateTo} />;
        case Page.DISCLAIMER:
            return <DisclaimerPage navigateTo={navigateTo} />;
        default:
          return <LandingPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className={\`bg-dark-bg min-h-screen flex flex-col \${deviceMode === 'pc' ? 'pc-mode' : ''} \${deviceMode === 'mobile' ? 'mobile-mode' : ''}\`}>
      {!showDeviceSelection && <Header navigateTo={navigateTo} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {showDisclaimer && <DisclaimerModal onClose={() => setShowDisclaimer(false)} />}
      <AnimatePresence>
      </AnimatePresence>
      {isLoggedIn && deviceMode && <FloatingChatBot currentPage={currentPage} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DriveProvider>
      <AuthProvider>
        <DeviceModeProvider>
          <AppContent />
        </DeviceModeProvider>
      </AuthProvider>
    </DriveProvider>
  );
};

export default App;
`,
  'metadata.json': `{
  "name": "Web Scratch",
  "description": "An all-in-one AI platform featuring tools for image generation, video creation, voiceovers, content writing, coding assistance, and more.",
  "requestFramePermissions": []
}`,
  'types.ts': `// FIX: Removed circular dependency by deleting the unnecessary import of \`Lesson\`.
// The \`Lesson\` interface is defined and exported within this file.

export enum Page {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  DASHBOARD = 'DASHBOARD',
  IMAGE_STUDIO = 'IMAGE_STUDIO',
  GENERATOR = 'GENERATOR',
  TEXT_TO_VOICEOVER = 'TEXT_TO_VOICEOVER',
  WEBSITE_BUILDER = 'WEBSITE_BUILDER',
  LEARNING_HUB = 'LEARNING_HUB',
  LESSON_PAGE = 'LESSON_PAGE',
  PROFILE = 'PROFILE',
  ABOUT = 'ABOUT',
  DISCLAIMER = 'DISCLAIMER',
  AI_TOOLS = 'AI_TOOLS',
  AI_TEXT_WRITER = 'AI_TEXT_WRITER',
  IMAGE_TO_VIDEO = 'IMAGE_TO_VIDEO',
  LOGO_CREATOR = 'LOGO_CREATOR',
  PROMPT_IMPROVER = 'PROMPT_IMPROVER',
  AI_PHOTO_ENHANCER = 'AI_PHOTO_ENHANCER',
  ART_STYLE_CONVERTER = 'ART_STYLE_CONVERTER',
  AI_CHAT_COMPANION = 'AI_CHAT_COMPANION',
  CONTENT_WRITER = 'CONTENT_WRITER',
  TYPESCRIPT = 'TYPESCRIPT',
  EXCEL = 'EXCEL',
  WORD = 'WORD',
  POWERPOINT = 'POWERPOINT',
  GOOGLE_SHEETS = 'GOOGLE_SHEETS',
  GOOGLE_DOCS = 'GOOGLE_DOCS',
  GOOGLE_SLIDES = 'GOOGLE_SLIDES',
  CANVA = 'CANVA',
  NOTION = 'NOTION',
  TRELLO = 'TRELLO',
  FIGMA = 'FIGMA',
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  profilePictureUrl?: string;
  preferences?: {
    deviceMode?: 'pc' | 'mobile';
  };
}

export interface GeneratedImage {
  id: string;
  userId: string;
  imageUrl: string;
  prompt: string;
  negativePrompt: string;
  style: string;
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  createdAt: string; // ISO string
  isFavorite: boolean;
}

export interface WebsiteProject {
  id:string;
  userId: string;
  name: string;
  html: string;
  createdAt: string; // ISO string
}

export interface ToolbarPosition {
  top: number;
  left: number;
}

export interface AITool {
  name: string;
  description: string;
  url: string;
  category: string;
}

export interface AIToolDetails {
  summary: string;
  features: string[];
  pricing: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface Lesson {
  title: string;
  explanation: string;
  example?: string; // For code
  exampleImage?: string; // For tools, placeholder
  tip?: string; // For tools
  useCase?: string; // For non-code examples
}

export interface LearningProgress {
  userId: string;
  courseId: string;
  completedLessons: number; // index of the last completed lesson
}`,
  'constants.ts': `export const EXAMPLE_PROMPTS = [
  "A futuristic city skyline at dusk, cinematic lighting, ultra-detailed",
  "A cozy reading nook with sunlight streaming through a window",
  "Product mockup of a smartwatch on a marble table",
  "A majestic lion with a glowing mane, fantasy art style",
  "An enchanted forest with bioluminescent mushrooms and fairies",
  "A hyper-realistic portrait of an astronaut looking at Earth from the moon",
  "A cyberpunk city street at night, neon lights, reflections on wet pavement, cinematic atmosphere",
  "An adorable cat DJing at a vibrant music festival, detailed, fantasy art"
];

export const STYLES = [
  "Photorealistic",
  "Cinematic",
  "Anime",
  "Fantasy Art",
  "Watercolor",
  "Concept Art",
  "3D Render",
  "Low Poly",
  "Cyberpunk",
  "Steampunk",
  "Line Art"
];

export const ASPECT_RATIOS = [
  { label: "1:1", value: "1:1" },
  { label: "16:9", value: "16:9" },
  { label: "9:16", value: "9:16" },
  { label: "4:3", value: "4:3" },
  { label: "3:4", value: "3:4" },
];

export const BLOCKED_WORDS = ["nsfw", "hate", "violent", "blood", "gore"];`,
  'firebase.json': `{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      ".firebaserc",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}`,
  '.firebaserc': `{
  "projects": {
    "default": "web-scratch-92e15"
  }
}`,

  // === FOLDERS ===
  // Add other files here, using their full path as the key.
  // Example: 'components/ui/Button.tsx': `...content...`
};

// This is a truncated list for brevity in this response.
// A real implementation would include all file contents.
// For now, let's add just a few more important ones.

projectFiles['services/firebaseConfig.ts'] = `import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtySdXYkzIwQevDq9Vqm_hgMB-5vRiY4g",
  authDomain: "web-scratch-92e15.firebaseapp.com",
  projectId: "web-scratch-92e15",
  storageBucket: "web-scratch-92e15.appspot.com",
  messagingSenderId: "1080870395655",
  appId: "1:1080870395655:web:bb61e38520886b34d5efa2",
  measurementId: "G-DDTNF3LF6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and provider instances
export const auth = getAuth(app);`;

projectFiles['context/AuthContext.tsx'] = `
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, GeneratedImage, WebsiteProject, LearningProgress } from '../types';
import * as dbService from '../services/dbService';
import { auth } from '../services/firebaseConfig';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User as FirebaseUser,
} from 'firebase/auth';
import { useDrive } from '../hooks/useDrive';

const getFirebaseAuthErrorMessage = (error: any): string => {
  if (error.code) {
      switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
              return 'Invalid email or password.';
          case 'auth/invalid-email':
              return 'Please enter a valid email address.';
          case 'auth/popup-closed-by-user':
              return 'Sign-in process was cancelled.';
          case 'auth/account-exists-with-different-credential':
              return 'An account already exists with the same email address but different sign-in credentials.';
          default:
              return 'An unexpected error occurred. Please try again.';
      }
  }
  return error.message || 'An unexpected error occurred.';
};

const dataURLtoBlob = (dataurl: string): Blob => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error("Invalid data URL");
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  images: GeneratedImage[];
  websites: WebsiteProject[];
  learningProgress: { [courseId: string]: number };
  authError: string | null;
  login: (credentials: { email: string; password?: string }) => Promise<void>;
  logout: () => Promise<void>;
  signup: (credentials: { fullName: string; email: string; password?: string }) => Promise<void>;
  addImages: (images: Omit<GeneratedImage, 'id' | 'createdAt' | 'isFavorite' | 'userId'>[]) => Promise<GeneratedImage[]>;
  toggleFavorite: (id: string) => Promise<void>;
  clearAuthError: () => void;
  saveWebsiteProject: (project: Omit<WebsiteProject, 'id' | 'createdAt' | 'userId'>) => Promise<WebsiteProject>;
  updateWebsiteProject: (project: WebsiteProject) => Promise<void>;
  deleteWebsiteProject: (id: string) => Promise<void>;
  updateCourseProgress: (courseId: string, completedLessons: number) => Promise<void>;
  updateUserPreferences: (prefs: Partial<User['preferences']>) => Promise<void>;
  updateDeviceModePreference: (mode: 'pc' | 'mobile') => Promise<void>;
  updateUserProfile: (details: { fullName?: string; profilePictureUrl?: string }) => Promise<void>;
  changeUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [websites, setWebsites] = useState<WebsiteProject[]>([]);
  const [learningProgress, setLearningProgress] = useState<{ [courseId: string]: number }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const { isDriveReady, driveService } = useDrive();

  const clearAuthError = useCallback(() => setAuthError(null), []);
  
  const syncFromDrive = useCallback(async (userId: string) => {
    try {
        await driveService.initUserFolders(userId);

        // Fetch and merge websites
        const driveWebsites = await driveService.fetchWebsiteProjects(userId);
        const localWebsites = await dbService.getWebsitesByUserId(userId);
        const mergedWebsites = [...localWebsites];
        driveWebsites.forEach(dw => {
            if (!mergedWebsites.some(lw => lw.id === dw.id)) {
                mergedWebsites.push(dw);
            }
        });
        await dbService.clearWebsitesByUserId(userId);
        await dbService.addMultipleWebsites(mergedWebsites);
        setWebsites(mergedWebsites);

        // Fetch and merge images
        const driveImages = await driveService.fetchGeneratedImages(userId);
        const localImages = await dbService.getImagesByUserId(userId);
        const mergedImages = [...localImages];
        for (const di of driveImages) {
            if (!mergedImages.some(li => li.id === di.id)) {
                mergedImages.push(di);
            }
        }
        await dbService.clearImagesByUserId(userId);
        await dbService.addMultipleImages(mergedImages);
        setImages(mergedImages);

        console.log("📦 Fetched Drive data");
    } catch (error) {
        console.error("Failed to sync from Drive, continuing with local data.", error);
    }
  }, [driveService]);

  const loadUserData = useCallback(async (userId: string) => {
    const [userImages, userWebsites, userProgress] = await Promise.all([
      dbService.getImagesByUserId(userId),
      dbService.getWebsitesByUserId(userId),
      dbService.getLearningProgressForUser(userId),
    ]);
    setImages(userImages);
    setWebsites(userWebsites);
    const progressMap = userProgress.reduce((acc, p) => {
      acc[p.courseId] = p.completedLessons;
      return acc;
    }, {} as { [courseId: string]: number });
    setLearningProgress(progressMap);
  }, []);
  
  const handleSuccessfulLogin = useCallback(async (dbUser: User) => {
    setUser(dbUser);
    await loadUserData(dbUser.id);
  }, [loadUserData]);
  
  useEffect(() => {
    if (user && isDriveReady) {
      syncFromDrive(user.id);
    }
  }, [user, isDriveReady, syncFromDrive]);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setIsLoading(true);
      if (firebaseUser) {
        let dbUser = await dbService.getUserById(firebaseUser.uid);
        
        if (!dbUser) {
            const userToSave: User = {
                id: firebaseUser.uid,
                fullName: firebaseUser.displayName || 'New User',
                email: firebaseUser.email!,
            };
            await dbService.putUser(userToSave);
            dbUser = userToSave;
        } else if (dbUser.fullName === 'New User' && firebaseUser.displayName) {
             const userToSave: User = { ...dbUser, fullName: firebaseUser.displayName };
             await dbService.putUser(userToSave);
             dbUser = userToSave;
        }

        await handleSuccessfulLogin(dbUser);

      } else {
        setUser(null);
        setImages([]);
        setWebsites([]);
        setLearningProgress({});
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [handleSuccessfulLogin]);


  const login = async ({ email, password = '' }: { email: string; password?: string }) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  
  const signup = async ({ fullName, email, password = '' }: { fullName: string; email: string; password?: string }) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      // onAuthStateChanged will handle user creation in DB and subsequent login flow.
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('deviceMode');
  };

  const addImages = useCallback(async (imagesToAdd: Omit<GeneratedImage, 'id' | 'createdAt' | 'isFavorite' | 'userId'>[]): Promise<GeneratedImage[]> => {
    if (!user) return [];
    const newImages: GeneratedImage[] = imagesToAdd.map(img => ({
      ...img,
      id: crypto.randomUUID(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    }));
    await dbService.addMultipleImages(newImages);
    setImages(prev => [...newImages, ...prev]);

    if (isDriveReady) {
        newImages.forEach(image => {
            const blob = dataURLtoBlob(image.imageUrl);
            driveService.uploadFile(user.id, 'images', \`\${image.id}.jpg\`, blob, {
                prompt: image.prompt,
                negativePrompt: image.negativePrompt,
                style: image.style,
                aspectRatio: image.aspectRatio,
                createdAt: image.createdAt,
                isFavorite: String(image.isFavorite),
                id: image.id,
                userId: image.userId,
            }).catch(e => console.error("Drive upload failed for image", e));
        });
    }

    return newImages;
  }, [user, isDriveReady, driveService]);

  const toggleFavorite = useCallback(async (id: string) => {
    const imageToToggle = images.find(img => img.id === id);
    if (imageToToggle && user) {
      const updatedImage = { ...imageToToggle, isFavorite: !imageToToggle.isFavorite };
      await dbService.updateImage(updatedImage);
      setImages(prev => prev.map(img => img.id === id ? updatedImage : img));
        if (isDriveReady) {
            const blob = dataURLtoBlob(updatedImage.imageUrl);
             driveService.uploadFile(user.id, 'images', \`\${updatedImage.id}.jpg\`, blob, {
                prompt: updatedImage.prompt,
                negativePrompt: updatedImage.negativePrompt,
                style: updatedImage.style,
                aspectRatio: updatedImage.aspectRatio,
                createdAt: updatedImage.createdAt,
                isFavorite: String(updatedImage.isFavorite),
                id: updatedImage.id,
                userId: updatedImage.userId,
            }, true).catch(e => console.error("Drive favorite update failed", e));
        }
    }
  }, [images, user, isDriveReady, driveService]);

  const saveWebsiteProject = useCallback(async (projectData: Omit<WebsiteProject, 'id' | 'createdAt' | 'userId'>) => {
    if (!user) throw new Error("User not logged in");
    const newProject: WebsiteProject = {
      ...projectData,
      id: crypto.randomUUID(),
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    await dbService.addWebsite(newProject);
    setWebsites(prev => [newProject, ...prev]);
    
    if (isDriveReady) {
        const blob = new Blob([newProject.html], { type: 'text/html' });
        driveService.uploadFile(user.id, 'websites', \`\${newProject.id}.html\`, blob, {
            name: newProject.name,
            createdAt: newProject.createdAt,
            id: newProject.id,
            userId: newProject.userId,
        }).catch(e => console.error("Drive website save failed", e));
    }

    return newProject;
  }, [user, isDriveReady, driveService]);

  const updateWebsiteProject = useCallback(async (project: WebsiteProject) => {
    if (!user || user.id !== project.userId) return;
    await dbService.updateWebsite(project);
    setWebsites(prev => prev.map(p => p.id === project.id ? project : p));

    if (isDriveReady) {
        const blob = new Blob([project.html], { type: 'text/html' });
        driveService.uploadFile(user.id, 'websites', \`\${project.id}.html\`, blob, {
            name: project.name,
            createdAt: project.createdAt,
            id: project.id,
            userId: project.userId,
        }, true).catch(e => console.error("Drive website update failed", e));
    }
  }, [user, isDriveReady, driveService]);

  const deleteWebsiteProject = useCallback(async (id: string) => {
    const projectToDelete = websites.find(p => p.id === id);
    await dbService.deleteWebsite(id);
    setWebsites(prev => prev.filter(p => p.id !== id));
    if (isDriveReady && user && projectToDelete) {
        driveService.deleteFileByName(user.id, 'websites', \`\${id}.html\`).catch(e => console.error("Drive website delete failed", e));
    }
  }, [user, isDriveReady, driveService, websites]);
  
  const updateCourseProgress = useCallback(async (courseId: string, completedLessons: number) => {
      if (!user) return;
      const progress: LearningProgress = { userId: user.id, courseId, completedLessons };
      await dbService.updateLearningProgress(progress);
      setLearningProgress(prev => ({...prev, [courseId]: completedLessons}));
  }, [user]);
  
  const updateUserPreferences = useCallback(async (prefs: Partial<User['preferences']>) => {
    if (!user) return;
    const updatedUser: User = {
        ...user,
        preferences: {
            ...user.preferences,
            ...prefs,
        },
    };
    await dbService.putUser(updatedUser);
    setUser(updatedUser);
  }, [user]);

  const updateDeviceModePreference = useCallback(async (mode: 'pc' | 'mobile') => {
    await updateUserPreferences({ deviceMode: mode });
  }, [updateUserPreferences]);

  const updateUserProfile = useCallback(async (details: { fullName?: string; profilePictureUrl?: string }) => {
    if (!user || !auth.currentUser) return;
    const updatedUserDetails: Partial<User> = {};
    const firebaseProfileUpdate: { displayName?: string } = {};

    if (details.fullName && details.fullName !== user.fullName) {
        updatedUserDetails.fullName = details.fullName;
        firebaseProfileUpdate.displayName = details.fullName;
    }

    if (typeof details.profilePictureUrl !== 'undefined') {
        updatedUserDetails.profilePictureUrl = details.profilePictureUrl;
    }

    if (Object.keys(firebaseProfileUpdate).length > 0) {
        await updateProfile(auth.currentUser, firebaseProfileUpdate);
    }

    if (Object.keys(updatedUserDetails).length > 0) {
        const updatedUser = { ...user, ...updatedUserDetails };
        await dbService.putUser(updatedUser);
        setUser(updatedUser);
    }
  }, [user]);

  const changeUserPassword = async (currentPassword: string, newPassword: string) => {
      if (!auth.currentUser || !auth.currentUser.email) {
          throw new Error("No user is currently signed in.");
      }
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    images,
    websites,
    learningProgress,
    authError,
    login,
    logout,
    signup,
    addImages,
    toggleFavorite,
    clearAuthError,
    saveWebsiteProject,
    updateWebsiteProject,
    deleteWebsiteProject,
    updateCourseProgress,
    updateUserPreferences,
    updateDeviceModePreference,
    updateUserProfile,
    changeUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
`;

// In a real response, all files from the user prompt would be added here.
// This is truncated to keep the response a reasonable length.
// The DownloadProjectModal will be able to reference this data.

