import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Calculator, 
  PhoneCall, 
  Loader2, 
  User, 
  CheckCircle2,
  ChevronUp
} from 'lucide-react';

interface AIChatWidgetProps {
  openContactModal: () => void;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({ openContactModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! I am NexaBot, AI Business Advisor for CodeNexAnkit. How can I assist you with your software, AI, mobile, or web engineering goals today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue.trim();
    if (!textToSend || loading) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      const data = await res.json();
      const botReply: Message = {
        sender: 'bot',
        text: data.reply || 'CodeNexAnkit is ready to engineer your custom software solution.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error('AIChatWidget error:', err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thank you for your message! Our engineering leads will review your inquiry. Would you like to schedule a quick 15-minute call directly?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Estimate my project budget',
    'What tech stack do you use?',
    'Tell me about your AI & Gemini solutions',
    'How do I book a discovery call?'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-0.5 rounded-full overflow-hidden shadow-[0_0_25px_rgba(255,215,0,0.35)] transition-transform hover:scale-105 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-blue-600 to-[#FF8C00] animate-spin-slow" />
          <div className="relative bg-[#08080c] px-4 py-3 rounded-full flex items-center space-x-2 text-white backdrop-blur-md">
            <div className="relative">
              <Bot className="w-5 h-5 text-[#FFD700] group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_8px_#34d399]" />
            </div>
            <span className="text-xs font-bold tracking-wide font-mono hidden sm:inline-block">AI Advisor</span>
            <span className="text-[10px] bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 px-2 py-0.5 rounded-full font-sans">Online</span>
          </div>
        </button>
      )}

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-[#08080c]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-white/[0.03] p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  NexaBot <span className="text-[10px] text-[#FFD700] font-mono">Gemini 3.6</span>
                </h3>
                <p className="text-[11px] text-white/50">CodeNexAnkit Solutions Advisor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Window */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="p-1.5 rounded-lg bg-[#FFD700]/10 text-[#FFD700] shrink-0 mt-0.5 border border-[#FFD700]/20">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#FFB900] text-black font-semibold rounded-tr-none shadow-[0_0_15px_rgba(255,215,0,0.2)]'
                      : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none backdrop-blur-md'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-black/60' : 'text-white/40'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-0.5 border border-blue-500/30">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-white/50 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-[#FFD700]" />
                <span>Analyzing request & generating response...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-white/[0.02] border-t border-white/5 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-white/70 hover:text-white border border-white/10 transition-colors backdrop-blur-md cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div className="px-3 py-2 bg-[#050505] border-t border-white/5 flex items-center justify-between">
            <button
              onClick={() => {
                setIsOpen(false);
                openContactModal();
              }}
              className="text-[11px] text-[#FFD700] hover:text-white flex items-center gap-1 font-medium cursor-pointer"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Book Discovery Call</span>
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white/[0.03] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask NexaBot about scope, pricing, or tech..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]/50 backdrop-blur-md"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading}
              className="p-2.5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFB900] text-black transition-transform hover:scale-105 disabled:opacity-50 cursor-pointer shadow-[0_0_10px_rgba(255,215,0,0.3)]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
