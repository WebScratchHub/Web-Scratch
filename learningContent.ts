import React from 'react';
import * as Icons from '../components/ui/Icons';
import { Lesson } from '../types';

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  lessons?: Lesson[]; // Lessons will be fetched from JSON now
  type: 'code' | 'tool';
}

export const ALL_COURSES: { [id: string]: Course } = {
  // Coding Languages
  'html': { id: 'html', title: 'HTML', description: 'Build the essential structure of web pages and applications.', icon: React.createElement(Icons.HtmlIcon, { className: "w-8 h-8" }), colorClass: 'text-orange-500', type: 'code' },
  'css': { id: 'css', title: 'CSS', description: 'Style and design beautiful, responsive web layouts.', icon: React.createElement(Icons.CssIcon, { className: "w-8 h-8" }), colorClass: 'text-blue-500', type: 'code' },
  'javascript': { id: 'javascript', title: 'JavaScript', description: 'Create dynamic and interactive web functionality.', icon: React.createElement(Icons.JsIcon, { className: "w-8 h-8" }), colorClass: 'text-yellow-400', type: 'code' },
  'python': { id: 'python', title: 'Python', description: 'Master a versatile language for web, data science, and more.', icon: React.createElement(Icons.PythonIcon, { className: "w-8 h-8" }), colorClass: 'text-blue-400', type: 'code' },
  'cplusplus': { id: 'cplusplus', title: 'C++', description: 'Learn a powerful, high-performance language for systems and games.', icon: React.createElement(Icons.CppIcon, { className: "w-8 h-8" }), colorClass: 'text-blue-600', type: 'code' },
  'java': { id: 'java', title: 'Java', description: 'Explore a robust, platform-independent enterprise language.', icon: React.createElement(Icons.JavaIcon, { className: "w-8 h-8" }), colorClass: 'text-red-500', type: 'code' },
  'php': { id: 'php', title: 'PHP', description: 'Understand the essentials of server-side web development.', icon: React.createElement(Icons.PhpIcon, { className: "w-8 h-8" }), colorClass: 'text-indigo-400', type: 'code' },
  'sql': { id: 'sql', title: 'SQL', description: 'Learn to query and manage data in relational databases.', icon: React.createElement(Icons.SqlIcon, { className: "w-8 h-8" }), colorClass: 'text-cyan-400', type: 'code' },
  'react': { id: 'react', title: 'React', description: 'Build modern, component-based user interfaces.', icon: React.createElement(Icons.ReactIcon, { className: "w-8 h-8" }), colorClass: 'text-cyan-300', type: 'code' },
  'typescript': { id: 'typescript', title: 'TypeScript', description: 'Add strong typing to JavaScript for large-scale applications.', icon: React.createElement(Icons.TypeScriptIcon, { className: "w-8 h-8" }), colorClass: 'text-blue-500', type: 'code' },
  
  // Office & Productivity Tools
  'excel': { id: 'excel', title: 'Microsoft Excel', description: 'Master spreadsheets, formulas, and data analysis.', icon: React.createElement(Icons.ExcelIcon, { className: "w-8 h-8" }), colorClass: 'text-green-500', type: 'tool' },
  'word': { id: 'word', title: 'Microsoft Word', description: 'Create and format professional documents with ease.', icon: React.createElement(Icons.WordIcon, { className: "w-8 h-8" }), colorClass: 'text-blue-600', type: 'tool' },
  'powerpoint': { id: 'powerpoint', title: 'Microsoft PowerPoint', description: 'Design and deliver compelling presentations.', icon: React.createElement(Icons.PowerPointIcon, { className: "w-8 h-8" }), colorClass: 'text-orange-600', type: 'tool' },
  'sheets': { id: 'sheets', title: 'Google Sheets', description: 'Collaborate on powerful spreadsheets in the cloud.', icon: React.createElement(Icons.SheetsIcon, { className: "w-8 h-8" }), colorClass: 'text-green-600', type: 'tool' },
  'docs': { id: 'docs', title: 'Google Docs', description: 'Write, edit, and collaborate on documents anywhere.', icon: React.createElement(Icons.DocsIcon, { className: "w-8 h-8" }), colorClass: 'text-blue-500', type: 'tool' },
  'slides': { id: 'slides', title: 'Google Slides', description: 'Create and present polished presentations online.', icon: React.createElement(Icons.SlidesIcon, { className: "w-8 h-8" }), colorClass: 'text-yellow-500', type: 'tool' },
  'canva': { id: 'canva', title: 'Canva', description: 'Design anything from social media posts to posters.', icon: React.createElement(Icons.CanvaIcon, { className: "w-8 h-8" }), colorClass: 'text-teal-400', type: 'tool' },
  'notion': { id: 'notion', title: 'Notion', description: 'The all-in-one workspace for notes, tasks, and wikis.', icon: React.createElement(Icons.NotionIcon, { className: "w-8 h-8" }), colorClass: 'text-gray-300', type: 'tool' },
  'trello': { id: 'trello', title: 'Trello', description: 'Organize and prioritize your projects with boards, lists, and cards.', icon: React.createElement(Icons.TrelloIcon, { className: "w-8 h-8" }), colorClass: 'text-blue-400', type: 'tool' },
  'figma': { id: 'figma', title: 'Figma', description: 'The collaborative interface design tool for teams.', icon: React.createElement(Icons.FigmaIcon, { className: "w-8 h-8" }), colorClass: 'text-pink-500', type: 'tool' },

  // Finance & Technology
  'cryptocurrency': { id: 'cryptocurrency', title: 'Cryptocurrency', description: 'Learn about digital currencies, trading, and how to navigate the crypto world safely.', icon: React.createElement(Icons.CurrencyDollarIcon, { className: "w-8 h-8" }), colorClass: 'text-secondary', type: 'tool' },
  'stockmarket': { id: 'stockmarket', title: 'Stock Market', description: 'Understand how the stock market works, from shares and exchanges to investing strategies.', icon: React.createElement(Icons.ChartBarIcon, { className: "w-8 h-8" }), colorClass: 'text-success', type: 'tool' },
  'blockchain': { id: 'blockchain', title: 'Blockchain Technology', description: 'Explore the foundational technology behind cryptocurrencies and decentralized systems.', icon: React.createElement(Icons.LinkIcon, { className: "w-8 h-8" }), colorClass: 'text-tertiary', type: 'tool' },
};

export const codingCourses = [
    ALL_COURSES['html'],
    ALL_COURSES['css'],
    ALL_COURSES['javascript'],
    ALL_COURSES['python'],
    ALL_COURSES['cplusplus'],
    ALL_COURSES['java'],
    ALL_COURSES['php'],
    ALL_COURSES['sql'],
    ALL_COURSES['react'],
    ALL_COURSES['typescript'],
];

export const toolCourses = [
    ALL_COURSES['excel'],
    ALL_COURSES['word'],
    ALL_COURSES['powerpoint'],
    ALL_COURSES['sheets'],
    ALL_COURSES['docs'],
    ALL_COURSES['slides'],
    ALL_COURSES['canva'],
    ALL_COURSES['notion'],
    ALL_COURSES['trello'],
    ALL_COURSES['figma'],
];

export const financeAndTechCourses = [
    ALL_COURSES['cryptocurrency'],
    ALL_COURSES['stockmarket'],
    ALL_COURSES['blockchain'],
];