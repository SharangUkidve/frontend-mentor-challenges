import cf from './countries-filters.module.scss';

interface CountriesFiltersProps {
  query: string;
  selectedRegion: string;
  regions: string[];
  updateRegionFilter: (region: string) => void;
  updateQuery: (query: string) => void;
}

const CountriesFilters = ({
  updateQuery,
  query,
  selectedRegion,
  updateRegionFilter,
  regions,
}: CountriesFiltersProps) => (
  <div className={cf.countries_filters}>
    <div className={`${cf.countries_filter} ${cf.countries_search_box}`}>
      <label htmlFor="countryText" className={`${cf.countries_search_label} ${cf.countries_filter_input_icon}`}>
        <span className="a11y">Search</span>
        <span className="material-symbols-rounded">search</span>
      </label>
      <input
        type="search"
        name="countryText"
        id="countryText"
        className={`${cf.countries_filter_input} ${cf.countries_search_input}`}
        placeholder="Search for a country..."
        onChange={(e) => updateQuery(e.target.value)}
        value={query}
      />
    </div>
    <div className={`${cf.countries_filter} ${cf.countries_region_filter}`}>
      <select
        name="regionFilter"
        id="regionFilter"
        onChange={(e) => updateRegionFilter(e.target.value)}
        className={`${cf.countries_filter_input} ${cf.countries_region_select}`}
        value={selectedRegion}
      >
        <option value="all">{selectedRegion === 'all' ? 'Filter by Region' : 'Reset'}</option>
        {regions.map((reg: string) => (
          <option value={reg} key={reg}>
            {reg || 'Unknown'}
          </option>
        ))}
      </select>
      <label htmlFor="regionFilter" className={`${cf.countries_region_filter_label} ${cf.countries_filter_input_icon}`}>
        <span className="a11y">Filter by region</span>
        <span className="material-symbols-rounded">keyboard_arrow_down</span>
      </label>
    </div>
  </div>
);
export default CountriesFilters;
