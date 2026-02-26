import React, { useState, useEffect, useRef } from 'react';
import { getChatResponse } from '../services/aiService';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const AIChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Namaste! I am AGEZY AI. How can I help you with your farming today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const data = await getChatResponse(input);
            const botMessage = { text: data.reply, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { text: "Sorry, I'm having trouble connecting right now.", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
            {/* Chat Window */}
            {isOpen && (
                <div style={{
                    width: '350px',
                    height: '500px',
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '1rem',
                    border: '1px solid var(--border)',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <div style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bot size={24} />
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>AGEZY Assistant</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', color: 'white' }}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', backgroundColor: '#F5F7FA' }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '0.75rem'
                            }}>
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '1rem',
                                    borderBottomLeftRadius: msg.sender === 'bot' ? '0' : '1rem',
                                    borderBottomRightRadius: msg.sender === 'user' ? '0' : '1rem',
                                    backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'white',
                                    color: msg.sender === 'user' ? 'white' : 'var(--text)',
                                    boxShadow: 'var(--shadow-sm)',
                                    fontSize: '0.95rem'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.75rem' }}>
                                <div style={{ backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '1rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
                                    Typing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem', backgroundColor: 'white' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything..."
                            style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)' }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: '50%', width: '46px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default AIChatAssistant;
