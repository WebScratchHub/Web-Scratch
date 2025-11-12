

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneratedImage } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { generateImages } from '../../services/geminiService';
import { EXAMPLE_PROMPTS, STYLES, ASPECT_RATIOS, BLOCKED_WORDS } from '../../constants';
import * as Icons from '../ui/Icons';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Slider from '../ui/Slider';
import ImageModal from '../ui/ImageModal';
import Tooltip from '../ui/Tooltip';
import Spinner from '../ui/Spinner';
import { useDeviceMode } from '../../hooks/useDeviceMode';

interface ImageStudioPageProps {
}

const ImageStudioPage: React.FC<ImageStudioPageProps> = () => {
  const { user, images, addImages, toggleFavorite } = useAuth();
  const { deviceMode } = useDeviceMode();
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [style, setStyle] = useState(STYLES[0]);
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16" | "4:3" | "3:4">("1:1");
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  const allImages = useMemo(() => {
    return [...images].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [images]);
  
  const activeImageIndex = useMemo(() => allImages.findIndex(img => img.id === activeImageId), [allImages, activeImageId]);
  const activeImage = useMemo(() => activeImageIndex > -1 ? allImages[activeImageIndex] : null, [allImages, activeImageIndex]);

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }
    if (BLOCKED_WORDS.some(word => prompt.toLowerCase().includes(word) || negativePrompt.toLowerCase().includes(word))) {
        setError("Your prompt contains blocked words. Please revise and try again.");
        return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const urls = await generateImages({
        prompt,
        negativePrompt,
        style,
        aspectRatio,
        numberOfImages,
      });

      const imagesToSave = urls.map(url => ({
          imageUrl: url,
          prompt,
          negativePrompt,
          style,
          aspectRatio,
      }));
      await addImages(imagesToSave);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred during image generation.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUseExamplePrompt = () => {
    const randomPrompt = EXAMPLE_PROMPTS[Math.floor(Math.random() * EXAMPLE_PROMPTS.length)];
    setPrompt(randomPrompt);
  };
  
  const handleImageClick = (image: GeneratedImage) => {
    setActiveImageId(image.id);
  };

  const handleCloseModal = () => {
    setActiveImageId(null);
  };

  const handleNavigateModal = useCallback((direction: 'prev' | 'next') => {
      if (activeImageIndex === -1) return;
      const newIndex = direction === 'next' ? (activeImageIndex + 1) % allImages.length : (activeImageIndex - 1 + allImages.length) % allImages.length;
      setActiveImageId(allImages[newIndex].id);
  }, [activeImageIndex, allImages]);
  
  const handleRegenerate = (basePrompt: string) => {
      setPrompt(basePrompt);
      handleCloseModal();
  };


  return (
    <div className={`flex min-h-[calc(100vh-4.5rem)] ${deviceMode === 'pc' ? 'flex-row' : 'flex-col'}`}>
      {/* Controls Panel */}
      <aside className="w-full md:w-96 bg-black/20 border-r border-white/[.08] p-6 flex-shrink-0 overflow-y-auto">
        <h1 className="text-2xl font-bold text-text-main mb-6">Image Studio</h1>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1">
                <label htmlFor="prompt" className="block text-sm font-medium text-text-secondary">Prompt</label>
                <Button variant="ghost" size="sm" onClick={handleUseExamplePrompt} className="text-xs">
                    <Icons.SparklesIcon className="w-4 h-4 mr-1" /> Surprise Me
                </Button>
            </div>
            <textarea
              id="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A majestic lion with a glowing mane, fantasy art style"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-white/[.08] focus:border-secondary focus:ring-secondary bg-white/5 text-white placeholder:text-muted"
            />
          </div>
          
          <Input 
            label="Negative Prompt (optional)"
            id="negativePrompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="e.g., blurry, low quality, text"
          />

          <Select label="Style" id="style" value={style} onChange={(e) => setStyle(e.target.value)}>
            {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>

          <Select label="Aspect Ratio" id="aspectRatio" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as any)}>
            {ASPECT_RATIOS.map(ar => <option key={ar.value} value={ar.value}>{ar.label}</option>)}
          </Select>
          
          <Slider 
            label="Number of Images"
            id="numberOfImages"
            min="1" max="4"
            value={numberOfImages}
            onChange={(e) => setNumberOfImages(parseInt(e.target.value, 10))}
          />

          <Button onClick={handleGenerate} isLoading={isLoading} className="w-full text-lg py-3">
            {isLoading ? 'Generating...' : `Generate ${numberOfImages} Image${numberOfImages > 1 ? 's' : ''}`}
          </Button>

          {error && <p className="text-error text-sm text-center bg-error/10 p-2 rounded-md">{error}</p>}
        </div>
      </aside>

      {/* Image Gallery */}
      <main className="flex-1 p-6">
        {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary">
                <Spinner size="lg" />
                <p className="mt-4 text-lg">Conjuring up your masterpiece...</p>
                <p className="text-sm">This can take a moment.</p>
            </div>
        )}
        
        <AnimatePresence>
          {!isLoading && allImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center text-text-secondary"
            >
              <Icons.ImagesIcon className="w-24 h-24 mb-4 text-white/10" />
              <h2 className="text-2xl font-bold text-text-main">Your canvas is ready.</h2>
              <p>Use the controls on the left to generate your first image.</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isLoading && allImages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {allImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative aspect-square group cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <img src={image.imageUrl} alt={image.prompt} className="w-full h-full object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                  <p className="text-white text-xs text-center line-clamp-3">{image.prompt}</p>
                </div>
                {image.isFavorite && (
                    <div className="absolute top-2 right-2">
                        <Icons.HeartIcon className="w-6 h-6 text-red-500 fill-red-500" />
                    </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <ImageModal 
        image={activeImage}
        onClose={handleCloseModal}
        onNavigate={handleNavigateModal}
        onToggleFavorite={toggleFavorite}
        onRegenerate={handleRegenerate}
        totalImages={allImages.length}
        currentIndex={activeImageIndex}
      />
    </div>
  );
};

export default ImageStudioPage;
