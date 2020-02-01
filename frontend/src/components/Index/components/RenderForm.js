import React, { useState } from 'react';
import { TextField, FormControlLabel, Checkbox, Button, Grow } from '@material-ui/core';
import ButtonForm from './ButtonForm';
import Alert from '@material-ui/lab/Alert';

export function RenderForm(props) {
  //Destructurar datos
  const { DataForm, 
    handleChange, 
    handleSubmit,
    setDataForm } = props.options;
  
  const [alertOpeFix, setAlertOpeFix] = useState(DataForm.alertOpen)

  return (
  <form onSubmit={handleSubmit}>
    <AlertsState options={ {setDataForm, DataForm} } />

    <div className="space">
      <TextField id="outlined-basic" name="user" label="Usuario" variant="outlined" value={DataForm.user} onChange={handleChange} required autoFocus />
    </div>

    <div className="space">
      <TextField id="outlined-basic" name="pass" label="Contraseña" variant="outlined" type="password" value={DataForm.pass} onChange={handleChange} required />
    </div>

    <div className="space">
      <FormControlLabel value={DataForm.checkbox} onChange={handleChange} control={<Checkbox name="checkbox" color="primary" />} label="Recordar en este equipo" labelPlacement="end" />
    </div>

    <div className="space">
      <ButtonForm validating={DataForm.validating} />
    </div>

    <div className="Copyright">
      <span>&copy; UEP APEP "La Candelaria" - 2020</span>
      <span>Desarollado por Recker</span>
    </div>
  </form>
  );
}

function AlertsState(props) {
  const { DataForm, setDataForm } = props.options;

  return <Grow in={DataForm.alertOpen}>
    <Alert style={{
    position: "fixed",
      bottom: "10px",
      right: "10px",
      zIndex: 10
    }} severity={DataForm.alertSeverity} onClose={() => {
      setDataForm({ ...DataForm, alertOpen: false });
    } }>{DataForm.alertText}</Alert>
  </Grow>;
}
