import React, { useEffect } from 'react';

//Material-UI
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	CircularProgress,
	useMediaQuery,
	DialogContentText
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//Components
import { verifyDataPassword, verifyDataAvatar } from './contentMenuUser/verifiData';
import ContentPassword from './contentMenuUser/ContentPassword';
import ContentAvatar from './contentMenuUser/ContentAvatar';
import AnimationDialog from '../../AnimationDialog';

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
	
	//PÁNICO
	let cancel = false;

	const handleClose = () => {
		updateMenuUser(false, option);
	};
	
	const fetchData = async (type) => {
		try {
			let res;
			
			if (type === 'avatar'){
				let formData = new FormData();
				formData.append('avatar', file[0]);
				res = await axios.post('api/upload/avatar', formData, { 
					headers: { 
						'Content-Type': 'multipart/form-data'
					}
				});
			}else if (type === 'password') {
				
			}
			
			const { status, data } = res;
			
			if (!cancel){
				//Actualizar avatar en REDUX
				updateDataUser({avatar: data.newAvatar});
				//Alerta
				enqueueSnackbar(data.description, {
					variant: 'success'
				});
			}
		} catch (error){
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
				enqueueSnackbar("Error interno en el sistema", {
					variant: 'error'
				});
			}
		}
		updateLoading(false, 'MENU_USER_DIALOG');
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

		//REQ SUCCESS
		if (option !== 'password'){
			updateLoading(true, 'MENU_USER_DIALOG');
			fetchData(option);
		}
	};
	
	//Al desmontar
	useEffect(()=>{
		return ()=>{
			cancel=true;
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
							<CircularProgress />}
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