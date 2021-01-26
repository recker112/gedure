import React, { useCallback } from 'react';

import {
	Grid,
	Button,
	Divider,
	Box,
	Typography,
	MenuItem,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';
import { RenderSelectFormHook } from '../../../../components/RendersGlobals';
import { CursosList, SeccionList } from '../../../../components/funciones/CursosList';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export default function PersonalEstudianteData({ id }) {
	const { dataUser, loading, user } = useSelector((state) => ({
		dataUser: state.forms.showUser.data.user,
		loading: state.forms.updateCurso.loading,
		user: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { control, errors, handleSubmit } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updateCurso', true));
		
		const prepare = {
			url: `v1/user/${id}`,
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT'
			},
			successText: 'Curso actualizado',
			message404: 'Curso no creado aún',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateForms('showUser', false, response));
			
			if (response.user?.id === user.id) {
				dispatch(updateDataUser({
					user: response.user
				}));
			}
		}
		
		dispatch(updateForms('updateCurso', false));
	}

	const MenuItemList = CursosList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	const MenuItemList2 = SeccionList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Curso del estudiante
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSelectFormHook
						name='curso'
						nameLabel='Curso'
						control={control}
						defaultValue={dataUser.estudiante_data?.curso?.curso || ''} 
						errors={errors?.personalData?.estudi_estado_civil}
						disabled={loading}
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						{MenuItemList}
					</RenderSelectFormHook>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSelectFormHook
						name='seccion'
						nameLabel='Sección'
						control={control}
						defaultValue={dataUser.estudiante_data?.curso?.seccion || ''} 
						errors={errors?.personalData?.estudi_estado_civil}
						disabled={loading}
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						{MenuItemList2}
					</RenderSelectFormHook>
				</Grid>
				<Grid container justify='flex-end' item xs={12}>
					<LoadingComponent loading={loading}>
						<Button type='submit' variant='contained' color='primary'>
							Actualizar
						</Button>
					</LoadingComponent>
				</Grid>
			</Grid>
		</form>
	)
}