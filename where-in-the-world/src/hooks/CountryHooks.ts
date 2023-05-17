import { useContext } from 'react';
import { CountriesContext, CountriesDispatchContext } from '../context';

export const useCountries = () => {
  return useContext(CountriesContext);
};

export const useCountriesDispatch = () => {
  return useContext(CountriesDispatchContext);
};
