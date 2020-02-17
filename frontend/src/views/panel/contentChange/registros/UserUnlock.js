import React, { useState, useEffect } from 'react';

//Material-UI
import {
	IconButton,
	Tooltip,
	Dialog,
	DialogContentText,
	DialogActions,
	DialogTitle,
	DialogContent,
	Button,
	CircularProgress
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

function UserUnlock({ cedula }) {
	const [openDialog, setOpenDialog] = useState(false);

	function handleClick(cedula) {
		setOpenDialog(!openDialog);
	}

	return (
		<React.Fragment>
			<Tooltip title="Desbloquear" placement="right" enterDelay={1000} leaveDelay={200} arrow>
				<IconButton
					variant="outlined"
					color="secondary"
					onClick={() => {
						handleClick(cedula);
					}}
				>
					<LockIcon />
				</IconButton>
			</Tooltip>
			<UnLockDialog open={openDialog} action={handleClick} cedula={cedula} />
		</React.Fragment>
	);
}

function UnLockDialog({ open, action, cedula }) {
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		//AQUI va la petición hacia el servidor.
		setTimeout(() => {
			setLoading(false);
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
			onClose={action}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Desbloquear</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{loading ? (
						'Desbloqueando, espere un momento....'
					) : (
						`La cuenta con la cédula ${cedula} fue desbloqueada!!`
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

export default UserUnlock;