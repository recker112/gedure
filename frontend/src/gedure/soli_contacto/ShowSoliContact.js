import React from 'react';

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

export default function ShowSoliContact() {
	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.showSoliContact.open,
		loading: state.dialogs.showSoliContact.loading,
		data: state.dialogs.showSoliContact.data,
	}));
	const dispatch = useDispatch();
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('showSoliContact', false, false));
		}
	}
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Solicitud #{data.id}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<strong>Nombre:</strong> {data.nombre}
					<br />
					<strong>Asunto:</strong> {data.asunto}
					<br />
					<strong>Correo:</strong> {data.email}
					<br />
					<strong>Teléfono:</strong> {data.telefono}
					<br />
					<strong>Fecha de solicitud:</strong> {data.created_at}
					<br />
					<br />
					<strong>Mensaje:</strong>
					<br />
					{data.content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} disabled={loading}>
					Entendido
				</Button>
			</DialogActions>
		</Dialog>
	);
}