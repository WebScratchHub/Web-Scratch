// FIX: Removed circular dependency by deleting the unnecessary import of `Lesson`.
// The `Lesson` interface is defined and exported within this file.

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
}