export interface Country {
  code: string;
  nameEn: string;
  nameRu: string;
}

export interface Theme {
  code: string;
  name: string;
  icon: string;
}

export interface Question {
  flagUrl: string;
  correctEnName: string;
  correctRuName: string;
  choices: Choice[];
}

export interface Choice {
  en: string;
  ru: string;
}

export interface Feedback {
  buttonIndex?: number;
  isCorrect: boolean;
  correctIndex?: number;
}

export interface CompletedLevel {
  scorePercent: number;
  score: number;
  isPerfect: boolean;
}

export interface CompletedLevels {
  [key: string]: CompletedLevel;
}

export interface UsersState {
  [user: string]: UserState;
}

export interface ThemesState {
  [theme: string]: ThemeState;
}

export interface UserState {
  settings: Record<string, any>;
  themes: ThemesState;
}

export interface ThemeState {
  [region: string]: RegionState;
}

export interface RegionState {
  [lvl: string]: number;
}

export interface ManualQuestion {
  countryCode: string;
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
  nameEn: string;
  nameRu: string;
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

export interface Settings {
  answersType: AnswersType;
}


export type PageType = 'main' | 'theme' | 'region' | 'level';

export type AnswersType = '4-choices' | 'free';
