import React, { useEffect } from 'react';

import {
	Grid,
	Button,
	Divider,
	Box,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import PermissionsSection from '../../index/PermissionsSection';
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export default function UserPermisos({ id }) {
	const { dataUser, loading, user } = useSelector((state) => ({
		dataUser: state.forms.showUser.data,
		loading: state.forms.updatePermissions.loading,
		user: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { control, register, handleSubmit, setValue } = useForm();
	
	const { fetchData } = useFetch();
	
	useEffect(() => {
		register('privilegio');
		setValue('privilegio', dataUser.user.privilegio);
		// eslint-disable-next-line
	},[]);
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePermissions', true));
		
		const prepare = {
			url: `v1/user/${id}`,
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT',
			},
			successText: 'Permisos actualizados',
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
		
		dispatch(updateForms('updatePermissions', false));
	}
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>
					Permisos de la cuenta
				</Box>
				<Divider />
			</Grid>
			<PermissionsSection 
				control={control} 
				disabled={loading} 
				defaultData={dataUser.permissions}
				setValue={setValue}
			/>
			<Grid container justify='flex-end' item xs={12}>
				<LoadingComponent loading={loading}>
					<Button onClick={handleSubmit(onSubmit)} variant='contained' color='primary' disableElevation>
						Actualizar permisos
					</Button>
				</LoadingComponent>
			</Grid>
		</Grid>
	);
}