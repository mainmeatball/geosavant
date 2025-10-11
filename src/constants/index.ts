import { Country, Theme } from '../types';
import { loadCountriesData } from '../utils/countriesLoader';

// This will be loaded asynchronously
export let countries: Country[] = [];

// Initialize countries data
export const initializeCountries = async (language: 'en' | 'ru' = 'en') => {
  try {
    countries = await loadCountriesData(language);
    console.log(`Loaded ${countries.length} countries`);
  } catch (error) {
    console.error('Failed to initialize countries:', error);
    // Fallback to empty array or basic countries
    countries = [];
  }
};

// Getter function to ensure countries are loaded
export const getCountries = (): Country[] => {
  return countries;
};

// Helper to get country by code
export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find(country => country.code === code);
};

export const themes: Theme[] = [
  { code: 'flags', name: 'Flags', icon: '🇷🇺' },
  // { name: 'Countries on Map', icon: '🌍' },
  // { name: 'Capitals', icon: '🏛️' },
];

export const FEEDBACK_DELAY = 500;