import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneratedImage } from '../../types';
import * as Icons from './Icons';
import Button from './Button';

interface ImageModalProps {
  image: GeneratedImage | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onToggleFavorite: (id: string) => void;
  onRegenerate: (prompt: string) => void;
  totalImages: number;
  currentIndex: number;
}

const ImageModal: React.FC<ImageModalProps> = ({
  image,
  onClose,
  onNavigate,
  onToggleFavorite,
  onRegenerate,
  totalImages,
  currentIndex,
}) => {
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate('next');
      if (e.key === 'ArrowLeft') onNavigate('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);

  const handleCopyLink = () => {
    if (image) {
      navigator.clipboard.writeText(image.imageUrl);
      // In a real app, a toast notification could confirm the copy action.
    }
  };

  const handleDownload = () => {
    if (image) {
        const link = document.createElement('a');
        link.href = image.imageUrl;
        link.download = `webscratch-ai-${image.id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  const promptText = image?.prompt || '';
  const isPromptLong = promptText.length > 120;
  const displayPrompt = isPromptLong && !showFullPrompt ? `${promptText.substring(0, 120)}...` : promptText;

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        >
          {/* Main Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <Button variant="subtle" iconOnly onClick={onClose} className="absolute top-2 right-2 z-20 !text-white/70 hover:!text-white">
              <Icons.CloseIcon className="w-8 h-8" />
            </Button>

            {/* Navigation */}
            <Button variant="subtle" iconOnly onClick={() => onNavigate('prev')} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 !text-white/70 hover:!text-white">
              <Icons.ChevronLeftIcon className="w-10 h-10" />
            </Button>
            <Button variant="subtle" iconOnly onClick={() => onNavigate('next')} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 !text-white/70 hover:!text-white">
              <Icons.ChevronRightIcon className="w-10 h-10" />
            </Button>

            {/* Image Counter (Mobile) */}
            <div className="absolute top-4 left-4 text-white/80 bg-black/50 px-3 py-1 rounded-full text-sm md:hidden z-10">
              {currentIndex + 1} / {totalImages}
            </div>

            <div className="max-w-4xl max-h-full w-full flex flex-col items-center">
              {/* Image */}
              <motion.img
                  key={image.id}
                  src={image.imageUrl}
                  alt={image.prompt}
                  className="max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-2xl max-w-full"
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  onDragEnd={(_, info) => {
                      if (info.offset.y > 100) onClose();
                  }}
              />

              {/* Info and Actions */}
              <div className="bg-black/30 p-4 rounded-b-xl mt-2 text-white w-full backdrop-blur-sm">
                <div className="flex flex-col space-y-3">
                  <p className="text-sm text-text-secondary cursor-pointer" onClick={() => setShowFullPrompt(!showFullPrompt)}>
                      {displayPrompt} {isPromptLong && <span className="text-secondary font-semibold">{showFullPrompt ? ' (show less)' : ' (show more)'}</span>}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                          <Button variant="subtle" onClick={() => onToggleFavorite(image.id)}>
                              <Icons.HeartIcon className={`w-5 h-5 mr-1.5 ${image.isFavorite ? 'fill-red-500 text-red-500' : ''}`} /> Favorite
                          </Button>
                          <Button variant="subtle" onClick={handleDownload}>
                              <Icons.DownloadIcon className="w-5 h-5 mr-1.5" /> Download
                          </Button>
                          <Button variant="subtle" onClick={() => onRegenerate(image.prompt)}>
                              <Icons.RegenerateIcon className="w-5 h-5 mr-1.5" /> Regenerate
                          </Button>
                          <Button variant="subtle" onClick={handleCopyLink}>
                              <Icons.LinkIcon className="w-5 h-5 mr-1.5" /> Copy Link
                          </Button>
                      </div>
                        <div className="text-xs text-text-secondary font-mono bg-dark-bg px-2 py-1 rounded">
                          {image.aspectRatio}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;