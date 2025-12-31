import React from 'react';
import { Legend } from '../types';

const legendsData: Legend[] = [
  {
    id: '1',
    name: "ג'וזפה מאצה",
    nickname: "Il Balilla",
    years: "1927-1940",
    description: "גדול שחקני אינטר בכל הזמנים. האצטדיון סן סירו קרוי על שמו. כבש 284 שערים עבור המועדון.",
    position: "חלוץ",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Giuseppe_Meazza_Inter_1935.jpg/640px-Giuseppe_Meazza_Inter_1935.jpg"
  },
  {
    id: '2',
    name: "חבייר זאנטי",
    nickname: "Il Capitano",
    years: "1995-2014",
    description: "שיאן ההופעות של המועדון, קפטן הנצח שהניף את גביע האלופות ב-2010. סמל למקצוענות ונאמנות.",
    position: "מגן/קשר",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Javier_Zanetti_Inter_CSKA_2011.jpg/640px-Javier_Zanetti_Inter_CSKA_2011.jpg"
  },
  {
    id: '3',
    name: "ג'אצ'ינטו פאקטי",
    nickname: "Cipe",
    years: "1960-1978",
    description: "המגן השמאלי המהפכני של הגרנדה אינטר. הקדיש את כל הקריירה למועדון וכיהן גם כנשיא.",
    position: "מגן שמאלי",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Giacinto_Facchetti_Inter_1960s.jpg/640px-Giacinto_Facchetti_Inter_1960s.jpg"
  },
  {
    id: '4',
    name: "רונאלדו",
    nickname: "Il Fenomeno",
    years: "1997-2002",
    description: "נחשב בעיני רבים לחלוץ הטוב בהיסטוריה בשיאו. זכה בכדור הזהב במדי אינטר.",
    position: "חלוץ",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ronaldo_Inter_1997.jpg/640px-Ronaldo_Inter_1997.jpg"
  },
  {
    id: '5',
    name: "סנדרו מאצולה",
    nickname: "-",
    years: "1960-1977",
    description: "בנו של ולנטינו מאצולה, הפך לאגדה בפני עצמו. מנהיג ההתקפה של הגרנדה אינטר.",
    position: "קשר התקפי",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Inter_1963-64_Sandro_Mazzola.jpg/640px-Inter_1963-64_Sandro_Mazzola.jpg"
  },
  {
    id: '6',
    name: "דייגו מיליטו",
    nickname: "Il Principe",
    years: "2009-2014",
    description: "גיבור הטרבל. כבש את כל השערים המכריעים בגמר הגביע, משחק האליפות וגמר האלופות.",
    position: "חלוץ",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Diego_Milito_Inter_vs_CSKA_Moscow.jpg/640px-Diego_Milito_Inter_vs_CSKA_Moscow.jpg"
  }
];

const Legends: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg"; // Fallback to Logo
    e.currentTarget.style.objectFit = "contain";
    e.currentTarget.style.padding = "2rem";
    e.currentTarget.style.backgroundColor = "#001489";
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4">
      <h2 className="text-5xl font-black text-center mb-16 text-white uppercase tracking-tighter font-sans drop-shadow-md animate-fade-in-up">HALL OF FAME</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {legendsData.map((legend, index) => (
          <div 
            key={legend.id} 
            className="bg-white border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 group relative overflow-hidden shadow-xl animate-fade-in-up rounded-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            
            {/* Header/Image Area */}
            <div className="h-80 bg-gray-900 relative overflow-hidden flex items-end justify-center border-b border-gray-100">
                
                {/* Player Image - Z-0 */}
                <div className="absolute inset-0 z-0">
                  <img 
                      src={legend.imageUrl} 
                      alt={legend.name}
                      onError={handleImageError}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                  />
                </div>
                
                {/* Gradient Overlay - Z-10 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>

                {/* ID Watermark - Z-20 */}
                 <span className="absolute top-2 right-4 text-6xl font-black text-white/20 font-sans z-20">
                    {legend.id}
                </span>

                {/* Text Content - Z-30 */}
                <div className="relative z-30 text-center p-4 w-full transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-3xl font-black text-white uppercase font-sans mb-1 drop-shadow-lg">{legend.name}</h3>
                    <div className="h-1 w-12 bg-[#D4AF37] mx-auto mb-2 shadow-sm border border-white/20 group-hover:w-24 transition-all duration-300"></div>
                    <span className="text-blue-200 font-bold uppercase tracking-widest text-sm drop-shadow-md">{legend.nickname}</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 bg-white relative z-40">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                <span className="text-white bg-[#001489] font-bold text-xs uppercase tracking-wider px-2 py-1 rounded">{legend.position}</span>
                <span className="text-black font-sans font-bold">{legend.years}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed font-normal">
                {legend.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legends;