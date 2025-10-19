// utils/questionGenerator.ts - Updated for new flag paths
import { getCountries, getCountryByCode } from '../constants';
import { Question, QuestionConfig, ManualQuestion, RandomQuestionConfig, Country, Choice } from '../types';
import { getCountriesByRegion } from './countriesLoader';

// Generate a single random question with random answers
const generateRandomFlagRandomAnswers = (wrongAnswerCount: number = 3): Question => {
  const countries = getCountries();
  const correct = countries[Math.floor(Math.random() * countries.length)];
  const wrong = countries
    .filter(c => c.nameEn !== correct.nameEn)
    .sort(() => 0.5 - Math.random())
    .slice(0, wrongAnswerCount);

  const choices = [countryToChoice(correct), ...wrong.map(countryToChoice)]
    .sort(() => 0.5 - Math.random());

  return {
    flagUrl: correct.flagPath, // Use flagPath instead of constructing URL
    correctEnName: correct.nameEn,
    correctRuName: correct.nameRu,
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
    .filter(c => c.nameEn !== correct.nameEn)
    .filter(c => c.region === correct.region)
    .sort(() => 0.5 - Math.random())
    .slice(0, wrongAnswerCount);

  const choices = [countryToChoice(correct), ...wrong.map(countryToChoice)]
    .sort(() => 0.5 - Math.random());

  return {
    flagUrl: correct.flagPath, // Use flagPath instead of constructing URL
    correctEnName: correct.nameEn,
    correctRuName: correct.nameRu,
    choices,
  };
};

const countryToChoice = (country: Country): Choice => {
  return { en: country.nameEn, ru: country.nameRu }
}

// Generate question from manual configuration
const generateFromManualConfig = (config: ManualQuestion): Question => {
  const country = getCountryByCode(config.countryCode);
  if (!country) {
    throw new Error(`Country with code ${config.countryCode} not found`);
  }

  const choices = [config.countryCode, ...config.wrongAnswers]
    .map(countryCode => {
      const countryByCode = getCountryByCode(countryCode)
      return countryToChoice(countryByCode)
    })
    .sort(() => 0.5 - Math.random());

  return {
    flagUrl: country.flagPath, // Use flagPath instead of constructing URL
    correctEnName: country.nameEn,
    correctRuName: country.nameRu,
    choices
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

export const generateRandomFlagQuestionsForRegion = (region: string): Question[] => {
  const countries = getCountriesByRegion(getCountries(), region);

  // Shuffle countries array (Fisher–Yates)
  const shuffledCountries = [...countries];
  for (let i = shuffledCountries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCountries[i], shuffledCountries[j]] = [shuffledCountries[j], shuffledCountries[i]];
  }

  return shuffledCountries.map(c => generateSpecificFlagRandomAnswers(c.code));
}

export function* generateInfiniteFlagQuestionsForRegion(region: string): Generator<Question> {
  const countries = getCountriesByRegion(getCountries(), region);

  if (countries.length === 0) {
    console.warn("No countries found for region:", region);
    return;
  }

  while (true) {
    // Shuffle each loop to avoid repeating the same order
    const shuffledCountries = [...countries];
    for (let i = shuffledCountries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCountries[i], shuffledCountries[j]] = [shuffledCountries[j], shuffledCountries[i]];
    }

    // Yield one question per country
    for (const c of shuffledCountries) {
      yield generateSpecificFlagRandomAnswers(c.code);
    }
  }
}


// Helper type guards (same as before)
export const isManualQuestion = (config: QuestionConfig): config is ManualQuestion => {
  return 'countryCode' in config && 'wrongAnswers' in config;
};

export const isRandomQuestion = (config: QuestionConfig): config is RandomQuestionConfig => {
  return 'type' in config;
};