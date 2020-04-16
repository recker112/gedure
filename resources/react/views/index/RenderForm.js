//React
import React, { useState } from 'react';

//Material-UI
import { Grow, FormControlLabel, Checkbox } from '@material-ui/core';

//Componentes
import ButtonLoading from '../../components/ButtonLoading';
import ShowInfoVersion from '../../components/ShowInfoVersion';

//Redux
import { connect } from 'react-redux';
import { RenderInputs } from '../../components/RendersGlobal';

function RenderForm({ options, dataLogin, validating, error }) {
  //Destructurar datos
  const { handleChange, handleSubmit } = options;
	
	const [open, setOpen] = useState(false);

  return (
    <Grow in={true}>
      <form onSubmit={handleSubmit}>
        <div className="space">
          <RenderInputs
            data={{ val: dataLogin.user, name: 'user', label: 'Usuario' }}
            accion={handleChange}
            error={error.user}
            focus={true}
          />
        </div>

        <div className="space">
          <RenderInputs 
            data={{ val: dataLogin.pass, name: 'pass', label: 'Contraseña' }}
            accion={handleChange}
            error={error.pass}
            visibleToggle={true}
            maxWidth="278px"
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
					<span 
						onClick={()=>{setOpen(true)}}
						style={{cursor: 'pointer'}}
					>
						v4.0.0-Beta.0 Ver notas
					</span>
					<ShowInfoVersion open={open} setOpen={setOpen} />
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