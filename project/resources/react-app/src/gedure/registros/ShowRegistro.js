import React, { useCallback } from 'react';

import { 
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Button,
} from '@material-ui/core';

// Components
import AnimationDialog from '../../components/AnimationDialog';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../actions/updateDialogs';

export default function ShowRegistros() {
	const { open, data } = useSelector((state) => ({
		open: state.dialogs.showRegistros.open,
		data: state.dialogs.showRegistros.data,
	}));
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(updateDialogs('showRegistros', false, false));
	};
	
	const Text = useCallback(() => {
		if (data.action === 'Inicio de sesión por relogin') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) entró al sistema mediante su llave de relogin.
				</DialogContentText>
			);
		}else if (data.action === 'Inicio de sesión') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) entró al sistema mediante el formulario del login.
				</DialogContentText>
			);
		}else if (data.action === 'Bloqueo de cuenta') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) bloqueó su cuenta, teniendo un bloqueo de <strong>nivel {data.payload.nivel}</strong> y esperando <strong>{data.payload.time_block} minutos</strong> para su desbloqueo.
				</DialogContentText>
			);
		}else if (data.action === 'Sesión cerrada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) cerró su sesión dentro del sistema.
				</DialogContentText>
			);
		}else if (data.action === 'Sesiones cerradas') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) cerró todas sus sesiones dentro del sistema.
				</DialogContentText>
			);
		}else if (data.action === 'Correo de recuperación') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) solicitó un correo de recuperación para poder recuperar su contraseña.
				</DialogContentText>
			);
		}else if (data.action === 'Contraseña cambiada via correo') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) cambió su contraseña mediante la verificación del correo.
				</DialogContentText>
			);
		}
	},[data]);
	
	return (
		<Dialog 
			open={open}
			TransitionComponent={AnimationDialog}
			aria-labelledby="show-registros"
			aria-describedby="show-registros-describedby"
			onClose={handleClose}
		>
			<DialogTitle id="confirm-dialog-title">Registro #{data.id}</DialogTitle>
			<DialogContent>
				<Text />
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
				>
					Entendido
				</Button>
			</DialogActions>
		</Dialog>
	);
}