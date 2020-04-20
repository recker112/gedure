//React
import React from 'react';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../actions/updateValue';
import updateLoading from '../../actions/updateLoading';
import errorInfo from '../../actions/errorInfo';
import updateDataUser from '../../actions/login/updateDataUser';
import authUpdate from '../../actions/login/authUpdate';

//Components
import RenderForm from './RenderForm';
import verifyErrorCustom from '../../components/reutilizar/verifyErrorCustom';


//SnackBar
import { useSnackbar } from 'notistack';

function Form({
	updateValue,
	updateLoading,
	auth,
	updateDataUser,
	authUpdate,
	dataLogin,
	errorInfo
}) {
	//Destructing
	const { user, pass, checkbox } = dataLogin;
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	const handleChange = e => {
		// enviar input al store para actualizar states
		updateValue(e, 'LOGIN');
	};
	
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

			//Al estar todo correcto el servidor DEBE regresar los
			//datos de usuario, los cuales se cargarán con
			//"updateDataUser"
			updateDataUser({ ...res.data });

			const { access_key } = res.data;
			//Guardar el Access Key
			if (checkbox) {
				//Datos permanentes.
				localStorage.setItem('key', JSON.stringify(access_key));
				sessionStorage.setItem('key', JSON.stringify(access_key));
			} else {
				//Datos de SOLO sesión.
				sessionStorage.setItem('key', JSON.stringify(access_key));
			}

			//Una vez terminado de actualizar los datos, se procede a
			//decirle a la APP que se realizó un login correctamente.
			authUpdate(true);

			//Add SnackBar
			enqueueSnackbar('Login exitoso', {
				variant: 'success'
			});
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

	//Renderizar form
	return <RenderForm options={{ handleChange, handleSubmit }} />;
}

const mapStateToProps = state => ({
	auth: state.loginStatus.auth,
	dataLogin: state.dataLogin
});

const mapDispatchToProps = {
	updateValue,
	updateLoading,
	updateDataUser,
	authUpdate,
	errorInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);