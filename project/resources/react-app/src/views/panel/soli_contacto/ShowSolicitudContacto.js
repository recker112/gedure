import React from 'react';

import { 
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Typography,
	Button,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import AnimationDialog from '../../../components/AnimationDialog';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

function ShowSolicitudContacto() {
	const { open, data } = useSelector((state) => ({
		open: state.dialogs.showSoliContacto.open,
		data: state.dialogs.showSoliContacto.data,
	}));
	const dispatch = useDispatch();
	
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	const handleClose = () => {
		dispatch(updateDialogs('showSoliContacto', false, false, {}));
	}
	
	function createMarkup() {
		return { __html: data.content};
	}
	
	return (
		<Dialog 
			open={open} 
			TransitionComponent={AnimationDialog} 
			maxWidth='sm'
			fullWidth
			fullScreen={fullScreen} 
			onClose={handleClose}
			arial_labelledby='show-data-contacto'
		>
			<DialogTitle id='show-data-contacto'>Información del mensaje</DialogTitle>
			<DialogContent dividers>
				<DialogContentText>
					<Typography color='secondary' className='text__bold--semi'>
						Asunto:
					</Typography>
					{data.asunto}
				</DialogContentText>
				<DialogContentText>
					<Typography color='secondary' className='text__bold--semi'>Nombre del solicitante: </Typography>
					{data.nombre}
				</DialogContentText>
				<DialogContentText>
					<Typography color='secondary' className='text__bold--semi'>
						Correo:
					</Typography>
					{data.email}
				</DialogContentText>
				<DialogContentText>
					<Typography color='secondary' className='text__bold--semi'>
						Teléfono:
					</Typography>
					+58 {data.telefono}
				</DialogContentText>
				<DialogContentText>
					<Typography color='secondary' className='text__bold--semi'>
						Contenido del mensaje:
					</Typography>
					<span dangerouslySetInnerHTML={createMarkup()}></span>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={handleClose}>
					Cerrar
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ShowSolicitudContacto;