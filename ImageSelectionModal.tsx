import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneratedImage } from '../../types';
import * as Icons from './Icons';
import Button from './Button';
import Input from './Input';
import Spinner from './Spinner';

interface ImageSelectionModalProps {
  userImages: GeneratedImage[];
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({ userImages, onClose, onSelect }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'gallery'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadError("File is too large. Maximum size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onSelect(e.target?.result as string);
    };
    reader.onerror = () => {
      setUploadError("Failed to read the file.");
    };
    reader.readAsDataURL(file);
  };

  const handleUrlInsert = () => {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      onSelect(imageUrl);
    } else {
      setUploadError("Please enter a valid URL (starting with http:// or https://).");
    }
  };

  const TabButton: React.FC<{ tabId: typeof activeTab, label: string }> = ({ tabId, label }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        activeTab === tabId ? 'text-secondary border-b-2 border-secondary' : 'text-text-secondary hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-bg border border-white/10 rounded-2xl w-full max-w-2xl shadow-glow-violet-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Select Image Source</h2>
          <div className="border-b border-white/10 mb-4 flex">
            <TabButton tabId="upload" label="Upload File" />
            <TabButton tabId="url" label="From URL" />
            <TabButton tabId="gallery" label="My Gallery" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {activeTab === 'upload' && (
                <div>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/png, image/jpeg, image/webp, image/svg+xml" className="hidden" />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-secondary hover:bg-white/5 transition-colors"
                  >
                    <Icons.UploadIcon className="w-12 h-12 mx-auto text-text-secondary mb-2" />
                    <p className="font-semibold">Click to browse or drag & drop</p>
                    <p className="text-sm text-text-secondary">PNG, JPG, WEBP, SVG (max 5MB)</p>
                  </div>
                </div>
              )}
              {activeTab === 'url' && (
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="https://example.com/image.png"
                    value={imageUrl}
                    onChange={(e) => { setImageUrl(e.target.value); setUploadError(null); }}
                    className="flex-grow"
                  />
                  <Button onClick={handleUrlInsert}>Insert</Button>
                </div>
              )}
              {activeTab === 'gallery' && (
                <div className="max-h-96 overflow-y-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pr-2">
                  {userImages.length > 0 ? (
                    userImages.map(img => (
                      <img
                        key={img.id}
                        src={img.imageUrl}
                        alt={img.prompt}
                        className="aspect-square w-full h-full object-cover rounded-md cursor-pointer hover:ring-2 ring-secondary transition-all"
                        onClick={() => onSelect(img.imageUrl)}
                      />
                    ))
                  ) : (
                    <p className="col-span-full text-center text-text-secondary py-8">Your generated images will appear here.</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          {uploadError && <p className="text-error text-sm mt-2">{uploadError}</p>}
        </div>
        <Button variant="ghost" iconOnly onClick={onClose} className="absolute top-2 right-2"><Icons.CloseIcon className="w-6 h-6" /></Button>
      </motion.div>
    </motion.div>
  );
};

export default ImageSelectionModal;