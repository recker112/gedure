//React
import React from 'react';

//Material-UI
import { Grow, FormControlLabel, Checkbox } from '@material-ui/core';

//Componentes
import ButtonLoading from '../../components/ButtonLoading';

//Redux
import { connect } from 'react-redux';
import { RenderInputs } from '../../components/RendersGlobal';

function RenderForm({ options, dataLogin, validating, error }) {
	//Destructurar datos
	const { handleChange, handleSubmit } = options;

	return (
		<Grow in={true}>
			<form onSubmit={handleSubmit} className="LoginForm">
				<div className="LoginForm__Divider" style={{width: 278}}>
					<RenderInputs
						data={{ val: dataLogin.user, name: 'user', label: 'Usuario' }}
						accion={handleChange}
						error={error.user}
						focus={true}
					/>
				</div>

				<div className="LoginForm__Divider">
					<RenderInputs
						data={{ val: dataLogin.pass, name: 'pass', label: 'Contraseña' }}
						accion={handleChange}
						error={error.pass}
						visibleToggle={true}
						maxWidth="278px"
					/>
				</div>

				<div className="LoginForm__Divider">
					<FormControlLabel
						value={dataLogin.checkbox}
						onChange={handleChange}
						control={<Checkbox name="checkbox" color="primary" />}
						label="Recordar en este equipo"
						labelPlacement="end"
					/>
				</div>

				<div className="LoginForm__Divider">
					<ButtonLoading
						estilo="contained"
						colorsito="primary"
						text="Acceder"
						loading={validating}
					/>
				</div>

				<div className="LoginForm__Copyright">
					<span>&copy; UEP APEP "La Candelaria" - 2020</span>
					<span>Desarollado por Recker</span>
					<span>v4.1.0</span>
				</div>
			</form>
		</Grow>
	);
}

//REDUX
const mapStateToProps = state => ({
	dataLogin: state.dataLogin,
	validating: state.loginStatus.validating,
	error: state.dataLogin.error
});

export default connect(mapStateToProps)(RenderForm);