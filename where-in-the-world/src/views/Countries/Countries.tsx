import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCountries } from '../../api';
import CountriesFilters from '../../components/CountriesFilters/CountriesFilters';
import CountryCard from '../../components/CountryCard/CountryCard';
import ServerError from '../../components/ServerError';
import Spinner from '../../components/Spinner/Spinner';
import { useCountries, useCountriesDispatch } from '../../hooks';
import { ICountries, ICountriesActionType, ICountry, ICountryDetails } from '../../types';
import { getCountriesQueryParams, getFilteredCountries, getMappedCountries } from '../../utils';

import c from './countries.module.scss';

const Countries = () => {
  const countriesCtx = useCountries();
  const countriesDispatch = useCountriesDispatch();
  const navigate = useNavigate();
  const [urlSearch] = useSearchParams();

  const updateQuery = useCallback(
    (query: string) => {
      countriesDispatch({ type: ICountriesActionType.UPDATE_QUERY, payload: query });
    },
    [countriesDispatch],
  );

  const updateRegion = useCallback(
    (region: string) => {
      countriesDispatch({ type: ICountriesActionType.UPDATE_REGION, payload: region });
    },
    [countriesDispatch],
  );

  const fetchCountries = useCallback(async () => {
    countriesDispatch({ type: ICountriesActionType.LOADING, payload: true });
    try {
      const countriesList = await getCountries();
      const allRegionSet = new Set(countriesList?.map((c) => c.region).filter(Boolean));
      const allRegions = Array.from(allRegionSet);
      countriesDispatch({ type: ICountriesActionType.SET_COUNTRIES, payload: countriesList });
      countriesDispatch({ type: ICountriesActionType.SET_REGIONS, payload: allRegions });
    } catch (err) {
      console.error('Failed to fetch countries from the API', err);
      countriesDispatch({ type: ICountriesActionType.ERROR, payload: 'Failed to load countries from the API' });
    } finally {
      countriesDispatch({ type: ICountriesActionType.LOADING, payload: false });
    }
  }, [countriesDispatch]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    navigate(
      { search: getCountriesQueryParams(urlSearch, countriesCtx.selectedRegion, countriesCtx.query) },
      { replace: true },
    );
  }, [countriesCtx.query, countriesCtx.selectedRegion, navigate, urlSearch]);

  const filteredCountries = useMemo(() => {
    const { countries, query, selectedRegion: region } = countriesCtx;
    let countriesToReturn: ICountries;
    if (!countriesCtx.countries) return [];
    if (!query.length) {
      countriesToReturn = countriesCtx.countries.filter((c: ICountry) =>
        region === 'all' ? true : c.region === region,
      );
    } else {
      countriesToReturn = getFilteredCountries(countries, region, query);
    }
    return getMappedCountries(countriesToReturn);
  }, [countriesCtx]);

  return (
    <>
      <main className={c.countries_container}>
        {countriesCtx.loading ? (
          <Spinner />
        ) : countriesCtx.error ? (
          <ServerError />
        ) : (
          <>
            <CountriesFilters
              query={countriesCtx.query}
              selectedRegion={countriesCtx.selectedRegion}
              regions={countriesCtx.regions}
              updateQuery={updateQuery}
              updateRegionFilter={updateRegion}
            />
            <div className={c.countries}>
              {filteredCountries.map((country: ICountryDetails) => (
                <CountryCard country={country} key={country.name} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};
export default Countries;
