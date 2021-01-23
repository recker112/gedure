import React from 'react';

import {
	Grid,
	Button,
	TextField,
	Divider,
	Box,
	Typography,
	MenuItem,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useForm, Controller } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';
import { RenderSelectFormHook } from '../../../../components/RendersGlobals';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export default function PersonalRepresentanteUbi({ id }) {
	const { dataUser, loading, user } = useSelector((state) => ({
		dataUser: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalRepreUbi.loading,
		user: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { control, errors, watch, handleSubmit } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalRepreUbi', true));
		
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
			
			if (response.user?.id === user.id) {
				dispatch(updateDataUser({
					user: response.user
				}));
			}
		}
		
		dispatch(updateForms('updatePersonalRepreUbi', false));
	}
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Ubicación del representante
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Controller 
						render={({onChange, onBlur, value, ref})=> (
							<Autocomplete
								getOptionLabel={(option) => option}
								options={[
									'amazonas'
								]}
								onBlur={onBlur}
								onChange={(e,selected) => {onChange(selected)}}
								value={value}
								disabled={loading}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Estado"
										variant="outlined"
										size="small"
										inputRef={ref}
										error={Boolean(errors?.personalData?.repre_ubi_estado)}
										helperText={errors?.personalData?.repre_ubi_estado?.message ? errors.personalData.repre_ubi_estado.message : ''}
									/>
								)}
							/>
						)}
						control={control}
						name='personalData.repre_ubi_estado'
						defaultValue={dataUser.personal_data.repre_ubi_estado || null}
						rules={{
							required: { value: true, message: '* Campo obligatorio' },
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller 
						render={({onChange, onBlur, value, ref})=> (
							<Autocomplete
								getOptionLabel={(option) => option}
								options={
									watch('personalData.repre_ubi_estado', null) !== null
									? ['Amazonas']
									: []
								}
								onBlur={onBlur}
								onChange={(e,selected) => {onChange(selected)}}
								value={value}
								disabled={loading}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Municipio"
										variant="outlined"
										size="small"
										inputRef={ref}
										error={Boolean(errors?.personalData?.repre_ubi_municipio)}
										helperText={errors?.personalData?.repre_ubi_municipio?.message ? errors.personalData.repre_ubi_municipio.message : ''}
									/>
								)}
							/>
						)}
						control={control}
						name='personalData.repre_ubi_municipio'
						defaultValue={dataUser.personal_data.repre_ubi_municipio || null} 
						rules={{
							required: { value: true, message: '* Campo requerido' },
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller 
						render={({onChange, onBlur, value, ref})=> (
							<Autocomplete
								getOptionLabel={(option) => option}
								options={
									(watch('personalData.repre_ubi_municipio', null) !== null &&
									watch('personalData.repre_ubi_estado', null) !== null) ?
										['Amazonas']
									:
										[]
								}
								onBlur={onBlur}
								onChange={(e,selected) => {onChange(selected)}}
								value={value}
								disabled={loading}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Parroquia"
										variant="outlined"
										size="small"
										inputRef={ref}
										error={Boolean(errors?.personalData?.repre_ubi_parroquia)}
										helperText={errors?.personalData?.repre_ubi_parroquia?.message ? errors.personalData.repre_ubi_parroquia.message : ''}
									/>
								)}
							/>
						)}
						control={control}
						name='personalData.repre_ubi_parroquia'
						defaultValue={dataUser.personal_data.repre_ubi_parroquia || null} 
						rules={{
							required: { value: true, message: '* Campo requerido' },
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<RenderSelectFormHook
						id='datosPersonal-viaRepresentante'
						name='personalData.repre_ubi_via'
						nameLabel='Tipo de via'
						control={control}
						defaultValue={dataUser.personal_data.repre_ubi_via || ''} 
						errors={errors?.personalData?.repre_ubi_via}
						disabled={loading}
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Aut">Aut</MenuItem>
						<MenuItem value="Av">Av</MenuItem>
						<MenuItem value="Blvr">Blvr</MenuItem>
						<MenuItem value="Calle">Calle</MenuItem>
						<MenuItem value="Callejón">Callejón</MenuItem>
						<MenuItem value="Carretera">Carretera</MenuItem>
						<MenuItem value="Manzana">Manzana</MenuItem>
						<MenuItem value="Prolongación">Prolongación</MenuItem>
						<MenuItem value="Transversal">Transversal</MenuItem>
						<MenuItem value="Vereda">Vereda</MenuItem>
					</RenderSelectFormHook>
				</Grid>
				<Grid container justify='flex-end' item xs={12}>
					<LoadingComponent loading={loading}>
						<Button type='submit' variant='contained' color='primary'>
							Actualizar
						</Button>
					</LoadingComponent>
				</Grid>
			</Grid>
		</form>
	)
}