import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaComment, FaSmile } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { processChatMessage } from '../../services/api/chatbotAPI';  
import { useAuth } from '../../hooks/useAuth';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "👋 Hello! I'm your AI travel assistant. How can I help you today?", 
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await processChatMessage(inputMessage, user);
      
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: response.message,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: response.suggestions
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm having trouble processing your request. Please try again.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 
                   text-white rounded-full p-4 shadow-2xl z-50 group"
      >
        {isOpen ? (
          <FaTimes size={24} />
        ) : (
          <>
            <FaRobot size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full 
                           border-2 border-white animate-pulse"></span>
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 
                       overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
              <div className="flex items-center">
                <div className="relative">
                  <FaRobot className="mr-3" size={28} />
                  <span className="absolute bottom-0 right-2 w-2.5 h-2.5 bg-green-400 
                                 rounded-full border-2 border-white"></span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">AI Travel Assistant</h3>
                  <p className="text-xs opacity-90">Online • Ready to help</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded transition"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(0,0,0,0.02) 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div className={`inline-block max-w-[80%]`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-md'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {message.time}
                    </span>
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 justify-start">
                      {message.suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setInputMessage(suggestion)}
                          className="text-xs bg-white hover:bg-blue-50 text-blue-600 
                                   px-3 py-1.5 rounded-full border border-blue-200 
                                   shadow-sm transition-all"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-left mb-4"
                >
                  <div className="inline-block bg-white p-3 rounded-2xl rounded-bl-none shadow-md">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 bg-blue-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full p-3 pr-10 border-2 border-gray-200 rounded-xl 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                             transition-all outline-none"
                  />
                  <FaSmile className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                     text-gray-400 cursor-pointer hover:text-blue-500" />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                           p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed 
                           transition-all shadow-lg hover:shadow-xl"
                >
                  <FaPaperPlane size={18} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;