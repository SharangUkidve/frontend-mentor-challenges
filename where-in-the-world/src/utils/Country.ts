import { IBorderCountryDetails, ICountries, ICountry, ICountryDetails } from '../types';
import { coerceArray, joinArrayWithCommaSpace } from './Array';

export const getCountryId = (country: ICountry) =>
  country.id || country.cca2 || country.cca3 || country.ccn3 || country.cioc;

export const countryMatcher = (code: string, country: ICountry) =>
  country.id === code ||
  country.cca2 === code ||
  country.cca3 === code ||
  country.ccn3 === code ||
  country.cioc === code;

export const getCountryName = (country: ICountry) =>
  country.name.common ||
  country.name.official ||
  Object.values(country.name.nativeName)?.[0]?.common ||
  Object.values(country.name.nativeName)?.[0]?.official ||
  'Unknown Country';

export const getFilteredCountries = (countries: ICountries, region: string, query: string): ICountries =>
  countries
    .filter((c: ICountry) => (region === 'all' ? true : c.region === region))
    .filter((c: ICountry) => c.name?.common?.toLowerCase().includes(query.toLowerCase()));

export const getMappedCountryDetails = (country?: ICountry | null): ICountryDetails | null => {
  if (!country) {
    return null;
  }

  const { region, subregion, name: names, tld, languages: langs, capital, population: popn, flags } = country;

  const nativeNames = joinArrayWithCommaSpace(
    Array.from(new Set(Object.values(names.nativeName).map((val) => val.common))),
  );

  const population = popn.toLocaleString(
    navigator.languages?.length ? (navigator.languages as string[]) : navigator.language || undefined,
  );
  const name = getCountryName(country);
  const topLevelDomains = joinArrayWithCommaSpace(coerceArray(tld));
  const languages = langs ? joinArrayWithCommaSpace(coerceArray(Object.values(langs))) : '';
  const capitals = joinArrayWithCommaSpace(coerceArray(capital));
  const flagUrl = flags.svg || flags.png;
  const flagAlt = flags.alt ?? '';
  const currencies = country.currencies
    ? joinArrayWithCommaSpace(Object.values(country.currencies).map((curr) => curr.name))
    : '';

  const id = getCountryId(country);
  return {
    id,
    name,
    region,
    subregion,
    population,
    nativeNames,
    topLevelDomains,
    languages,
    capitals,
    currencies,
    flagUrl,
    flagAlt,
  };
};

export const getMappedCountries = (countries: ICountries): ICountryDetails[] => {
  return countries.map((country) => getMappedCountryDetails(country)).filter(Boolean) as ICountryDetails[];
};

export const getDetailsForBorderCountriesWithIds = (
  borders: string[],
  countries: ICountries,
): IBorderCountryDetails[] => {
  return borders
    .map((brd) => {
      const matchedCountry = countries.find((country) => countryMatcher(brd, country));
      if (matchedCountry) {
        return getMappedBorderCountryDetails(matchedCountry);
      }
      return null;
    })
    .filter(Boolean) as IBorderCountryDetails[];
};

export const getMappedBorderCountryDetails = (country: ICountry): IBorderCountryDetails => {
  return {
    id: getCountryId(country),
    name: getCountryName(country),
  };
};
