import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

function SearchSeccionInput({options}) {
  const { select, handleChange } = options;
  return <div className="searchSeccion">
    <Select 
      value={select}
      displayEmpty 
      style={{ padding: "10px", width: "100%" }} 
      onChange={handleChange} 
      color="primary"
    >
      <MenuItem value="">
        <em>Buscar Sección</em>
      </MenuItem>
      <MenuItem value="1G">1 grado</MenuItem>
      <MenuItem value="2G">2 grado</MenuItem>
      <MenuItem value="3G">3 grado</MenuItem>
      <MenuItem value="4G">4 grado</MenuItem>
      <MenuItem value="5G">5 grado</MenuItem>
      <MenuItem value="6G">6 grado</MenuItem>
      <MenuItem value="1">1 año</MenuItem>
      <MenuItem value="2">2 año</MenuItem>
      <MenuItem value="3">3 año</MenuItem>
      <MenuItem value="4">4 año</MenuItem>
      <MenuItem value="5">5 año</MenuItem>
      <MenuItem value="6">6 año</MenuItem>
    </Select>
  </div>;
}

export default SearchSeccionInput;