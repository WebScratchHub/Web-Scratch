import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AITool } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from '../ui/Icons';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Spinner from '../ui/Spinner';
import AIToolCard from '../ui/AIToolCard';
import AIToolDetailModal from '../ui/AIToolDetailModal';
import { useDeviceMode } from '../../hooks/useDeviceMode';

interface AIToolsPageProps {
}

const TOOLS_PER_PAGE = 48;
const CATEGORIES = ['All', 'Chat & Text', 'Image & Design', 'Coding & Development', 'Video & Animation', 'Productivity & Business', 'Voice & Music', 'Research & Data', 'Other'];

const AIToolsPage: React.FC<AIToolsPageProps> = () => {
  const [allTools, setAllTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const { deviceMode } = useDeviceMode();
  const isPcMode = deviceMode === 'pc';
  
  useEffect(() => {
    const fetchTools = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/data/ai-tools.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAllTools(data);
        } catch (e) {
            console.error("Failed to fetch AI tools:", e);
            setError("Could not load AI tools. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    fetchTools();
  }, []);

  const filteredTools = useMemo(() => {
    return allTools
      .filter(tool => 
        selectedCategory === 'All' || tool.category === selectedCategory
      )
      .filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [allTools, searchQuery, selectedCategory]);
  
  useEffect(() => {
      setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const paginatedTools = useMemo(() => {
      const startIndex = (currentPage - 1) * TOOLS_PER_PAGE;
      return filteredTools.slice(startIndex, startIndex + TOOLS_PER_PAGE);
  }, [filteredTools, currentPage]);

  const totalPages = Math.ceil(filteredTools.length / TOOLS_PER_PAGE);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const handlePageChange = (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
  }

  const renderContent = () => {
      if (isLoading) {
          return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;
      }
      if (error) {
          return <div className="text-center text-error py-10">{error}</div>
      }
      if (paginatedTools.length === 0) {
          return <div className="text-center text-text-secondary py-10">No tools found. Try adjusting your search or filters.</div>
      }
      return (
          <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={isPcMode ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}
          >
            {paginatedTools.map((tool) => (
                <AIToolCard key={tool.name} tool={tool} onClick={setSelectedTool} />
            ))}
          </motion.div>
      )
  }

  return (
    <>
    <AnimatePresence>
      {selectedTool && <AIToolDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />}
    </AnimatePresence>
    <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4.5rem)] flex flex-col" style={{backgroundColor: '#0b0e15'}}>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-text-main text-glow">🌐 Explore AI Tools</h1>
        <p className="text-text-secondary mt-2 max-w-3xl mx-auto">
          Discover and access AI platforms from around the world — text, image, code, and more.
        </p>
      </header>

      <div className="bg-[#0b0e15]/80 backdrop-blur-lg py-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
                <Input 
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="🔍 Search for AI Tools..."
                    className="w-full"
                    aria-label="Search AI Tools"
                />
            </div>
            <div className="md:w-64">
                <Select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} aria-label="Filter by category">
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </Select>
            </div>
        </div>
      </div>
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
              <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} variant="secondary" size="sm">
                  <Icons.ChevronLeftIcon className="w-4 h-4 mr-1" /> Previous
              </Button>
              <span className="text-sm text-text-secondary">
                  Page {currentPage} of {totalPages}
              </span>
              <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} variant="secondary" size="sm">
                  Next <Icons.ChevronRightIcon className="w-4 h-4 ml-1" />
              </Button>
          </div>
      )}

      <footer className="mt-12 text-center text-xs text-muted border-t border-white/10 pt-6">
        <p>All product names, trademarks, and logos are the property of their respective owners.</p>
        <p>Web Scratch lists these AI tools for reference and educational purposes only.</p>
      </footer>
    </div>
    </>
  );
};

export default AIToolsPage;
