import React from 'react';
//Controlador del thema
import { ThemeController } from './../App';

//Icono
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { IconButton, Tooltip } from '@material-ui/core';

export default function ButtonTheme() {
  return (
  /*ThemeController.Consumer permite renderizar un elemento
  usando las funciones y varialbes aplicadas en <ThemeController.Provider 
  value={{useDarkMode, theme}}>
  */
  <ThemeController.Consumer>
    {(themeData) => {
      const mode = themeData.theme === 'dark' ? 'Claro' : 'Nocturno';
      return (
        <Tooltip title={`Modo ${mode}`} arrow>
          <IconButton onClick={themeData.useDarkMode}>
            <WbIncandescentIcon />
          </IconButton>
        </Tooltip>
      );
    }}
  </ThemeController.Consumer>);
}
