import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { generateQuizQuestion } from '../services/geminiService';
import { Loader2, Check, X, RefreshCw } from 'lucide-react';

const Quiz: React.FC = () => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');

  const fetchQuestion = async () => {
    setLoading(true);
    setShowResult(false);
    setSelectedAnswer(null);
    const q = await generateQuizQuestion(difficulty);
    setQuestion(q);
    setLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-24 px-4 min-h-[600px] flex flex-col items-center">
      <h2 className="text-5xl font-black text-center mb-12 text-white uppercase tracking-tighter font-sans drop-shadow-md animate-fade-in-up">INTER TRIVIA</h2>

      {!question && !loading && (
        <div className="w-full text-center space-y-8 bg-white/95 backdrop-blur-sm p-12 shadow-2xl rounded-xl animate-fade-in-up delay-100">
          <p className="text-2xl text-black font-bold font-sans uppercase">בחר רמת קושי</p>
          <div className="flex justify-center gap-6">
            <button 
              onClick={() => { setDifficulty('easy'); setTimeout(fetchQuestion, 0); }} 
              className="px-8 py-4 bg-[#001489] text-white hover:bg-[#000d6b] hover:scale-105 font-bold uppercase tracking-wider transition-all font-sans rounded shadow-lg"
            >
              קל
            </button>
            <button 
              onClick={() => { setDifficulty('hard'); setTimeout(fetchQuestion, 0); }}
              className="px-8 py-4 bg-black text-white hover:bg-gray-800 hover:scale-105 font-bold uppercase tracking-wider transition-all font-sans rounded shadow-lg"
            >
              קשה
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in-up">
          <Loader2 className="w-16 h-16 text-[#D4AF37] animate-spin" />
          <p className="text-white font-sans uppercase tracking-wider font-bold">GENERATING QUESTION...</p>
        </div>
      )}

      {question && !loading && (
        <div className="w-full bg-white p-8 md:p-12 shadow-2xl animate-fade-in-up rounded-xl">
          <div className="mb-8 flex justify-between items-start border-b border-gray-200 pb-6">
            <h3 className="text-2xl font-bold text-black leading-relaxed text-right w-3/4">{question.question}</h3>
            <span className={`inline-block px-4 py-1 text-sm font-bold uppercase tracking-wider rounded ${difficulty === 'easy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {difficulty === 'easy' ? 'EASY' : 'HARD'}
            </span>
          </div>

          <div className="space-y-4">
            {question.options.map((option, idx) => {
              let btnClass = "w-full p-6 text-right border transition-all duration-300 flex justify-between items-center font-bold rounded-lg ";
              
              if (showResult) {
                if (idx === question.correctAnswerIndex) {
                  btnClass += "bg-green-50 border-green-500 text-green-700 shadow-md transform scale-[1.02]";
                } else if (idx === selectedAnswer && idx !== question.correctAnswerIndex) {
                  btnClass += "bg-red-50 border-red-500 text-red-700 opacity-80";
                } else {
                  btnClass += "bg-gray-50 border-gray-100 text-gray-400 opacity-50";
                }
              } else {
                btnClass += "bg-gray-50 border-gray-200 hover:bg-white hover:border-[#001489] hover:shadow-lg hover:-translate-y-1 text-black";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={btnClass}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span>{option}</span>
                  {showResult && idx === question.correctAnswerIndex && <Check className="text-green-600 w-6 h-6 animate-bounce" />}
                  {showResult && idx === selectedAnswer && idx !== question.correctAnswerIndex && <X className="text-red-600 w-6 h-6" />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-8 pt-8 border-t border-gray-200 animate-fade-in-up bg-blue-50 -mx-8 -mb-8 p-8 rounded-b-xl">
              <h4 className="font-bold text-lg mb-2 text-[#001489] uppercase font-sans bg-white inline-block px-2 rounded">INFO</h4>
              <p className="text-black mb-6 font-normal leading-relaxed">{question.explanation}</p>
              <button 
                onClick={fetchQuestion}
                className="flex items-center justify-center w-full py-4 bg-[#001489] hover:bg-[#000d6b] text-white font-bold uppercase tracking-widest transition-all gap-3 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <RefreshCw className="w-5 h-5" />
                NEXT QUESTION
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;