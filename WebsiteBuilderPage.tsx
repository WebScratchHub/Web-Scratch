

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WebsiteProject, ToolbarPosition } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { generateWebsiteCode, modifyWebsiteCode } from '../../services/geminiService';
import * as Icons from '../ui/Icons';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';
import EditorToolbar from '../ui/EditorToolbar';
import ImageSelectionModal from '../ui/ImageSelectionModal';
import LinkEditorModal from '../ui/LinkEditorModal';
import { useDeviceMode } from '../../hooks/useDeviceMode';
import { useGitHubAuth } from '../../hooks/useGitHubAuth';
import * as githubService from '../../services/githubService';
import PublishModal from '../ui/PublishModal';


const isTextElement = (element: HTMLElement | null): boolean => {
    return false;
};

interface WebsiteBuilderPageProps {
  project: WebsiteProject | null;
}

const WebsiteBuilderPage: React.FC<WebsiteBuilderPageProps> = ({ project }) => {
  const { user, websites, saveWebsiteProject, updateWebsiteProject, deleteWebsiteProject, images } = useAuth();
  const { deviceMode } = useDeviceMode();
  const githubAuth = useGitHubAuth();
  const [prompt, setPrompt] = useState('');
  const [modificationPrompt, setModificationPrompt] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<WebsiteProject | null>(project);
  const [projectName, setProjectName] = useState(project?.name || 'My New Website');
  const [isEditMode, setIsEditMode] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previousSelectedElementRef = useRef<HTMLElement | null>(null);

  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState<ToolbarPosition | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  
  // GitHub Publish State
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccessData, setPublishSuccessData] = useState<{ siteUrl: string; repoUrl: string } | null>(null);
  
  const syncIframeToState = useCallback(() => {
      if (iframeRef.current?.contentWindow) {
          const updatedHtml = iframeRef.current.contentWindow.document.documentElement.outerHTML;
          setGeneratedHtml(updatedHtml);
      }
  }, []);

  const handleIframeClick = useCallback((e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.target as HTMLElement;

      if (target.tagName === 'BODY' || target.tagName === 'HTML') {
        setSelectedElement(null);
        return;
      }
      
      setSelectedElement(target);
      const rect = target.getBoundingClientRect();
      const iframeRect = iframeRef.current?.getBoundingClientRect();
      if (iframeRect) {
          const isMobileScreen = window.innerWidth < 768;
          let top, left;

          if (isMobileScreen) {
              const toolbarHeight = 44;
              top = iframeRect.top + rect.top - toolbarHeight - 8;
              left = iframeRect.left + rect.left + (rect.width / 2);

              if (top < 8) {
                  top = iframeRect.top + rect.bottom + 8;
              }
          } else {
              top = iframeRect.top + rect.top;
              left = iframeRect.left + rect.right + 5;
          }

        setToolbarPosition({ top, left });
      }
  }, []);

  useEffect(() => {
    const previousElement = previousSelectedElementRef.current;
    
    const handleBlur = () => {
        syncIframeToState();
    };

    if (previousElement && previousElement.isConnected) {
        previousElement.style.outline = '';
        previousElement.style.boxShadow = '';
        if (isTextElement(previousElement)) {
            previousElement.contentEditable = 'false';
            previousElement.removeEventListener('blur', handleBlur);
        }
    }

    if (selectedElement) {
        selectedElement.style.outline = '2px solid #00E5FF';
        selectedElement.style.boxShadow = '0 0 10px rgba(0, 229, 255, 0.7)';
        
        if (isTextElement(selectedElement)) {
            selectedElement.contentEditable = 'true';
            selectedElement.focus();
            selectedElement.addEventListener('blur', handleBlur);
        }
    } else {
        setToolbarPosition(null);
    }
    
    previousSelectedElementRef.current = selectedElement;

  }, [selectedElement, syncIframeToState]);


  useEffect(() => {
    if (project) {
        handleLoadProject(project);
    }
  }, [project]);
  
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const setupListeners = () => {
        const doc = iframe.contentWindow?.document;
        if (doc?.body) {
            doc.body.removeEventListener('click', handleIframeClick);
            
            if (isEditMode) {
                doc.body.addEventListener('click', handleIframeClick);
            }
        }
    };

    const handleLoad = () => {
        setupListeners();
    };

    const handleFocus = () => {
        setTimeout(setupListeners, 100);
    };

    iframe.addEventListener('load', handleLoad);
    window.addEventListener('focus', handleFocus);

    if (iframe.contentWindow?.document?.readyState === 'complete') {
        handleLoad();
    }

    setupListeners();

    return () => {
        iframe.removeEventListener('load', handleLoad);
        window.removeEventListener('focus', handleFocus);
        const doc = iframe.contentWindow?.document;
        if (doc?.body) {
            doc.body.removeEventListener('click', handleIframeClick);
        }
    };
  }, [generatedHtml, handleIframeClick, isEditMode]);


  useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
          if (!selectedElement) return;
          const target = e.target as Node;
          const iframeEl = iframeRef.current;
          if (iframeEl && iframeEl.contains(target)) return;
          const toolbarRoot = document.getElementById('editor-toolbar-root');
          if (toolbarRoot && toolbarRoot.contains(target)) return;
          const modalsRoot = document.getElementById('modals-root');
          if (modalsRoot && modalsRoot.contains(target)) return;
          setSelectedElement(null);
      };
      
      document.addEventListener('click', handleOutsideClick, true);
      return () => {
          document.removeEventListener('click', handleOutsideClick, true);
      };
  }, [selectedElement]);


  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a prompt for your website.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setActiveProject(null);
    setProjectName("My New Website");
    setSelectedElement(null);
    setIsEditMode(true);

    try {
      const code = await generateWebsiteCode(prompt, deviceMode || 'pc');
      setGeneratedHtml(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred during generation.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModify = async () => {
    if (!modificationPrompt) return;
    if (!generatedHtml) return;

    setIsModifying(true);
    setError(null);
    setSelectedElement(null);
    try {
        syncIframeToState();
        const modifiedCode = await modifyWebsiteCode(generatedHtml, modificationPrompt, deviceMode || 'pc');
        setGeneratedHtml(modifiedCode);
        setModificationPrompt('');
    } catch (err) {
        setError(err instanceof Error ? "Failed to apply modifications." : "An unknown error occurred.");
    } finally {
        setIsModifying(false);
    }
};
  
  const handleSave = async () => {
      if (!generatedHtml || !user) return;
      setIsSaving(true);
      setError(null);
      
      if(selectedElement) setSelectedElement(null);
      
      setTimeout(async () => {
        try {
            const finalHtml = iframeRef.current?.contentWindow?.document.documentElement.outerHTML || generatedHtml;
            if (activeProject) {
                const updatedProject = { ...activeProject, name: projectName, html: finalHtml };
                await updateWebsiteProject(updatedProject);
            } else {
                const newProject = await saveWebsiteProject({ name: projectName, html: finalHtml });
                setActiveProject(newProject);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save project.");
        } finally {
            setIsSaving(false);
        }
      }, 100);
  };
  
  const handleNewProject = () => {
      setActiveProject(null);
      setProjectName("My New Website");
      setGeneratedHtml("");
      setPrompt("");
      setError(null);
      setSelectedElement(null);
      setIsEditMode(false);
  }

  const handleLoadProject = (proj: WebsiteProject) => {
    setActiveProject(proj);
    setProjectName(proj.name);
    setGeneratedHtml(proj.html);
    setPrompt('');
    setError(null);
    setSelectedElement(null);
    setIsEditMode(false);
  };
  
  const handleDeleteProject = async (id: string) => {
      if (activeProject?.id === id) handleNewProject();
      await deleteWebsiteProject(id);
  }

  const handleExport = () => {
      if(selectedElement) setSelectedElement(null);
      setTimeout(() => {
        const finalHtml = iframeRef.current?.contentWindow?.document.documentElement.outerHTML || generatedHtml;
        const blob = new Blob([finalHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName.replace(/\s+/g, '-')}.html`;
        a.click();
        URL.revokeObjectURL(url);
      }, 100);
  };

  const handlePreview = () => {
      if(selectedElement) setSelectedElement(null);
      setTimeout(() => {
        const finalHtml = iframeRef.current?.contentWindow?.document.documentElement.outerHTML || generatedHtml;
        const blob = new Blob([finalHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 100);
      }, 100);
  }

  const handleImageSelected = (imageUrl: string) => {
    if (selectedElement && selectedElement.tagName === 'IMG') {
        (selectedElement as HTMLImageElement).src = imageUrl;
        syncIframeToState();
    }
    setIsImageModalOpen(false);
  };
  
  const handleLinkSave = (url: string, target: string) => {
      if (!selectedElement) return;
      let linkElement : HTMLElement | null = selectedElement.closest('a');

      if (!linkElement) {
          const newLink = document.createElement('a');
          selectedElement.parentNode?.replaceChild(newLink, selectedElement);
          newLink.appendChild(selectedElement);
          linkElement = newLink;
      }
      
      (linkElement as HTMLAnchorElement).href = url;
      (linkElement as HTMLAnchorElement).target = target;
      
      syncIframeToState();
      setIsLinkModalOpen(false);
  }

  const handleDeleteElement = () => {
      if (selectedElement) {
          selectedElement.remove();
          setSelectedElement(null);
          syncIframeToState();
      }
  };

  const openPublishModal = () => {
    if (!githubAuth.user) {
        githubAuth.login();
        return;
    }
    setPublishError(null);
    setPublishSuccessData(null);
    setIsPublishModalOpen(true);
  };

  const handlePublish = async (repoName: string) => {
    if (!githubAuth.token || !githubAuth.user) {
      setPublishError("GitHub authentication is missing. Please reconnect your account.");
      return;
    }
    setIsPublishing(true);
    setPublishError(null);
    setPublishSuccessData(null);

    try {
        const finalHtml = iframeRef.current?.contentWindow?.document.documentElement.outerHTML || generatedHtml;
        const owner = githubAuth.user.login;

        // 1. Create Repository
        await githubService.createRepo(githubAuth.token, repoName);

        // 2. Upload index.html
        await githubService.uploadFile(githubAuth.token, owner, repoName, 'index.html', finalHtml, 'Initial commit by Web Scratch AI');

        // 3. Enable GitHub Pages
        const pagesData = await githubService.enableGitHubPages(githubAuth.token, owner, repoName);

        // It can take a moment for the URL to become active. We'll poll it.
        let siteUrl = pagesData.html_url;
        let attempts = 0;
        const maxAttempts = 10;
        
        while(attempts < maxAttempts) {
            try {
                const response = await fetch(siteUrl);
                if (response.status === 200) {
                    break; // Site is live
                }
            } catch (e) { /* Ignore fetch errors during polling */ }
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
        }
        
        setPublishSuccessData({ siteUrl, repoUrl: `https://github.com/${owner}/${repoName}` });

    } catch (error: any) {
        setPublishError(error.message || "An unknown error occurred during publishing.");
    } finally {
        setIsPublishing(false);
    }
  };

  return (
    <>
      <div id="editor-toolbar-root">
        {toolbarPosition && selectedElement && (
          <EditorToolbar 
            position={toolbarPosition}
            element={selectedElement}
            onClose={() => setSelectedElement(null)}
            onChangeImage={() => setIsImageModalOpen(true)}
            onAddLink={() => setIsLinkModalOpen(true)}
            onDelete={handleDeleteElement}
          />
        )}
      </div>
       <div id="modals-root">
        {isImageModalOpen && (
            <ImageSelectionModal
                userImages={images}
                onClose={() => setIsImageModalOpen(false)}
                onSelect={handleImageSelected}
            />
        )}
        {isLinkModalOpen && selectedElement && (
            <LinkEditorModal
                onClose={() => setIsLinkModalOpen(false)}
                onSave={handleLinkSave}
                currentHref={selectedElement.closest('a')?.href || ''}
                currentTarget={selectedElement.closest('a')?.target || '_self'}
            />
        )}
        <PublishModal 
            isOpen={isPublishModalOpen}
            onClose={() => setIsPublishModalOpen(false)}
            onPublish={handlePublish}
            isLoading={isPublishing}
            error={publishError}
            successData={publishSuccessData}
            defaultRepoName={projectName.toLowerCase().replace(/\s+/g, '-')}
        />
      </div>
      <div className={`flex min-h-[calc(100vh-4.5rem)] ${deviceMode === 'pc' ? 'flex-row' : 'flex-col'}`}>
        <aside className="w-full md:w-96 bg-black/20 border-r border-white/[.08] p-6 flex-shrink-0 flex flex-col">
           <h1 className="text-2xl font-bold text-text-main mb-6">Website Builder</h1>
          <div className="space-y-6 flex-grow overflow-y-auto pr-2">
              <Input 
                  id="projectName"
                  label="Project Name"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
              />
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-text-secondary mb-1">Describe Your Website</label>
              <textarea
                id="prompt"
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A clean landing page for a new SaaS product..."
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-white/[.08] focus:border-secondary focus:ring-secondary bg-white/5 text-white placeholder:text-muted"
              />
            </div>
            
            <Button onClick={handleGenerate} isLoading={isLoading} className="w-full text-lg py-3">
              <Icons.SparklesIcon className="w-5 h-5 mr-2" />
              {isLoading ? 'Building...' : 'Generate Website'}
            </Button>

            {generatedHtml && (
              <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-white/[.08] pt-6"
              >
                  <label htmlFor="modification-prompt" className="block text-sm font-medium text-text-secondary mb-1">
                      What would you like to change?
                  </label>
                  <textarea
                      id="modification-prompt"
                      rows={4}
                      value={modificationPrompt}
                      onChange={(e) => setModificationPrompt(e.target.value)}
                      placeholder="e.g., Change the hero background to deep blue..."
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-white/[.08] focus:border-secondary focus:ring-secondary bg-white/5 text-white placeholder:text-muted"
                  />
                  <Button onClick={handleModify} isLoading={isModifying} className="w-full mt-2" variant="secondary">
                      <Icons.RegenerateIcon className="w-5 h-5 mr-2" />
                      {isModifying ? 'Applying...' : 'Apply Changes'}
                  </Button>
              </motion.div>
            )}

            {error && <p className="text-error text-sm text-center bg-error/10 p-2 rounded-md">{error}</p>}

            <div className="border-t border-white/[.08] pt-6 mt-6">
                  <h2 className="text-lg font-semibold text-text-main mb-4">Saved Projects</h2>
                  <Button size="sm" variant="secondary" onClick={handleNewProject} className="w-full mb-4">
                      <Icons.PlusIcon className="w-4 h-4 mr-1" /> Create New Project
                  </Button>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {websites.length > 0 ? (
                          websites.map(p => (
                              <div key={p.id} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${activeProject?.id === p.id ? 'bg-primary/20' : 'hover:bg-white/5'}`} onClick={() => handleLoadProject(p)}>
                                  <span className="text-sm font-medium truncate">{p.name}</span>
                                  <Button size="sm" variant="ghost" iconOnly onClick={(e) => { e.stopPropagation(); handleDeleteProject(p.id); }}>
                                      <Icons.TrashIcon className="w-4 h-4 text-error/70 hover:text-error"/>
                                  </Button>
                              </div>
                          ))
                      ) : (
                          <p className="text-sm text-text-secondary text-center">No saved projects.</p>
                      )}
                  </div>
              </div>
          </div>
        </aside>

        <main className="h-screen md:h-auto md:flex-1 p-4 bg-dark-bg flex flex-col">
          <div className="flex-shrink-0 flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                  <Button 
                    onClick={() => { if(isEditMode) setSelectedElement(null); setIsEditMode(!isEditMode); }} 
                    variant={isEditMode ? 'primary' : 'secondary'} 
                    size="sm" 
                    disabled={!generatedHtml}
                    className="transition-all"
                  >
                      {isEditMode ? <Icons.EyeIcon className="w-4 h-4 mr-2" /> : <Icons.PencilSquareIcon className="w-4 h-4 mr-2" />}
                      {isEditMode ? 'Preview' : 'Edit'}
                  </Button>
                  <Button onClick={handleSave} isLoading={isSaving} variant="secondary" size="sm" disabled={!generatedHtml}>
                      <Icons.DownloadIcon className="w-4 h-4 mr-2" /> {isSaving ? 'Saving...' : 'Save Project'}
                  </Button>
                  <Button onClick={handleExport} variant="ghost" size="sm" disabled={!generatedHtml}>Export Code</Button>
                  <Button onClick={handlePreview} variant="ghost" size="sm" disabled={!generatedHtml}>
                      <Icons.ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" /> Open Preview
                  </Button>
              </div>
                <Button onClick={openPublishModal} variant="primary" size="sm" disabled={!generatedHtml || githubAuth.isLoading}>
                    <Icons.GitHubIcon className="w-4 h-4 mr-2" />
                    {githubAuth.isLoading ? 'Authenticating...' : 'Publish'}
                </Button>
          </div>
          
           <div className={`flex-1 bg-black/30 rounded-lg border border-white/[.08] flex items-center justify-center p-4 overflow-hidden transition-shadow ${isEditMode ? 'animate-glowing-border' : ''}`}>
                {isLoading || isModifying ? (
                    <div className="text-center"> <Spinner size="lg" /> <p className="mt-4 text-text-secondary">{isLoading ? 'Generating your website...' : 'Applying changes...'}</p> </div>
                ) : generatedHtml ? (
                    <AnimatePresence mode="wait">
                        {deviceMode === 'pc' ? (
                            <motion.div
                                key="pc-preview"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="relative shadow-2xl w-full h-full rounded-lg border border-white/[.08] bg-dark-bg flex flex-col overflow-hidden shadow-glow-cyan-lg"
                            >
                                <div className="flex-shrink-0 bg-black/30 h-8 flex items-center px-3 space-x-2 border-b border-white/[.08]">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <iframe
                                    ref={iframeRef}
                                    title="Website Preview"
                                    className="w-full h-full flex-grow bg-white"
                                    sandbox="allow-scripts allow-same-origin"
                                    srcDoc={generatedHtml}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="mobile-preview-frameless"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="w-full h-full flex justify-center"
                            >
                                <iframe
                                    ref={iframeRef}
                                    title="Website Preview"
                                    className="w-full h-full bg-white max-w-[414px] rounded-lg border border-white/[.08] shadow-2xl shadow-glow-cyan-lg"
                                    sandbox="allow-scripts allow-same-origin"
                                    srcDoc={generatedHtml}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                ) : (
                    <div className="text-center text-text-secondary"> <Icons.GlobeAltIcon className="w-24 h-24 mx-auto text-white/10" /> <p>Your website preview will appear here.</p> </div>
                )}
            </div>
        </main>
      </div>
    </>
  );
};

export default WebsiteBuilderPage;
