import React from 'react';
import { Briefcase } from 'lucide-react';

interface Player {
  number: number;
  name: string;
  position: string;
  country: string;
}

interface Staff {
  name: string;
  role: string;
}

const squadData = {
  goalkeepers: [
    { number: 1, name: "יאן זומר", position: "שוער", country: "🇨🇭" },
    { number: 12, name: "רפאלה די ג'נארו", position: "שוער", country: "🇮🇹" },
    { number: 13, name: "ג'וזפ מרטינס", position: "שוער", country: "🇪🇸" },
  ],
  defenders: [
    { number: 2, name: "דנזל דומפריס", position: "מגן ימני", country: "🇳🇱" },
    { number: 6, name: "סטפן דה פריי", position: "בלם", country: "🇳🇱" },
    { number: 15, name: "פרנצ'סקו אצ'רבי", position: "בלם", country: "🇮🇹" },
    { number: 25, name: "מנואל אקאנג'י", position: "בלם", country: "🇨🇭" },
    { number: 30, name: "קרלוס אוגוסטו", position: "מגן שמאלי", country: "🇧🇷" },
    { number: 31, name: "יאן ביסק", position: "בלם", country: "🇩🇪" },
    { number: 32, name: "פדריקו דימארקו", position: "מגן שמאלי", country: "🇮🇹" },
    { number: 36, name: "מתאו דרמיאן", position: "מגן ימני", country: "🇮🇹" },
    { number: 42, name: "תומאס פלאסיוס", position: "בלם", country: "🇦🇷" },
    { number: 95, name: "אלסנדרו באסטוני", position: "בלם", country: "🇮🇹" },
  ],
  midfielders: [
    { number: 7, name: "פיוטר ז'יילינסקי", position: "קשר", country: "🇵🇱" },
    { number: 8, name: "פטר סוצ'יץ'", position: "קשר", country: "🇭🇷" },
    { number: 16, name: "דוידה פראטזי", position: "קשר", country: "🇮🇹" },
    { number: 17, name: "אנדי דיוף", position: "קשר", country: "🇫🇷" },
    { number: 20, name: "הקאן צ'להאנולו", position: "קשר", country: "🇹🇷" },
    { number: 22, name: "הנריך מחיטריאן", position: "קשר", country: "🇦🇲" },
    { number: 23, name: "ניקולו בארלה (סגן קפטן)", position: "קשר", country: "🇮🇹" },
  ],
  forwards: [
    { number: 9, name: "מרקוס תוראם", position: "חלוץ", country: "🇫🇷" },
    { number: 10, name: "לאוטרו מרטינס (קפטן)", position: "חלוץ", country: "🇦🇷" },
    { number: 11, name: "לואיס הנריקה", position: "חלוץ", country: "🇧🇷" },
    { number: 14, name: "אנג'-יואן בוני", position: "חלוץ", country: "🇫🇷" },
    { number: 94, name: "פרנצ'סקו פיו אספוסיטו", position: "חלוץ", country: "🇮🇹" },
  ],
  staff: [
    { name: "סימונה אינזאגי", role: "מאמן ראשי" },
    { name: "מסימיליאנו פאריס", role: "עוזר מאמן" },
    { name: "מריו צ'קי", role: "עוזר טכני" },
    { name: "פאביו ריפרט", role: "מאמן כושר" },
  ]
};

const PlayerCard: React.FC<{ player: Player; index: number }> = ({ player, index }) => (
  <div 
    className="bg-white group hover:scale-105 transition-all duration-300 overflow-hidden shadow-lg border-t-4 border-[#001489] relative animate-fade-in-up rounded-lg"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {/* Striped Background Effect */}
    <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#000_0px,#000_10px,#fff_10px,#fff_20px)] group-hover:opacity-10 transition-opacity"></div>
    
    <div className="relative z-10 p-6 flex flex-col items-center">
        <span className="text-6xl font-black text-[#001489]/10 font-sans absolute top-2 right-4 group-hover:text-[#001489]/20 transition-colors">
            {player.number}
        </span>
        
        <div className="w-20 h-20 bg-[#001489] rounded-full flex items-center justify-center mb-4 border-4 border-black group-hover:border-[#D4AF37] transition-colors shadow-xl group-hover:shadow-2xl group-hover:scale-110 duration-300">
             <span className="text-3xl font-black text-white font-sans">{player.number}</span>
        </div>
        
        <h3 className="text-xl font-black text-black uppercase font-sans mb-1 text-center leading-tight group-hover:text-[#001489] transition-colors">{player.name}</h3>
        
        <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{player.position}</span>
            <span className="text-xl" role="img" aria-label="flag">{player.country}</span>
        </div>
    </div>
  </div>
);

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center gap-4 mb-8 mt-16 animate-fade-in-up">
    <div className="h-px bg-white/30 flex-1"></div>
    <h3 className="text-3xl font-black text-white uppercase font-sans tracking-wide drop-shadow-md">{title}</h3>
    <div className="h-px bg-white/30 flex-1"></div>
  </div>
);

const Squad: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-4">
      <h2 className="text-5xl font-black text-center mb-12 text-white uppercase tracking-tighter font-sans drop-shadow-md animate-fade-in-up">
        סגל הקבוצה - 2025/26
      </h2>

      {/* Staff Section */}
      <div className="max-w-3xl mx-auto mb-16 bg-white/95 backdrop-blur border-2 border-[#D4AF37] p-8 shadow-2xl relative overflow-hidden rounded-xl animate-fade-in-up delay-100">
         <div className="absolute top-0 left-0 w-24 h-24 bg-[#001489] transform -translate-x-12 -translate-y-12 rotate-45"></div>
         <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#001489] transform translate-x-12 translate-y-12 rotate-45"></div>

         <div className="text-center relative z-10">
            <Briefcase className="w-12 h-12 text-[#001489] mx-auto mb-4 animate-bounce" />
            <h3 className="text-4xl font-black text-black uppercase font-sans mb-2">{squadData.staff[0].name}</h3>
            <p className="text-[#001489] font-bold uppercase tracking-widest mb-6">{squadData.staff[0].role}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                {squadData.staff.slice(1).map((staff, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <span className="font-bold text-black font-sans">{staff.name}</span>
                        <span className="text-xs text-gray-500 uppercase">{staff.role}</span>
                    </div>
                ))}
            </div>
         </div>
      </div>

      {/* Players Grid */}
      <SectionTitle title="שוערים" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {squadData.goalkeepers.map((p, i) => <PlayerCard key={p.number} player={p} index={i} />)}
      </div>

      <SectionTitle title="הגנה" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {squadData.defenders.map((p, i) => <PlayerCard key={p.number} player={p} index={i} />)}
      </div>

      <SectionTitle title="קישור" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {squadData.midfielders.map((p, i) => <PlayerCard key={p.number} player={p} index={i} />)}
      </div>

      <SectionTitle title="התקפה" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {squadData.forwards.map((p, i) => <PlayerCard key={p.number} player={p} index={i} />)}
      </div>

    </div>
  );
};

export default Squad;