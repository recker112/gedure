import React, { useCallback } from 'react';

import { Link as RouteLink } from 'react-router-dom';

import { 
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Button,
	Link,
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
		}else if (data.action === 'Publicación creada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) creó una publicación con el título <Link component={RouteLink} to={data.payload.url}>{data.payload.title}</Link>.
				</DialogContentText>
			);
		}else if (data.action === 'Publicación editada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) editó la publicación <Link component={RouteLink} to={data.payload.url}>{data.payload.title}</Link>.
				</DialogContentText>
			);
		}else if (data.action === 'Publicación eliminada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) se eliminó la publicación <strong>{data.payload.title}</strong>.
				</DialogContentText>
			);
		}else if (data.action === 'Usuario creado') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) creó a un usuario con los siguientes datos:
					<br />
					<br />
					<strong>Usuario:</strong> {data.payload.privilegio}{data.payload.username}.
					<br />
					<strong>Nombre:</strong> {data.payload.name}.
					<br />
					<strong>Correo:</strong> {data.payload.email}.
				</DialogContentText>
			);
		}else if (data.action === 'Usuario editado') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) editó al usuario <strong>{data.payload.privilegio}{data.payload.username}</strong>.
				</DialogContentText>
			);
		}else if (data.action === 'Usuario desactivado') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) desactivó al usuario con los siguientes datos:
					<br />
					<br />
					<strong>Usuario:</strong> {data.payload.privilegio}{data.payload.username}.
					<br />
					<strong>Nombre:</strong> {data.payload.name}.
					<br />
					<strong>Correo:</strong> {data.payload.email}.
				</DialogContentText>
			);
		}else if (data.action === 'Usuarios desactivados masivamente') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) desactivó <strong>{data.payload.users_disabled_count}</strong> usuarios, las cuales son las siguientes:
					<br />
					<br />
					{data.payload.users_disabled?.map((username, i) => (
						<React.Fragment>
							- {username}
							<br />
						</React.Fragment>
					))}
				</DialogContentText>
			);
		}else if (data.action === 'Actualización de sección masiva') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) cambió el curso a <strong>{data.payload.curso}</strong> de <strong>{data.payload.massive_seccion_update_count}</strong> estudiante(s), los cuales son las siguientes:
					<br />
					<br />
					{data.payload.massive_seccion_update?.map((username, i) => (
						<React.Fragment>
							- {username}
							<br />
						</React.Fragment>
					))}
				</DialogContentText>
			);
		}else if (data.action === 'Matrícula cargada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) cargó la matrícula del curso <strong>{data.payload.curso}</strong> cargando <strong>{data.payload.studiends_count}</strong> estudiante(s), los cuales son las siguientes:
					<br />
					<br />
					{data.payload.studiends?.map((username, i) => (
						<React.Fragment>
							- {username}
							<br />
						</React.Fragment>
					))}
				</DialogContentText>
			);
		}else if (data.action === 'Usuario restaurado') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) restauró al siguiente usuario:
					<br />
					<br />
					<strong>Usuario:</strong> {data.payload.privilegio}{data.payload.username}.
					<br />
					<strong>Nombre:</strong> {data.payload.name}.
					<br />
					<strong>Correo:</strong> {data.payload.email}.
				</DialogContentText>
			);
		}else if (data.action === 'Usuarios restaurados masivamente') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) restauró <strong>{data.payload.users_restored_count}</strong> usuarios, los cuales son los siguiente:
					<br />
					<br />
					{data.payload.users_restored?.map((username, i) => (
						<React.Fragment>
							- {username}
							<br />
						</React.Fragment>
					))}
				</DialogContentText>
			);
		}else if (data.action === 'Usuario eliminado') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó al siguiente usuario del sistema:
					<br />
					<br />
					<strong>Usuario:</strong> {data.payload.privilegio}{data.payload.username}.
					<br />
					<strong>Nombre:</strong> {data.payload.name}.
					<br />
					<strong>Correo:</strong> {data.payload.email}.
				</DialogContentText>
			);
		}else if (data.action === 'Usuarios eliminados masivamente') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó <strong>{data.payload.users_destroy_count}</strong> usuarios, los cuales son los siguiente:
					<br />
					<br />
					{data.payload.users_destroy?.map((username, i) => (
						<React.Fragment>
							- {username}
							<br />
						</React.Fragment>
					))}
				</DialogContentText>
			);
		}else if (data.action === 'Carga de matricula') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) subió una matrícula al servidor y esta fue procesada.
				</DialogContentText>
			);
		}else {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) se realizó esta acción.
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