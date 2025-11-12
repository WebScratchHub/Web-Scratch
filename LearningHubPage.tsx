import React from 'react';
import { motion } from 'framer-motion';
import { codingCourses, toolCourses, financeAndTechCourses, Course } from '../../data/learningContent';
import { useDeviceMode } from '../../hooks/useDeviceMode';
import { useNavigate } from 'react-router-dom';

interface LearningHubPageProps {
}

const CourseCard: React.FC<{
  course: Course;
}> = ({ course }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5, scale: 1.02, boxShadow: '0 0 25px rgba(0, 229, 255, 0.3)' }}
      className="bg-white/5 border border-white/[.08] p-6 rounded-2xl flex flex-col items-start h-full cursor-pointer"
      onClick={() => navigate(`/dashboard/learning-hub/${course.id}`)}
    >
      <div className={`p-3 bg-white/5 rounded-lg mb-4 ${course.colorClass}`}>{course.icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-text-main">{course.title}</h3>
      <p className="text-text-secondary text-sm flex-grow">{course.description}</p>
      <div className="mt-4 text-sm font-semibold text-secondary hover:text-primary">
        Start Learning →
      </div>
    </motion.div>
  );
};

const LearningHubPage: React.FC<LearningHubPageProps> = () => {
  const { deviceMode } = useDeviceMode();
  const isPcMode = deviceMode === 'pc';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };
  
  const gridClasses = isPcMode 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8" 
    : "grid grid-cols-1 sm:grid-cols-2 gap-6";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-text-main text-glow">
          Learning Hub
        </h1>
        <p className="text-text-secondary mt-2 max-w-3xl mx-auto">
          Master new skills with interactive, AI-powered lessons. Your progress is saved automatically.
        </p>
      </header>

      <div className="space-y-16">
        <div>
            <h2 className="text-2xl font-bold text-text-main mb-6">Coding Languages</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={gridClasses}
            >
              {codingCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
        </div>
        <div>
            <h2 className="text-2xl font-bold text-text-main mb-6">Productivity Tools</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={gridClasses}
            >
              {toolCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
        </div>
         <div>
            <h2 className="text-2xl font-bold text-text-main mb-6">Finance & Technology</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={gridClasses}
            >
              {financeAndTechCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LearningHubPage;
