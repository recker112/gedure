import React from 'react';

import {
	Box
} from '@material-ui/core';

// Components
import { PersonalEstudianteDataForm } from '../../usuarios/show/personal-data/PersonalEstudianteData';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function EstudianteData() {
	const { loading, user } = useSelector((state) => ({
		loading: state.forms.updatePersonalStudiend.loading,
		user: state.userData.user,
	}));
	
	const { control, handleSubmit, watch } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalStudiend', true));
		
		if (submitData.personalData.estudi_nacionalidad !== 'V') {
			submitData.personalData.estudi_nacimiento_estado = null;
		}
		
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
		
		dispatch(updateForms('updatePersonalStudiend', false));
	}
	
	return (
		<Box mb={4}>
			<PersonalEstudianteDataForm
				onSubmit={handleSubmit(onSubmit)}
				control={control}
				loading={loading}
				watch={watch}
				user={user}
				buttonText='Actualizar'
			/>
		</Box>
	);
}