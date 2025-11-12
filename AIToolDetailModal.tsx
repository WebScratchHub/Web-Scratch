import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AITool, AIToolDetails } from '../../types';
import * as Icons from './Icons';
import Button from './Button';
import Spinner from './Spinner';
import { getAIToolDetails } from '../../services/geminiService';

interface AIToolDetailModalProps {
  tool: AITool;
  onClose: () => void;
}

const getDomain = (url: string): string => {
    try {
        return new URL(url).hostname;
    } catch (e) {
        return '';
    }
};

const AIToolDetailModal: React.FC<AIToolDetailModalProps> = ({ tool, onClose }) => {
  const [details, setDetails] = useState<AIToolDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAIToolDetails(tool.name, tool.url);
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not fetch tool details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [tool]);

  const domain = getDomain(tool.url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&size=64`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-dark-bg/90 border border-white/10 rounded-2xl w-full max-w-2xl shadow-glow-cyan-lg relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={faviconUrl} 
                alt={`${tool.name} logo`} 
                className="w-12 h-12 rounded-lg bg-white/5 object-contain p-1 border border-white/10"
              />
              <div>
                <h2 className="text-2xl font-bold text-white text-glow">{tool.name}</h2>
                <p className="text-sm text-text-secondary">{tool.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                <Button variant="primary">
                  Visit Site <Icons.ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Button variant="ghost" iconOnly onClick={onClose} className="text-muted hover:text-white">
                <Icons.CloseIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6 overflow-y-auto disclaimer-scroll flex-grow">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <Spinner size="lg" />
              <p className="mt-4 text-text-secondary">Asking Gemini about {tool.name}...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-12 text-error bg-error/10 p-4 rounded-lg">
                <p className="font-semibold">Failed to retrieve details.</p>
                <p className="text-sm">{error}</p>
            </div>
          )}
          {!isLoading && details && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-2">Summary</h3>
                <p className="text-text-secondary leading-relaxed">{details.summary}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-2">Key Features</h3>
                <ul className="space-y-2 list-disc list-inside text-text-secondary">
                  {details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-2">Pricing Overview</h3>
                <p className="text-text-secondary leading-relaxed">{details.pricing}</p>
              </div>
            </motion.div>
          )}
        </main>
        
        <footer className="p-4 bg-black/30 border-t border-white/10 text-center text-xs text-muted flex-shrink-0">
            Disclaimer: Information is generated by AI based on public data and may not be 100% accurate. Please verify on the official website.
        </footer>
      </motion.div>
    </motion.div>
  );
};

export default AIToolDetailModal;