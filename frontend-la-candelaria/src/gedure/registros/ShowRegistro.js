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
import converterCursoCode from '../../components/funciones/converterCursoCode';
import { parseToAccountString } from '../../components/funciones/ParseString';

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
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) cerró todas sus sesiones (<strong>{data.payload.tokens}</strong>) dentro del sistema.
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
		}else if (data.action === 'Usuario invitado') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) invitó a un usuario con los siguientes datos:
					<br />
					<br />
					<strong>Usuario:</strong> {data.payload.privilegio}{data.payload.username}.
					<br />
					<strong>Nombre:</strong> {data.payload.name}.
					<br />
					<strong>Correo:</strong> {data.payload.email}.
				</DialogContentText>
			);
		}else if (data.action === 'Contraseña creada por invitación') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) creó una contraseña por medio de la invitación via correo.
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
		}else if (data.action === 'Curso creado') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) creó el curso <strong>{data.payload.curso}</strong>.
				</DialogContentText>
			);
		}else if (data.action === 'Curso eliminado') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó el curso <strong>{data.payload.curso}</strong>, borrando <strong>{data.payload.boletas}</strong> boletas del sistema.
				</DialogContentText>
			);
		}else if (data.action === 'Cursos eliminados masivamente') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó <strong>{data.payload.cursos}</strong> cursos, los cuales fueron los siguientes:
					<br />
					<br />
					{data.payload.names?.map((code, i) => (
						<React.Fragment>
							- {code}
							<br />
						</React.Fragment>
					))}
				</DialogContentText>
			);
		}else if (data.action === 'Boletas cargadas') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) cargó <strong>{data.payload.boletas}</strong> boletas al sistema.
				</DialogContentText>
			);
		}else if (data.action === 'Boleta editada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) editó la boleta <strong>{converterCursoCode(data.payload.curso)} {data.payload.seccion} - {data.payload.lapso}° Lapso</strong> del estudiante <strong>{data.payload.name}</strong> ({data.payload.username}).
				</DialogContentText>
			);
		}else if (data.action === 'Boleta eliminada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó la boleta <strong>{converterCursoCode(data.payload.curso)} {data.payload.seccion} - {data.payload.lapso}° Lapso</strong> del estudiante <strong>{data.payload.name}</strong> ({data.payload.username}).
				</DialogContentText>
			);
		}else if (data.action === 'Boletas eliminadas masivamente') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó <strong>{data.payload.boletas}</strong> del sistema.
				</DialogContentText>
			);
		}else if (data.action === 'Solicitud de contácto eliminada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó la solicitud de contácto <strong>{data.payload.asunto}</strong>, la cual fue escrita por <strong>{data.payload.nombre}</strong> ({data.payload.email}).
				</DialogContentText>
			);
		}else if (data.action === 'Cuenta bancaria agregada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) agregó al sistema la cuenta bancaria <strong>{parseToAccountString(data.payload.n_account)}</strong> ({data.payload.name}).
				</DialogContentText>
			);
		}else if (data.action === 'Cuenta bancaria actualizada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) actualizó los datos de la cuenta bancaria <strong>{parseToAccountString(data.payload.n_account)}</strong> ({data.payload.name}).
				</DialogContentText>
			);
		}else if (data.action === 'Cuenta bancaria eliminada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó la cuenta bancaria <strong>{parseToAccountString(data.payload.n_account)}</strong> ({data.payload.name}).
				</DialogContentText>
			);
		}else if (data.action === 'Cuentas bancarias eliminadas masivamente') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó <strong>{data.payload.count}</strong> cuentas bancarias, las cuales fueron los siguientes:
					<br />
					<br />
					{data.payload.accounts?.map((data, i) => (
						<React.Fragment>
							- <strong>{parseToAccountString(data.payload.n_account)}</strong> ({data.name})
							<br />
						</React.Fragment>
					))}
				</DialogContentText>
			);
		}else if (data.action === 'Transacción bancaria eliminada') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó la transacción bancaria <strong>#{data.payload.id}</strong> la cual contenia los siguientes datos:
					<br />
					<br />
					<strong>Concepto:</strong> {data.payload.concepto}
					<br />
					<strong>Referencia:</strong> {data.payload.reference}
					<br />
					<strong>Monto:</strong> {data.payload.amount}
					<br />
					<strong>Banco:</strong> {data.payload.code}
					<br />
					<strong>Fecha de la transacción:</strong> {data.payload.date}
				</DialogContentText>
			);
		}else if (data.action === 'Transacciones bancarias eliminadas masivamente') {
			return (
				<DialogContentText>
					El día <strong>{data.date}</strong> a las <strong>{data.hours}</strong> el usuario <strong>{data.name}</strong> ({data.username}) eliminó <strong>{data.payload.count}</strong> transacciones bancarias, las cuales fueron los siguientes:
					{data.payload.transactions?.map((data, i) => (
						<React.Fragment>
							<br />
							<br />
							<strong>#{data.id}</strong>
							<br />
							<strong>Concepto:</strong> {data.concepto}
							<br />
							<strong>Referencia:</strong> {data.reference}
							<br />
							<strong>Monto:</strong> {data.amount}
							<br />
							<strong>Banco:</strong> {data.code}
							<br />
							<strong>Fecha de la transacción:</strong> {data.date}
						</React.Fragment>
					))}
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