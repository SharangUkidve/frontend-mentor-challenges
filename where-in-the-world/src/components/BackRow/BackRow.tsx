import { Link, useSearchParams } from 'react-router-dom';
import { getBackRoute } from '../../utils';

import br from './back-row.module.scss';

const BackRow = () => {
  const [urlSearch] = useSearchParams();

  return (
    <div className={br.back_bar}>
      <Link to={getBackRoute(urlSearch)} className={`button ${br.back_btn}`}>
        <span className={`material-symbols-rounded ${br.back_icon}`}>west</span>
        Back
      </Link>
    </div>
  );
};
export default BackRow;
