import { Country, CountryNames, RegionData } from '../types';

// Load countries data from JSON files
export const loadCountriesData = async (language: 'en' | 'ru' = 'en'): Promise<Country[]> => {
  try {
    const [countriesResponse, regionsResponse] = await Promise.all([
      fetch(`/countries_${language}.json`),
      fetch('/regions.json')
    ]);

    const countryNames: CountryNames = await countriesResponse.json();
    const regionsData: RegionData[] = await regionsResponse.json();
    
    const countries: Country[] = [];
    
    regionsData.forEach(regionItem => {
      const countryCode = regionItem.alpha2.toLowerCase();
      const countryName = countryNames[regionItem.alpha2];
      
      if (countryName) {
        countries.push({
          code: countryCode,
          name: countryName,
          region: regionItem.region,
          subRegion: regionItem.subRegion,
          flagPath: `/flags1000px/${countryCode}.png`
        });
      }
    });
    
    return countries;
  } catch (error) {
    console.error('Error loading countries data:', error);
    return [];
  }
};

export const getFlagUrl = (countryCode: string): string => {
  return `/flags1000px/${countryCode.toLowerCase()}.png`;
};

export const checkFlagExists = async (countryCode: string): Promise<boolean> => {
  try {
    const response = await fetch(getFlagUrl(countryCode), { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Helper functions to filter countries by region
export const getCountriesByRegion = (countries: Country[], region: string): Country[] => {
  return countries.filter(country => country.region === region);
};

export const getCountriesBySubRegion = (countries: Country[], subRegion: string): Country[] => {
  return countries.filter(country => country.subRegion === subRegion);
};