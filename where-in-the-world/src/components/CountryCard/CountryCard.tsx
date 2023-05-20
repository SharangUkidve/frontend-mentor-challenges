import { NavLink, useSearchParams } from 'react-router-dom';
import { ICountryDetails } from '../../types';
import CountryDetailRow from '../CountryDetailsRow/CountryDetailRow';

import cc from './country-card.module.scss';

const CountryCard = ({ country }: { country: ICountryDetails }) => {
  const [urlSearch] = useSearchParams();

  return (
    <NavLink
      className={cc.card}
      to={{
        pathname: `country/${country.id}`,
        search: urlSearch.toString(),
      }}
      title={country.name}
    >
      <div className={cc.card_img_container}>
        <img src={country.flagUrl} alt={country.flagAlt} className={cc.card_img} />
      </div>
      <div className={cc.card_title}>{country.name}</div>
      <div className={cc.card_body}>
        <CountryDetailRow className={cc.card_meta_info} label="Population" value={country.population} />
        <CountryDetailRow className={cc.card_meta_info} label="Region" value={country.region} />
        <CountryDetailRow className={cc.card_meta_info} label="Capital" value={country.capitals} />
      </div>
    </NavLink>
  );
};
export default CountryCard;
