import React from 'react';
import { TimelineEvent } from '../types';

const events: TimelineEvent[] = [
  { year: 1908, title: "הקמת המועדון", description: "קבוצת מורדים עוזבת את מילאן ומקימה את אינטרנציונלה, מועדון הפתוח לזרים." },
  { year: 1910, title: "סקודטו ראשון", description: "הקבוצה זוכה באליפות איטליה הראשונה שלה שנתיים בלבד לאחר הקמתה." },
  { year: 1964, title: "אלופת אירופה", description: "תחת הלניו הררה, אינטר זוכה בגביע אירופה לאלופות לראשונה עם ניצחון על ריאל מדריד." },
  { year: 1965, title: "גרנדה אינטר", description: "זכייה שנייה ברציפות בגביע האלופות ואליפות איטליה." },
  { year: 1989, title: "השיא של טראפטוני", description: "זכייה באליפות עם שיא נקודות היסטורי (בעידן 2 נקודות לניצחון)." },
  { year: 1998, title: "גביע אופ״א בפריז", description: "רונאלדו 'פנומנו' מוביל את אינטר לזכייה בגביע אופ״א." },
  { year: 2010, title: "הטרבל ההיסטורי", description: "בהדרכת מוריניו, אינטר הופכת לקבוצה האיטלקית הראשונה והיחידה הזוכה באליפות, גביע וליגת האלופות באותה עונה." },
  { year: 2021, title: "חזרה לפסגה", description: "אליפות ראשונה אחרי 11 שנים בהובלת אנטוניו קונטה ולוקאקו." },
  { year: 2024, title: "הכוכב השני", description: "אינטר זוכה באליפות ה-20 שלה ומוסיפה כוכב זהב שני מעל הסמל." },
];

const Timeline: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-24 px-4">
      <h2 className="text-5xl font-black text-center mb-16 text-white uppercase tracking-tighter font-sans drop-shadow-md animate-fade-in-up">רגעים בהיסטוריה</h2>
      
      <div className="relative border-r-2 border-white/30 mr-6 md:mr-0 animate-fade-in-up delay-200">
        {events.map((event, index) => (
          <div 
            key={index} 
            className="mb-12 flex items-start w-full relative group animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Timeline Dot */}
            <div className="absolute -right-[9px] top-0 w-4 h-4 bg-white border-2 border-[#001489] rounded-full group-hover:bg-[#D4AF37] group-hover:scale-125 transition-all duration-300 z-10 shadow-lg"></div>
            
            <div className="w-full pr-12 pl-4">
              <div className="bg-white/95 backdrop-blur-sm border-l-4 border-transparent hover:border-[#D4AF37] p-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:translate-x-2 rounded-r-lg">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                  <span className="text-4xl font-black text-[#001489] font-sans">
                    {event.year}
                  </span>
                  <div className="h-px w-10 bg-gray-300 hidden md:block"></div>
                  <h3 className="text-2xl font-bold text-black uppercase font-sans tracking-wide">{event.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed font-normal text-lg">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;