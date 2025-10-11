import { LevelData } from '../types';

export const levelData: LevelData[] = [
  // Level 1: Easy - Most well-known European flags
  {
    id: 'flags-europe-1',
    n: 1,
    name: 'Level 1',
    theme: 'flags',
    region: 'europe',
    questions: [
      { countryCode: 'ru', correctAnswer: 'Russia', wrongAnswers: ['Serbia', 'Slovakia', 'Slovenia'] },
      { countryCode: 'de', correctAnswer: 'Germany', wrongAnswers: ['Belgium', 'Austria', 'Lithuania'] },
      { countryCode: 'gb', correctAnswer: 'United Kingdom', wrongAnswers: ['Ireland', 'Norway', 'Iceland'] },
      { countryCode: 'es', correctAnswer: 'Spain', wrongAnswers: ['Portugal', 'Romania', 'Moldova'] },
      { countryCode: 'fr', correctAnswer: 'France', wrongAnswers: ['Luxembourg', 'Netherlands', 'Italy'] }
    ]
  },

  // Level 2: Medium - Popular flags but trickier color patterns
  {
    id: 'flags-europe-2',
    n: 2,
    name: 'Level 2',
    theme: 'flags',
    region: 'europe',
    questions: [
      { countryCode: 'it', correctAnswer: 'Italy', wrongAnswers: ['Ireland', 'Hungary', 'Bulgaria'] },
      { countryCode: 'pt', correctAnswer: 'Portugal', wrongAnswers: ['Spain', 'Romania', 'Moldova'] },
      { countryCode: 'nl', correctAnswer: 'Netherlands', wrongAnswers: ['Luxembourg', 'Croatia', 'Serbia'] },
      { countryCode: 'pl', correctAnswer: 'Poland', wrongAnswers: ['Monaco', 'Indonesia', 'Austria'] },
      { countryCode: 'se', correctAnswer: 'Sweden', wrongAnswers: ['Finland', 'Iceland', 'Norway'] }
    ]
  },

  // Level 3: Northern Europe - Nordics and Baltics
  {
    id: 'flags-europe-3',
    n: 3,
    name: 'Level 3',
    theme: 'flags',
    region: 'europe',
    questions: [
      { countryCode: 'no', correctAnswer: 'Norway', wrongAnswers: ['Denmark', 'Iceland', 'Finland'] },
      { countryCode: 'fi', correctAnswer: 'Finland', wrongAnswers: ['Sweden', 'Norway', 'Iceland'] },
      { countryCode: 'dk', correctAnswer: 'Denmark', wrongAnswers: ['Norway', 'Sweden', 'Finland'] },
      { countryCode: 'ee', correctAnswer: 'Estonia', wrongAnswers: ['Latvia', 'Lithuania', 'Finland'] },
      { countryCode: 'lv', correctAnswer: 'Latvia', wrongAnswers: ['Estonia', 'Lithuania', 'Poland'] }
    ]
  },

  // Level 4: Eastern Europe
  {
    id: 'flags-europe-4',
    n: 4,
    name: 'Level 4',
    theme: 'flags',
    region: 'europe',
    questions: [
      { countryCode: 'ua', correctAnswer: 'Ukraine', wrongAnswers: ['Sweden', 'Romania', 'Moldova'] },
      { countryCode: 'by', correctAnswer: 'Belarus', wrongAnswers: ['Russia', 'Latvia', 'Ukraine'] },
      { countryCode: 'ro', correctAnswer: 'Romania', wrongAnswers: ['Chad', 'Moldova', 'Andorra'] },
      { countryCode: 'bg', correctAnswer: 'Bulgaria', wrongAnswers: ['Hungary', 'Slovenia', 'Italy'] },
      { countryCode: 'md', correctAnswer: 'Moldova', wrongAnswers: ['Romania', 'Andorra', 'San Marino'] }
    ]
  },

  // Level 5: Central Europe
  {
    id: 'flags-europe-5',
    n: 5,
    name: 'Level 5',
    theme: 'flags',
    region: 'europe',
    questions: [
      { countryCode: 'at', correctAnswer: 'Austria', wrongAnswers: ['Latvia', 'Poland', 'Denmark'] },
      { countryCode: 'cz', correctAnswer: 'Czech Republic', wrongAnswers: ['Slovakia', 'Poland', 'Slovenia'] },
      { countryCode: 'sk', correctAnswer: 'Slovakia', wrongAnswers: ['Czech Republic', 'Slovenia', 'Serbia'] },
      { countryCode: 'hu', correctAnswer: 'Hungary', wrongAnswers: ['Bulgaria', 'Italy', 'Iran'] },
      { countryCode: 'ch', correctAnswer: 'Switzerland', wrongAnswers: ['Denmark', 'Norway', 'Malta'] }
    ]
  },

  // Level 6: Balkans
  {
    id: 'flags-europe-6',
    n: 6,
    name: 'Level 6',
    theme: 'flags',
    region: 'europe',
    questions: [
      { countryCode: 'rs', correctAnswer: 'Serbia', wrongAnswers: ['Slovakia', 'Croatia', 'Russia'] },
      { countryCode: 'ba', correctAnswer: 'Bosnia and Herzegovina', wrongAnswers: ['Kosovo', 'Croatia', 'North Macedonia'] },
      { countryCode: 'hr', correctAnswer: 'Croatia', wrongAnswers: ['Serbia', 'Slovakia', 'Slovenia'] },
      { countryCode: 'me', correctAnswer: 'Montenegro', wrongAnswers: ['Albania', 'Serbia', 'North Macedonia'] },
      { countryCode: 'mk', correctAnswer: 'North Macedonia', wrongAnswers: ['Kosovo', 'Albania', 'Montenegro'] }
    ]
  },

  // Level 7: Southern Europe & microstates
  {
    id: 'flags-europe-7',
    n: 7,
    name: 'Level 7',
    theme: 'flags',
    region: 'europe',
    questions: [
      { countryCode: 'gr', correctAnswer: 'Greece', wrongAnswers: ['Finland', 'Israel', 'Cyprus'] },
      { countryCode: 'cy', correctAnswer: 'Cyprus', wrongAnswers: ['Greece', 'Malta', 'San Marino'] },
      { countryCode: 'mt', correctAnswer: 'Malta', wrongAnswers: ['Monaco', 'Switzerland', 'Liechtenstein'] },
      { countryCode: 'sm', correctAnswer: 'San Marino', wrongAnswers: ['Vatican City', 'Andorra', 'Monaco'] },
      { countryCode: 'mc', correctAnswer: 'Monaco', wrongAnswers: ['Poland', 'Indonesia', 'Malta'] }
    ]
  },

  // Level 8: Small and special territories
  {
    id: 'flags-europe-8',
    n: 8,
    name: 'Level 8',
    theme: 'flags',
    region: 'europe',
    questions: [
      { countryCode: 'ad', correctAnswer: 'Andorra', wrongAnswers: ['Moldova', 'Romania', 'Chad'] },
      { countryCode: 'li', correctAnswer: 'Liechtenstein', wrongAnswers: ['Luxembourg', 'Monaco', 'San Marino'] },
      { countryCode: 'lu', correctAnswer: 'Luxembourg', wrongAnswers: ['Netherlands', 'France', 'Belgium'] },
      { countryCode: 'va', correctAnswer: 'Vatican City', wrongAnswers: ['San Marino', 'Andorra', 'Monaco'] },
      { countryCode: 'gi', correctAnswer: 'Gibraltar', wrongAnswers: ['Malta', 'Monaco', 'Cyprus'] }
    ]
  },

  // Level 9: Islands & dependencies
  {
    id: 'flags-europe-9',
    n: 9,
    name: 'Level 9',
    theme: 'flags',
    region: 'europe',
    questions: [
      { countryCode: 'fo', correctAnswer: 'Faroe Islands', wrongAnswers: ['Iceland', 'Norway', 'Greenland'] },
      { countryCode: 'ax', correctAnswer: 'Åland Islands', wrongAnswers: ['Finland', 'Sweden', 'Faroe Islands'] },
      { countryCode: 'gg', correctAnswer: 'Guernsey', wrongAnswers: ['Jersey', 'England', 'Isle of Man'] },
      { countryCode: 'je', correctAnswer: 'Jersey', wrongAnswers: ['Guernsey', 'Isle of Man', 'England'] },
      { countryCode: 'im', correctAnswer: 'Isle of Man', wrongAnswers: ['Guernsey', 'Jersey', 'Wales'] }
    ]
  },

  // Level 10: UK regions & extras
  {
    id: 'flags-europe-10',
    n: 10,
    name: 'Level 10',
    theme: 'flags',
    region: 'europe',
    questions: [
      { countryCode: 'en', correctAnswer: 'England', wrongAnswers: ['Wales', 'Scotland', 'Northern Ireland'] },
      { countryCode: 'gb-sct', correctAnswer: 'Scotland', wrongAnswers: ['England', 'Ireland', 'Wales'] },
      { countryCode: 'gb-wls', correctAnswer: 'Wales', wrongAnswers: ['Scotland', 'Ireland', 'England'] },
      { countryCode: 'gb-nir', correctAnswer: 'Northern Ireland', wrongAnswers: ['Ireland', 'Wales', 'Scotland'] },
      { countryCode: 'xk', correctAnswer: 'Kosovo', wrongAnswers: ['Serbia', 'Albania', 'North Macedonia'] }
    ]
  }
];

// Helper function to get level by theme and level number
export const getLevelData = (theme: string, levelNumber: number): LevelData | undefined => {
  return levelData.find(level => level.theme === theme && level.name === `Level ${levelNumber}`);
};

// Helper function to get all levels for a theme
export const getLevelsForTheme = (theme: string): LevelData[] => {
  return levelData.filter(level => level.theme === theme);
};

export const getLevelsForThemeAndRegion = (theme: string, region: string): LevelData[] => {
  return levelData.filter(
    level => 
      level.theme.toLowerCase() === theme.toLowerCase() 
        && level.region.toLowerCase() === region.toLowerCase()
  );
};

export const getLevelDataForThemeAndRegion = (theme: string, region: string, levelNumber: number): LevelData | undefined => {
  return levelData.find(
    level => 
      level.theme.toLowerCase() === theme.toLowerCase() 
        && level.region.toLowerCase() === region.toLowerCase() 
        && level.n == levelNumber
  );
};