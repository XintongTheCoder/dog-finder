'use client';

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#BE8460',
      main: '#AE6E47',
      dark: '#825335',
      contrastText: '#fff',
    },
    secondary: {
      light: '#DFC2B9',
      main: '#BF8573',
      dark: '#A8624D',
      contrastText: '#fff',
    },
  },
});

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
