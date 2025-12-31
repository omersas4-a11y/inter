import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Timeline from './components/Timeline';
import Legends from './components/Legends';
import Trophies from './components/Trophies';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';
import Squad from './components/Squad';
import Standings from './components/Standings';
import { ViewState } from './types';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(ViewState.HOME);

  const renderContent = () => {
    switch (activeView) {
      case ViewState.HOME:
        return <Home onChangeView={setActiveView} />;
      case ViewState.TIMELINE:
        return <Timeline />;
      case ViewState.LEGENDS:
        return <Legends />;
      case ViewState.TROPHIES:
        return <Trophies />;
      case ViewState.QUIZ:
        return <Quiz />;
      case ViewState.CHAT:
        return <Chatbot />;
      case ViewState.SQUAD:
        return <Squad />;
      case ViewState.STANDINGS:
        return <Standings />;
      default:
        return <Home onChangeView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#001489] text-white font-sans selection:bg-black selection:text-white">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="container mx-auto pb-8 animate-fade-in">
        {renderContent()}
      </main>
      
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-black/20 blur-3xl"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-black/20 blur-3xl"></div>
      </div>
    </div>
  );
};