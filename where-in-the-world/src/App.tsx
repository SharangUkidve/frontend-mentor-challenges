import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CountriesProvider } from './context';
import { useTheme } from './hooks';
import Countries from './views/Countries/Countries';
import CountryDetails from './views/CountryDetails/CountryDetails';

const App = () => {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
    <CountriesProvider>
      <Routes>
        <Route path="/country/:code" element={<CountryDetails />} />
        <Route path="/" element={<Countries />} />
      </Routes>
      <footer className="footer">
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
      </footer>
    </CountriesProvider>
  );
};

export default App;
