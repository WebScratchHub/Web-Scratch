import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import * as Icons from './Icons';
import { projectFiles } from '../../projectData'; // We will create this file

const DownloadProjectModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // FIX: Changed from URL.createObjectURL(url) to URL.revokeObjectURL(url) to correctly release the object URL.
    URL.revokeObjectURL(url);
  };

  const folderStructure = `
/
├── .firebaserc
├── firebase.json
├── index.html
├── index.tsx
├── App.tsx
├── metadata.json
├── types.ts
├── constants.ts
├── components/
│   ├── layout/
│   ├── pages/
│   ├── shared/
│   └── ui/
├── context/
├── data/
│   └── learning/
├── hooks/
└── services/
  `;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="w-full max-w-4xl bg-dark-bg border border-white/10 rounded-2xl shadow-glow-cyan-lg flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">Download Project Files</h2>
          <Button variant="ghost" iconOnly onClick={onClose}><Icons.CloseIcon className="w-6 h-6" /></Button>
        </header>

        <main className="p-6 flex-grow overflow-y-auto disclaimer-scroll grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-secondary mb-2">Instructions</h3>
            <p className="text-sm text-text-secondary mb-4">
              Download each file and place it in the correct folder on your computer as shown in the structure below. Due to browser limitations, files cannot be downloaded as a single zip archive.
            </p>
            <div className="bg-black/50 p-3 rounded-lg">
              <pre className="text-xs text-muted font-mono whitespace-pre-wrap">{folderStructure}</pre>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-secondary mb-2">Project Files</h3>
            <div className="space-y-2">
              {Object.entries(projectFiles).map(([path, content]) => (
                <div key={path} className="bg-white/5 p-2 rounded-md flex justify-between items-center text-sm">
                  <span className="font-mono text-text-main">{path}</span>
                  <Button size="sm" variant="secondary" onClick={() => handleDownload(path.split('/').pop() || path, content)}>
                    <Icons.DownloadIcon className="w-4 h-4 mr-2" /> Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </motion.div>
    </motion.div>
  );
};

export default DownloadProjectModal;