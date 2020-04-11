//React
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../actions/updateInputValue';
import updateLoading from '../../actions/updateLoading';
import errorInfo from '../../actions/errorInfo';
import updateDataUser from '../../actions/login/updateDataUser';
import loginSinceFormSuccess from '../../actions/login/loginSinceFormSuccess';

//Components
import RenderForm from './RenderForm';
import verifyErrorCustom from '../../components/reutilizar/verifyErrorCustom';


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
	
	const test = (InputsArray, errorInfo) => {
	let errorStatus = false;
	//Verificar datos
	InputsArray.map(input => {
		if (input.value.length === 0) {
			//Empty
			errorInfo(input.name, 'Campo obligatorio', 'MODIFY');
			errorStatus = true;
		} else if (input.minValue && input.value.length < input.minValue) {
			//No valid cédula
			errorInfo(input.name, 'No válido', 'MODIFY');
			errorStatus = true;
		}
		return null;
	});
	
	return errorStatus;
}

	const handleSubmit = e => {
		//Preparativos
		e.preventDefault();

		//Verificar datos erroneos
		const InputsArray = [
			{ 
				value: user, 
				name: 'user',
				minValue: 3
			}, 
			{ 
				value: pass,
				name: 'pass',
				minValue: 4
			}
		];
		
		const error = verifyErrorCustom(InputsArray, errorInfo, 'LOGIN');
		
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