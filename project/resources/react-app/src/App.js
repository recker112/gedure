import React from 'react';

// Componentes
import Header from './components/Header';
import Routers from './views/Routers';

// Material-UI
import { CssBaseline, IconButton } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

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

	//Añadir action a todos los snackbar
	const alertRef = React.createRef();
	const onClickDismiss = key => () => {
		alertRef.current.closeSnackbar(key);
	};

	return (
		<ThemeProvider theme={themeConfig}>
			<CssBaseline />
			<SnackbarProvider
				maxSnack={3}
				//Botones con acciones.
				action={key => (
					<IconButton size="small" onClick={onClickDismiss(key)}>
						<CloseIcon style={{ color: 'white' }} />
					</IconButton>
				)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				ref={alertRef}
			>
				<Header />
				<span id="top-anchor" />
				<Routers />
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;