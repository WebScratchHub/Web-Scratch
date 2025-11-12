import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ToolbarPosition } from '../../types';
import * as Icons from './Icons';
import Button from './Button';

interface EditorToolbarProps {
  position: ToolbarPosition;
  element: HTMLElement;
  onClose: () => void;
  onChangeImage: () => void;
  onAddLink: () => void;
  onDelete: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ position, element, onClose, onChangeImage, onAddLink, onDelete }) => {
  const isImage = useMemo(() => element.tagName === 'IMG', [element]);
  const isLinkable = useMemo(() => ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BUTTON', 'A', 'SPAN', 'DIV'].includes(element.tagName), [element]);
  const isMobileScreen = window.innerWidth < 768;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={{
        top: position.top,
        left: position.left,
        transform: isMobileScreen ? 'translateX(-50%)' : 'none',
      }}
      className="fixed z-50 bg-dark-bg/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl p-1 flex items-center space-x-1"
      onClick={(e) => e.stopPropagation()}
    >
      {isImage && (
        <Button size="sm" variant="ghost" iconOnly onClick={onChangeImage} title="Change Image">
          <Icons.PhotoIcon className="w-5 h-5" />
        </Button>
      )}
      {isLinkable && (
        <Button size="sm" variant="ghost" iconOnly onClick={onAddLink} title="Add/Edit Link">
          <Icons.LinkIcon className="w-5 h-5" />
        </Button>
      )}
      <Button size="sm" variant="ghost" iconOnly onClick={onDelete} title="Delete Element">
        <Icons.TrashIcon className="w-5 h-5 text-error" />
      </Button>
      <div className="w-px h-6 bg-white/10 mx-1"></div>
      <Button size="sm" variant="ghost" iconOnly onClick={onClose} title="Close">
        <Icons.CloseIcon className="w-5 h-5" />
      </Button>
    </motion.div>
  );
};

export default EditorToolbar;