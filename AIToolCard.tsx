import React from 'react';
import { motion } from 'framer-motion';
import { AITool } from '../../types';
import * as Icons from './Icons';

interface AIToolCardProps {
  tool: AITool;
  onClick: (tool: AITool) => void;
}

const getDomain = (url: string): string => {
    try {
        return new URL(url).hostname;
    } catch (e) {
        console.error(`Invalid URL: ${url}`, e);
        return '';
    }
};

const AIToolCard: React.FC<AIToolCardProps> = ({ tool, onClick }) => {
  const domain = getDomain(tool.url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&size=64`;
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-white/5 border border-white/[.08] p-5 rounded-2xl flex flex-col items-start h-full shadow-glow-violet-md transition-all duration-300 ai-card group cursor-pointer"
      onClick={() => onClick(tool)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(tool)}
      aria-label={`View details for ${tool.name}`}
    >
        <div className="flex justify-between items-start w-full mb-4">
            <img 
                src={faviconUrl} 
                alt={`${tool.name} logo`} 
                className="w-10 h-10 rounded-lg bg-dark-bg/50 object-contain p-1 border border-white/10"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full animate-glowing-border border border-primary/20 whitespace-nowrap">{tool.category}</span>
        </div>
        
      <h3 className="mb-2 text-xl font-bold text-text-main text-glow truncate w-full" title={tool.name}>{tool.name}</h3>
      <p className="text-text-secondary text-sm flex-grow mb-4 line-clamp-3 h-16">{tool.description}</p>
      
      <div className="mt-auto pt-2 w-full">
        <span className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors duration-200">
            View Details <span className="group-hover:ml-1 transition-all duration-200 inline-block">→</span>
        </span>
      </div>
    </motion.div>
  );
};

export default AIToolCard;
