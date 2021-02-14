import React, { useState, useCallback } from 'react';

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

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Components
import AnimationDialog from '../../../components/AnimationDialog';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function UploadMatricula() {
	const [progress, setProgress] = useState(0);
	const { open, loading } = useSelector((state) => ({
		open: state.dialogs.uploadMatricula.open,
		loading: state.dialogs.uploadMatricula.loading,
	}));
	const dispatch = useDispatch();
	
	const { handleSubmit, register, errors, watch } = useForm();
	const { fetchData } = useFetch();
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('uploadMatricula', false, false));
		}
	}
	
	const onUploadProgress = useCallback((progressEvent) => {
		let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

		setProgress(percentCompleted);
		// eslint-disable-next-line
	}, []);
	
	const onSubmit = async submitData => {
		dispatch(updateDialogs('uploadMatricula', true, true));
		
		const formData = new FormData();
		formData.append('database', submitData.database[0]);
		
		const prepare = {
			url: 'v1/user/matricula',
			type: 'post',
			data: formData,
			otherData: {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: onUploadProgress,
			},
			variant: 'info'
		};

		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateDialogs('uploadMatricula', false, false));
		}else {
			dispatch(updateDialogs('uploadMatricula', true, false));
		}
		
		setProgress(0);
	}
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Cargar estudiantes</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<DialogContentText>El proceso de carga de matrícula es realizado en segundo plano. Si tienes dudas respecto al formato que debe usar al cargar estudiantes puede ver el formato correcto <Link color='primary' onClick={handleClose} component={RouteLink} to='/panel/preguntas-frecuentes'>aquí</Link>.</DialogContentText>
					</Grid>
					<Grid container alignItems='center' item xs={12}>
						<input
							id='matricula-upload-file'
							ref={register({
								required: { value: true, message: '* Debe subir un archivo' },
							})}
							defaultValue={null}
							style={{display: 'none'}}
							accept="application/vnd.ms-excel,application/vnd.oasis.opendocument.spreadsheet,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							name='database'
							type="file"
						/>
						<label htmlFor="matricula-upload-file">
							<Button variant='contained' color='secondary' component='span'>Cargar archivo</Button>
						</label>
						{Boolean(errors.database) && (
							<Box ml={2} color='#f44336'>
								<Typography >{errors.database.message}</Typography>
							</Box>
						)}
						{watch('database', []).length !== 0 && (
							<Box ml={2}>
								<Typography>Archivo cargado</Typography>
							</Box>
						)}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} disabled={loading}>Cancelar</Button>
				<LoadingComponent 
					loading={loading}
					progressLoading 
					progress={progress}
					color="inherit"
				>
					<Button onClick={handleSubmit(onSubmit)}>Subir</Button>
				</LoadingComponent>
			</DialogActions>
		</Dialog>
	);
}