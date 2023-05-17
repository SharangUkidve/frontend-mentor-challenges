import { Dispatch, SetStateAction } from 'react';

export interface IThemeContext {
  theme: string;
  updateTheme: Dispatch<SetStateAction<string>>;
}
