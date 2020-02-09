import React, { useState } from 'react';

//Material-UI
import { Grid, Paper, TextField, Select, MenuItem, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, Zoom, Button } from '@material-ui/core';
import SearchUsers from './consultarModificar/SearchUsers';
import SearchSeccion from './consultarModificar/SearchSeccion';

function ContentConsultarModificar() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper>
          <SearchUsers />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>
          <SearchSeccion />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className='Box'>
          <span className="title">Modificar</span>
          <div className="content">
            <ModifyForm />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

function ModifyForm() {
  const [action, setAction] = useState('insert');
  const [privilegio, setPrivilegio] = useState('V-');
  const [curso, setCurso] = useState('');
  const [seccion, setSeccion] = useState('');

  function handleChangeAction(e){
    setAction(e.target.value);
  }

  function handleChangePrivilegio(e){
    setPrivilegio(e.target.value);
  }

  function handleChangeCurso(e){
    setCurso(e.target.value);
  }

  function handleChangeSeccion(e){
    setSeccion(e.target.value);
  }


  return (
    <form autoComplete='off'>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Privilegio</FormLabel>
              <RadioGroup 
                aria-label="privilegio" 
                name="privilegio" 
                value={privilegio} 
                onChange={handleChangePrivilegio} 
                row
              >
                <FormControlLabel
                  value="V-"
                  control={<Radio color="primary" />}
                  label="V-"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="A-"
                  control={<Radio color="primary" />}
                  label="A-"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="CR-"
                  control={<Radio color="primary" />}
                  label="CR-"
                  labelPlacement="end"
                />
              </RadioGroup>
          </FormControl>
        </Grid>
        <Zoom in={true}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField required label="Usuario" style={{ width: "100%" }} variant="outlined" />
          </Grid>
        </Zoom>
        <Zoom in={action === "delete" ? false : true}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Nombre" style={{ width: "100%" }} variant="outlined" />
          </Grid>
        </Zoom>
        <Zoom in={action === "delete" || action === "update" ? false : true}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Contraseña" style={{ width: "100%" }} variant="outlined" />
          </Grid>
        </Zoom>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel color="secondary" component="legend">Acción</FormLabel>
              <RadioGroup 
                aria-label="privilegio" 
                name="privilegio" 
                value={action} 
                onChange={handleChangeAction} 
                row
              >
                <FormControlLabel
                  value="insert"
                  control={<Radio color="secondary" />}
                  label="Añadir"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="update"
                  control={<Radio color="secondary" />}
                  label="Actualizar"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="delete"
                  control={<Radio color="secondary" />}
                  label="Eliminar"
                  labelPlacement="end"
                />
              </RadioGroup>
          </FormControl>
        </Grid>
        <Zoom in={privilegio === "V-" ? true : false}>
          <Grid item xs={2}>
            <Select 
              displayEmpty
              value={curso}
              onChange={handleChangeCurso}
              style={{width: "100%"}}
            >
              <MenuItem value="">
                <em>Grado/Año</em>
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
          </Grid>
        </Zoom>
        <Zoom in={privilegio === "V-" ? true : false}>
          <Grid item xs={2}>
            <Select 
              value={seccion} 
              onChange={handleChangeSeccion}
              style={{width: "100%"}}
              displayEmpty
            >
              <MenuItem value="">Sección</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="U">C</MenuItem>
            </Select>
          </Grid>
        </Zoom>
      </Grid>
      <Grid container justify="center" style={{marginTop: "20px"}}>
        <Grid item xs={1}>
          <Button type="submit" variant="outlined">Realizar</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ContentConsultarModificar;