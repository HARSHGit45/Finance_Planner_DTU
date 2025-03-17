import React, { useState } from 'react';
import { BsSend, BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        if (!input.trim()) return; // Prevent sending empty messages

        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        setInput(''); // Clear input field after sending

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { text: "I'm here to assist you!", sender: 'bot' }]);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-2 relative">
            {/* Back Button */}
            <Link to="/" className="absolute top-6 left-6 text-black text-2xl">
                <BsArrowLeft />
            </Link>

            <div className="border-2 border-emerald-950 w-full max-w-lg rounded-lg shadow-lg flex flex-col h-[60vh] overflow-hidden">
                <div className="p-4 bg-[#012c23] text-white text-center font-semibold text-lg">
                    FinancePro Chatbot
                </div>
                
                {/* Messages Display */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`p-3 rounded-xl max-w-xs break-words ${msg.sender === 'user' ? 'bg-[#4a7c00] text-white ml-auto' : 'bg-gray-200 text-black mr-auto'}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t-2 border-emerald-950 flex items-center gap-2">
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type a message..." 
                        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); 
                                handleSendMessage(e);
                            }
                        }}
                    />
                    <button 
                        type="submit"
                        className="bg-[#0b5223] text-white p-2 rounded-full hover:bg-[#0b5223] transition"
                    >
                        <BsSend size={20} />
                    </button>
                </form>
            </div>

            {/* Wave Design */}
            <div className="absolute -bottom-16 left-0 right-0">
                <svg viewBox="0 0 1440 320" className="w-full absolute bottom-2 opacity-50" preserveAspectRatio="none">
                    <path fill="#012c23" fillOpacity="1" 
                        d="M0,224L48,213.3C96,203,192,181,288,160C384,139,480,117,576,133.3C672,149,768,203,864,208C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>

                <svg viewBox="0 0 1440 320" className="w-full relative" preserveAspectRatio="none">
                    <path fill="#012c23" fillOpacity="1" 
                        d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,133.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </div>
    );
};

export default ChatBot;
