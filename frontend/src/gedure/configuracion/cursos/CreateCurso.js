import React, { useCallback } from 'react';

import { 
	Grid,
	Typography,
	Paper,
	Box,
	Button,
	MenuItem
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Components
import {
	SelectHook,
} from '@form-inputs';
import { CursosList, SeccionList } from '../../../components/funciones/CursosList';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';

export default function CreateCurso({ tableRef }) {
	const { loading, permissions } = useSelector((state) => ({
		loading: state.forms.crearCurso.loading,
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const { control, handleSubmit } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch();
	
	const MenuItemList = CursosList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	const MenuItemList2 = SeccionList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	const onSubmit = async submitData => {
		dispatch(updateForms('crearCurso', true));
		
		const prepare = {
			url: 'v1/curso',
			type: 'post',
			data: submitData,
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		dispatch(updateForms('crearCurso', false));
	}
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding'>
				<Typography variant='h6' className='text__bold--semi'>
					Agregar curso
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4}>
						<SelectHook
							name='curso'
							label='Curso'
							control={control}
							disabled={loading}
							fullWidth
						>
							<MenuItem value=''>
								<em>Ninguno</em>
							</MenuItem>
							{MenuItemList}
						</SelectHook>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<SelectHook
							name='seccion'
							label='Sección'
							control={control}
							disabled={loading}
							fullWidth
						>
							<MenuItem value=''>
								<em>Ninguno</em>
							</MenuItem>
							{MenuItemList2}
						</SelectHook>
					</Grid>
				</Grid>
				<Typography className='text__opacity--semi'>
					Agrege cursos al sistema para agrupar a sus estudiantes.
				</Typography>
				<Box mt={1} align='right'>
					<LoadingComponent loading={loading}>
						<Button
							variant='contained' 
							color='primary' 
							disableElevation
							onClick={handleSubmit(onSubmit)}
							disabled={!permissions?.gedure?.cursos_create}
						>
							Agregar
						</Button>
					</LoadingComponent>
				</Box>
			</Paper>
		</Grid>
	);
}