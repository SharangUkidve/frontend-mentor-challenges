import axios, { AxiosError, AxiosResponse } from 'axios';
import { stringify } from 'qs';
import { ICountries } from '../types';
import { coerceArray, countryMatcher, getMappedBorderCountryDetails } from '../utils';

const BASE_URL = 'https://restcountries.com/v3.1/';

const FALLBACK_URL = '/countries.json';

let hardCodedCountries: ICountries;

export const URLs = {
  ALL_COUNTRIES: `${BASE_URL}all`,
  SINGLE_COUNTRY: `${BASE_URL}alpha/`,
  COUNTRIES_BY_CODE: `${BASE_URL}alpha`,
};

const fieldsForCountriesList = [
  'name',
  'population',
  'region',
  'subregion',
  'capital',
  'flags',
  'cca2',
  'cca3',
  'ccn3',
  'cioc',
  'borders',
  'currencies',
  'languages',
  'tld',
];

const fieldsForBorderCountries = ['name', 'cca2', 'cca3', 'ccn3'];

const fieldsForCountry = [...fieldsForCountriesList];

axios.defaults.paramsSerializer = (params) => {
  return stringify(params, { arrayFormat: 'comma' });
};

export const getCountries = async () => {
  try {
    const response = await axios.get<ICountries>(URLs.ALL_COUNTRIES, {
      params: { fields: fieldsForCountriesList },
    });
    return parseCountriesResponse(response);
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 404) {
      return getHardCodedCountries();
    }
    return null;
  }
};

export const getCountry = async (code: string) => {
  try {
    const response = await axios.get<ICountries>(URLs.SINGLE_COUNTRY + code, { params: { fields: fieldsForCountry } });
    const countries = parseCountriesResponse(response);
    return countries[0];
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 404) {
      const countries = await getHardCodedCountries();
      return countries.find((country) => countryMatcher(code, country));
    }
    return null;
  }
};

export const getBorderCountriesByCode = async (codes: string[]) => {
  try {
    const response = await axios.get<ICountries>(URLs.COUNTRIES_BY_CODE, {
      params: {
        codes,
        fields: fieldsForBorderCountries,
      },
    });

    return parseCountriesResponse(response).map(getMappedBorderCountryDetails);
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 404) {
      const countries = await getHardCodedCountries();
      return (
        codes.map((code) => countries.find((country) => countryMatcher(code, country))).filter(Boolean) as ICountries
      ).map(getMappedBorderCountryDetails);
    }
    return [];
  }
};

const parseCountriesResponse = (response: AxiosResponse<ICountries>): ICountries => {
  const countries = coerceArray(response.data);
  return countries;
};

const getHardCodedCountries = async () => {
  if (hardCodedCountries?.length) {
    return hardCodedCountries;
  } else {
    return await loadHardCodedCountriesIfNeeded();
  }
};

const loadHardCodedCountriesIfNeeded = async () => {
  return parseCountriesResponse(await axios.get<ICountries>(FALLBACK_URL));
};
