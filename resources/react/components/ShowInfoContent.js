import React, { useEffect, useState } from 'react';

//React Router
import {
  useRouteMatch,
	useLocation
} from "react-router-dom";

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
	defaultPath,
	privilegio,
	queryParams = false 
}) {
	//Resolution RESPONSIVE DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	//Query Param Select
	let query = useQuery();
	
	//Path
	let { url } = useRouteMatch();
	
	//Content
	let content;
	
	//Select content
	if (queryParams) {
		content = query.get(queryParams);
	}else {
		content = url;
	}
	
	//Verificar NULL
	if (content === null) {
		content = defaultPath;
	}
	
	//OpenDialog
	const [open, setOpen] = useState(false);
	
	//Verifi list and open dialog
	useEffect(()=> {
		const storage = JSON.parse(localStorage.getItem('noListStorage'));
		
		//Verificar que exista el contenido actual en la lista
		const { only } = dataContent;
		let foundInList = false;
		dataContent.map((object) => {
			if (content === object.id) {
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
		let unSee = !storage.includes(content);
		
		const openOnInit = foundInList && unSee;
		
		setOpen(openOnInit);
	}, [content]);
	
	//Variables
	let Dtitle = '';
	let Dcontent = '';

	//Seleccionar contenido
	dataContent.map(object => {
		if (content === object.id) {
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
		const dataStorage = JSON.parse(localStorage.getItem('noListStorage'));

		//Verificar existencia de data
		if (dataStorage === null || dataStorage.length === 0) {
			//Setear dada
			localStorage.setItem('noListStorage', JSON.stringify([content]));
		} else {
			//Buscador de iguales.
			let found = false;
			dataStorage.map(valueLocal => {
				if (content === valueLocal && !found) {
					found = true;
				}

				return null;
			});

			//Insertar si NO se encuentra.
			if (!found) {
				const newArray = JSON.stringify([...dataStorage, content]);
				localStorage.setItem('noListStorage', newArray);
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

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

//Redux
const mapStateToProps = state => ({
	privilegio: state.userData.privilegio
});

export default connect(mapStateToProps)(ShowInfoContent);