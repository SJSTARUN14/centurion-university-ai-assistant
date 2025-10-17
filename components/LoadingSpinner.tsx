import React from 'react';

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full bg-secondary-dark flex items-center justify-center flex-shrink-0 p-1">
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 120 C 96 104, 100 80, 96 56 C 92 32, 72 16, 80 16 C 88 16, 68 32, 64 56 C 60 80, 64 104, 80 120 Z" fill="#66FCF1"/>
        </svg>
    </div>
);

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-start gap-3 my-4 justify-start">
            <BotIcon />
            <div className="max-w-md p-3 rounded-lg shadow-sm bg-secondary-dark text-gray-200 rounded-bl-none">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;