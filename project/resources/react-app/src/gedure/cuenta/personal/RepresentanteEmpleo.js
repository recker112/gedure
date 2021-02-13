import React from 'react';

// Components
import { PersonalRepresentanteEmpleoForm  } from '../../usuarios/show/personal-data/PersonalRepresentanteEmpleo';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function RepresentanteEmpleo() {
	const { loading, user } = useSelector((state) => ({
		loading: state.forms.updatePersonalRepreEmpleo.loading,
		user: state.userData.user,
	}));
	
	const { register, errors, handleSubmit, watch } = useForm({
		mode: 'onTouched',
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalRepreEmpleo', true));
		
		if (submitData.personalData.repre_empleo === 'No') {
			submitData.personalData.repre_empleo_profesion = null;
			submitData.personalData.repre_empleo_lugar = null;
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
		
		dispatch(updateForms('updatePersonalRepreEmpleo', false));
	}
	
	return (
		<PersonalRepresentanteEmpleoForm
			onSubmit={handleSubmit(onSubmit)}
			register={register}
			errors={errors}
			watch={watch}
			loading={loading}
			buttonText='Actualizar'
			user={user}
		/>
	);
}