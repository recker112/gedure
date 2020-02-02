import React from 'react';
import { IconButton, MenuItem, Menu, Avatar, Tooltip } from '@material-ui/core';

//Boton con MENU INTERNO BOYYYYYYYYYYS

export function ButtonUser(props) {
  //State la cual controlará el estado del menú.
  const [buttonItem, setButtonItem] = React.useState(null);

  //El que seteará el item en el cual debe aparecer el menú.
  const handleClick = event => {
    setButtonItem(event.currentTarget);
  };

  //Cerrar pos.
  const handleClose = () => {
    setButtonItem(null);
  };

  //Funcion del menú.
  const handleSelected = () => {
    alert("Function");
  };
  return (<React.Fragment>
    <Tooltip title="Opciones" arrow>
      {/*Aria-controls indica el item por ID el cual será controlado el
      en este caso será controlado por el MENÚ.
      aria-haspopud no sé que hace. xDDD
      */}
      <IconButton 
        aria-controls="ButtonUser" 
        aria-haspopup="true" 
        onClick={handleClick}
      >
        <Avatar 
          alt="Usuario" 
          style={{ backgroundColor: 
            '#B46BD6', 
            height: '35px', 
            width: '35px' }}
        >
          {/*Mostrar el nombre del usuario en caso de que no tenga
          una foto*/}
          {props.user.substring(0, 1).toUpperCase()}
        </Avatar>
      </IconButton>
    </Tooltip>
    {/* Recordar que el archoEl es simplemente el item en el cual
    se posicionará el menú. */}
    <Menu 
      id="ButtonUser" 
      anchorEl={buttonItem} 
      keepMounted 
      open={Boolean(buttonItem)} 
      onClose={handleClose}
    >
      <MenuItem onClick={handleSelected}>Cambiar avatar</MenuItem>
      <MenuItem onClick={handleSelected}>Cambiar contraseña</MenuItem>
      <MenuItem onClick={handleSelected}>Salir</MenuItem>
    </Menu>
  </React.Fragment>);
}
