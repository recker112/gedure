import React from 'react';

//Componentes
import Routers from './Routers';
import HeaderMenu from '../components/HeaderMenu';

//Material-UI
import { CssBaseline, IconButton, useMediaQuery } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

//SnackBar
import { SnackbarProvider } from 'notistack';

//Redux
import { connect } from 'react-redux';

//Funcion a exportar
function App({ tema, access_key }) {
	//axios set TOKEN
	window.axios.defaults.headers.common['Authorization'] = `Bearer ${access_key}`;

	//Creación de los estilos a aplicar en toda la WEB.
	//Todo esto es material-ui, revisar documentaciรณn para más info.
	const themeConfig = React.useMemo(()=> createMuiTheme({
		palette: {
			type: tema,
			primary: {
				main: '#6B8DD6',
			},
			secondary: {
				main: '#896DBE'
			},
			background: {
				default: tema === 'light' ? '#f4f6f8' : '#1c2025',
				paper: tema === 'light' ? '#fff' : '#282C34'
			}
		},
		overrides: {
			MuiListItem: {
				root: {
					/*
					&$: Pone estilos a Mui-Selected, clase interna
					del Material-UI.

					& "clase" : Pone estilos a las clases nombradas
					despues del "&".

          && "clase": Clase custom.
          */
					//HOVER
					'&&.drawerItem': {
						opacity: 0.9,
						borderRadius: '5px',
						'&:hover': {
							opacity: 1,
							backgroundColor: '#6B8DD640',
							'& .MuiListItemIcon-root,& .MuiListItemText-root': {
								color: '#6B8DD6',
							}
						}
					},
					//SELECTED
					'&&.drawerItemSelected': {
						color: '#6B8DD6',
						opacity: 1,
						borderRadius: '5px',
						backgroundColor: '#6B8DD640',
						'& .MuiListItemIcon-root,& .MuiListItemText-root': {
							color: '#6B8DD6',
						}
					}
				}
			}
		}
	}),[tema]);

	//Añadir action a todos los snackbar
	const alertRef = React.createRef();
	const onClickDismiss = key => () => {
		alertRef.current.closeSnackbar(key);
	};

	return (
		/* Selecciona el tema en TODA la app, o en lo que encierra. xD  */
		<ThemeProvider theme={themeConfig}>
			{/* Sin el CssBaseLine el programa no aplica el tema correctamente
      debido a que necesita reinicar los css por defecto. */}
			<CssBaseline />
			{/* Stack Snackbar en toda la APP */}
			<SnackbarProvider
				maxSnack={3}
				preventDuplicate
				//Botones con acciones.
				action={key => (
					<IconButton size="small" onClick={onClickDismiss(key)}>
						<CloseIcon style={{ color: 'white' }} />
					</IconButton>
				)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				ref={alertRef}
			>
				<HeaderMenu />
				<Routers />
			</SnackbarProvider>
		</ThemeProvider>
	);
}

//Mapeo del store de redux
const mapStateToProps = state => {
	return {
		tema: state.settings.tema,
		access_key: state.userData.access_key
	};
};

//Conectar con redux
export default connect(mapStateToProps)(App);