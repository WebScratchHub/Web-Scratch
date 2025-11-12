import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import * as Icons from '../ui/Icons';

interface LandingPageProps {}

const ToolCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
        whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(0, 229, 255, 0.5)', boxShadow: '0 0 25px rgba(0, 229, 255, 0.3)' }}
        className="bg-white/5 border border-white/[.08] p-6 rounded-2xl flex flex-col items-start h-full shadow-glow-violet-md transition-all duration-300"
    >
        <div className="p-2 bg-white/5 rounded-lg mb-4 text-secondary">{icon}</div>
        <h3 className="mb-2 text-lg font-semibold text-text-main">{title}</h3>
        <p className="text-text-secondary text-sm">{description}</p>
    </motion.div>
);

const Feature: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 p-2 bg-white/5 border border-white/[.08] rounded-lg text-secondary">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-text-main">{title}</h3>
            <p className="text-text-secondary">{description}</p>
        </div>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = () => {
    const iconClass = "w-8 h-8";
    const tools = [
        { icon: <Icons.ImagesIcon className={iconClass} />, title: 'AI Image Generator', description: 'Bring your ideas to life with stunning visuals from a simple text prompt.' },
        { icon: <Icons.SpeakerWaveIcon className={iconClass} />, title: 'Text to Voiceover', description: 'Generate realistic, human-like voiceovers for your content in any style.' },
        { icon: <Icons.DocumentTextIcon className={iconClass} />, title: 'AI Content Writer', description: 'Craft compelling articles, social media posts, and marketing copy in seconds.' },
        { icon: <Icons.CodeBracketIcon className={iconClass} />, title: 'AI Code Helper', description: 'Debug, optimize, and write code faster with an intelligent coding assistant.' },
        { icon: <Icons.SparklesIcon className={iconClass} />, title: 'AI Chat Assistant', description: 'Get instant answers, brainstorm ideas, and automate tasks with a smart chatbot.' },
        { icon: <Icons.GlobeAltIcon className={iconClass} />, title: 'Website Builder', description: 'Create beautiful websites from a simple prompt using AI.' },
    ];
    
    const whyChooseFeatures = [
        { icon: <Icons.MagicWandIcon className="w-6 h-6" />, title: 'All-in-One Platform', description: 'Access a full suite of powerful AI tools without switching between different services.' },
        { icon: <Icons.ZapIcon className="w-6 h-6" />, title: 'Blazing Fast & Responsive', description: 'Our infrastructure ensures you get high-quality results in seconds, on any device.' },
        { icon: <Icons.ShieldCheckIcon className="w-6 h-6" />, title: 'Safe and Secure', description: 'We prioritize your privacy and content safety with robust moderation and security.' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    return (
        <div className="bg-dark-bg text-text-main overflow-x-hidden">
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
            
            <section className="py-20 sm:py-24">
                 <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="lg:pr-8">
                         <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4 text-glow">Learn Coding with AI</h2>
                         <p className="mt-4 text-lg text-text-secondary">Go from concept to code with an interactive learning experience. Our AI explains complex topics, helps you practice, and guides you through building real projects.</p>
                         <div className="mt-8 flex flex-col space-y-4">
                            {whyChooseFeatures.map(f => <Feature key={f.title} {...f} />)}
                         </div>
                    </div>
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#1E1E1E] rounded-2xl p-4 border border-white/[.08] shadow-2xl"
                    >
                         <div className="flex items-center space-x-2 mb-4 border-b border-white/[.08] pb-2">
                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                         </div>
                         <pre className="text-sm text-white font-mono overflow-x-auto"><code>
<span className="text-primary">import</span> React <span className="text-primary">from</span> <span className="text-success">'react'</span>;
<br/><br/>
<span className="text-secondary">const</span> <span className="text-yellow-300">Greeting</span> = (<span className="text-tertiary">{'{ name }'}</span>) =&gt; {' {'}
<br/>
{'  '}<span className="text-primary">return</span> (
<br/>
{'    '}&lt;<span className="text-error">div</span>&gt;
<br/>
{'      '}&lt;<span className="text-error">h1</span>&gt;Hello, {'{'}<span className="text-secondary">name</span>{'}'}!&lt;/<span className="text-error">h1</span>&gt;
<br/>
{'      '}&lt;<span className="text-error">p</span>&gt;Welcome to Web Scratch.&lt;/<span className="text-error">p</span>&gt;
<br/>
{'    '}&lt;/<span className="text-error">div</span>&gt;
<br/>
{'  '});
<br/>
{'}'};
                         </code></pre>
                     </motion.div>
                 </div>
            </section>

            <section className="relative py-20 sm:py-24 overflow-hidden">
                <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden" aria-hidden="true">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-tertiary/10 to-dark-bg/10"></div>
                    <div className="absolute top-1/2 left-1/2 w-[48rem] h-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-10 blur-3xl"></div>
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl animate-shimmer">About Web Scratch</h2>
                        <p className="mt-6 text-lg leading-8 text-text-secondary max-w-3xl mx-auto">
                            Web Scratch is an AI creation platform built to make modern AI tools and learning accessible for everyone. From image generation and voice synthesis to coding education, it’s your space to explore, create, and innovate. While some tools are free to use, premium options may be introduced to enhance the experience.
                        </p>
                        <div className="mt-10">
                            <Link to="/about">
                                <Button 
                                    variant="secondary" 
                                    className="text-lg animate-glowing-border !rounded-xl"
                                >
                                    Learn More →
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </section>

            <section className="bg-black/20 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-glow">Ready to Start Creating?</h2>
                        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">Join thousands of creators and developers. Sign up for free and unlock the full potential of AI.</p>
                        <Link to="/signup">
                            <Button 
                                variant="primary" 
                                className="mt-10 text-xl px-10 py-4 !rounded-full animate-glowing" 
                            >
                                Get Started Free
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;