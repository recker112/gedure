//React
import React from "react";

//Material-UI
import { Grow, TextField, FormControlLabel, Checkbox } from "@material-ui/core";

//Componentes
import ButtonForm from "./ButtonForm";

//Redux
import { connect } from "react-redux";

function RenderForm(props) {
  //Destructurar datos
  const { handleChange, handleSubmit } = props.options;

  //REDUX
  const { dataLogin } = props;

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
          required
          autoFocus
        />
      </div>

      <div className="space">
        <TextField
          id="pass-input"
          name="pass"
          label="Contraseña"
          variant="outlined"
          type="password"
          value={dataLogin.pass}
          onChange={handleChange}
          required
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
        <ButtonForm />
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
  dataLogin: state.dataLogin
});

export default connect(mapStateToProps)(RenderForm);
