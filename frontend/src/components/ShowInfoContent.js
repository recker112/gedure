import React from 'react';

//Material-UI
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	Slide
} from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import updateInfoDialog from '../actions/panel/updateInfoDialog';

//Animación
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function ShowInfoContent({ infoDialog, updateInfoDialog, content }) {
	//Variables
	let Dtitle = '';
	let Dcontent = '';
	const dataContent = [
		{
			id: 'reg',
			title: 'Registros',
			content:
				'Muestra todos los movimientos realizados en toda la app, desde inicios de sesión hasta movimientos en la matrícula.'
		},
		{
			id: 'co/mo',
			title: 'Consultar y Modificar',
			content:
				'Permite modificar a los estudiantes de una sección, y muestra una lista de los estudantes existentes en una sección.'
		},
		{
			id: 'upload',
			title: 'Cargar',
			content: 'Permite cargar boletas o matricula en el servidor, modificando las ya existentes.'
		},
		{
			id: 'options',
			title: 'Opciones',
			content: 'Configurar algunas opciones del estudiante o una sección completa.'
		},
		{
			id: 'files',
			title: 'Archivos',
			content: 'Cargar o eliminar los archivos los descargables por el estudiante.'
		},
		{
			id: 'delete',
			title: 'Eliminar',
			content: 'Elimina boletas, o secciones del sistema.'
		},
		{
			id: 'notice',
			title: 'Publicar',
			content: 'Publica un auncio o una noticia nueva.'
		},
		{
			id: 'deleteNotices',
			title: 'Borrar publicación',
			content: 'Permite eliminar una noticia o anuncio publicado'
		}
	];

	//Seleccionar contenido
	dataContent.map(object => {
		if (content === object.id) {
			Dtitle = object.title;
			Dcontent = object.content;
		}

		return null;
	});

	//HANDLE
	const handleClose = e => {
		//Obtener variable
		const value = e.target.dataset.content;

		//Verificar que esté definina
		if (typeof value !== 'undefined') {
			//Variable
			const data = localStorage.getItem('noListStorage');

			//Verificar existencia de data
			if (data === null || data.length > 0) {
				//Setear dada
				localStorage.setItem('noListStorage', JSON.stringify([value]));
			} else {
				const storage = JSON.parse(localStorage.getItem('noListStorage'));
				//Buscador de iguales.
				let found = false;
				storage.map(valueLocal => {
					if (value === valueLocal && !found) {
						found = true;
					}

					return null;
				});

				//Insertar si NO se encuentra.
				if (!found) {
					const newArray = JSON.stringify([...storage, value]);
					localStorage.setItem('noListStorage', newArray);
				}
			}

			//Cerrar dialog
			updateInfoDialog();
		} else {
			//Cerrar dialog
			updateInfoDialog();
		}
	};

	return (
		<Dialog
			open={infoDialog}
			onClose={handleClose}
			scroll="paper"
			//Insertar animación
			TransitionComponent={Transition}
			aria-labelledby="info-title-dialog"
			aria-describedby="info-description-dialog"
		>
			<DialogTitle id="info-title-dialog">{Dtitle}</DialogTitle>
			<DialogContent>
				<DialogContentText id="info-description-dialog">{Dcontent}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" onClick={handleClose}>
					<span data-content={content}>No mostrar más</span>
				</Button>
				<Button color="primary" onClick={handleClose}>
					Entendido
				</Button>
			</DialogActions>
		</Dialog>
	);
}

//Redux
const mapStateToProps = state => ({
	infoDialog: state.panelSettings.infoDialog,
	content: state.panelSettings.content
});

const mapDispatchToProps = {
	updateInfoDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowInfoContent);