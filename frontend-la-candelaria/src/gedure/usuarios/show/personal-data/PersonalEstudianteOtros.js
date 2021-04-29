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

export function PersonalEstudianteOtrosForm(props) {
	const {
		onSubmit, 
		loading,
		user, 
		watch,
		control,
		buttonText, 
		buttonDisable
	} = props;
	
	return (
		<form onSubmit={onSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Otros datos del estudiante
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<RadioHook
						control={control}
						defaultValue={user.personal_data.estudi_otros_canaima || 'No'}
						disabled={loading}
						label='¿Tiene canaima?'
						name='personalData.estudi_otros_canaima'
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
				<Grid item xs={12}>
					<RadioHook
						control={control}
						defaultValue={user.personal_data.estudi_otros_beca || 'No'} 
						disabled={loading}
						label='¿Tiene beca?'
						name='personalData.estudi_otros_beca' 
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
				<Grid item xs={12}>
					<RadioHook
						control={control}
						defaultValue={user.personal_data.estudi_otros_alojado || 'Si'}
						disabled={loading}
						label='¿Vive con el representante?'
						name='personalData.estudi_otros_alojado'
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
				{watch('personalData.estudi_otros_alojado', 'Si') === 'No' && (
					<Grid item xs={12}>
						<InputHook
							control={control}
							rules={{
								required: '* Campo requerido',
								minLength: { value: 10, message: 'Error: Demaciado corto' },
								maxLength: { value: 40, message: 'Error: Demaciado largo' },
							}}
							defaultValue={user.personal_data.estudi_otros_direccion || ''} 
							name='personalData.estudi_otros_direccion'
							label='Direccion'
							variant='outlined'
							size='small'
							fullWidth
							disabled={loading}
						/>
					</Grid>
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

export default function PersonalEstudianteOtros({ id }) {
	const { userData, loading, user } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalStudiendOtros.loading,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { control, watch, handleSubmit } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalStudiendOtros', true));
		
		if (submitData.personalData.estudi_otros_alojado === 'Si') {
			submitData.personalData.estudi_otros_direccion = null;
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
		
		dispatch(updateForms('updatePersonalStudiendOtros', false));
	}
	
	return (
		<Box>
			<PersonalEstudianteOtrosForm
				onSubmit={handleSubmit(onSubmit)}
				control={control}
				watch={watch}
				loading={loading}
				buttonText='Actualizar'
				user={user}
			/>
		</Box>
	)
}