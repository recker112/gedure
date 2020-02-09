import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

function SearchUsers() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  //Buscar DATA
  useEffect(()=>{
    let cancel = false;
    setTimeout(() => {
      if (loading && !cancel){
        setOptions([
          {cedula: 'X', name: 'luis'},
          {cedula: '24', name: 'ale'},
          {cedula: '3029472', name: 'Fernando'},
          {cedula: '3939484', name: 'Alverto'}
        ]);
      }
    }, 2000);
    return ()=>{
      cancel=true;
    }
  },[loading])

  //Reset de DATA guardada.
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div className="searchUser">
      <Autocomplete 
        //Verificar si está loading o no
        loading={loading} 
        //Mensajes
        loadingText='Cargando...'
        noOptionsText='Sin resultados'
        //Data a usar para el autocompletado
        options={options} 
        //Texto a mostrar al seleccionar un resultado.
        getOptionLabel={option => option.cedula} 
        //Renderizar texto en la caja del autocompletado.
        renderOption={option => (
          <div className="searchBoxInfo" onClick={() => {
            alert("ACCIÓN");
          }}>
            <span>{option.cedula}</span>
            <span>{option.name}</span>
          </div>)} 
        //Verificar si está open o no.
        open={open} 
        //Acción al abrir.
        onOpen={() => {
          setOpen(true);
        }} 
        //Acción al cerrar.
        onClose={() => {
          setOpen(false);
        }} 
        //Render input.
        renderInput={params => (
        //Se usa el input base porque queda más bonito. xD
        <InputBase 
          style={{ padding: "10px", width: "100%" }} placeholder="Buscar usuario..." 
          inputProps={{ 
            ...params.inputProps, 
            type: 'search', 
            'aria-label': 'buscar usuario' 
          }} 
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>} 
          endAdornment={
            <InputAdornment position="end">
              {loading ? <CircularProgress color="inherit" size={30} /> : <div></div>}
            </InputAdornment>} 
          ref={params.InputProps.ref} 
        />)} 
      />
    </div>
  );
}

export default SearchUsers;