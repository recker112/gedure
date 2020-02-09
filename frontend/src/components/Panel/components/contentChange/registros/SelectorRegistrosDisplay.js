import React from 'react';
import { MenuItem, Select } from '@material-ui/core';

export function SelectorRegistrosDisplay(props) {
  const { handleChangeSelect, selectSearch } = props.options;
  
  return (<div className='Box'>
    <span className='title'>Buscar Registros</span>
    <div className='content'>
      <Select className="select" onChange={handleChangeSelect} value={selectSearch}>
        <MenuItem value="all">
          <em>Todos</em>
        </MenuItem>
        <MenuItem value="ban">Baneos</MenuItem>
        <MenuItem value="login">Inicio de sesión</MenuItem>
        <MenuItem value="changePass">Cambios de contraseña</MenuItem>
      </Select>
    </div>
  </div>);
}
