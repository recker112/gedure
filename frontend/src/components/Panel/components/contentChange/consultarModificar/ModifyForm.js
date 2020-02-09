import React from 'react';

//Material-ui
import { Grid, TextField, Select, MenuItem, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, Zoom, Button } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import updateInfoInput from '../../../../store/action/panel/registros/updateInfoInput';

function ModifyForm({ modifySection, updateInfoInput }) {
  const { 
    privilegio, 
    cedula, 
    name, 
    option, 
    curso, 
    seccion, 
    pass 
  } = modifySection;

  function handleChange(e) {
    //Cambiar elemento
    updateInfoInput({ [e.target.name]: e.target.value });
  }
  return (<form autoComplete='off'>
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Privilegio</FormLabel>
          <RadioGroup 
            aria-label="privilegio" 
            name="privilegio" 
            value={privilegio} 
            onChange={handleChange} 
            row
          >
            <FormControlLabel value="V-" control={<Radio color="primary" />} label="V-" labelPlacement="end" />
            <FormControlLabel value="A-" control={<Radio color="primary" />} label="A-" labelPlacement="end" />
            <FormControlLabel value="CR-" control={<Radio color="primary" />} label="CR-" labelPlacement="end" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Zoom in={true}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField 
            name="cedula" 
            value={cedula} 
            label="Cédula" 
            style={{ width: "100%" }} 
            variant="outlined" 
            onChange={handleChange}
            required
          />
        </Grid>
      </Zoom>
      <Zoom in={option === "delete" ? false : true}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="name" 
            value={name} 
            label="Nombre" 
            style={{ width: "100%" }} 
            variant="outlined"
            onChange={handleChange}
            required 
          />
        </Grid>
      </Zoom>
      <Zoom in={option === "delete" || option === "update" ? false : true}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField 
            name="pass" 
            value={pass} 
            label="Contraseña" 
            style={{ width: "100%" }} 
            variant="outlined"
            onChange={handleChange}
            required
          />
        </Grid>
      </Zoom>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel color="secondary" component="legend">Acción</FormLabel>
          <RadioGroup 
            aria-label="Accion" 
            name="option" 
            value={option} 
            onChange={handleChange}
            row
          >
            <FormControlLabel value="insert" control={<Radio color="secondary" />} label="Añadir" labelPlacement="end" />
            <FormControlLabel value="update" control={<Radio color="secondary" />} label="Actualizar" labelPlacement="end" />
            <FormControlLabel value="delete" control={<Radio color="secondary" />} label="Eliminar" labelPlacement="end" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Zoom in={privilegio === "V-" ? true : false}>
        <Grid item xs={2}>
          <Select 
            displayEmpty 
            name="curso"
            value={curso} 
            onChange={handleChange} 
            style={{ width: "100%" }}
            required
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
            name="seccion"
            value={seccion} 
            onChange={handleChange} 
            style={{ width: "100%" }} 
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
    <Grid container justify="center" style={{ marginTop: "20px" }}>
      <Grid item xs={1}>
        <Button type="submit" variant="outlined">Realizar</Button>
      </Grid>
    </Grid>
  </form>);
}

const mapStateToProps = (state) => ({
  modifySection: state.panelSettings.modifySection,
});

const mapDispatchToProps = {
  updateInfoInput
};

export default connect(mapStateToProps,mapDispatchToProps)(ModifyForm);