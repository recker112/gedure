//React
import React, { useState } from 'react';

//Material-UI
import { Grid, Avatar } from '@material-ui/core';

//Components
import LoadArchives from '../../components/LoadArchives';
import ButtonLoading from '../../components/ButtonLoading';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../actions/updateValue';
import updateLoading from '../../actions/updateLoading';
import updateDataUser from '../../actions/login/updateDataUser';

//notistack
import { useSnackbar } from 'notistack';

function ChangeAvatar({ 
	file, 
	loading,
	updateValue, 
	updateLoading,
	updateDataUser,
	currentAvatar, 
	name }) {
  const [imgPreview, setImgPreview] = useState(currentAvatar);
	
	//SnackBar
	const { enqueueSnackbar } = useSnackbar();
	
	//Progress
	const [progress, setProgress] = useState(0);
	
	//OnProgress
	const onUploadProgress = (progressEvent) => {
		let percentCompleted = Math.round(
			progressEvent.loaded * 100 / progressEvent.total
		);
		setProgress(percentCompleted);
	}
	
	//FetchData
	const fetchData = async () => {
		try {
			let formData = new FormData();
			
			formData.append('avatar', file[0]);
			let res = await axios.post('api/upload/avatar', formData, {
				onUploadProgress: onUploadProgress
			});
			
			const { data } = res;
			
			//Actualizar avatar en REDUX
			updateDataUser({avatar: data.newAvatar});
			//Alerta
			enqueueSnackbar(data.description, {
				variant: 'success'
			});
			
			updateLoading(false, 'ACCOUNT_AVATAR');
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
			
			updateLoading(false, 'ACCOUNT_AVATAR');
		}
	}
	
	const handleSubmit = e => {
		//Preparativos
		e.preventDefault();
		let errorStatus = false;
		
		//Verificar void
		if (file.length === 0) {
			//No upload file
			enqueueSnackbar('Debe cargar algún archivo primero', {
				variant: 'warning'
			});
			errorStatus = true;
		}

		//Verificar tamaño del archivo
		if (file[0] && file[0].size / 1024 >= 3072){
			enqueueSnackbar('La imagen supera el tamaño máximo', {
				variant: 'warning'
			});
			errorStatus = true;
		}
		
		//Cancelar fetch
		if (errorStatus) {
			return null;
		}

		//REQ
		updateLoading(true, 'ACCOUNT_AVATAR');
		fetchData();
	};

  return (
		<form
			autoComplete="off"
			encType="multipart/form-data"
			method="POST"
			onSubmit={handleSubmit}
		>
			<Grid container spacing={2} justify="center">
				<Avatar alt="Avatar" style={{
					backgroundColor: '#B46BD6',
					height: '150px',
					width: '150px'
				}} src={imgPreview}>{name.substring(0, 1).toUpperCase()}</Avatar>
				<Grid item xs={12} style={{ textAlign: "center" }}>
					<span>Vista Previa</span>
				</Grid>
				<Grid item xs={12} style={{ textAlign: "center" }}>
					<LoadArchives 
						accepted="image/*"
						reset={loading}
						files={file} 
						action={updateValue} 
						updatePreview={{ update: setImgPreview, currentAvatar }}
						maxSizeFile={{ unique: "3MB" }} 
						label={{ unique: 'foto' }}
						name="file"
						idName="avatarUser"
						type="ACCOUNT_AVATAR"
					/>
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
							progressBar={true}
							progress={progress}
						/>
					</Grid>
				</Grid>
			</Grid>
  	</form>
	);
}

//REDUX
const mapStateToProps = (state) => ({
  file: state.accountConfig.sections.avatar.file,
	loading: state.accountConfig.sections.avatar.loading,
  currentAvatar: state.userData.avatar,
  name: state.userData.name,
})

const mapDispatchToProps = {
  updateValue,
	updateLoading,
	updateDataUser,
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangeAvatar);