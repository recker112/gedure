import React from 'react';

// Components
import { PersonalPadreForm } from '../../usuarios/show/personal-data/PersonalPadre';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function Padre() {
	const { loading, user } = useSelector((state) => ({
		loading: state.forms.updatePersonalPadre.loading,
		user: state.userData.user,
	}));
	
	const { register, control, errors, handleSubmit } = useForm({
		mode: 'onTouched',
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalPadre', true));
		
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
		
		dispatch(updateForms('updatePersonalPadre', false));
	}
	
	return (
		<PersonalPadreForm
			onSubmit={handleSubmit(onSubmit)}
			register={register}
			control={control}
			errors={errors}
			loading={loading}
			buttonText='Actualizar'
			user={user}
		/>
	);
}