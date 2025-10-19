import { Country, CountryNames, RegionData } from '../types';

// Load countries data from JSON files
export const loadCountriesData = async (): Promise<Country[]> => {
  try {
    const [countriesEnResponse, countriesRuResponse, regionsResponse] = await Promise.all([
      fetch(`${import.meta.env.BASE_URL}countries_en.json`),
      fetch(`${import.meta.env.BASE_URL}countries_ru.json`),
      fetch(`${import.meta.env.BASE_URL}regions.json`)
    ]);

    const countryEnNames: CountryNames = await countriesEnResponse.json();
    const countryRuNames: CountryNames = await countriesRuResponse.json();
    const regionsData: RegionData[] = await regionsResponse.json();

    const countries: Country[] = [];

    regionsData.forEach(regionItem => {
      const countryCode = regionItem.alpha2.toLowerCase();
      const countryEnName = countryEnNames[regionItem.alpha2];
      const countryRuName = countryRuNames[regionItem.alpha2];

      if (countryEnName) {
        countries.push({
          code: countryCode,
          nameEn: countryEnName,
          nameRu: countryRuName,
          region: regionItem.region,
          subRegion: regionItem.subRegion,
          flagPath: `${import.meta.env.BASE_URL}flags1000px/${countryCode}.png`
        });
      }
    });

    return countries;
  } catch (error) {
    console.error('Error loading countries data:', error);
    return [];
  }
};

// Helper functions to filter countries by region
export const getCountriesByRegion = (countries: Country[], region: string): Country[] => {
  return countries.filter(country => country.region.toLowerCase() === region.toLowerCase());
};

export const getCountriesBySubRegion = (countries: Country[], subRegion: string): Country[] => {
  return countries.filter(country => country.subRegion.toLowerCase() === subRegion.toLowerCase());
};