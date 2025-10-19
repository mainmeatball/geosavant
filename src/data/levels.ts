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
      { countryCode: 'ru', wrongAnswers: ['rs', 'sk', 'si'] },
      { countryCode: 'de', wrongAnswers: ['be', 'at', 'lt'] },
      { countryCode: 'gb', wrongAnswers: ['ie', 'no', 'is'] },
      { countryCode: 'es', wrongAnswers: ['pt', 'ro', 'md'] },
      { countryCode: 'fr', wrongAnswers: ['lu', 'nl', 'it'] }
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
      { countryCode: 'it', wrongAnswers: ['ie', 'hu', 'bg'] },
      { countryCode: 'pt', wrongAnswers: ['es', 'ro', 'md'] },
      { countryCode: 'nl', wrongAnswers: ['lu', 'hr', 'rs'] },
      { countryCode: 'pl', wrongAnswers: ['mc', 'id', 'at'] },
      { countryCode: 'se', wrongAnswers: ['fi', 'is', 'no'] }
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
      { countryCode: 'no', wrongAnswers: ['dk', 'is', 'fi'] },
      { countryCode: 'fi', wrongAnswers: ['se', 'no', 'is'] },
      { countryCode: 'dk', wrongAnswers: ['no', 'se', 'fi'] },
      { countryCode: 'ee', wrongAnswers: ['lv', 'lt', 'fi'] },
      { countryCode: 'lv', wrongAnswers: ['ee', 'lt', 'pl'] }
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
      { countryCode: 'ua', wrongAnswers: ['se', 'ro', 'md'] },
      { countryCode: 'by', wrongAnswers: ['ru', 'lv', 'ua'] },
      { countryCode: 'ro', wrongAnswers: ['td', 'md', 'ad'] },
      { countryCode: 'bg', wrongAnswers: ['hu', 'si', 'it'] },
      { countryCode: 'md', wrongAnswers: ['ro', 'ad', 'sm'] }
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
      { countryCode: 'at', wrongAnswers: ['lv', 'pl', 'dk'] },
      { countryCode: 'cz', wrongAnswers: ['sk', 'pl', 'si'] },
      { countryCode: 'sk', wrongAnswers: ['cz', 'si', 'rs'] },
      { countryCode: 'hu', wrongAnswers: ['bg', 'it', 'ir'] },
      { countryCode: 'ch', wrongAnswers: ['dk', 'no', 'mt'] }
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
      { countryCode: 'rs', wrongAnswers: ['sk', 'hr', 'ru'] },
      { countryCode: 'ba', wrongAnswers: ['xk', 'hr', 'mk'] },
      { countryCode: 'hr', wrongAnswers: ['rs', 'sk', 'si'] },
      { countryCode: 'me', wrongAnswers: ['al', 'rs', 'mk'] },
      { countryCode: 'mk', wrongAnswers: ['xk', 'al', 'me'] }
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
      { countryCode: 'gr', wrongAnswers: ['fi', 'il', 'cy'] },
      { countryCode: 'cy', wrongAnswers: ['gr', 'mt', 'sm'] },
      { countryCode: 'mt', wrongAnswers: ['mc', 'ch', 'li'] },
      { countryCode: 'sm', wrongAnswers: ['va', 'ad', 'mc'] },
      { countryCode: 'mc', wrongAnswers: ['pl', 'id', 'mt'] }
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
      { countryCode: 'ad', wrongAnswers: ['md', 'ro', 'td'] },
      { countryCode: 'li', wrongAnswers: ['lu', 'mc', 'sm'] },
      { countryCode: 'lu', wrongAnswers: ['nl', 'fr', 'be'] },
      { countryCode: 'va', wrongAnswers: ['sm', 'ad', 'mc'] },
      { countryCode: 'gi', wrongAnswers: ['mt', 'mc', 'cy'] }
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
      { countryCode: 'fo', wrongAnswers: ['is', 'no', 'gl'] },
      { countryCode: 'ax', wrongAnswers: ['fi', 'se', 'fo'] },
      { countryCode: 'gg', wrongAnswers: ['je', 'en', 'im'] },
      { countryCode: 'je', wrongAnswers: ['gg', 'im', 'en'] },
      { countryCode: 'im', wrongAnswers: ['gg', 'je', 'gb-wls'] }
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
      { countryCode: 'en', wrongAnswers: ['gb-wls', 'gb-sct', 'gb-nir'] },
      { countryCode: 'gb-sct', wrongAnswers: ['en', 'ie', 'gb-wls'] },
      { countryCode: 'gb-wls', wrongAnswers: ['gb-sct', 'ie', 'en'] },
      { countryCode: 'gb-nir', wrongAnswers: ['ie', 'gb-wls', 'gb-sct'] },
      { countryCode: 'xk', wrongAnswers: ['rs', 'al', 'mk'] }
    ]
  }
];

export const getLevelsForThemeAndRegion = (theme: string, region: string): LevelData[] => {
  return levelData.filter(
    level => 
      level.theme.toLowerCase() === theme.toLowerCase() 
        && level.region.toLowerCase() === region.toLowerCase()
  );
};

export const getLevelDataForThemeAndRegion = (theme: string, region: string, levelName: string): LevelData | undefined => {
  if (levelName == "random") {
    return {
      id: 'flags-europe-random',
      n: 11,
      name: 'Level Random',
      theme: 'flags',
      region: 'europe',
      questions: [
        { type: 'specific-flag-random-answers' }
      ]
    }
  }
  return levelData.find(
    level => 
      level.theme.toLowerCase() === theme.toLowerCase() 
        && level.region.toLowerCase() === region.toLowerCase() 
        && level.n.toString() === levelName
  );
};