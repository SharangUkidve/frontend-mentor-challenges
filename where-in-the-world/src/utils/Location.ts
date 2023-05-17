import { joinArrayWithComma } from './Array';

const BACK_QUERY_PARAM = 'b';

export const getBackRoute = (params: URLSearchParams) => {
  const newParams = new URLSearchParams(params);

  const rootRoute = { pathname: '/', params: newParams };

  const back = params.get(BACK_QUERY_PARAM);

  if (!back) {
    return rootRoute;
  }
  const backArray = back.split(',').filter(Boolean);

  if (!backArray.length) {
    return rootRoute;
  }

  const param = backArray.shift() || '';
  if (!backArray.length) {
    return rootRoute;
  }
  newParams.set(BACK_QUERY_PARAM, joinArrayWithComma(backArray));
  return { pathname: `/country/${param}`, search: newParams.toString() };
};

export const getNextCountryRoute = (params: URLSearchParams, currentId: string, nextId: string) => {
  const newParams = new URLSearchParams(params);
  const back = params.get(BACK_QUERY_PARAM);
  const backArray = back?.split(',').filter(Boolean) ?? [];

  backArray.unshift(currentId);

  newParams.set(BACK_QUERY_PARAM, joinArrayWithComma(backArray));

  return { pathname: `/country/${nextId}`, search: newParams.toString() };
};

export const getCountriesQueryParams = (params: URLSearchParams, region: string, query: string) => {
  const newParams = new URLSearchParams(params);
  if (region === 'all') {
    newParams.delete('region');
  } else {
    newParams.set('region', !region ? 'unknown' : region);
  }
  if (!query.trim().length) {
    newParams.delete('q');
  } else {
    newParams.set('q', query.trim());
  }
  return newParams.toString();
};
