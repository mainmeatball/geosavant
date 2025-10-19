export { MainPage } from '../pages/MainPage/MainPage';
export { RegionPage } from '../pages/RegionPage/RegionPage';
export { LevelPage } from '../pages/LevelPage/LevelPage';
export { ThemePage } from '../pages/ThemePage/ThemePage';
export { Hearts } from './Hearts';
export { ProgressBar } from './ProgressBar';
export { ChoiceButton } from './ChoiceButton';
export { LevelComplete } from './LevelComplete';
export { GameOver } from './GameOver';
export { NotImplemented } from './NotImplemented';

// utils/index.ts
export { generateQuestionFromConfig, generateQuestionsFromConfigs, generateFlagQuestions } from '../utils/questionGenerator';
export { capitalizeFirstLetter } from '../utils/stringUtils';

// data/index.ts
export { levelData } from '../data/levels';

// constants/index.ts - Re-export everything
export * from './index';