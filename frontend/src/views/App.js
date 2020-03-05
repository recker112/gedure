import React from 'react';

//Componentes
import Routers from './Routers';
import HeaderMenu from '../components/HeaderMenu';

//Material-UI
import { CssBaseline, IconButton } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

//SnackBar
import { SnackbarProvider } from 'notistack';

//Redux
import { connect } from 'react-redux';

//Funcion a exportar
function App({ tema }) {
	// obtener el valor del tema de la store

	//Creación de los estilos a aplicar en toda la WEB.
	//Todo esto es material-ui, revisar documentaciรณn para mรกs info.
	const themeConfig = createMuiTheme({
		palette: {
			type: tema,
			primary: {
				main: '#6B8DD6',
			},
			secondary: {
				main: '#B46BD6',
			},
			background: {
				default: tema === 'light' ? '#E9EBEE' : '#1d1d1d'
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
					'&&.drawerSelect': {
            background: 'none',
						'& .MuiListItemIcon-root,& .MuiListItemText-root': {
							color: '#6B8DD6',
						},
					}
				}	
			}
  	},
	});

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
						<CloseIcon style={{color: tema === "light" ? 'white' : 'black'}} />
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
		tema: state.settings.tema
	};
};

//Conectar con redux
export default connect(mapStateToProps)(App);