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

export default function DialogConfirmation({ callback, children }) {
	const { open, loading } = useSelector((state) => ({
		open: state.dialogs.deleteConfirmation.open,
		loading: state.dialogs.deleteConfirmation.loading,
	}));
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(updateDialogs('deleteConfirmation', false, true));
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
					{children}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button disabled={loading} onClick={handleClose}>
					Cancelar
				</Button>
				<Button
					disabled={loading}
					onClick={() => {
						dispatch(updateDialogs('deleteConfirmation', true, true));
						callback(handleClose);
					}}
				>
					Confirmar
				</Button>
			</DialogActions>
		</Dialog>
	);
}