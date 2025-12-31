import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { id: ViewState.HOME, label: 'בית' },
    { id: ViewState.SQUAD, label: 'סגל' },
    { id: ViewState.STANDINGS, label: 'טבלה' },
    { id: ViewState.TIMELINE, label: 'ציר זמן' },
    { id: ViewState.LEGENDS, label: 'אגדות' },
    { id: ViewState.TROPHIES, label: 'תארים' },
    { id: ViewState.QUIZ, label: 'חידון' },
    { id: ViewState.CHAT, label: 'InterAI' },
  ];

  const handleNavClick = (view: ViewState) => {
    setActiveView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-[height] duration-300 ${
        scrolled ? 'h-16' : 'h-24'
      }`}
    >
      {/* 
        Background Layer 
        Moved to a separate element so 'backdrop-filter' doesn't create a containing block 
        for the fixed position overlay child.
      */}
      <div className={`absolute inset-0 transition-all duration-300 ${
         scrolled ? 'glass-nav border-b border-white/10 shadow-lg' : 'bg-transparent'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavClick(ViewState.HOME)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37] blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" 
                alt="Inter Milan Logo" 
                className={`object-contain transition-all duration-300 drop-shadow-lg ${
                  scrolled ? 'w-10 h-10' : 'w-14 h-14'
                }`} 
              />
            </div>
            <h1 className={`font-black tracking-widest text-white uppercase font-sans hidden sm:block drop-shadow-md transition-all duration-300 ${
              scrolled ? 'text-xl' : 'text-2xl'
            }`}>
              INTER <span className="text-[#D4AF37]">MILANO</span>
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex space-x-1 space-x-reverse items-baseline">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 group overflow-hidden`}
                >
                  <span className={`relative z-10 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
                    activeView === item.id ? 'text-[#D4AF37]' : 'text-gray-200 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                  {/* Animated Underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37] transform origin-right transition-transform duration-300 ease-out ${
                    activeView === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                  
                  {/* Subtle Glow on Hover */}
                  <span className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-sm -z-0"></span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-white hover:text-[#D4AF37] transition-colors focus:outline-none bg-black/20 rounded-full backdrop-blur-sm"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Full Screen */}
      <div 
        className={`md:hidden fixed inset-0 z-[60] bg-[#000830] overflow-y-auto transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-8 pointer-events-none'
        }`}
      >
        {/* Background Texture - Darker */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 pointer-events-none fixed"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none fixed"></div>
        
        {/* Background Logo Watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none fixed">
             <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" className="w-[80vw] max-w-[400px]" alt="" />
        </div>

        {/* Close Button - Fixed to viewport */}
        <button 
             onClick={() => setIsMenuOpen(false)}
             className="fixed top-6 left-6 text-white hover:text-[#D4AF37] p-3 z-[70] bg-black/40 rounded-full backdrop-blur-md border border-white/10 shadow-xl"
        >
             <X size={28} />
        </button>

        {/* Scrollable Container */}
        <div className="flex flex-col items-center min-h-screen py-24 space-y-6 relative z-10 px-6">
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{ transitionDelay: `${idx * 40}ms` }}
              className={`group relative w-full text-center py-2 transition-all duration-500 transform ${
                 isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="flex items-center justify-center gap-4">
                  <span className={`text-xl font-mono font-bold transition-colors ${activeView === item.id ? 'text-[#D4AF37]' : 'text-white/30 group-hover:text-white/60'}`}>
                      0{idx + 1}
                  </span>
                  <span className={`text-3xl font-black uppercase tracking-tighter font-sans transition-all duration-300 ${
                    activeView === item.id
                      ? 'text-[#D4AF37] scale-110 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'text-white hover:text-gray-200'
                  }`}>
                    {item.label}
                  </span>
              </div>
              
              {/* Active Indicator */}
              {activeView === item.id && (
                  <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto mt-2 shadow-[0_0_8px_#D4AF37]"></div>
              )}
            </button>
          ))}
          
          <div className="pt-8 opacity-20 pointer-events-none">
             <h2 className="text-4xl font-black text-white uppercase tracking-tighter">I M INTER</h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;