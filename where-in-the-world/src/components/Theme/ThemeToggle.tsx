import { useCallback } from 'react';
import { useTheme } from '../../hooks';

import tt from './theme-toggle.module.scss';

const ThemeToggle = () => {
  const { theme, updateTheme } = useTheme();

  const setTheme = useCallback(() => {
    updateTheme((theme: string) => (theme === 'dark' ? 'light' : 'dark'));
  }, [updateTheme]);

  return (
    <button type="button" className={tt.theme_toggle} onClick={setTheme} title="Toggle Theme">
      {theme === 'dark' ? (
        <>
          <span className={`${tt.icon} material-symbols-rounded`}>light_mode</span>
          Light Mode
        </>
      ) : (
        <>
          <span className={`${tt.icon} material-symbols-rounded`}>dark_mode</span>
          Dark Mode
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
