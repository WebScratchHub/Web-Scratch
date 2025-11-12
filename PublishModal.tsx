import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from './Icons';
import Button from './Button';
import Input from './Input';
import Spinner from './Spinner';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (repoName: string) => void;
  isLoading: boolean;
  error: string | null;
  successData: { siteUrl: string; repoUrl: string } | null;
  defaultRepoName: string;
}

const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, onPublish, isLoading, error, successData, defaultRepoName }) => {
  const [repoName, setRepoName] = useState(defaultRepoName);

  useEffect(() => {
    setRepoName(defaultRepoName);
  }, [defaultRepoName]);

  if (!isOpen) return null;

  const handlePublishClick = () => {
    if (repoName) {
      onPublish(repoName);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <Spinner size="lg" />
          <p className="mt-4 text-text-secondary">Publishing your site...</p>
          <p className="text-sm text-muted">This may take a minute.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center">
          <Icons.CloseIcon className="w-12 h-12 mx-auto text-error mb-4" />
          <h3 className="text-lg font-semibold text-error">Publishing Failed</h3>
          <p className="text-sm text-text-secondary mt-2 bg-error/10 p-2 rounded-md">{error}</p>
          <Button onClick={handlePublishClick} className="mt-4">Try Again</Button>
        </div>
      );
    }

    if (successData) {
      return (
        <div className="text-center">
          <Icons.CheckCircleIcon className="w-12 h-12 mx-auto text-success mb-4" />
          <h3 className="text-lg font-semibold text-success">Published Successfully!</h3>
          <p className="text-sm text-text-secondary mt-2">Your website is now live on GitHub Pages.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <Button variant="primary" onClick={() => window.open(successData.siteUrl, '_blank')} className="flex-1">
                <Icons.ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" /> View Live Site
            </Button>
            <Button variant="secondary" onClick={() => window.open(successData.repoUrl, '_blank')} className="flex-1">
                <Icons.GitHubIcon className="w-4 h-4 mr-2" /> View Repository
            </Button>
          </div>
        </div>
      );
    }

    return (
      <>
        <h2 className="text-xl font-bold mb-4">Publish to GitHub</h2>
        <p className="text-sm text-text-secondary mb-4">This will create a new public repository on your GitHub account and deploy it using GitHub Pages.</p>
        <div className="space-y-4">
          <Input
            label="Repository Name"
            type="text"
            placeholder="e.g., my-awesome-site"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="primary" onClick={handlePublishClick} disabled={!repoName}>
            Publish
          </Button>
        </div>
      </>
    );
  };


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
        className="bg-dark-bg border border-white/10 rounded-2xl w-full max-w-md shadow-glow-violet-lg relative p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
        {!isLoading && !successData && (
            <Button variant="ghost" iconOnly onClick={onClose} className="absolute top-2 right-2"><Icons.CloseIcon className="w-6 h-6" /></Button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PublishModal;
