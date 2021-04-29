import React from 'react';

// Components
import { PersonalEstudianteOtrosForm } from '../../usuarios/show/personal-data/PersonalEstudianteOtros';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function EstudianteOtros() {
	const { loading, user } = useSelector((state) => ({
		loading: state.forms.updatePersonalStudiendOtros.loading,
		user: state.userData.user,
	}));
	
	const { control, handleSubmit, watch } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalStudiendOtros', true));
		
		if (submitData.personalData.estudi_otros_alojado === 'Si') {
			submitData.personalData.estudi_otros_direccion = null;
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
		
		dispatch(updateForms('updatePersonalStudiendOtros', false));
	}
	
	return (
		<PersonalEstudianteOtrosForm
			onSubmit={handleSubmit(onSubmit)}
			control={control}
			watch={watch}
			loading={loading}
			buttonText='Actualizar'
			user={user}
		/>
	);
}