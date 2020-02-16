import React from 'react';
import Routers from './Routers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

//Funcion a exportar
function App({tema}) {
  // obtener el valor del tema de la store

  //Creaciรณn de los estilos a aplicar en toda la WEB.
  //Todo esto es material-ui, revisar documentaciรณn para mรกs info.
  const themeConfig = createMuiTheme({
    palette: {
      type: tema,
      primary: {
        main: "#6B8DD6"
      },
      secondary: {
        main: "#B46BD6"
      },
      background: {
        default: tema === "light" ? '#E9EBEE':'#191919'
      }
    },
  });
  
  return (
    /* Selecciona el tema en TODA la app, o en lo que encierra. xD  */
    <ThemeProvider theme={themeConfig}>
      {/* Sin el CssBaseLine el programa no aplica el tema correctamente
      debido a que necesita reinicar los css por defecto. */}
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

//Mapeo del store de redux
const mapStateToProps = state => {
  return {
    tema: state.settings.tema
  }
}

//Conectar con redux
export default connect(mapStateToProps)(App);