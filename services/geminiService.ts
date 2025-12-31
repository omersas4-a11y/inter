import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, StandingRow } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini client only if key exists, otherwise we handle errors in the UI
const getAiClient = () => {
  if (!apiKey) {
    console.warn("API Key is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateQuizQuestion = async (difficulty: 'easy' | 'hard'): Promise<QuizQuestion | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a trivia question about the history of Inter Milan (FC Internazionale Milano) in Hebrew. 
      The difficulty should be ${difficulty}.
      Focus on historical events, players, coaches, or stats.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING },
              minItems: 4,
              maxItems: 4
            },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswerIndex", "explanation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizQuestion;
    }
    return null;
  } catch (error) {
    console.error("Error generating quiz:", error);
    return null;
  }
};

export const getChatResponse = async (history: {role: 'user' | 'model', parts: [{text: string}]}[]): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "שגיאה: חסר מפתח API.";

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are an expert historian and passionate fan of Inter Milan (FC Internazionale Milano). 
        You answer questions in Hebrew. 
        Your tone is knowledgeable, passionate, but objective. 
        You know everything about the 'Grande Inter', the 'Triplete' of 2010, players like Zanetti, Meazza, Ronaldo, etc.
        If asked about AC Milan or Juventus, maintain a polite rivalry but focus on Inter's superiority in a fun way.`,
      },
      history: history
    });

    // We only send the last message as the new input, the history is passed in init
    const lastUserMessage = history[history.length - 1].parts[0].text;
    const result = await chat.sendMessage({ message: lastUserMessage });
    return result.text || "מצטער, לא הצלחתי לענות כרגע.";

  } catch (error) {
    console.error("Chat error:", error);
    return "מצטער, אירעה שגיאה בתקשורת עם השרת.";
  }
};

export const getSerieAStandings = async (season: string): Promise<StandingRow[]> => {
  const ai = getAiClient();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate the Serie A table standings for the season ${season}. 
      Return a list of the top 10 teams plus Inter Milan if they are not in the top 10.
      The team names should be in Hebrew.
      The 'rank' should be the actual finishing position.
      Make sure the data is historically accurate for points, played, won, drawn, lost, goalsFor, goalsAgainst.
      If the season is the current one (2025/26 or 2024/25), estimate based on current real-world status or project realistic values for a simulation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              rank: { type: Type.INTEGER },
              team: { type: Type.STRING },
              played: { type: Type.INTEGER },
              won: { type: Type.INTEGER },
              drawn: { type: Type.INTEGER },
              lost: { type: Type.INTEGER },
              points: { type: Type.INTEGER },
              goalsFor: { type: Type.INTEGER },
              goalsAgainst: { type: Type.INTEGER }
            },
            required: ["rank", "team", "played", "won", "drawn", "lost", "points", "goalsFor", "goalsAgainst"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as StandingRow[];
    }
    return [];
  } catch (error) {
    console.error("Error generating standings:", error);
    return [];
  }
};