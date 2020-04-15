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

function ShowInfoVersion() {
	//Open
	const [open, setOpen] = useState(true);
	
	//Resolution RESPONSIVE DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	//Variables
	let Dtitle = '';
	let Dcontent = '';
	const dataContent = [
		{
			id: 'v4.0Alpha.3',
			title: 'v4.0Alpha.3',
			content: <div>
				<div>
					<h3>Bienvenidos a la v4.0Alpha.3 de la página web</h3>
				</div>
				<p>
					Novedades:
					<br/>
					- Nueva interfaz.
					<br/>
					- Modo oscuro.
					<br/>
					- Mejora en la carga de la página.
					<br/>
					<br/>
					Esta página se encuentra en Alpha, eso quiere decir que muchas de las funciones de la anteriór versión no están disponibles, si lo desea puede volver a la versión anterior del la página, pero recuerde que esa versión dejará de tener soporte. 
				</p>
			</div>
		}
	];

	//Seleccionar contenido
	dataContent.map(object => {
		if ('v4.0Alpha.3' === object.id) {
			Dtitle = object.title;
			Dcontent = object.content;
		}

		return null;
	});

	//HANDLE
	const handleClose = e => {
		setOpen(false);
	};
	
	const handleReturn = e => {
		window.location.replace(`http://old.${process.env.MIX_APP_URL}`);
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
			<DialogTitle id="info-title-dialog">{Dtitle}</DialogTitle>
			<DialogContent dividers={true}>
				<DialogContentText id="info-description-dialog">
					{Dcontent}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" onClick={handleReturn}>
					Volver a la antigua versión
				</Button>
				<Button color="primary" onClick={handleClose}>
					Entendido
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ShowInfoVersion;