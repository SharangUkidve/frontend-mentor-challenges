import { ICountries } from './Country';

export interface ICountriesContext {
  countries: ICountries;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  query: string;
  regions: string[];
  selectedRegion: string;
}

export enum ICountriesActionType {
  SET_COUNTRIES = 'setCountries',
  UPDATE_COUNTRY = 'updateCountry',
  SET_REGIONS = 'setRegions',
  UPDATE_REGION = 'updateSelectedRegion',
  UPDATE_QUERY = 'updateQuery',
  LOADING = 'loading',
  ERROR = 'error',
}

export interface ICountriesAction {
  type: ICountriesActionType;
  payload?: any;
}
