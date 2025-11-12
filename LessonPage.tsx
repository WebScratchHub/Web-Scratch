import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Lesson } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { ALL_COURSES } from '../../data/learningContent';
import Button from '../ui/Button';
import * as Icons from '../ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '../ui/Spinner';
import { useDeviceMode } from '../../hooks/useDeviceMode';
import { useParams, useNavigate } from 'react-router-dom';

interface LessonPageProps {
}

const LessonSection: React.FC<{ title: string; children: React.ReactNode; code?: boolean }> = ({ title, children, code = false }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-main mb-2">{title}</h3>
        <div className={`relative rounded-lg p-4 ${code ? 'bg-dark-bg' : 'bg-white/5'}`}>
            {children}
        </div>
    </div>
);

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const handleCopyCode = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };
    return (
        <div className="relative">
            <pre><code className="text-sm font-mono whitespace-pre-wrap text-white">{code}</code></pre>
            <button onClick={handleCopyCode} className="absolute top-2 right-2 p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-xs inline-flex items-center">
                {copySuccess ? <><Icons.CheckIcon className="w-4 h-4 mr-1 text-success" />Copied!</> : <><Icons.ClipboardIcon className="w-4 h-4 mr-1 text-text-secondary" />Copy</>}
            </button>
        </div>
    );
};


const LessonPage: React.FC<LessonPageProps> = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const courseInfo = ALL_COURSES[courseId!];
  const { learningProgress, updateCourseProgress } = useAuth();
  const { deviceMode } = useDeviceMode();
  const isPcMode = deviceMode === 'pc';
  
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isTopicsVisible, setIsTopicsVisible] = useState(false);

  const topicListRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!courseId) return;
    const loadCourse = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/data/learning/${courseId}.json`);
            if (!response.ok) throw new Error("Course content not found.");
            const data = await response.json();
            if(!data || data.length === 0) throw new Error("Course content is empty.");
            setLessons(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load course content.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    loadCourse();
  }, [courseId]);
  
  useEffect(() => {
      if (lessons.length > 0 && courseId) {
        const savedProgress = learningProgress[courseId] ?? -1;
        setCurrentLessonIndex(Math.min(savedProgress + 1, lessons.length - 1));
      }
  }, [lessons, courseId, learningProgress]);

  useEffect(() => {
    const activeTopicElement = topicListRef.current?.querySelector(`[data-topic-index="${currentLessonIndex}"]`);
    activeTopicElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    mainContentRef.current?.scrollTo(0, 0);
  }, [currentLessonIndex]);
  
  const markLessonAsComplete = useCallback((lessonIndex: number) => {
    if (!courseId) return;
      const currentHighest = learningProgress[courseId] ?? -1;
      if (lessonIndex > currentHighest) {
          updateCourseProgress(courseId, lessonIndex);
      }
  }, [courseId, learningProgress, updateCourseProgress]);

  if (!courseInfo) {
    return (
      <div className="p-8 text-center"><h2 className="text-2xl text-error">Course not found!</h2><Button onClick={() => navigate('/dashboard/learning-hub')} className="mt-4">Back to Learning Hub</Button></div>
    );
  }
  
  if (isLoading) {
      return (
          <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-10rem)] text-center">
              <Spinner size="lg" />
              <h2 className="text-2xl font-bold text-text-main mt-6">Loading {courseInfo.title} Course...</h2>
          </div>
      );
  }

  if (error) {
      return (
           <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-10rem)] text-center">
              <Icons.CodeBracketIcon className="w-16 h-16 text-error/50 mb-4" />
              <h2 className="text-2xl font-bold text-error mt-6">Failed to Load Course</h2>
              <p className="text-text-secondary mt-2 max-w-md">{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-6">Try Again</Button>
          </div>
      );
  }
  
  const handleSetLesson = (index: number) => {
    setCurrentLessonIndex(index);
    markLessonAsComplete(index - 1);
    setIsTopicsVisible(false);
  }

  const handleNavigation = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' ? currentLessonIndex + 1 : currentLessonIndex - 1;
    if (newIndex >= 0 && newIndex < lessons.length) {
      markLessonAsComplete(currentLessonIndex);
      setCurrentLessonIndex(newIndex);
    }
  };

  const totalLessons = lessons.length;
  const completedLessonIndex = (courseId && learningProgress[courseId]) ?? -1;
  const progressPercentage = totalLessons > 0 ? ((completedLessonIndex + 1) / totalLessons) * 100 : 0;
  const currentLesson = lessons[currentLessonIndex];

  const TopicsList = () => (
    <nav><ul className="space-y-1">{lessons.map((lesson, index) => (<li key={index}><a href="#" onClick={(e) => { e.preventDefault(); handleSetLesson(index); }} data-topic-index={index} className={`flex items-center space-x-3 p-2 rounded-lg text-sm transition-all duration-200 hover:shadow-[0_0_12px_rgba(123,97,255,0.4)] ${currentLessonIndex === index ? 'bg-primary/20 text-secondary font-semibold' : 'text-text-secondary hover:bg-white/5 hover:text-text-main'}`}>{index <= completedLessonIndex ? (<Icons.CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0"/>) : (<span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-mono text-muted border border-white/20 rounded-full">{index + 1}</span>)}<span className="truncate">{lesson.title.split('. ')[1]}</span></a></li>))}</ul></nav>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col h-full min-h-[calc(100vh-4.5rem)]">
      <header className="mb-6 flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <Button onClick={() => navigate('/dashboard/learning-hub')} variant="ghost" size="sm"><Icons.ChevronLeftIcon className="w-4 h-4 mr-2" /> Back to Learning Hub</Button>
            <div className="flex items-center gap-4">
                <Button onClick={() => setIsTopicsVisible(true)} variant="ghost" size="sm" className={isPcMode ? 'hidden' : 'flex'}>View Topics <Icons.BookOpenIcon className="w-4 h-4 ml-2" /></Button>
            </div>
        </div>
        <h1 className="text-3xl font-bold text-text-main text-glow mt-4">{courseInfo.title} Learning Path</h1>
        <div className="mt-4 w-full bg-white/10 rounded-full h-2.5"><div className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div></div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
        <aside ref={topicListRef} className={`w-1/3 xl:w-1/4 bg-black/20 border border-white/[.08] rounded-2xl p-4 flex-shrink-0 overflow-y-auto disclaimer-scroll ${isPcMode ? 'block' : 'hidden'}`}><h2 className="text-xl font-bold text-text-main mb-4 px-2">Course Topics</h2><TopicsList /></aside>
        
        <AnimatePresence>{isTopicsVisible && !isPcMode && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsTopicsVisible(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"><motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} onClick={(e) => e.stopPropagation()} className="absolute top-0 left-0 h-full w-4/5 max-w-sm bg-dark-bg border-r border-white/[.08] p-4 flex flex-col"><h2 className="text-xl font-bold text-text-main mb-4 px-2">Course Topics</h2><div className="overflow-y-auto flex-1 disclaimer-scroll"><TopicsList /></div></motion.div></motion.div>)}</AnimatePresence>

        <main ref={mainContentRef} className="flex-1 bg-white/5 border border-white/[.08] rounded-2xl flex flex-col overflow-y-auto disclaimer-scroll">
            <AnimatePresence mode="wait"><motion.div key={currentLessonIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-6 md:p-8">
                <h2 className="text-2xl lg:text-3xl font-semibold text-secondary mb-4">{currentLesson.title}</h2>
                <LessonSection title="Explanation"><div className="prose prose-invert max-w-none text-text-secondary whitespace-pre-line leading-relaxed"><p>{currentLesson.explanation}</p></div></LessonSection>
                {currentLesson.example && <LessonSection title="Example" code><CodeBlock code={currentLesson.example} /></LessonSection>}
                {currentLesson.useCase && <LessonSection title="Example / Use Case"><div className="prose prose-invert max-w-none text-text-secondary whitespace-pre-line leading-relaxed"><p>{currentLesson.useCase}</p></div></LessonSection>}
                {currentLesson.tip && <LessonSection title="Productivity Tip"><div className="prose prose-invert max-w-none text-text-secondary"><p>{currentLesson.tip}</p></div></LessonSection>}
            </motion.div></AnimatePresence>
        </main>
      </div>

      <footer className="mt-8 flex justify-between items-center flex-shrink-0">
        <Button onClick={() => handleNavigation('prev')} disabled={currentLessonIndex === 0} variant="secondary"><Icons.ChevronLeftIcon className="w-5 h-5 mr-2" /> Previous</Button>
        <p className="text-sm text-text-secondary font-mono">{currentLessonIndex + 1} / {totalLessons}</p>
        <Button onClick={() => handleNavigation('next')} disabled={currentLessonIndex === totalLessons - 1}>Next <Icons.ChevronRightIcon className="w-5 h-5 ml-2" /></Button>
      </footer>
    </div>
  );
};

export default LessonPage;
