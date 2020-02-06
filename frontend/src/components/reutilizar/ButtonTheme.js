import React from 'react';
//Controlador del thema
import { ThemeController } from './../App';
import { connect } from 'react-redux';

//Icono
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { IconButton, Tooltip } from '@material-ui/core';
import setTheme from '../store/themeChange/action';
import {selectTheme} from '../store/themeChange/reducer';

function ButtonTheme({setTheme, test}) {
  console.log(test);
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

export const mapStateToProps = state => {
  return {
    test: selectTheme(state)
  }
}

export default connect(null, {setTheme})(ButtonTheme);