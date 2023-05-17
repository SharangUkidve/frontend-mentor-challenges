interface ICountryOfficialCommon {
  official?: string;
  common?: string;
}

interface ICountryImageTypes {
  svg?: string;
  png?: string;
}

interface ICountryName extends ICountryOfficialCommon {
  nativeName: Record<string, ICountryOfficialCommon>;
}

interface ICountryFlags extends ICountryImageTypes {
  alt?: string;
}

interface ICountryCurrency {
  name: string;
  symbol: string;
}

type ICountryCurrencies = Record<string, ICountryCurrency>;

export interface ICountry {
  id: string;
  name: ICountryName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  currencies: ICountryCurrencies;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Record<string, string>;
  borders: string[];
  actualBorders?: ICountries | null;
  population: number;
  flags: ICountryFlags;
}

export type ICountries = ICountry[];

export interface ICountryDetails {
  id: string;
  name: string;
  region: string;
  subregion: string;
  population: string;
  nativeNames: string;
  topLevelDomains: string;
  languages: string;
  capitals: string;
  currencies: string;
  flagUrl?: string;
  flagAlt?: string;
  borders?: ICountries | null;
}

export interface IBorderCountryDetails {
  id: string;
  name: string;
}
