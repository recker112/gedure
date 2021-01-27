import React, { useState, useCallback } from 'react';

import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	Button,
	MenuItem,
	Typography,
	Box,
} from '@material-ui/core';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Components
import AnimationDialog from '../../../components/AnimationDialog';
import LoadingComponent from '../../../components/LoadingComponent';
import { RenderSelectFormHook } from '../../../components/RendersGlobals';
import { LapsoList } from '../../../components/funciones/CursosList';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function UploadBoletas({ tableRef }) {
	const [progress, setProgress] = useState(0);
	const { open, loading } = useSelector((state) => ({
		open: state.dialogs.uploadBoletas.open,
		loading: state.dialogs.uploadBoletas.loading,
	}));
	const dispatch = useDispatch();
	
	const { handleSubmit, control, register, errors } = useForm();
	const { fetchData } = useFetch();
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('uploadBoletas', false, false));
		}
	}
	
	const onUploadProgress = useCallback((progressEvent) => {
		let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

		setProgress(percentCompleted);
		// eslint-disable-next-line
	}, []);
	
	const onSubmit = async submitData => {
		dispatch(updateDialogs('uploadBoletas', true, true));
		
		const formData = new FormData();
		formData.append('boletas', submitData.boletas[0]);
		formData.append('lapso', submitData.lapso);
		
		const prepare = {
			url: 'v1/boleta',
			type: 'post',
			data: formData,
			otherData: {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: onUploadProgress,
			},
		};

		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
			
			dispatch(updateDialogs('uploadBoletas', false, false));
		}else {
			dispatch(updateDialogs('uploadBoletas', true, false));
		}
		
		setProgress(0);
	}
	
	const MenuItemList = LapsoList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Cargar boletas</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<DialogContentText>Recuerde que debe comprimir en <strong>ZIP</strong> todas las boletas que desee cargar.</DialogContentText>
					</Grid>
					<Grid container alignItems='center' item xs={12}>
						<input
							id='boletas-upload-file'
							ref={register({
								required: { value: true, message: '* Debe subir un archivo' },
							})}
							defaultValue={null}
							style={{display: 'none'}}
							accept="application/zip"
							name='boletas'
							type="file"
						/>
						<label htmlFor="boletas-upload-file">
							<Button variant='contained' color='secondary' component='span'>Cargar archivo</Button>
						</label>
						{Boolean(errors.boletas) && (
							<Box ml={2} color='#f44336'>
								<Typography >{errors.boletas.message}</Typography>
							</Box>
						)}
					</Grid>
					<Grid item xs={12}>
						<RenderSelectFormHook
							id='boletas-lapso'
							name='lapso'
							nameLabel='Lapso'
							control={control}
							defaultValue=''
							errors={errors?.lapso}
							disabled={loading}
						>
							<MenuItem value=''><em>Ninguno</em></MenuItem>
							{MenuItemList}
						</RenderSelectFormHook>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} disabled={loading}>Cerrar</Button>
				<Box>
					<LoadingComponent 
						loading={loading}
						progressLoading 
						progress={progress}
						color="inherit"
					>
						<Button onClick={handleSubmit(onSubmit)}>Subir</Button>
					</LoadingComponent>
				</Box>
			</DialogActions>
		</Dialog>
	);
}