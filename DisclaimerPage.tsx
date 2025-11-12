import React from 'react';
import { motion } from 'framer-motion';

interface DisclaimerPageProps {
}

const DisclaimerPage: React.FC<DisclaimerPageProps> = () => {
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
                        Disclaimer
                    </h1>
                    <div className="prose prose-invert prose-lg max-w-none mx-auto text-text-secondary space-y-4">
                        <p>Web Scratch is an independent AI platform that connects users with various AI tools and APIs.</p>
                        <p>We do not own, host, or directly control any third-party AI tools featured on our platform. All tools are provided by external services such as OpenAI, Stability AI, and others.</p>
                        <p>Prices, credits, and features shown are based on publicly available information provided by each AI service and may change at any time without notice. We strive to keep this information accurate but do not guarantee its correctness.</p>
                        <p>By using Web Scratch, you acknowledge and agree that we act solely as an intermediary. You are responsible for reviewing and complying with the respective service’s Terms and Privacy Policy before using any third-party tool.</p>
                        <p>Our platform acts as a gateway, and any transactions, data processing, or interactions you have with third-party services are subject to their individual policies. Web Scratch is not liable for any issues, discrepancies, data breaches, or disputes that may arise from your use of these external services.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DisclaimerPage;
