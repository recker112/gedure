import React from 'react';

import {
	Box
} from '@material-ui/core';

// Components
import { PersonalMadreForm } from '../../usuarios/show/personal-data/PersonalMadre';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function Madre() {
	const { loading, user } = useSelector((state) => ({
		loading: state.forms.updatePersonalMadre.loading,
		user: state.userData.user,
	}));
	
	const { control, handleSubmit } = useForm({
		mode: 'onTouched',
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalMadre', true));
		
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
		
		dispatch(updateForms('updatePersonalMadre', false));
	}
	
	return (
		<Box mb={4}>
			<PersonalMadreForm 
				onSubmit={handleSubmit(onSubmit)}
				control={control}
				loading={loading}
				buttonText='Actualizar'
				user={user}
			/>
		</Box>
	);
}