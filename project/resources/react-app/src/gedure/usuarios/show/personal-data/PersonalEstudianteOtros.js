import React from 'react';

import {
	Grid,
	Button,
	TextField,
	Divider,
	Box,
	Typography,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export function PersonalEstudianteOtroForm(props) {
	const {
		onSubmit, 
		loading,
		user, 
		register, 
		watch, 
		errors,
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
					<FormControl component="fieldset" disabled={loading}>
						<FormLabel component="legend">¿Tiene canaima?</FormLabel>
						<RadioGroup 
							aria-label="MASTER-RIZE" 
							defaultValue={user.personal_data.estudi_otros_canaima || 'No'} 
							name='personalData.estudi_otros_canaima'
							row
						>
							<FormControlLabel 
								value="Si" 
								control={
									<Radio inputRef={register} />
								} 
								label="Si"
							/>
							<FormControlLabel 
								value="No" 
								control={
									<Radio inputRef={register} />
								} 
								label="No"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl component="fieldset" disabled={loading}>
						<FormLabel component="legend">¿Tiene beca?</FormLabel>
						<RadioGroup 
							defaultValue={user.personal_data.estudi_otros_beca || 'No'} 
							name='personalData.estudi_otros_beca' 
							row
						>
							<FormControlLabel 
								value="Si" 
								control={
									<Radio inputRef={register} />
								} 
								label="Si"
							/>
							<FormControlLabel 
								value="No" 
								control={
									<Radio inputRef={register} />
								} 
								label="No"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl component="fieldset" disabled={loading}>
						<FormLabel component="legend">¿Vive con el representante?</FormLabel>
						<RadioGroup 
							defaultValue={user.personal_data.estudi_otros_alojado || 'Si'}
							name='personalData.estudi_otros_alojado'
							row
						>
							<FormControlLabel 
								value="Si" 
								control={
									<Radio inputRef={register} />
								} 
								label="Si"
							/>
							<FormControlLabel 
								value="No" 
								control={
									<Radio inputRef={register} />
								} 
								label="No"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				{watch('personalData.estudi_otros_alojado', 'Si') === 'No' && (
					<Grid item xs={12}>
						<TextField 
							id='datosPersonal-otros-direccion'
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
								minLength: { value: 10, message: 'Error: Demaciado corto' },
								maxLength: { value: 40, message: 'Error: Demaciado largo' },
							})}
							error={Boolean(errors?.personalData?.estudi_otros_direccion)}
							helperText={errors?.personalData?.estudi_otros_direccion?.message ? errors.personalData.estudi_otros_direccion.message : ''}
							variant='outlined'
							name='personalData.estudi_otros_direccion'
							defaultValue={user.personal_data.estudi_otros_direccion || ''} 
							label='Direccion'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
				)}
				{!buttonDisable && (
					<Grid container justify='flex-end' item xs={12}>
						<LoadingComponent loading={loading}>
							<Button type='submit' variant='contained' color='primary'>
								{buttonText}
							</Button>
						</LoadingComponent>
					</Grid>
				)}
			</Grid>
		</form>
	);
}

export default function PersonalEstudianteOtro({ id }) {
	const { userData, loading, user } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalStudiendOtros.loading,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { register, errors, watch, handleSubmit } = useForm({
		mode: 'onTouched'
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
			<PersonalEstudianteOtroForm 
				onSubmit={handleSubmit(onSubmit)}
				register={register}
				errors={errors}
				watch={watch}
				loading={loading}
				buttonText='Actualizar'
				user={user}
			/>
		</Box>
	)
}