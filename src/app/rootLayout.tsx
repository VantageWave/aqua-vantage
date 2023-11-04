'use client';
import React, { useMemo } from 'react';
import { SessionProvider } from 'next-auth/react';
import {NextUIProvider} from "@nextui-org/react";
import NextTopLoader from 'nextjs-toploader';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Poppins } from 'next/font/google';
import { useThemeMode, ThemeModeContext } from '@/providers/useThemeMode';
import './globals.css';

const poppins = Poppins({ weight: ['400', '500', '600'], subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useThemeMode();

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        window?.localStorage?.setItem(
          'theme',
          mode === 'light' ? 'dark' : 'light'
        );
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: [poppins.style.fontFamily, 'Roboto', 'sans-serif'].join(
            ','
          ),
        },
      }),
    [mode]
  );

  return (
    <html lang="en" title='Water Watch'>
      <body>
        <SessionProvider>
        <NextUIProvider>
          <NextTopLoader showSpinner={false} />
          <ThemeModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </ThemeModeContext.Provider>
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
