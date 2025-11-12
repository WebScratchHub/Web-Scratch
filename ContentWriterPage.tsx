import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateWrittenContent } from '../../services/geminiService';
import * as Icons from '../ui/Icons';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Spinner from '../ui/Spinner';

interface ContentWriterPageProps {
}

const CONTENT_TYPES = ['Blog Post', 'Product Description', 'YouTube Script', 'Ad Copy', 'Story', 'Custom'];
const TONES = ['Professional', 'Casual', 'Friendly', 'Persuasive', 'Funny', 'Formal'];

const ContentWriterPage: React.FC<ContentWriterPageProps> = () => {
  const [contentType, setContentType] = useState(CONTENT_TYPES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter a topic or prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent('');
    
    try {
        const content = await generateWrittenContent(contentType, tone, topic);
        setGeneratedContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred during content generation.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    // Add a toast notification for better UX in a real app
  };
  
  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.substring(0, 20).replace(/\s+/g, '_')}_content.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4.5rem)] flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl"
        >
            <div className="bg-white/5 border border-white/[.08] rounded-2xl p-8 shadow-glow-violet-md">
                <div className="text-center mb-8">
                    <Icons.DocumentTextIcon className="w-16 h-16 mx-auto mb-4 text-secondary" />
                    <h1 className="text-3xl font-bold text-text-main text-glow">AI Content Writer</h1>
                    <p className="text-text-secondary mt-2">Generate high-quality articles, scripts, and more with a simple prompt.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Select label="Content Type" value={contentType} onChange={(e) => setContentType(e.target.value)}>
                        {CONTENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </Select>
                     <Select label="Tone of Voice" value={tone} onChange={(e) => setTone(e.target.value)}>
                        {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                </div>

                <div className="mb-6">
                    <label htmlFor="topic-input" className="block text-sm font-medium text-text-secondary mb-1">Topic / Prompt</label>
                    <textarea
                        id="topic-input"
                        rows={4}
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., 'An article about the benefits of AI in creative workflows'"
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-white/[.08] focus:border-secondary focus:ring-secondary bg-white/5 text-white placeholder:text-muted"
                    />
                </div>

                <Button 
                    onClick={handleGenerate} 
                    isLoading={isLoading} 
                    className="w-full text-lg py-3 generate-button"
                >
                    {isLoading ? 'Generating Content...' : 'Generate'}
                </Button>
                
                {error && <p className="text-error text-sm text-center bg-error/10 p-2 rounded-md mt-4">{error}</p>}

                {(generatedContent || isLoading) && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '24px' }}
                        className="bg-black/20 rounded-lg p-4 border border-white/[.08]"
                    >
                        <h3 className="text-lg font-semibold text-text-main mb-2">Generated Content</h3>
                        {isLoading ? (
                            <div className="flex items-center justify-center h-48">
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                <div className="max-h-96 overflow-y-auto pr-2 disclaimer-scroll whitespace-pre-line text-text-secondary leading-relaxed">
                                    {generatedContent}
                                </div>
                                <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-white/[.08]">
                                    <Button size="sm" variant="secondary" onClick={handleCopy}>
                                        <Icons.ClipboardIcon className="w-4 h-4 mr-2" /> Copy Text
                                    </Button>
                                    <Button size="sm" variant="secondary" onClick={handleDownload}>
                                        <Icons.DownloadIcon className="w-4 h-4 mr-2" /> Download .txt
                                    </Button>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.div>
    </div>
  );
};

export default ContentWriterPage;
