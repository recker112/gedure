import React from 'react';

// Components
import { PersonalUsuarioForm } from '../../usuarios/show/personal-data/PersonalUsuario';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function Usuario() {
	const { loading, user } = useSelector((state) => ({
		loading: state.forms.updatePersonalUser.loading,
		user: state.userData.user,
	}));
	
	const { register, control, errors, handleSubmit, watch } = useForm({
		mode: 'onTouched',
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalUser', true));
		
		if (submitData.personalData.docente === 'No') {
			submitData.personalData.docente_titulo = null;
			submitData.personalData.docente_ingreso = null;
			submitData.personalData.docente_ingreso_MPPE = null;
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
		
		dispatch(updateForms('updatePersonalUser', false));
	}
	
	return (
		<PersonalUsuarioForm 
			onSubmit={handleSubmit(onSubmit)}
			buttonText='Actualizar'
			control={control}
			register={register}
			user={user}
			loading={loading}
			errors={errors}
			watch={watch}
		/>
	);
}