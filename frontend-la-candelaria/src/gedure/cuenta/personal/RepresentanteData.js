import React from 'react';

import {
	Box
} from '@material-ui/core';

// Components
import { PersonalRepresentanteDataForm } from '../../usuarios/show/personal-data/PersonalRepresentanteData';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function RepresentanteData() {
	const { loading, user } = useSelector((state) => ({
		loading: state.forms.updatePersonalRepre.loading,
		user: state.userData.user,
	}));
	
	const { control, handleSubmit } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalRepre', true));
		
		if (submitData.personalData.repre_nacionalidad === 'E') {
			submitData.personalData.repre_ubi_estado = null;
			submitData.personalData.repre_ubi_municipio = null;
			submitData.personalData.repre_ubi_parroquia = null;
			submitData.personalData.repre_ubi_via = null;
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
		
		dispatch(updateForms('updatePersonalRepre', false));
	}
	
	return (
		<Box mb={4}>
			<PersonalRepresentanteDataForm
				onSubmit={handleSubmit(onSubmit)}
				control={control}
				loading={loading}
				buttonText='Actualizar'
				user={user}
			/>
		</Box>
	);
}