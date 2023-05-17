import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { IThemeContext } from '../types';

const initialState: IThemeContext = {
  theme: 'light',
  updateTheme(theme) {
    this.theme = typeof theme === 'string' ? theme : theme(this.theme);
  },
};

const THEME_KEY = 'theme';

const getSystemTheme = () => (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const getSavedOrSystemTheme = () => localStorage.getItem(THEME_KEY) || getSystemTheme();

export const ThemeContext = createContext<IThemeContext>(initialState);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, updateTheme] = useState<string>(getSavedOrSystemTheme());

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, updateTheme }}>{children}</ThemeContext.Provider>;
};
