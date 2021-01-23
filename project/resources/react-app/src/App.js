import React from 'react';

// Componentes
import Header from './components/Header';
import Routers from './Routers';

// Material-UI
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// SnackBar
import { SnackbarProvider } from 'notistack';

// Redux
import { useSelector } from 'react-redux';

function App() {
	const { tema, access_key } = useSelector((state) => ({
		tema: state.settings.tema,
		access_key: state.userData.access_key
	}));
	
	// Global Const
	const axios = window.axios;
	
	//axios set TOKEN
	axios.defaults.headers.common['Authorization'] = `Bearer ${access_key}`
	
	const themeConfig = React.useMemo(()=> createMuiTheme({
		palette: {
			type: tema,
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
	}),[tema]);

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
				<Header />
				<span id="top-anchor" />
				<Routers />
			</ThemeProvider>
		</SnackbarProvider>
	);
}

export default App;