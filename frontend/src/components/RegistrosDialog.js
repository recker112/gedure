//React
import React, { useState, useEffect } from 'react';

//Material-UI
import {
	Dialog,
	DialogContentText,
	DialogActions,
	DialogTitle,
	DialogContent,
	Button,
	CircularProgress,
	Slide
} from '@material-ui/core';

//Animación
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function RegistrosDialog({ open, action, cedula }) {
	const [loading, setLoading] = useState(true);
	const [statusReq, setStatusReq] = useState({});

	const fetchData = async () => {
		//AQUI va la petición hacia el servidor.
		setTimeout(() => {
			setLoading(false);
			setStatusReq({status: true, reason: ''});
		}, 2000);
	};

	useEffect(
		() => {
			if (open) {
				setLoading(true);
				fetchData();
			}
		},
		[open]
	);

	return (
		<Dialog
			open={open}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			TransitionComponent={Transition}
		>
			<DialogTitle id="alert-dialog-title">Desbloqueo</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{loading ? (
						'Desbloqueando, espere un momento....'
					) : statusReq.status ? (
						`La cuenta con la cédula ${cedula} fue desbloqueada!!`
					) : (
						`La cédula no se ha podido desbloquear por el siguiente motivo: ${statusReq.reason}`
					)}
				</DialogContentText>

				{loading ? <CircularProgress /> : null}
			</DialogContent>
			<DialogActions>
				{loading ? null : (
					<Button onClick={action} color="primary">
						Entendido
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
}

export default RegistrosDialog;