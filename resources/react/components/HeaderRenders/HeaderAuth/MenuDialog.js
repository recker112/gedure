import React, { useEffect, useState } from 'react';

//Material-UI
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	CircularProgress,
	useMediaQuery,
	DialogContentText,
	Grid
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//Components
import { verifyDataPassword, verifyDataAvatar } from './contentMenuUser/verifiData';
import ContentPassword from './contentMenuUser/ContentPassword';
import ContentAvatar from './contentMenuUser/ContentAvatar';
import AnimationDialog from '../../AnimationDialog';
import ButtonLoading from '../../ButtonLoading';

//Redux
import { connect } from 'react-redux';
import updateMenuUser from '../../../actions/panel/updateMenuUser';
import updateLoading from '../../../actions/updateLoading';
import updateDataUser from '../../../actions/login/updateDataUser';
import errorInfo from '../../../actions/errorInfo';

//notistack
import { useSnackbar } from 'notistack';

function MenuDialog({
	openDialog,
	option,
	loading,
	updateMenuUser,
	updateDataUser,
	updateLoading,
	errorInfo,
	passwordSection,
	avatarSection,
}) {
	//Destructing
	const { file } = avatarSection;
	const { passA, passN, passR } = passwordSection;
	
	//SnackBar
	const { enqueueSnackbar } = useSnackbar();

	//Resolution RESPONSIVE DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	//Progress
	const [progress, setProgress] = useState(0);
	
	//Cancel
	let cancel;
	let CancelAxios = axios.CancelToken;

	//Al cerrar popad
	const handleClose = () => {
		updateMenuUser(false, option);
	};
	
	//OnProgress
	const onUploadProgress = (progressEvent) => {
		let percentCompleted = Math.round(
			progressEvent.loaded * 100 / progressEvent.total
		);
		
		setProgress(percentCompleted);
	}
	
	//FetchData
	const fetchData = async (type) => {
		try {
			let res;
			let formData = new FormData();
			
			if (type === 'avatar'){
				formData.append('avatar', file[0]);
				res = await axios.post('api/upload/avatar', formData, { 
					cancelToken: new CancelAxios(c=>{
						cancel = c;
					})
				});
			}else if (type === 'password') {
				formData.append('newPass', passN);
				formData.append('actualPass', passA);
				res = await axios.post('api/user/changePass', formData, { 
					cancelToken: new CancelAxios(c=>{
						cancel = c;
					})
				});
			}
			
			const { status, data } = res;
			
			if (type === 'avatar') {
				//Actualizar avatar en REDUX
				updateDataUser({avatar: data.newAvatar});
				//Alerta
				enqueueSnackbar(data.description, {
					variant: 'success'
				});
			}else if (type === 'password') {
				//Alerta
				enqueueSnackbar(data.description, {
					variant: 'success'
				});
			}
			
			updateLoading(false, 'MENU_USER_DIALOG');
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
			
			updateLoading(false, 'MENU_USER_DIALOG');
		}
	}

	//Lista con las opciones disponibles
	const listOptions = [
		{
			keySelect: 'avatar',
			title: 'Cambiar avatar',
			submitTitle: 'Cambiar Foto',
			content: <ContentAvatar />
		},
		{
			keySelect: 'password',
			title: 'Cambiar contraseña',
			submitTitle: 'Cambiar Contraseña',
			content: <ContentPassword />
		}
	];

	const handleSubmit = e => {
		//Preparativos
		e.preventDefault();
		let errorStatus = false;

		//Verificar datos
		if (option === 'password') {
			errorStatus = verifyDataPassword(passA, passN, passR, errorInfo);
		} else if (option === 'avatar') {
			errorStatus = verifyDataAvatar(file, errorInfo, enqueueSnackbar);
			
			//Verificar tamaño del archivo
			if (file[0].size / 1024 >= 3072){
				enqueueSnackbar('La imagen supera el tamaño máximo', {
					variant: 'warning'
				});
				errorStatus = true;
			}
		}
		
		//Cancelar fetch
		if (errorStatus) {
			return null;
		}

		//REQ
		updateLoading(true, 'MENU_USER_DIALOG');
		fetchData(option);
	};
	
	//Al desmontar
	useEffect(()=>{
		return ()=>{
			if (cancel){
				cancel();
			}
		}
	}, [cancel])

	const elementoShow = listOptions.map((element, i) => {
		if (element.keySelect === option) {
			return (
				<Dialog
					key={i}
					open={openDialog}
					aria-labelledby={`form-change-${option}-title`}
					TransitionComponent={AnimationDialog}
					fullScreen={fullScreen}
				>
					<DialogTitle id="form-change-password-title">
						{element.title}
					</DialogTitle>
					<form
						method="POST"
						autoComplete="false"
						onSubmit={handleSubmit}
						style={{ marginTop: '0' }}
					>
						<DialogContent dividers>
							{!loading ? element.content
							:
							<Grid container 
								direction={'column'} 
								justify={'center'} 
								alignItems={'center'}
							>
								<ButtonLoading
									estilo="outlined"
									colorsito="primary"
									text="Progress"
									loading={true}
									progressBar={option === 'avatar' ? true : false}
									progress={progress}
								/>
							</Grid>}
						</DialogContent>
						{!loading && (
							<DialogActions>
								<Button color="secondary" onClick={handleClose}>
									Cancelar
								</Button>
								<Button type="submit" color="primary">
									{element.submitTitle}
								</Button>
							</DialogActions>
						)}
					</form>
				</Dialog>
			);
		} else {
			return null;
		}
	});

	return elementoShow;
}

//Redux
const mapStateToProps = state => ({
	openDialog: state.panelSettings.menuUser.openDialog,
	option: state.panelSettings.menuUser.option,
	loading: state.panelSettings.menuUser.loading,
	passwordSection: state.panelSettings.menuUser.sections.password,
	avatarSection: state.panelSettings.menuUser.sections.avatar
});

const mapDispatchToProps = {
	updateMenuUser,
	updateLoading,
	errorInfo,
	updateDataUser
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDialog);