import React, { useEffect, useState } from 'react';

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

//Redux
import { connect } from 'react-redux';

//Components
import AnimationDialog from './AnimationDialog';

function ShowInfoContent({ 
	dataContent,
	privilegio,
	url
}) {
	//Resolution RESPONSIVE DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	//OpenDialog
	const [open, setOpen] = useState(false);
	
	//Verifi list and open dialog
	useEffect(()=> {
		const storage = JSON.parse(localStorage.getItem('notSeeInfoDialog'));
		
		//Verificar que exista el contenido actual en la lista
		const { only } = dataContent;
		let foundInList = false;
		dataContent.map((object) => {
			if (url === object.path) {
				object.only.map((onlyPrivilegio) => {
					if (onlyPrivilegio === privilegio) {
						foundInList = true;
					}
					
					return null;
				});
			}
			
			return null;
		})
		
		//Verificar si el usuario quiere seguir viendo esta info
		let unSee = !storage.includes(url);
		
		const openOnInit = foundInList && unSee;
		
		setOpen(openOnInit);
	}, [url]);
	
	//Variables
	let Dtitle = '';
	let Dcontent = '';

	//Seleccionar contenido
	dataContent.map(object => {
		if (url === object.path) {
			Dtitle = object.title;
			Dcontent = object.content;
		}

		return null;
	});

	//HANDLE
	const handleClose = (e) => {
		//Cerrar dialog
		setOpen(false);
	};
	
	const handleCloseAndNoSeeMore = () => {
		//Variable
		const dataStorage = JSON.parse(localStorage.getItem('notSeeInfoDialog'));

		//Verificar existencia de data
		if (dataStorage === null || dataStorage.length === 0) {
			//Setear dada
			localStorage.setItem('notSeeInfoDialog', JSON.stringify([url]));
		} else {
			//Buscador de iguales.
			let found = false;
			dataStorage.map(valueLocal => {
				if (url === valueLocal && !found) {
					found = true;
				}

				return null;
			});

			//Insertar si NO se encuentra.
			if (!found) {
				const newArray = JSON.stringify([...dataStorage, url]);
				localStorage.setItem('notSeeInfoDialog', newArray);
			}
		}

		//Cerrar dialog
		setOpen(false);
	}

	return (
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
			<DialogTitle id="info-title-dialog">{Dtitle}</DialogTitle>
			<DialogContent>
				<DialogContentText id="info-description-dialog">{Dcontent}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" onClick={handleCloseAndNoSeeMore}>
					No mostrar más
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
	privilegio: state.userData.privilegio,
	url: state.settings.showInfo.masterPath
});

export default connect(mapStateToProps)(ShowInfoContent);