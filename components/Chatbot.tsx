import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { Send, User, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [{ text: "Ciao! אני הבוט הרשמי של האוהדים. שאל אותי כל דבר על ההיסטוריה של אינטר." }]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    const newHistory = [...messages, userMessage];
    
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    const responseText = await getChatResponse(newHistory);
    
    setMessages([...newHistory, { role: 'model', parts: [{ text: responseText }] }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-28 pb-4 px-4 h-[100vh] flex flex-col">
       <div className="bg-white p-6 flex items-center gap-4 border-b-2 border-[#001489] shadow-md shrink-0 rounded-t-lg">
          <div className="w-12 h-12 bg-[#001489] flex items-center justify-center rounded-full shadow-lg">
            <Bot className="text-white w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h2 className="text-black font-black text-2xl uppercase font-sans tracking-wider">I M ASSISTANT</h2>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">POWERED BY AI</p>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto bg-white/95 backdrop-blur-sm border-x border-white p-6 space-y-6 shadow-inner">
         {messages.map((msg, idx) => {
           const isBot = msg.role === 'model';
           return (
             <div key={idx} className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
               <div className={`flex max-w-[85%] gap-4 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                 
                 <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full shadow-md border border-gray-100 ${isBot ? 'bg-[#001489] text-white' : 'bg-white text-black'}`}>
                   {isBot ? <Bot size={20} /> : <User size={20} />}
                 </div>
                 
                 <div className={`p-4 rounded-2xl shadow-md ${
                   isBot 
                    ? 'bg-white border border-gray-100 text-black rounded-tl-none' 
                    : 'bg-[#001489] text-white rounded-tr-none'
                 }`}>
                   <p className="text-base leading-relaxed whitespace-pre-wrap font-normal">{msg.parts[0].text}</p>
                 </div>
               </div>
             </div>
           );
         })}
         {isLoading && (
            <div className="flex justify-start animate-fade-in-up">
               <div className="bg-white border border-gray-200 p-4 flex items-center gap-3 shadow-sm rounded-2xl rounded-tl-none">
                 <Loader2 className="animate-spin text-[#001489] w-5 h-5" />
                 <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">TYPING...</span>
               </div>
            </div>
         )}
         <div ref={messagesEndRef} />
       </div>

       <div className="bg-white p-4 border-t border-gray-200 rounded-b-lg shadow-lg shrink-0">
         <div className="flex gap-2 items-center">
           <input
             type="text"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={handleKeyPress}
             placeholder="שאל אותי שאלה..."
             className="flex-1 bg-gray-50 px-6 py-4 text-black focus:outline-none focus:ring-2 focus:ring-[#001489]/20 rounded-lg transition-all font-normal text-right"
             dir="rtl"
           />
           <button
             onClick={handleSend}
             disabled={isLoading || !input.trim()}
             className="bg-[#001489] hover:bg-[#000d6b] disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
           >
             <Send size={20} className={isLoading ? 'hidden' : 'block'} />
             {isLoading && <Loader2 size={20} className="animate-spin" />}
           </button>
         </div>
       </div>
    </div>
  );
};

export default Chatbot;