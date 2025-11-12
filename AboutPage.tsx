import React from 'react';
import { motion } from 'framer-motion';

interface AboutPageProps {
}

const AboutPage: React.FC<AboutPageProps> = () => {
    return (
        <div className="bg-dark-bg text-text-main min-h-screen py-20 sm:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container mx-auto max-w-4xl px-6 lg:px-8"
            >
                <div className="bg-white/5 border border-white/[.08] rounded-2xl p-8 sm:p-12 shadow-glow-violet-md">
                    <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mb-8 text-glow">
                        About Web Scratch
                    </h1>
                    <div className="prose prose-invert prose-lg max-w-none mx-auto text-text-secondary space-y-6">
                        <p>
                            Web Scratch is an all-in-one AI creation platform designed to empower creators, developers, and learners. Our mission is to make cutting-edge artificial intelligence tools and interactive education accessible to everyone, regardless of their technical background.
                        </p>
                        <p>
                            We believe that AI is a transformative technology that can unlock unprecedented levels of creativity and productivity. From generating stunning visuals and realistic voiceovers to writing code and crafting compelling content, Web Scratch provides a unified space for you to explore, create, and innovate.
                        </p>
                        <h2 className="text-2xl font-semibold text-white">Our Vision</h2>
                        <p>
                            Our vision is to build a community where innovation flourishes. We aim to be more than just a toolkit; we want to be a learning hub where users can go from a simple idea to a fully realized project. Whether you're a seasoned developer looking to accelerate your workflow or a curious beginner taking your first steps into the world of AI, Web Scratch is here to guide you.
                        </p>
                        <p>
                            While some of our tools are available for free, we may introduce premium features in the future to support the platform's growth and continue offering high-quality services. Thank you for being a part of our journey.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutPage;
