import React from 'react';
import { Trophy, Disc, Award, Globe } from 'lucide-react';

const Trophies: React.FC = () => {
  const trophies = [
    { name: "SERIE A", count: 20, icon: <Disc className="w-6 h-6" />, color: "text-[#001489]" },
    { name: "CHAMPIONS LEAGUE", count: 3, icon: <Trophy className="w-6 h-6" />, color: "text-[#001489]" },
    { name: "COPPA ITALIA", count: 9, icon: <Award className="w-6 h-6" />, color: "text-[#001489]" },
    { name: "UEFA CUP", count: 3, icon: <Trophy className="w-6 h-6" />, color: "text-[#001489]" },
    { name: "WORLD CUP", count: 3, icon: <Globe className="w-6 h-6" />, color: "text-[#001489]" },
    { name: "SUPERCOPPA", count: 8, icon: <Award className="w-6 h-6" />, color: "text-[#001489]" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-24 px-4">
       <h2 className="text-5xl font-black text-center mb-16 text-white uppercase tracking-tighter font-sans drop-shadow-md animate-fade-in-up">TITLES</h2>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {trophies.map((trophy, index) => (
           <div 
            key={index} 
            className="bg-white border border-transparent hover:border-[#D4AF37] p-8 flex items-center justify-between transition-all duration-300 group shadow-xl hover:shadow-2xl animate-fade-in-up rounded-lg hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
           >
             <div>
               <div className={`mb-3 text-[#001489] opacity-100 group-hover:scale-110 transition-transform duration-300`}>
                 {trophy.icon}
               </div>
               <h3 className="text-xl font-bold text-black uppercase font-sans tracking-wide">{trophy.name}</h3>
             </div>
             <div className="text-right">
               <span className="text-6xl font-black text-[#001489] font-sans group-hover:text-[#D4AF37] transition-colors duration-300">
                 {trophy.count}
               </span>
             </div>
           </div>
         ))}
       </div>

       <div className="mt-20 bg-white border-4 border-[#001489] p-10 text-center relative overflow-hidden shadow-2xl animate-fade-in-up delay-500 rounded-xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-full bg-gray-100 skew-x-12 transform origin-top-right transition-transform group-hover:translate-x-4"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-black text-black uppercase font-sans mb-4">TRIPLETE 2010</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto font-normal">
              הקבוצה האיטלקית היחידה בהיסטוריה שזכתה בשלושת התארים הגדולים בעונה אחת.
            </p>
            <div className="flex justify-center gap-12 border-t border-gray-200 pt-8 inline-block mx-auto">
                <div className="text-center group">
                    <span className="block text-2xl font-black text-[#001489] group-hover:scale-110 transition-transform">2009/10</span>
                    <span className="text-sm text-gray-500 uppercase font-bold">LEGENDARY SEASON</span>
                </div>
            </div>
          </div>
       </div>
    </div>
  );
};

export default Trophies;