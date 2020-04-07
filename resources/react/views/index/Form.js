//React
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../actions/updateInputValue';
import updateLoading from '../../actions/updateLoading';
import errorInfo from '../../actions/errorInfo';

//Compoentes
import RenderForm from './RenderForm';
import updateDataUser from '../../actions/login/updateDataUser';
import loginSinceFormSuccess from '../../actions/login/loginSinceFormSuccess';

//SnackBar
import { useSnackbar } from 'notistack';

function Form({
	updateInputValue,
	updateLoading,
	auth,
	updateDataUser,
	loginSinceFormSuccess,
	dataLogin,
	errorInfo
}) {
	//Destructing
	const { user, pass, checkbox } = dataLogin;
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();
	
	//cancel
	let cancel = false;

	const handleChange = e => {
		// enviar input al store para actualizar states
		updateInputValue(e, 'LOGIN');
	};

	const handleSubmit = e => {
		//Preparativos
		e.preventDefault();
		let error = false;

		//Verificar datos erroneos
		[{ value: user, name: 'user' }, { value: pass, name: 'pass' }].map(input => {
			if (input.value.length === 0) {
				//Empty
				errorInfo(input.name, 'Campo obligatorio', 'LOGIN');
				error = true;
			} else if (input.value.length < 4) {
				//No valid cédula
				errorInfo(input.name, 'No válido', 'LOGIN');
				error = true;
			}
			return null;
		});
		
		//Verificar que estén los datos.
		if (error === true) {
			return null;
		}

		//Loading
		updateLoading(true, 'LOGIN');
		//Consulta
		getConsult();
	};

	const getConsult = async () => {
		//Probar resultados
		try {
			//Consulta
			const res = await axios.post('api/login', {
				user: user,
				pass: pass,
				checkbox: checkbox
			});

			if (!cancel) {
				//Al estar todo correcto el servidor DEBE regresar los
				//datos de usuario, los cuales se cargarán con
				//"updateDataUser"
				updateDataUser({ ...res.data });

				//Una vez terminado de actualizar los datos, se procede a
				//decirle a la APP que se realizó un login correctamente.
				loginSinceFormSuccess();

				//Add SnackBar
				enqueueSnackbar('Login exitoso', {
					variant: 'success'
				});
			}
		} catch (error) {
			const { status, data } = error.response;

			if (status === 400) {
				enqueueSnackbar(data.description, {
					variant: 'warning'
				});
			} else if (status === 422) {
				enqueueSnackbar(data.description, {
					variant: 'error'
				});
			} else if (status === 500) {
				enqueueSnackbar('No se ha podido conectar con la base de datos', {
					variant: 'error'
				});
			} else {
				enqueueSnackbar('Error interno en el sistema', {
					variant: 'error'
				});
			}
		}

		//Cambiar Loading
		updateLoading(false, 'LOGIN');
	};
	
	//Al desmontar
	useEffect(()=>{
		return ()=>{
			cancel = true;
		}
	},[cancel])

	//Verificar si se redireccionará o no.
	if (auth) {
		return (
			<Redirect
				to={{
					pathname: '/panel'
				}}
			/>
		);
	} else {
		return <RenderForm options={{ handleChange, handleSubmit }} />;
	}
}

const mapStateToProps = state => ({
	auth: state.loginStatus.auth,
	dataLogin: state.dataLogin
});

const mapDispatchToProps = {
	updateInputValue,
	updateLoading,
	updateDataUser,
	loginSinceFormSuccess,
	errorInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);