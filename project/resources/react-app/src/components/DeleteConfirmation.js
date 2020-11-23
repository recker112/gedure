import React from 'react';

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from '@material-ui/core';

import AnimationDialog from './AnimationDialog';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../actions/updateDialogs';

function DeleteConfirmation({ action, callback }) {
	const { open, loading } = useSelector((state) => ({
		open: state.dialogs.deleteConfirmation.open,
		loading: state.dialogs.deleteConfirmation.loading,
	}));
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(updateDialogs('deleteConfirmation', false, false));
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={AnimationDialog}
			aria-labelledby="confirm-dialog-title"
			aria-describedby="confirm-dialog-description"
		>
			<DialogTitle id="confirm-dialog-title">¿Seguro?</DialogTitle>
			<DialogContent>
				<DialogContentText id="confirm-dialog-description">
					Una vez realizada la acción "{action}" no se podrán deshacer los cambios.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button disabled={loading} onClick={handleClose} color="secondary">
					Cancelar
				</Button>
				<Button
					disabled={loading}
					onClick={() => {
						dispatch(updateDialogs('deleteConfirmation', true, true));
						callback();
					}}
					color="primary"
				>
					Realizar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default DeleteConfirmation;