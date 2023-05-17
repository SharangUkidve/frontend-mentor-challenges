import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ICountries, ICountriesAction, ICountriesActionType, ICountriesContext } from '../types';
import { coerceArray } from '../utils';

export const CountriesContext = createContext<ICountriesContext>({
  regions: [],
  query: '',
  countries: [],
  selectedRegion: 'all',
});

const NOOP_FUNCTION = () => {
  return;
};

export const CountriesDispatchContext = createContext<Dispatch<ICountriesAction>>(NOOP_FUNCTION);

const countriesReducer = (state: ICountriesContext, action: ICountriesAction): ICountriesContext => {
  const { type, payload } = action;
  switch (type) {
    case ICountriesActionType.SET_COUNTRIES: {
      return { ...state, countries: coerceArray(payload) as ICountries, loading: false };
    }
    case ICountriesActionType.SET_REGIONS: {
      return { ...state, regions: payload as string[] };
    }
    case ICountriesActionType.UPDATE_REGION: {
      return { ...state, selectedRegion: payload };
    }
    case ICountriesActionType.UPDATE_QUERY: {
      return { ...state, query: payload };
    }
    case ICountriesActionType.LOADING: {
      return { ...state, loading: !!payload };
    }
    case ICountriesActionType.UPDATE_COUNTRY: {
      const shallowCountries = [...coerceArray(state.countries)];
      const countryToUpdateIndex = shallowCountries.findIndex((c) => c.name.official === payload.name.official);
      const countryToUpdate = shallowCountries[countryToUpdateIndex];
      const updatedCountry = { ...countryToUpdate, ...payload.params };
      shallowCountries[countryToUpdateIndex] = updatedCountry;
      return {
        ...state,
        countries: shallowCountries,
      };
    }
    case ICountriesActionType.ERROR: {
      return { ...state, loading: false, error: true, errorMessage: payload };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export const CountriesProvider = ({ children }: PropsWithChildren) => {
  const [urlSearch] = useSearchParams();
  const [state, dispatch] = useReducer(countriesReducer, {
    countries: [],
    query: urlSearch.get('q') ?? '',
    regions: [],
    selectedRegion: urlSearch.get('region') ?? 'all',
  });

  return (
    <CountriesContext.Provider value={state}>
      <CountriesDispatchContext.Provider value={dispatch}>{children}</CountriesDispatchContext.Provider>
    </CountriesContext.Provider>
  );
};
