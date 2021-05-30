import React from 'react';

import {
	Grid,
	Button,
	Divider,
	Box,
	Typography,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import {
	InputHook,
	RadioHook,
} from '@form-inputs';
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export function PersonalRepresentanteEmpleoForm(props) {
	const { 
		onSubmit, 
		user, 
		loading,
		control,
		watch, 
		buttonText, 
		buttonDisable
	} = props;
	
	return (
		<form onSubmit={onSubmit} autoComplete='off'>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Empleo del representante
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<RadioHook
						control={control}
						defaultValue={user.personal_data.repre_empleo || 'No'}
						disabled={loading}
						label='¿Tiene empleo?'
						name='personalData.repre_empleo'
						row
						radioList={[
							{
								value: 'Si',
								label: 'Si',
							},
							{
								value: 'No',
								label: 'No',
							}
						]}
					/>
				</Grid>
				{watch('personalData.repre_empleo', 'No') === 'Si' && (
					<React.Fragment>
						<Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 3, message: 'Error: Demaciado corto' },
									maxLength: { value: 30, message: 'Error: Demaciado largo' },
								}}
								defaultValue={user.personal_data.repre_empleo_profesion || ''}
								name='personalData.repre_empleo_profesion'
								label='Profesión'
								size='small'
								variant='outlined'
								fullWidth
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 3, message: 'Error: Demaciado corto' },
									maxLength: { value: 30, message: 'Error: Demaciado largo' },
								}}
								defaultValue={user.personal_data.repre_empleo_lugar || ''}
								name='personalData.repre_empleo_lugar'
								label='Lugar donde trabaja'
								size='small'
								variant='outlined'
								fullWidth
								disabled={loading}
							/>
						</Grid>
					</React.Fragment>
				)}
				{!buttonDisable && (
					<Grid container justify='flex-end' item xs={12}>
						<LoadingComponent loading={loading}>
							<Button 
								type='submit' 
								variant='contained' 
								color='primary'
								disableElevation
							>
								{buttonText}
							</Button>
						</LoadingComponent>
					</Grid>
				)}
			</Grid>
		</form>
	);
}

export default function PersonalRepresentanteEmpleo({ id }) {
	const { user, loading, userData } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalRepreEmpleo.loading,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { control, watch, handleSubmit } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalRepreEmpleo', true));
		
		if (submitData.personalData.repre_empleo === 'No') {
			submitData.personalData.repre_empleo_profesion = null;
			submitData.personalData.repre_empleo_lugar = null;
		}
		
		const prepare = {
			url: `v1/user/${id}`,
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT'
			},
			successText: 'Datos actualizados',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateForms('showUser', false, response));
			
			if (response.user?.id === userData.id) {
				dispatch(updateDataUser({
					user: response.user
				}));
			}
		}
		
		dispatch(updateForms('updatePersonalRepreEmpleo', false));
	}
	
	return (
		<PersonalRepresentanteEmpleoForm 
			onSubmit={handleSubmit(onSubmit)}
			control={control}
			watch={watch}
			loading={loading}
			buttonText='Actualizar'
			user={user}
		/>
	)
}