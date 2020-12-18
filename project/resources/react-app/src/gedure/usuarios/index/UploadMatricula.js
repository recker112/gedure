import React from 'react';

import { Link as RouteLink } from 'react-router-dom';

import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	Button,
	Box,
	Typography,
	Link,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

// Components
import AnimationDialog from '../../../components/AnimationDialog';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function UploadMatricula() {
	const { open } = useSelector((state) => ({
		open: state.dialogs.uploadMatricula.open,
	}));
	const dispatch = useDispatch();
	
	const { handleSubmit, register, errors } = useForm();
	
	const handleClose = () => {
		dispatch(updateDialogs('uploadMatricula', false, false));
	}
	
	const onSubmit = submitData => {
		console.log(submitData);
	}
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Cargar estudiantes</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid container alignItems='center' item xs={12}>
						<input
							id='matricula-upload-file'
							ref={register({
								required: { value: true, message: '* Debe subir un archivo' },
							})}
							defaultValue={null}
							style={{display: 'none'}}
							accept="application/vnd.ms-excel,application/vnd.oasis.opendocument.spreadsheet,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							name='matricula'
							type="file"
						/>
						<label htmlFor="matricula-upload-file">
							<Button variant='contained' color='secondary' component='span'>Cargar archivo</Button>
						</label>
						{Boolean(errors.matricula) && (
							<Box ml={2} color='#f44336'>
								<Typography >{errors.matricula.message}</Typography>
							</Box>
						)}
					</Grid>
					<Grid item xs={12}>
						<DialogContentText>Si tienes dudas respecto al formato que debe usar al cargar estudiantes puede ver el formato correcto <Link color='primary' onClick={handleClose} component={RouteLink} to='/panel/preguntas-frecuentes'>aquí</Link>.</DialogContentText>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button onClick={handleSubmit(onSubmit)}>Cargar</Button>
			</DialogActions>
		</Dialog>
	);
}