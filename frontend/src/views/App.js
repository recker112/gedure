import React from "react";

//Componentes
import Routers from "./Routers";

//Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

//SnackBar
import { SnackbarProvider } from "notistack";

//Redux
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

//Funcion a exportar
function App({ tema }) {
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
        default: tema === "light" ? "#E9EBEE" : "#191919"
      }
    }
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
        action={key => <Button onClick={onClickDismiss(key)}>Cerrar</Button>}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        ref={alertRef}
      >
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
