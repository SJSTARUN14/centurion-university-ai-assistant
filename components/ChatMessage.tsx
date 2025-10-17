import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    </div>
);

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full bg-secondary-dark flex items-center justify-center flex-shrink-0 p-1">
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 120 C 96 104, 100 80, 96 56 C 92 32, 72 16, 80 16 C 88 16, 68 32, 64 56 C 60 80, 64 104, 80 120 Z" fill="#66FCF1"/>
        </svg>
    </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const formatContent = (content: string): string => {
    return content.replace(/^\s*\*\s/gm, '• ');
  };

  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <BotIcon />}
      <div
        className={`max-w-xl p-3 rounded-lg shadow-sm ${
          isUser
            ? 'bg-accent-cyan text-primary-dark rounded-br-none'
            : 'bg-secondary-dark text-gray-200 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">
          {isUser ? message.content : formatContent(message.content)}
        </p>
      </div>
       {isUser && <UserIcon />}
    </div>
  );
};

export default ChatMessage;