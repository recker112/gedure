import React from 'react';
import { Paper,
  Button,
  TextField, 
  FormControlLabel,
  Checkbox } from '@material-ui/core';
import HeaderNoPanel from '../reutilizar/HeaderNoPanel';
import LockIcon from '@material-ui/icons/Lock';



function PageLogin() {
  return(
    <div className="BoxPageIndex">
      <HeaderNoPanel />
      <main>
        <div className="HeadMain">
          <span className="IconBoxIndex">
            <LockIcon style={{ fontSize: 40 }} />
          </span>
          <span className="TitleIndex">La Candelaria</span>
        </div>
        <form>
          <div className="space">
            <TextField 
              id="outlined-basic" 
              label="Usuario" 
              variant="outlined" 
            />
          </div>
          <div className="space">
            <TextField 
              id="outlined-basic" 
              label="Contraseña" 
              variant="outlined" 
              type="password"
            />
          </div>
          <div className="space">
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label="Recordar en este equipo"
              labelPlacement="Recordar en este equipo"
            />
          </div>
          <div className="space">
            <Button variant="contained" color="primary">Acceder</Button>
          </div>
          <div className="Copyright">
            <span>&copy; UEP APEP "La Candelaria" - 2020</span>
            <span>Desarollado por Recker</span>
          </div>
        </form>
      </main>
    </div>
  )
}

export default PageLogin;