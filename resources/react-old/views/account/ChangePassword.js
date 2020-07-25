//React
import React, { useEffect } from 'react';

//Material-UI
import { Grid } from '@material-ui/core';

//Components
import { RenderInputs } from '../../components/RendersGlobal';
import ButtonLoading from '../../components/ButtonLoading';
import verifyErrorCustom from '../../components/reutilizar/verifyErrorCustom';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../actions/updateValue';
import updateLoading from '../../actions/updateLoading';
import updateDataUser from '../../actions/login/updateDataUser';
import errorInfo from '../../actions/errorInfo';

//notistack
import { useSnackbar } from 'notistack';

function ChangePassword({ 
	data, 
	updateValue, 
	loading,
	updateLoading,
	updateDataUser,
	errorInfo
}) {
  const { passA, passN, passR, error } = data;
	
	//SnackBar
	const { enqueueSnackbar } = useSnackbar();
	
	const clearAllStateData = () => {
		//CustomInput
		const inputs = [
			{
				target: {
					name: 'passA',
					value: '',
				}
			},
			{
				target: {
					name: 'passN',
					value: '',
				}
			},
			{
				target: {
					name: 'passR',
					value: '',
				}
			}
		];
		inputs.map((input) => {
			updateValue(input, 'ACCOUNT_PASSWORD');
			return null;
		});
	};

  const handleChange = (e) => {
    updateValue(e, 'ACCOUNT_PASSWORD');
  };
	
	//FetchData
	const fetchData = async (type) => {
		try {
			let formData = new FormData();
			
			formData.append('newPass', passN);
			formData.append('actualPass', passA);
			let res = await axios.post('api/user/changePass', formData);
			
			const { data } = res;
			
			//Alerta
			enqueueSnackbar(data.description, {
				variant: 'success'
			});
			
			updateLoading(false, 'ACCOUNT_PASSWORD');
		} catch (error){
			
			if (axios.isCancel(error)){
				//Mensaje al cancelar peticion
			}else {
				if (error.response){
					//Errores HTTP
					const { status, data } = error.response;

					if (status === 400) {
						enqueueSnackbar(data.description, {
							variant: 'warning'
						});
					} else if (status === 403) {
						enqueueSnackbar(data.description, {
							variant: 'warning'
						});
					} else if (status === 422) {
						enqueueSnackbar(data.description, {
							variant: 'warning'
						});
					} else if (status === 500) {
						enqueueSnackbar("No se ha podido conectar con la base de datos", {
							variant: 'error'
						});
					} else {
						enqueueSnackbar("Error interno en el servidor", {
							variant: 'error'
						});
					}
				}else {
					enqueueSnackbar("Error interno en el sistema", {
						variant: 'error'
					});
				}
			}
			
			updateLoading(false, 'ACCOUNT_PASSWORD');
		}
	}
	
	const handleSubmit = e => {
		//Preparativos
		e.preventDefault();
		let errorStatus = false;
		
		const inputs =[{
			value: passA,
			name: "passA",
			minValue: 3,
		}, {
			value: passN,
			name: "passN",
			minValue: 3,
		}, {
			value: passR,
			name: "passR",
			minValue: 3,
		},];
		
		//Verificar inputs vacios o NO válidos
		if (!errorStatus) {
			errorStatus = verifyErrorCustom(inputs, errorInfo, 'ACCOUNT_PASSWORD');
		}
		
		//Verificar datos
		if (passA === passN) {
			//Contraseña repetida
			errorInfo("passN", "Contraseña actual es igual al la nueva", "ACCOUNT_PASSWORD");
			errorStatus = true;
		}

		if (passN !== passR) {
			//Contraseña repetida
			errorInfo("passR", "La contraseña no coincide", "ACCOUNT_PASSWORD");
			errorStatus = true;
		}
		
		//Cancelar fetch
		if (errorStatus) {
			return null;
		}

		//REQ
		updateLoading(true, 'ACCOUNT_PASSWORD');
		fetchData();
	};
  
  return (
		<form
			autoComplete="off"
			method="POST"
			onSubmit={handleSubmit}
		>
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <RenderInputs data={{ val: passA, name: 'passA', label: 'Contraseña actual' }} accion={handleChange} error={error.passA} size="small" visibleToggle={true} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RenderInputs data={{ val: passN, name: 'passN', label: 'Nueva contraseña' }} accion={handleChange} error={error.passN} size="small" visibleToggle={true} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RenderInputs data={{ val: passR, name: 'passR', label: 'Repetir nueva contraseña' }} accion={handleChange} error={error.passR} size="small" visibleToggle={true} />
      </Grid>
			<Grid item xs={12}>
					<Grid 
						container 
						direction='column' 
						justify='center' 
						alignItems='center'
					>
						<ButtonLoading
							estilo="outlined"
							colorsito="inherit"
							text="Cambiar"
							loading={loading}
						/>
					</Grid>
				</Grid>
    </Grid>
  </form>
	);
}

const mapStateToProps = (state) => ({
  data: state.accountConfig.sections.password,
	loading: state.accountConfig.sections.password.loading
})

const mapDispatchToProps = {
  updateValue,
	updateLoading,
	updateDataUser,
	errorInfo
}


export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);