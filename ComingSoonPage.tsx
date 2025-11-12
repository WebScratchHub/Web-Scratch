import React from 'react';
import { Page } from '../../types';
import Button from '../ui/Button';
import * as Icons from '../ui/Icons';

const ComingSoonPage: React.FC<{ navigateTo: (page: Page) => void, currentPage: Page }> = ({ navigateTo, currentPage }) => {
    
    const pageDetails: { [key in Page]?: { title: string, icon: React.ReactNode } } = {
        [Page.TEXT_TO_VOICEOVER]: { title: "Text to Voiceover", icon: <Icons.SpeakerWaveIcon className="w-20 h-20 text-tertiary"/> },
        [Page.WEBSITE_BUILDER]: { title: "Website Builder", icon: <Icons.GlobeAltIcon className="w-20 h-20 text-success"/> },
        [Page.LEARNING_HUB]: { title: "Learning Hub", icon: <Icons.BookOpenIcon className="w-20 h-20 text-warning"/> },
        // FIX: Removed reference to non-existent 'Page.SETTINGS'. The settings page is implemented and uses 'Page.PROFILE'.
        [Page.AI_TEXT_WRITER]: { title: "AI Text Writer", icon: <Icons.DocumentTextIcon className="w-20 h-20 text-primary"/> },
        [Page.IMAGE_TO_VIDEO]: { title: "Image to Video", icon: <Icons.FilmIcon className="w-20 h-20 text-secondary"/> },
        [Page.LOGO_CREATOR]: { title: "Logo Creator", icon: <Icons.CubeTransparentIcon className="w-20 h-20 text-tertiary"/> },
        [Page.PROMPT_IMPROVER]: { title: "Prompt Improver", icon: <Icons.SparklesIcon className="w-20 h-20 text-warning"/> },
        [Page.AI_PHOTO_ENHANCER]: { title: "AI Photo Enhancer", icon: <Icons.CameraIcon className="w-20 h-20 text-success"/> },
        [Page.ART_STYLE_CONVERTER]: { title: "Art Style Converter", icon: <Icons.PaintBrushIcon className="w-20 h-20 text-primary"/> },
        [Page.AI_CHAT_COMPANION]: { title: "AI Chat Companion", icon: <Icons.ChatBubbleIcon className="w-20 h-20 text-secondary"/> },
    }
    
    const details = pageDetails[currentPage] || { title: "Feature", icon: <Icons.CodeBracketIcon className="w-20 h-20 text-primary"/> };

    return (
        <div className="p-4 sm:p-6 lg:p-8 h-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center">
            <div className="relative text-center py-20 bg-white/5 border border-white/[.08] rounded-2xl max-w-lg w-full shadow-glow-violet-md overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-tertiary/5 opacity-50" />
                    <div 
                        className="absolute inset-0 bg-[length:400%_400%] bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10"
                        style={{ animation: 'aurora 20s ease infinite' }}
                    />
                </div>
                <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="absolute inset-0 bg-primary rounded-full opacity-10 blur-xl animate-pulse"></div>
                    {details.icon}
                </div>
                <h2 className="text-3xl font-bold text-text-main text-glow">{details.title}</h2>
                <p className="text-lg text-text-secondary mt-2">Coming Soon!</p>
                <p className="text-text-secondary mt-4 max-w-xs mx-auto">Our team is building something amazing. This feature will be available soon.</p>
                <Button 
                    variant="primary" 
                    className="mt-8 bg-[length:200%_auto] animate-gradient hover:bg-pos-100 transition-all duration-500"
                    onClick={() => navigateTo(Page.DASHBOARD)}
                >
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default ComingSoonPage;