//React
import React, { useState } from 'react';

//Material-UI
import { Grow, TextField, FormControlLabel, Checkbox, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Componentes
import ButtonLoading from '../../components/ButtonLoading';

//Redux
import { connect } from 'react-redux';

function RenderForm({ options, dataLogin, validating, error }) {
  const [visible, setVisible] = useState(false);
  //Destructurar datos
  const { handleChange, handleSubmit } = options;

  const handleClick = () => {
    setVisible(!visible);
  }
  return (
    <Grow in={true}>
      <form onSubmit={handleSubmit}>
        <div className="space">
          <TextField
            id="user-input"
            name="user"
            label="Usuario"
            variant="outlined"
            value={dataLogin.user}
            onChange={handleChange}
            autoFocus
            error={error.user.status}
            helperText={error.user.status && error.user.message}
          />
        </div>

        <div className="space">
          <TextField
            type={visible ? "text" : "password"}
            id="pass-input"
            name="pass"
            label="Contraseña"
            variant="outlined"
            value={dataLogin.pass}
            onChange={handleChange}
            error={error.pass.status}
            helperText={error.pass.status && error.pass.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClick}>
                    {visible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            style={{maxWidth: "278px"}}
          />
        </div>

        <div className="space">
          <FormControlLabel
            value={dataLogin.checkbox}
            onChange={handleChange}
            control={<Checkbox name="checkbox" color="primary" />}
            label="Recordar en este equipo"
            labelPlacement="end"
          />
        </div>

        <div className="space">
          <ButtonLoading estilo="contained" colorsito="primary" text="Acceder" loading={validating} />
        </div>

        <div className="Copyright">
          <span>&copy; UEP APEP "La Candelaria" - 2020</span>
          <span>Desarollado por Recker</span>
        </div>
      </form>
    </Grow>
  );
}

//REDUX
const mapStateToProps = state => ({
  dataLogin: state.dataLogin,
  validating: state.loginStatus.validating,
  error: state.dataLogin.error,
});

export default connect(mapStateToProps)(RenderForm);