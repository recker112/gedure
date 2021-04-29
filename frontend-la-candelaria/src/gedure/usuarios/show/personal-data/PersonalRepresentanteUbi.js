import React from 'react';

import {
	Grid,
	Button,
	Divider,
	Box,
	Typography,
	MenuItem,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import {
	AutoCompleteHook,
	SelectHook,
} from '@form-inputs';
import LoadingComponent from '../../../../components/LoadingComponent';
import { estadosVE, buscarMunicipioVE, buscarParroquiaVE } from '../../../../components/funciones/locationVenezuela';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export function PersonalRepresentanteUbiForm(props) {
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
		<form onSubmit={onSubmit}>
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
					<AutoCompleteHook
						name='personalData.repre_ubi_estado'
						label='Estado'
						options={estadosVE}
						getOptionLabel={(option) => option || ''}
						defaultValue={user.personal_data.repre_ubi_estado || null}
						control={control}
						rules={{
							required: { value: true, message: '* Campo requerido' },
						}}
						variant="outlined"
						size="small"
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12}>
					<AutoCompleteHook
						name='personalData.repre_ubi_municipio'
						label='Estado'
						options={
							watch('personalData.repre_ubi_estado', null) !== null
							? buscarMunicipioVE(watch('personalData.repre_ubi_estado'))
							: []
						}
						getOptionLabel={(option) => option || ''}
						defaultValue={user.personal_data.repre_ubi_municipio || null}
						control={control}
						rules={{
							required: { value: true, message: '* Campo requerido' },
						}}
						variant="outlined"
						size="small"
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12}>
					<AutoCompleteHook
						name='personalData.repre_ubi_parroquia'
						label='Estado'
						options={
							(watch('personalData.repre_ubi_municipio', null) !== null &&
								watch('personalData.repre_ubi_estado', null) !== null) ? buscarParroquiaVE(watch('personalData.repre_ubi_estado'),watch('personalData.repre_ubi_municipio'))
							:
							[]
						}
						getOptionLabel={(option) => option || ''}
						defaultValue={user.personal_data.repre_ubi_parroquia || null}
						control={control}
						rules={{
							required: { value: true, message: '* Campo requerido' },
						}}
						variant="outlined"
						size="small"
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12}>
					<SelectHook
						name='personalData.repre_ubi_via'
						label='Tipo de via'
						defaultValue={user.personal_data.repre_ubi_via || ''}
						control={control}
						disabled={loading}
						fullWidth
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
					</SelectHook>
				</Grid>
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

export default function PersonalRepresentanteUbi({ id }) {
	const { user, loading, userData } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalRepreUbi.loading,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { control, watch, handleSubmit } = useForm({
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
			
			if (response.user?.id === userData.id) {
				dispatch(updateDataUser({
					user: response.user
				}));
			}
		}
		
		dispatch(updateForms('updatePersonalRepreUbi', false));
	}
	
	return (
		<Box mb={4}>
			<PersonalRepresentanteUbiForm 
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