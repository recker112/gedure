import React from 'react';
//Controlador del thema
import { ThemeController } from './../App';

//Icono
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { IconButton } from '@material-ui/core';

export default function ButtonTheme() {
  return (
  /*ThemeController.Consumer permite renderizar un elemento
  usando las funciones y varialbes aplicadas en <ThemeController.Provider 
  value={{useDarkMode, theme}}>
  */
  <ThemeController.Consumer>
    {(themeData) => {
      return (
        <IconButton onClick={themeData.useDarkMode}><WbIncandescentIcon /></IconButton>
      );
    }}
  </ThemeController.Consumer>);
}
