// utils/questionGenerator.ts - Updated for new flag paths
import { getCountries, getCountryByCode } from '../constants';
import { Question, QuestionConfig, ManualQuestion, RandomQuestionConfig } from '../types';

// Generate a single random question with random answers
const generateRandomFlagRandomAnswers = (wrongAnswerCount: number = 3): Question => {
  const countries = getCountries();
  const correct = countries[Math.floor(Math.random() * countries.length)];
  const wrong = countries
    .filter(c => c.name !== correct.name)
    .sort(() => 0.5 - Math.random())
    .slice(0, wrongAnswerCount);
  
  const choices = [correct.name, ...wrong.map(w => w.name)]
    .sort(() => 0.5 - Math.random());
  
  return {
    flagUrl: correct.flagPath, // Use flagPath instead of constructing URL
    correctName: correct.name,
    choices,
  };
};

// Generate question for specific flag with random wrong answers
const generateSpecificFlagRandomAnswers = (countryCode: string, wrongAnswerCount: number = 3): Question => {
  const countries = getCountries();
  const correct = getCountryByCode(countryCode);
  if (!correct) {
    throw new Error(`Country with code ${countryCode} not found`);
  }
  
  const wrong = countries
    .filter(c => c.name !== correct.name)
    .sort(() => 0.5 - Math.random())
    .slice(0, wrongAnswerCount);
  
  const choices = [correct.name, ...wrong.map(w => w.name)]
    .sort(() => 0.5 - Math.random());
  
  return {
    flagUrl: correct.flagPath, // Use flagPath instead of constructing URL
    correctName: correct.name,
    choices,
  };
};

// Generate random flag with specific answer choices
const generateRandomFlagSpecificAnswers = (specificAnswers: string[]): Question => {
  const countries = getCountries();
  // Find countries that match the specific answers
  const possibleCountries = countries.filter(c => specificAnswers.includes(c.name));
  
  if (possibleCountries.length === 0) {
    throw new Error('No countries found matching the specific answers');
  }
  
  const correct = possibleCountries[Math.floor(Math.random() * possibleCountries.length)];
  const wrongAnswers = specificAnswers.filter(answer => answer !== correct.name);
  
  const choices = [correct.name, ...wrongAnswers]
    .sort(() => 0.5 - Math.random());
  
  return {
    flagUrl: correct.flagPath, // Use flagPath instead of constructing URL
    correctName: correct.name,
    choices,
  };
};

// Generate question from manual configuration
const generateFromManualConfig = (config: ManualQuestion): Question => {
  const country = getCountryByCode(config.countryCode);
  if (!country) {
    throw new Error(`Country with code ${config.countryCode} not found`);
  }
  
  const choices = [config.correctAnswer, ...config.wrongAnswers]
    .sort(() => 0.5 - Math.random());
  
  return {
    flagUrl: country.flagPath, // Use flagPath instead of constructing URL
    correctName: config.correctAnswer,
    choices,
  };
};

// Generate question from random configuration
const generateFromRandomConfig = (config: RandomQuestionConfig): Question => {
  switch (config.type) {
    case 'random-flag-random-answers':
      return generateRandomFlagRandomAnswers(config.wrongAnswerCount || 3);
    
    case 'specific-flag-random-answers':
      if (!config.countryCode) {
        throw new Error('Country code required for specific-flag-random-answers');
      }
      return generateSpecificFlagRandomAnswers(config.countryCode, config.wrongAnswerCount || 3);
    
    case 'random-flag-specific-answers':
      if (!config.specificAnswers || config.specificAnswers.length < 2) {
        throw new Error('At least 2 specific answers required for random-flag-specific-answers');
      }
      return generateRandomFlagSpecificAnswers(config.specificAnswers);
    
    default:
      throw new Error(`Unknown random question type: ${(config as any).type}`);
  }
};

// Main function to generate a question from any config
export const generateQuestionFromConfig = (config: QuestionConfig): Question => {
  if (isManualQuestion(config)) {
    return generateFromManualConfig(config);
  } else if (isRandomQuestion(config)) {
    return generateFromRandomConfig(config);
  } else {
    throw new Error('Invalid question configuration');
  }
};

// Generate multiple questions from configs
export const generateQuestionsFromConfigs = (configs: QuestionConfig[]): Question[] => {
  return configs.map(config => generateQuestionFromConfig(config));
};

// Legacy function for backward compatibility
export const generateFlagQuestions = (count: number): Question[] => {
  const configs: QuestionConfig[] = Array(count).fill({
    type: 'random-flag-random-answers' as const
  });
  return generateQuestionsFromConfigs(configs);
};

// Helper type guards (same as before)
export const isManualQuestion = (config: QuestionConfig): config is ManualQuestion => {
  return 'countryCode' in config && 'correctAnswer' in config && 'wrongAnswers' in config;
};

export const isRandomQuestion = (config: QuestionConfig): config is RandomQuestionConfig => {
  return 'type' in config;
};