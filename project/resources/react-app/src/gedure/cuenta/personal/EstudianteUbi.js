import React from 'react';

import {
	Box
} from '@material-ui/core';

// Components
import { PersonalEstudianteUbiForm } from '../../usuarios/show/personal-data/PersonalEstudianteUbi';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function Usuario() {
	const { loading, user } = useSelector((state) => ({
		loading: state.forms.updatePersonalStudiendUbi.loading,
		user: state.userData.user,
	}));
	
	const { control, errors, handleSubmit, watch } = useForm({
		mode: 'onTouched',
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalStudiendUbi', true));
		
		const prepare = {
			url: 'v1/user',
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT',
			},
			successText: 'Datos actualizados',
		};

		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateDataUser({
				user: response.user
			}));
		}
		
		dispatch(updateForms('updatePersonalStudiendUbi', false));
	}
	
	return (
		<Box mb={4}>
			<PersonalEstudianteUbiForm
				onSubmit={handleSubmit(onSubmit)}
				errors={errors}
				control={control}
				loading={loading}
				watch={watch}
				user={user}
				buttonText='Actualizar'
			/>
		</Box>
	);
}