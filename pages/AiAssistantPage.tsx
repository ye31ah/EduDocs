import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { getAiResponse } from '../services/geminiService';
import { Role, type ChatMessage } from '../types';

const AiAssistantPage: React.FC = () => {
    const { user, documents } = useAppContext();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length === 0) {
             setMessages([{ sender: 'ai', text: `Здравствуйте, ${user?.name}! Чем я могу помочь вам сегодня?` }]);
        }
    }, [user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !user) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const userDocuments = user.role === Role.Student
                ? documents.filter(doc => doc.studentId === user.id)
                : documents;
            const aiText = await getAiResponse(input, user, userDocuments);
            const aiMessage: ChatMessage = { sender: 'ai', text: aiText };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = { sender: 'ai', text: 'К сожалению, произошла ошибка. Пожалуйста, попробуйте еще раз.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col" style={{height: '75vh'}}>
            <div className="p-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800">ИИ-помощник</h2>
                <p className="text-sm text-slate-500">Ваш личный ассистент по документам</p>
            </div>
            <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                             {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-sm">AI</div>}
                            <div className={`max-w-md px-4 py-3 rounded-2xl ${msg.sender === 'user' ? 'bg-slate-900 text-white rounded-br-lg' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-lg'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                             <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-sm">AI</div>
                            <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-white border border-slate-200">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-slate-200 bg-white rounded-b-2xl">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder="Спросите что-нибудь..."
                        className="flex-1 px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:bg-slate-400 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiAssistantPage;