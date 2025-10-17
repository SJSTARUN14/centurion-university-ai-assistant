import React, { useState, useEffect, useRef } from 'react';
import { Message } from './types';
import { initializeChat, sendMessageToGemini } from './services/geminiService';
// FIX: Changed to named import to resolve module error.
import { Header } from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeChat();
    setMessages([
        {
            role: 'model',
            content: "Hello! I am CenturionAI. How can I help you with your questions about Centurion University today?"
        }
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (userInput: string) => {
    if (!userInput) return;

    const userMessage: Message = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToGemini(userInput);
      const botMessage: Message = { role: 'model', content: botResponse };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { role: 'model', content: "Sorry, something went wrong. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const examplePrompts = [
    "What are the B.Tech specializations offered?",
    "Tell me about the upcoming tech fest.",
    "What is the academic calendar for this year?",
    "List some core subjects for BBA."
  ];

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen bg-primary-dark">
      <Header />
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && <LoadingSpinner />}
        {messages.length <= 1 && !isLoading && (
            <div className="text-center text-gray-400 pt-8">
                <h2 className="text-lg font-semibold mb-4">Try asking one of these:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {examplePrompts.map((prompt, index) => (
                        <button 
                            key={index}
                            onClick={() => handlePromptClick(prompt)}
                            className="bg-secondary-dark p-3 rounded-lg text-left text-sm text-accent-cyan font-medium hover:bg-gray-700 transition-colors shadow-sm border border-accent-cyan-light"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            </div>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;