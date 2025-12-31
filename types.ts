export enum ViewState {
  HOME = 'HOME',
  TIMELINE = 'TIMELINE',
  LEGENDS = 'LEGENDS',
  TROPHIES = 'TROPHIES',
  QUIZ = 'QUIZ',
  CHAT = 'CHAT',
  SQUAD = 'SQUAD',
  STANDINGS = 'STANDINGS'
}

export interface Legend {
  id: string;
  name: string;
  nickname: string;
  years: string;
  description: string;
  position: string;
  imageUrl: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0-3
  explanation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface StandingRow {
  rank: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
}