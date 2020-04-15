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

//Animación
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function ShowInfoContent({ 
	dataContent, 
	defaultPath,
	noShowInfo = false, 
	queryParams = false 
}) {
	//Resolution RESPONSIVE DIALOG
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	//Query Param Select
	let query = useQuery();
	
	//Path
	let { path } = useRouteMatch();
	
	//Content
	let content;
	
	//Select content
	if (queryParams) {
		content = query.get(queryParams);
	}else {
		content = path;
	}
	
	//OpenDialog
	const [open, setOpen] = useState(false);
	
	//Verifi list and open dialog
	useEffect(()=> {
		//Verificar si se debe mostrar info.
		const noInfo = noShowInfo;
		
		let found = false;
		const storage = JSON.parse(localStorage.getItem('noListStorage'));
		
		//Verificar que la lista esté en array
		if (typeof noInfo === 'object') {
			//Verificar lista de los items a NO mostrar
			noInfo.map(itemContent => {
				if (content === itemContent && !found) {
					found = true;
				}

				return null;
			});
		}
		
		//Verificar que exista el contenido actual en la lista
		let foundInList = false;
		dataContent.map(object => {
			if (content === object.id) {
				foundInList = true;
			}

			return null;
		});
		
		//Verificar si el usuario quiere seguir viendo esta info
		let seeIt = true;
		storage.map(item => {
			if (content === item){
				seeIt = false;
			}
			
			return null;
		})
		
		//Fix null value
		if (!found && content === null) {
			found = true;
		}
		
		const openOnInit = !found && foundInList && seeIt;
		
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

export default ShowInfoContent;