import { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '@/app/utils/types';

interface ThemeModeContext {
  mode: Theme;
  toggleColorMode: () => void;
}

const defaultTheme = 'dark';

export const ThemeModeContext = createContext<ThemeModeContext>({
  mode: defaultTheme,
  toggleColorMode: () => {},
});

export const useThemeMode = () => {
  const [mode, setMode] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (window?.localStorage?.getItem('theme') === null) {
      window?.localStorage?.setItem('theme', defaultTheme);
    }

    setMode(localStorage.getItem('theme') as Theme);
  }, []);

  return [mode, setMode] as [
    Theme,
    (theme: Theme | ((prevState: Theme) => void)) => void
  ];
};

export const useThemeModeContext = () => useContext(ThemeModeContext);
