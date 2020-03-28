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
function App({ tema, access_key }) {
    //axios set TOKEN
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${access_key}`;

	//Creación de los estilos a aplicar en toda la WEB.
	//Todo esto es material-ui, revisar documentaciรณn para mรกs info.
	const themeConfig = createMuiTheme({
		palette: {
			type: tema,
			primary: {
				main: '#6B8DD6',
			},
			secondary: {
				main: '#896DBE',
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
          //HOVER
          '&&.drawerItem': {
            opacity: 0.9,
            '&:hover': {
              borderLeft: "3px solid",
              opacity: 1,
            }
          },
          //SELECTED
					'&&.drawerItemSelected': {
            borderLeft: "3px solid #6B8DD6",
            opacity: 1,
						'& .MuiListItemIcon-root,& .MuiListItemText-root': {
              //Cambiar el color el texto y el icono
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
						<CloseIcon style={{color: tema === "light" ? 'white' : 'black'}}/>
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
