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
import AnimationDialog from '../../../components/AnimationDialog';
import LoadingComponent from '../../../components/LoadingComponent';
import { RenderSelectFormHook } from '../../../components/RendersGlobals';
import { LapsoList } from '../../../components/funciones/CursosList';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function DeleteBoletas({ tableRef }) {
	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.deleteConfirmation.open,
		loading: state.dialogs.deleteConfirmation.loading,
		data: state.dialogs.deleteConfirmation.data,
	}));
	const dispatch = useDispatch();
	
	const { handleSubmit, control, errors } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch();
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('deleteConfirmation', false, false));
		}
	}
	
	const onSubmit = async submitData => {
		dispatch(updateDialogs('deleteConfirmation', true, true));
		
		const prepare = {
			url: `v1/massive/boleta?ids=${encodeURI(JSON.stringify(data))}&lapso=${submitData.lapso}`,
			type: 'delete',
		};

		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
			
			dispatch(updateDialogs('deleteConfirmation', false, false));
		}else {
			dispatch(updateDialogs('deleteConfirmation', true, false));
		}
	}
	
	const MenuItemList = LapsoList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Eliminar boletas</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<DialogContentText>Ha seleccionado a <strong>{data.length}</strong> estudiante(s) para eliminar su boleta de su curso actual, seleccione el lapso de la boleta a borrar:</DialogContentText>
					</Grid>
					<Grid container alignItems='center' item xs={12}>
						<RenderSelectFormHook
							id='boleta-lapso'
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
				<LoadingComponent 
					loading={loading}
					color="inherit"
				>
					<Button onClick={handleSubmit(onSubmit)}>Eliminar</Button>
				</LoadingComponent>
			</DialogActions>
		</Dialog>
	);
}