import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from './Icons';
import Button from './Button';
import Input from './Input';
import Select from './Select';

interface LinkEditorModalProps {
  onClose: () => void;
  onSave: (url: string, target: string) => void;
  currentHref: string;
  currentTarget: string;
}

const LinkEditorModal: React.FC<LinkEditorModalProps> = ({ onClose, onSave, currentHref, currentTarget }) => {
  const [url, setUrl] = useState(currentHref);
  const [target, setTarget] = useState(currentTarget || '_self');

  const handleSave = () => {
    onSave(url, target);
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
        <h2 className="text-xl font-bold mb-4">Edit Link</h2>
        <div className="space-y-4">
          <Input
            label="URL"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Select label="Open In" value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="_self">Same Tab</option>
            <option value="_blank">New Tab</option>
          </Select>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Link</Button>
        </div>
        <Button variant="ghost" iconOnly onClick={onClose} className="absolute top-2 right-2"><Icons.CloseIcon className="w-6 h-6" /></Button>
      </motion.div>
    </motion.div>
  );
};

export default LinkEditorModal;