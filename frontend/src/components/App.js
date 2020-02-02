import React, { useState } from 'react';
import Routers from './Routers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//Crear un contexto global
//Para poder usar funciones y ver variables en otros componentes
//Sin necesidad de pasarlas por todos los componentes.
export const ThemeController = React.createContext();

//Verificar si ya existe el almacenamiento local de la variable
//theme para evitar reescribirla
if (!localStorage.getItem("theme")){
  localStorage.setItem("theme", "light");
}

//Funcion a exportar
export default function App() {
  //State del tema con el que iniciará la app. Se selecciona com
  //dato inicial el valor de la variable almacenada en los datos
  //locales, para así poder mantener el tema aunque el usuario
  //cierre la app.
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  //Creación de los estilos a aplicar en toda la WEB.
  //Todo esto es material-ui, revisar documentación para más info.
  const themeConfig = createMuiTheme({
    palette: {
      type: theme,
      primary: {
        main: "#6B8DD6"
      },
      secondary: {
        main: "#B46BD6"
      },
      background: {
        default: theme === "light"?'#F5F5F5':'#191919'
      }
    },
  });

  //Aplicar cambios de estilos.
  const useDarkMode = () => {
    //Verificar el estado del State y cambiarlo.
    let changeThemeTo = theme === 'light' ? 'dark' : 'light';

    //Cambiar el estado en el componente
    setTheme(changeThemeTo);

    //Aplicar los cambios del State en el almacenamiento local para que
    //al recargar la página los cambios hechos se mantengan.
    localStorage.setItem("theme", changeThemeTo);
  }

  return (
    /* Selecciona el tema en TODA la app, o en lo que encierra. xD  */
    <ThemeProvider theme={themeConfig}>
      {/* Controlador del tema actual. Selecciona el tema y coloca
      los colores esos. :u */}
      <ThemeController.Provider value={{useDarkMode, theme}}>
        {/* Sin el CssBaseLine el programa no aplica el tema correctamente
        debido a que necesita reinicar los css por defecto. */}
        <CssBaseline />
        <Routers useDarkMode={useDarkMode} />
      </ThemeController.Provider>
    </ThemeProvider>
  );
}
