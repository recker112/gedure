import React from 'react';

import {
	Box
} from '@material-ui/core';

// Components
import { PersonalRepresentanteUbiForm } from '../../usuarios/show/personal-data/PersonalRepresentanteUbi';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function RepresentanteUbi() {
	const { loading, user } = useSelector((state) => ({
		loading: state.forms.updatePersonalRepreUbi.loading,
		user: state.userData.user,
	}));
	
	const { control, errors, handleSubmit, watch } = useForm({
		mode: 'onTouched',
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalRepreUbi', true));
		
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
		
		dispatch(updateForms('updatePersonalRepreUbi', false));
	}
	
	return (
		<Box mb={4}>
			<PersonalRepresentanteUbiForm 
				onSubmit={handleSubmit(onSubmit)}
				control={control}
				errors={errors}
				watch={watch}
				loading={loading}
				buttonText='Actualizar'
				user={user}
			/>
		</Box>
	);
}