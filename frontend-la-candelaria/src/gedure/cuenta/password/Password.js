import React from 'react';

// Components
import { UserPasswordForm } from '../../usuarios/show/password/UserPassword';

import useFetch from '../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDataUser from '../../../actions/updateDataUser';

export default function Password() {
	const { loading } = useSelector((state) => ({
		loading: state.forms.updatePassword.loading,
	}));
	
	const { register, errors, handleSubmit, watch, setValue } = useForm({
		mode: 'onTouched',
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePassword', true));
		
		const prepare = {
			url: 'v1/user',
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT',
			},
			successText: 'Contraseña actualizada',
		};

		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateDataUser({
				user: response.user
			}));
		}
		
		dispatch(updateForms('updatePassword', false));
	}
	
	return (
		<UserPasswordForm
			onSubmit={handleSubmit(onSubmit)}
			register={register}
			errors={errors}
			loading={loading}
			setValue={setValue}
			watch={watch}
			helperText='* Campo requerido'
		/>
	);
}