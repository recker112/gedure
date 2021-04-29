import React, { useCallback } from 'react';

import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	Button,
	MenuItem,
} from '@material-ui/core';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Components
import {
	SelectHook,
} from '@form-inputs';
import AnimationDialog from '../../../components/AnimationDialog';
import LoadingComponent from '../../../components/LoadingComponent';
import { CursosList, SeccionList } from '../../../components/funciones/CursosList';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function UpdateSeccion({ tableRef }) {
	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.updateSeccion.open,
		loading: state.dialogs.updateSeccion.loading,
		data: state.dialogs.updateSeccion.data,
	}));
	const dispatch = useDispatch();
	
	const { handleSubmit, control } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const { fetchData } = useFetch();
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('updateSeccion', false, false));
		}
	}
	
	const onSubmit = async submitData => {
		dispatch(updateDialogs('updateSeccion', true, true));
		
		const prepare = {
			url: 'v1/massive/user/seccion',
			type: 'post',
			data: {
				...submitData,
				ids: data,
				_method: 'PUT',
			},
			message404Server: true,
		};

		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
			
			dispatch(updateDialogs('updateSeccion', false, false));
		}else {
			dispatch(updateDialogs('updateSeccion', true, false));
		}
	}
	
	const MenuItemList = CursosList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	const MenuItemList2 = SeccionList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Cambiar sección</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid container alignItems='center' item xs={12}>
						<DialogContentText>Ha seleccionado <strong>{data.length}</strong> estudiante(s), seleccione la sección a la que los desea cambiar.</DialogContentText>
					</Grid>
					<Grid item xs={12} sm={6}>
						<SelectHook
							name='curso'
							label='Curso'
							control={control}
							disabled={loading}
							fullWidth
						>
							<MenuItem value=''><em>Ninguno</em></MenuItem>
							{MenuItemList}
						</SelectHook>
					</Grid>
					<Grid item xs={12}  sm={6}>
						<SelectHook
							name='seccion'
							label='Sección'
							control={control}
							disabled={loading}
							fullWidth
						>
							<MenuItem value=''><em>Ninguno</em></MenuItem>
							{MenuItemList2}
						</SelectHook>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} disabled={loading}>Cancelar</Button>
				<LoadingComponent 
					loading={loading}
					color="inherit"
				>
					<Button onClick={handleSubmit(onSubmit)}>Cambiar</Button>
				</LoadingComponent>
			</DialogActions>
		</Dialog>
	);
}