import React, { useState } from 'react';

//Material-UI
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	Slide,
	useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//Animación
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function ShowInfoVersion({ open, setOpen }) {
	
	//Resolution RESPONSIVE DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	//HANDLE
	const handleClose = e => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll="paper"
			fullScreen={fullScreen}
			//Insertar animación
			TransitionComponent={Transition}
			aria-labelledby="info-title-dialog"
			aria-describedby="info-description-dialog"
		>
			<DialogTitle id="info-title-dialog">v4.0.0-Beta.0</DialogTitle>
			<DialogContent dividers={true}>
				<DialogContentText id="info-description-dialog">
					<h3>Bienvenidos a la v4.0.0-Beta.0 de la página web</h3>
					<p>
						Novedades:
						<br/>
						- Todas las funcionalidades se encuentra disponibles.
						<br/>
						- Arreglos internos en el sistema.
						<br/>
					</p>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="primary" onClick={handleClose}>
					Entendido
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ShowInfoVersion;