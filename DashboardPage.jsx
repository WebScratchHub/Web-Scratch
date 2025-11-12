import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import * as Icons from '../components/ui/Icons'; // Assuming Icons.jsx is created

const ToolCard = ({ icon, title, description, to, navigate, colorClass }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ y: -5, scale: 1.02, boxShadow: '0 0 25px rgba(123, 97, 255, 0.3)' }}
    className="bg-white/5 border border-white/[.08] p-6 rounded-2xl flex flex-col items-start h-full cursor-pointer"
    onClick={() => navigate(to)}
  >
    <div className={`p-3 bg-white/5 rounded-lg mb-4 ${colorClass}`}>{icon}</div>
    <h3 className="mb-2 text-lg font-semibold text-text-main">{title}</h3>
    <p className="text-text-secondary text-sm flex-grow">{description}</p>
    <div className="mt-4 text-sm font-semibold text-secondary hover:text-primary">
      Open Tool →
    </div>
  </motion.div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const tools = [
    { icon: <Icons.SparklesIcon className="w-8 h-8" />, title: 'AI Tools', description: 'Explore a full suite of AI-powered tools for creation and productivity.', to: '/dashboard/ai-tools', colorClass: 'text-secondary' },
    { icon: <Icons.ImagesIcon className="w-8 h-8" />, title: 'Image Studio', description: 'Create stunning, high-quality images from text prompts.', to: '/dashboard/image-studio', colorClass: 'text-primary' },
    // Add other tools here
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-text-main text-glow">
          Welcome back, {user?.fullName?.split(' ')[0]}!
        </h1>
        <p className="text-text-secondary mt-2">What will you create today?</p>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} navigate={navigate} />
        ))}
      </motion.div>

      {/* Placeholder for Recent Images section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-text-main">My Recent Images</h2>
        <div className="mt-4 text-center py-10 bg-white/5 border border-dashed border-white/[.08] rounded-2xl">
          <Icons.ImagesIcon className="w-12 h-12 mx-auto text-text-secondary mb-2" />
          <p className="text-text-secondary">Your recently generated images will appear here.</p>
          <Button variant="secondary" className="mt-4" onClick={() => navigate('/dashboard/image-studio')}>
            Go to Image Studio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
