export interface Country {
  code: string;
  name: string;
}

export interface Theme {
  code: string;
  name: string;
  icon: string;
}

export interface Question {
  flagUrl: string;
  correctName: string;
  choices: string[];
}

export interface Feedback {
  buttonIndex: number;
  isCorrect: boolean;
  correctIndex: number;
}

export interface CompletedLevel {
  scorePercent: number;
  score: number;
  isPerfect: boolean;
}

export interface CompletedLevels {
  [key: string]: CompletedLevel;
}

export interface ManualQuestion {
  countryCode: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

export interface RandomQuestionConfig {
  type: 'random-flag-random-answers' | 'random-flag-specific-answers' | 'specific-flag-random-answers';
  countryCode?: string; // Used for 'specific-flag-random-answers'
  specificAnswers?: string[]; // Used for 'random-flag-specific-answers'
  wrongAnswerCount?: number; // Number of wrong answers to generate (default 3)
}

export type QuestionConfig = ManualQuestion | RandomQuestionConfig;

export interface LevelData {
  id: string;
  n: number;
  name: string;
  theme: string;
  region: string;
  questions: QuestionConfig[];
}

export interface Region {
  id: string;
  name: string;
  icon: string;
}

export interface Country {
  code: string;
  name: string;
  region: string;
  subRegion: string;
  flagPath: string;
}

export interface CountryNames {
  [countryCode: string]: string;
}

export interface RegionData {
  alpha2: string;
  region: string;
  subRegion: string;
  regionCode: string;
  subRegionCode: string;
}


export type PageType = 'main' | 'theme' | 'region' | 'level';
