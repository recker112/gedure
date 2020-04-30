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

//Components
import AnimationDialog from './AnimationDialog';

function ShowInfoVersion() {
	
	const [open, setOpen] = useState(false);
	
	//Resolution RESPONSIVE DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	//HANDLE
	const handleClose = e => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<span 
				onClick={()=>{setOpen(true)}}
				style={{cursor: 'pointer'}}
			>
				v4.0.0 Ver notas
			</span>
			<Dialog
				open={open}
				onClose={handleClose}
				scroll="paper"
				fullScreen={fullScreen}
				//Insertar animaciรณn
				TransitionComponent={AnimationDialog}
				aria-labelledby="info-title-dialog"
				aria-describedby="info-description-dialog"
			>
				<DialogTitle id="info-title-dialog">v4.0.0</DialogTitle>
				<DialogContent dividers={true}>
					<DialogContentText id="info-description-dialog">
						<h3>Bienvenidos a la v4.0.0 de la app web</h3>
						<p>
							Novedades:
							<br/>
							- Visor de imágenes disponible.
							<br/>
							- Compatibilidad con navegadores antiguos.
							<br/>
							- Cambio en la paleta de colores del modo oscuro.
							<br/>
							- Arreglo de algunos errores.
							<br/>
							- Sistema funcionando en su totalidad.
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
		</React.Fragment>
	);
}

export default ShowInfoVersion;