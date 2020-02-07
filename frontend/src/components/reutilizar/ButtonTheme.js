import React from 'react';

//Redux
import { ThemeController } from './../App';
import { connect } from 'react-redux';
import setTheme from '../store/action/updateTheme';
import {selectTheme} from '../store/reducer/updateTheme';

//Icono
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { IconButton, Tooltip } from '@material-ui/core';

function ButtonTheme({setTheme, test}) {
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

const mapStateToProps = state => {
  return {
    tema: state.tema
  }
}

export default connect(mapStateToProps, {setTheme});