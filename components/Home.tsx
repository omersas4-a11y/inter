import React from 'react';
import { ViewState } from '../types';
import { Shield, Star, Users, Trophy, Shirt, Bot, ArrowDown, ListOrdered } from 'lucide-react';

interface HomeProps {
  onChangeView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#001489]">
      {/* Hero Section */}
      <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a2c9c] to-[#001489]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        {/* Decorative Circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/40 rounded-full blur-[100px]"></div>

        <div className="z-10 flex flex-col items-center text-center px-4">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" 
            alt="Inter Milan Logo" 
            className="w-32 h-32 md:w-56 md:h-56 mb-8 object-contain drop-shadow-2xl animate-fade-in-up"
          />
          
          <h1 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-none mb-4 font-sans drop-shadow-2xl animate-fade-in-up delay-100">
            I M <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">INTER</span>
          </h1>
          
          <div className="h-1 w-0 bg-[#D4AF37] my-6 shadow-[0_0_15px_#D4AF37] animate-[width_1s_ease-out_forwards_0.5s] style={{ width: '150px' }}"></div>

          <div className="mt-16 animate-bounce text-white/50">
             <ArrowDown size={32} />
          </div>
        </div>
      </div>

      {/* Navigation Grid - Mosaic Style */}
      <div className="max-w-7xl mx-auto w-full px-4 py-24 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {[
            { id: ViewState.SQUAD, icon: Shirt, title: "סגל הקבוצה", sub: "2025/26", delay: "delay-100" },
            { id: ViewState.STANDINGS, icon: ListOrdered, title: "טבלה", sub: "Serie A", delay: "delay-150" },
            { id: ViewState.TIMELINE, icon: Shield, title: "היסטוריה", sub: "1908 - היום", delay: "delay-200" },
            { id: ViewState.LEGENDS, icon: Users, title: "אגדות", sub: "הגיבורים שלנו", delay: "delay-300" },
            { id: ViewState.TROPHIES, icon: Trophy, title: "תארים", sub: "ארון הזהב", delay: "delay-400" },
            { id: ViewState.QUIZ, icon: Star, title: "חידון", sub: "האם אתם מומחים?", delay: "delay-500" },
            { id: ViewState.CHAT, icon: Bot, title: "InterAI", sub: "העוזר החכם שלך", delay: "delay-600" }
          ].map((item) => (
            <div 
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`group relative h-80 bg-white/95 backdrop-blur-sm border border-white/20 cursor-pointer overflow-hidden shadow-2xl animate-fade-in-up ${item.delay} hover:shadow-[#D4AF37]/20 hover:scale-[1.02] transition-all duration-500 rounded-xl ${item.id === ViewState.CHAT ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#001489]/0 to-[#001489]/10 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
              
              <div className="absolute top-6 right-6 z-10 bg-[#001489]/5 p-4 rounded-full group-hover:bg-[#001489] group-hover:text-white transition-all duration-500">
                <item.icon className="w-8 h-8 text-[#001489] group-hover:text-[#D4AF37] transition-colors duration-500" />
              </div>
              
              <div className="absolute bottom-0 w-full p-8 transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-4xl font-black text-black uppercase font-sans mb-3 group-hover:text-[#001489] transition-colors">{item.title}</h3>
                <div className="h-1 w-12 bg-[#001489] group-hover:w-full group-hover:bg-[#D4AF37] transition-all duration-500 ease-out mb-3"></div>
                <p className="text-base text-gray-500 font-bold tracking-wider">{item.sub}</p>
              </div>
              
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Home;