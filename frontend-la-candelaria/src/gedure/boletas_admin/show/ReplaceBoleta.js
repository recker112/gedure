import React, { useState, useCallback } from 'react';

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
} from '@material-ui/core';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Components
import AnimationDialog from '../../../components/AnimationDialog';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function ReplaceBoleta({ handleRefresh, name }) {
	const [progress, setProgress] = useState(0);
	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.replaceBoleta.open,
		loading: state.dialogs.replaceBoleta.loading,
		data: state.dialogs.replaceBoleta.data,
	}));
	const dispatch = useDispatch();
	
	const { handleSubmit, register, errors } = useForm();
	const { fetchData } = useFetch();
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('replaceBoleta', false, false));
		}
	}
	
	const onUploadProgress = useCallback((progressEvent) => {
		let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

		setProgress(percentCompleted);
		// eslint-disable-next-line
	}, []);
	
	const onSubmit = async submitData => {
		dispatch(updateDialogs('replaceBoleta', true, true));
		
		const formData = new FormData();
		formData.append('boleta', submitData.boleta[0]);
		formData.append('_method', 'PUT');
		
		const prepare = {
			url: `v1/boleta/${data.id}`,
			type: 'post',
			data: formData,
			otherData: {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: onUploadProgress,
			}
		};

		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateDialogs('replaceBoleta', false, false));
			handleRefresh();
		}else {
			dispatch(updateDialogs('replaceBoleta', true, false));
		}
		
		setProgress(0);
	}
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>¿Seguro?</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<DialogContentText>Está a punto de reemplazar la boleta <strong>{data.curso} {data.seccion} {data.lapso}° Lapso</strong> de <strong>{name}</strong>. Tenga en cuenta que al reemplazar la boleta se borrará la anterior.</DialogContentText>
					</Grid>
					<Grid container alignItems='center' item xs={12}>
						<input
							id='boleta-upload-file'
							ref={register({
								required: { value: true, message: '* Debe subir un archivo' },
							})}
							defaultValue={null}
							style={{display: 'none'}}
							accept="application/pdf"
							name='boleta'
							type="file"
						/>
						<label htmlFor="boleta-upload-file">
							<Button variant='contained' color='secondary' component='span'>Cargar archivo</Button>
						</label>
						{Boolean(errors.boleta) && (
							<Box ml={2} color='#f44336'>
								<Typography >{errors.boleta.message}</Typography>
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
					<Button onClick={handleSubmit(onSubmit)}>Cambiar</Button>
				</LoadingComponent>
			</DialogActions>
		</Dialog>
	);
}