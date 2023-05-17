import { parse, stringify } from 'qs';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getBorderCountriesByCode, getCountry } from '../../api';
import BackRow from '../../components/BackRow/BackRow';
import CountryDetailRow from '../../components/CountryDetailsRow/CountryDetailRow';
import ServerError from '../../components/ServerError';
import Spinner from '../../components/Spinner/Spinner';
import { useCountries } from '../../hooks';
import { IBorderCountryDetails, ICountryDetails } from '../../types';
import { coerceArray, getDetailsForBorderCountriesWithIds, getMappedCountryDetails } from '../../utils';

import cd from './country-details.module.scss';

const CountryDetails = () => {
  const [borders, setBorders] = useState<IBorderCountryDetails[]>([]);
  const params = useParams<{ code: string }>();
  const [urlSearch] = useSearchParams();
  const [country, setCountry] = useState<ICountryDetails | null>();
  const ctx = useCountries();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadCountry = useCallback(async () => {
    setLoading(true);
    const countryCode = params.code;
    if (!countryCode) {
      setError(true);
      return;
    }
    const c = await getCountry(countryCode);
    if (c?.borders?.length) {
      let countryBorders: IBorderCountryDetails[] = [];
      if (ctx.countries?.length) {
        countryBorders = getDetailsForBorderCountriesWithIds(c.borders, ctx.countries);
      } else {
        countryBorders = await getBorderCountriesByCode(c.borders);
      }
      setBorders(countryBorders);
      setError(false);
    }
    setCountry(getMappedCountryDetails(c));
    setLoading(false);
  }, [ctx.countries, params.code]);

  useEffect(() => {
    loadCountry();
  }, [loadCountry]);

  const getNextQuery = () => {
    urlSearch.get('b');
    urlSearch.toString();
    const params = parse(location.search, { parseArrays: true, ignoreQueryPrefix: true });
    return stringify({ ...params, b: [country?.id, ...(coerceArray(params.b) as string[])] }, { arrayFormat: 'comma' });
  };

  return loading && !error && !country ? (
    <Spinner />
  ) : error || !country ? (
    <ServerError />
  ) : (
    <main className={cd.country_container}>
      <BackRow />
      <div className={cd.country}>
        <img src={country.flagUrl} alt={country.flagAlt} loading="lazy" className={cd.country_img} />
        <div className={cd.country_info}>
          <h1 className={cd.country_name}>{country.name}</h1>
          <div className={cd.country_meta}>
            <div>
              <CountryDetailRow label="Native Name(s)" value={country.nativeNames} />
              <CountryDetailRow label="Population" value={country.population} />
              <CountryDetailRow label="Region" value={country.region} />
              <CountryDetailRow label="Sub Region" value={country.subregion} />
              <CountryDetailRow label="Capital(s)" value={country.capitals} />
            </div>
            <div>
              <CountryDetailRow label="Top Level Domain(s)" value={country.topLevelDomains} />
              <CountryDetailRow label="Currencies" value={country.currencies} />
              <CountryDetailRow label="Languages" value={country.languages} />
            </div>
          </div>
          {borders?.length ? (
            <CountryDetailRow
              label="Border Countries"
              className={cd.country_borders}
              labelClassName={cd.country_borders_label}
              valueClassName={cd.country_borders_value}
              value={borders?.map((b) => (
                <Link
                  to={{ pathname: `/country/${b.id}`, search: getNextQuery() }}
                  key={b.id}
                  className={'button ' + cd.border_button}
                >
                  {b?.name}
                </Link>
              ))}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default CountryDetails;
