import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import * as Icons from '../components/ui/Icons'; // Assuming Icons.jsx is created

const ToolCard = ({ icon, title, description }) => (
    <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(0, 229, 255, 0.5)', boxShadow: '0 0 25px rgba(0, 229, 255, 0.3)' }}
        className="bg-white/5 border border-white/[.08] p-6 rounded-2xl flex flex-col items-start h-full shadow-glow-violet-md transition-all duration-300"
    >
        <div className="p-2 bg-white/5 rounded-lg mb-4 text-secondary">{icon}</div>
        <h3 className="mb-2 text-lg font-semibold text-text-main">{title}</h3>
        <p className="text-text-secondary text-sm">{description}</p>
    </motion.div>
);


const LandingPage = () => {
    const iconClass = "w-8 h-8";
    const tools = [
        { icon: <Icons.ImagesIcon className={iconClass} />, title: 'AI Image Generator', description: 'Bring your ideas to life with stunning visuals from a simple text prompt.' },
        { icon: <Icons.SpeakerWaveIcon className={iconClass} />, title: 'Text to Voiceover', description: 'Generate realistic, human-like voiceovers for your content in any style.' },
        { icon: <Icons.DocumentTextIcon className={iconClass} />, title: 'AI Content Writer', description: 'Craft compelling articles, social media posts, and marketing copy in seconds.' },
        { icon: <Icons.CodeBracketIcon className={iconClass} />, title: 'AI Code Helper', description: 'Debug, optimize, and write code faster with an intelligent coding assistant.' },
        { icon: <Icons.SparklesIcon className={iconClass} />, title: 'AI Chat Assistant', description: 'Get instant answers, brainstorm ideas, and automate tasks with a smart chatbot.' },
        { icon: <Icons.GlobeAltIcon className={iconClass} />, title: 'Website Builder', description: 'Create beautiful websites from a simple prompt using AI.' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    
    return (
        <div className="bg-dark-bg text-text-main overflow-x-hidden pt-[4.5rem]">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                 <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-tertiary to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mx-auto max-w-4xl py-24 sm:py-32"
                >
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
                            Create, Code, and Learn with the Power of <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">AI</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-text-secondary max-w-2xl mx-auto">
                            Web Scratch is your all-in-one platform for generating content, writing code, and mastering new skills with our advanced suite of artificial intelligence tools.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to="/signup"><Button variant="primary" className="text-lg px-8 py-3">Get Started Free</Button></Link>
                            <Link to="/login"><Button variant="ghost" className="text-lg">Login</Button></Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            <section className="py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mx-auto max-w-2xl">
                         <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-glow">Your Complete AI Toolkit</h2>
                        <p className="mt-4 text-lg text-text-secondary">Everything you need to enhance your creative and technical workflow, all in one place.</p>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {tools.map(tool => <ToolCard key={tool.title} {...tool} />)}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
