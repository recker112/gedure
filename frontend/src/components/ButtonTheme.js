import React from 'react';

//Redux
import { connect } from 'react-redux';
import updateTheme from '../actions/settings/updateTheme';

//Icono
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { IconButton, Tooltip } from '@material-ui/core';


//Se agrega el state y actions del redux como un prop dentro del
//componente
function ButtonTheme({tema, updateTheme}) {

  //Aplicar cambios de estilos.
  const useDarkMode = () => {
    //Verificar el estado del State y cambiarlo.
    let changeThemeTo = tema === 'light' ? 'dark' : 'light';

    //Cambiar el estado en el componente
    updateTheme()

    //Aplicar los cambios del State en el almacenamiento local 
    //para que al recargar la página los cambios hechos se 
    //mantengan.
    localStorage.setItem("theme", changeThemeTo);
  }

  const mode = tema === 'dark' ? 'Claro' : 'Nocturno';
  return (
  <Tooltip title={`Modo ${mode}`} arrow enterDelay={1000}>
    <IconButton onClick={useDarkMode}>
      <WbIncandescentIcon />
    </IconButton>
  </Tooltip>);
}

//Mapeo del store de redux
const mapStateToProps = state => {
  return {
    tema: state.settings.tema
  }
}

//Obtener acciones
const mapDispatchToProps = {
  updateTheme,
}


export default connect(mapStateToProps, mapDispatchToProps)(ButtonTheme);