import React, { useMemo } from 'react';

// Components
import Routers from './Routers';

// MUI
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// SnackBar
import { SnackbarProvider } from 'notistack';

// Redux
import { useSelector } from 'react-redux';

export default function App() {
  const tema = useSelector(state => state.configs.tema);


  const themeConfig = useMemo(() => createTheme({
		palette: {
			mode: tema,
			primary: {
				main: '#1976d2',
			},
			secondary: {
				main: '#173753',
			},
			background: {
				default: tema === 'light' ? '#efefef' : '#1c2025',
				paper: tema === 'light' ? '#fff' : '#282C34'
			}
		},
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          }
        }
      }
    }
	}), [tema]);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
    >
      <ThemeProvider theme={themeConfig}>
        <CssBaseline />
        <span id="top-anchor" />
        <Routers />
      </ThemeProvider>
    </SnackbarProvider>
  );
}
