import React, { useState, useEffect } from 'react';
import { getSerieAStandings } from '../services/geminiService';
import { StandingRow } from '../types';
import { Loader2, Calendar, Trophy } from 'lucide-react';

const staticStandings2526: StandingRow[] = [
  { rank: 1, team: 'אינטר מילאנו', played: 16, won: 12, drawn: 0, lost: 4, points: 36, goalsFor: 35, goalsAgainst: 14 },
  { rank: 2, team: 'מילאן', played: 16, won: 10, drawn: 5, lost: 1, points: 35, goalsFor: 28, goalsAgainst: 14 },
  { rank: 3, team: 'נאפולי', played: 16, won: 11, drawn: 1, lost: 4, points: 34, goalsFor: 25, goalsAgainst: 14 },
  { rank: 4, team: 'רומא', played: 17, won: 11, drawn: 0, lost: 6, points: 33, goalsFor: 27, goalsAgainst: 18 },
  { rank: 5, team: 'יובנטוס', played: 17, won: 9, drawn: 5, lost: 3, points: 32, goalsFor: 22, goalsAgainst: 14 },
  { rank: 6, team: 'קומו', played: 16, won: 7, drawn: 6, lost: 3, points: 27, goalsFor: 20, goalsAgainst: 10 },
  { rank: 7, team: 'בולוניה', played: 16, won: 7, drawn: 5, lost: 4, points: 26, goalsFor: 21, goalsAgainst: 11 },
  { rank: 8, team: 'לאציו', played: 17, won: 6, drawn: 6, lost: 5, points: 24, goalsFor: 19, goalsAgainst: 13 },
  { rank: 9, team: 'ססואולו', played: 17, won: 6, drawn: 4, lost: 7, points: 22, goalsFor: 20, goalsAgainst: 19 },
  { rank: 10, team: 'אטאלנטה', played: 17, won: 5, drawn: 7, lost: 5, points: 22, goalsFor: 18, goalsAgainst: 17 },
  { rank: 11, team: 'אודינזה', played: 17, won: 6, drawn: 4, lost: 7, points: 22, goalsFor: 15, goalsAgainst: 25 },
  { rank: 12, team: 'קרמונזה', played: 17, won: 5, drawn: 6, lost: 6, points: 21, goalsFor: 14, goalsAgainst: 16 },
  { rank: 13, team: 'טורינו', played: 17, won: 5, drawn: 5, lost: 7, points: 20, goalsFor: 12, goalsAgainst: 23 },
  { rank: 14, team: 'קליארי', played: 17, won: 4, drawn: 6, lost: 7, points: 18, goalsFor: 15, goalsAgainst: 20 },
  { rank: 15, team: 'פארמה', played: 16, won: 4, drawn: 5, lost: 7, points: 17, goalsFor: 13, goalsAgainst: 20 },
  { rank: 16, team: 'לצ\'ה', played: 16, won: 4, drawn: 4, lost: 8, points: 16, goalsFor: 10, goalsAgainst: 21 },
  { rank: 17, team: 'גנואה', played: 17, won: 3, drawn: 5, lost: 9, points: 14, goalsFor: 12, goalsAgainst: 22 },
  { rank: 18, team: 'הלאס ורונה', played: 16, won: 2, drawn: 6, lost: 8, points: 12, goalsFor: 10, goalsAgainst: 22 },
  { rank: 19, team: 'פיזה', played: 17, won: 1, drawn: 8, lost: 8, points: 11, goalsFor: 11, goalsAgainst: 23 },
  { rank: 20, team: 'פיורנטינה', played: 17, won: 1, drawn: 6, lost: 10, points: 9, goalsFor: 9, goalsAgainst: 20 },
];

const Standings: React.FC = () => {
  const [season, setSeason] = useState('2025/26');
  const [standings, setStandings] = useState<StandingRow[]>([]);
  const [loading, setLoading] = useState(false);

  // Pre-defined important seasons
  const seasons = [
    '2025/26',
    '2024/25',
    '2023/24', // Second star
    '2020/21', // Conte scudetto
    '2009/10', // Treble
    '2005/06',
    '1988/89', // Record points
    '1964/65'  // Grande Inter
  ];

  const fetchStandings = async (selectedSeason: string) => {
    setLoading(true);
    setStandings([]); // Clear current standings
    // Add small delay to allow UI transition
    setTimeout(async () => {
      if (selectedSeason === '2025/26') {
        setStandings(staticStandings2526);
        setLoading(false);
      } else {
        const data = await getSerieAStandings(selectedSeason);
        setStandings(data);
        setLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    fetchStandings(season);
  }, [season]);

  return (
    <div className="max-w-6xl mx-auto py-24 px-4">
      <h2 className="text-5xl font-black text-center mb-12 text-white uppercase tracking-tighter font-sans drop-shadow-md animate-fade-in-up">
        SERIE A TABLE
      </h2>

      {/* Season Selector */}
      <div className="flex justify-center mb-12 animate-fade-in-up delay-100">
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-full flex gap-2 overflow-x-auto max-w-full">
            {seasons.map(s => (
                <button
                    key={s}
                    onClick={() => setSeason(s)}
                    className={`px-6 py-2 rounded-full font-bold font-sans transition-all duration-300 whitespace-nowrap ${
                        season === s 
                        ? 'bg-[#D4AF37] text-black shadow-lg scale-105' 
                        : 'text-white hover:bg-white/20'
                    }`}
                >
                    {s}
                </button>
            ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
          <Loader2 className="w-16 h-16 text-[#D4AF37] animate-spin mb-4" />
          <p className="text-white font-bold tracking-widest uppercase">LOADING DATA...</p>
        </div>
      )}

      {/* Table */}
      {!loading && standings.length > 0 && (
        <div className="overflow-hidden bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl animate-fade-in-up border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-[#001489] text-white uppercase text-sm font-bold tracking-wider">
                  <th className="p-5 text-center w-16">#</th>
                  <th className="p-5 text-right">קבוצה</th>
                  <th className="p-5 text-center w-16">מש'</th>
                  <th className="p-5 text-center w-16 hidden sm:table-cell">נצ'</th>
                  <th className="p-5 text-center w-16 hidden sm:table-cell">תיקו</th>
                  <th className="p-5 text-center w-16 hidden sm:table-cell">הפ'</th>
                  <th className="p-5 text-center w-20 hidden md:table-cell">הפרש</th>
                  <th className="p-5 text-center w-20">נק'</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, index) => {
                  const isInter = row.team.includes('אינטר') || row.team.toLowerCase().includes('inter');
                  const isFirst = row.rank === 1;
                  const isCL = row.rank <= 4;
                  
                  return (
                    <tr 
                        key={index} 
                        className={`
                            border-b border-gray-100 transition-colors duration-200
                            ${isInter ? 'bg-[#eef2ff] hover:bg-[#e0e7ff]' : 'hover:bg-gray-50'}
                            ${isInter ? 'font-black text-[#001489]' : 'font-medium text-gray-700'}
                        `}
                        style={{ animation: `fadeInUp 0.3s ease-out forwards ${index * 0.05}s`, opacity: 0 }}
                    >
                      <td className="p-5 text-center relative">
                        {isFirst && <Trophy className="w-4 h-4 text-[#D4AF37] absolute top-2 left-1/2 transform -translate-x-1/2" />}
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${isFirst ? 'bg-[#D4AF37] text-black' : isCL ? 'bg-blue-100 text-[#001489]' : 'bg-gray-100 text-gray-500'}`}>
                            {row.rank}
                        </span>
                      </td>
                      <td className="p-5 flex items-center gap-3">
                         <span className="text-lg">{row.team}</span>
                         {isInter && <span className="bg-[#001489] text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">You</span>}
                      </td>
                      <td className="p-5 text-center font-bold">{row.played}</td>
                      <td className="p-5 text-center hidden sm:table-cell">{row.won}</td>
                      <td className="p-5 text-center hidden sm:table-cell">{row.drawn}</td>
                      <td className="p-5 text-center hidden sm:table-cell">{row.lost}</td>
                      <td className="p-5 text-center hidden md:table-cell dir-ltr text-gray-500 font-mono">
                        {row.goalsFor - row.goalsAgainst > 0 ? '+' : ''}{row.goalsFor - row.goalsAgainst}
                      </td>
                      <td className="p-5 text-center">
                          <span className={`text-xl font-black ${isInter ? 'text-[#001489]' : 'text-black'}`}>{row.points}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-gray-50 text-xs text-center text-gray-500 border-t border-gray-200">
             * נתונים אלו נוצרו באמצעות AI ועשויים להיות הערכות עבור עונות היסטוריות או עתידיות.
          </div>
        </div>
      )}
    </div>
  );
};

export default Standings;