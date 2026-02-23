
import React, { useState, useRef, useEffect } from 'react';
import { chatWithContent } from '../services/geminiService';

interface ChatInterfaceProps {
  content: string;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ content }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await chatWithContent(content, userMessage, history);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Desculpe, não consegui processar sua dúvida agora.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'Houve um erro na conexão com a Assistente Digital.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border border-slate-100 rounded-3xl bg-slate-50 overflow-hidden shadow-inner">
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest">Consultoria Digital</h3>
          <p className="text-[10px] text-slate-400 font-medium italic">Baseado no material analisado</p>
        </div>
        <span className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-[9px] font-bold rounded-full border border-amber-100 uppercase tracking-tighter">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
          IA Ativa
        </span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-800">Tire suas dúvidas técnicas</p>
            <p className="text-xs text-slate-400 mt-2 max-w-xs">Pergunte sobre materiais, prazos ou viabilidade do terreno que analisamos acima.</p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-slate-900 text-white rounded-br-none shadow-lg' 
                : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-sm font-light'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
            className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 outline-none text-sm transition-all text-slate-700"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 bottom-2 w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-amber-600 disabled:opacity-50 transition-all shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
