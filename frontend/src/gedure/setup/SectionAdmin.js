import React from 'react';

import { useHistory } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Components
import { PersonalUsuarioForm } from '../usuarios/show/personal-data/PersonalUsuario';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateSteppersActive from '../../actions/updateSteppersActive';
import updateDataUser from '../../actions/updateDataUser';

export default function SectionAdmin() {
	const { user, loading } = useSelector((state) => ({
		user: state.userData.user,
		loading: state.steppers.setup.loading,
	}));
	
	const history = useHistory();
	
	const { control, handleSubmit, watch } = useForm({
		mode: 'onTouched',
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateSteppersActive('setup', null, true));
		
		if (submitData.personalData.docente === 'No') {
			submitData.personalData.docente_titulo = null;
			submitData.personalData.docente_ingreso = null;
			submitData.personalData.docente_ingreso_MPPE = null;
		}
		
		const prepare = {
			url: `v1/user`,
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT',
			},
			messageToFinish: false,
		};

		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateDataUser({
				user: response.user,
			}));
			
			history.push('/gedure');
		}
		
		dispatch(updateSteppersActive('setup', null, false));
	}
	
	return (
		<PersonalUsuarioForm
			onSubmit={handleSubmit(onSubmit)}
			buttonText='Activar cuenta'
			control={control}
			user={user}
			loading={loading}
			watch={watch}
		/>
	);
}