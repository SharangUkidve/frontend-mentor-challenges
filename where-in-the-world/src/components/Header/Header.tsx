import { Link } from 'react-router-dom';
import ThemeToggle from '../Theme/ThemeToggle';

import h from './header.module.scss';

const Header = () => (
  <header className={h.header_container}>
    <div className={h.header}>
      <h1 className={h.logo_title}>
        <Link to="/" className={h.logo_link}>
          Where in the world?
        </Link>
      </h1>
      <ThemeToggle />
    </div>
  </header>
);

export default Header;
