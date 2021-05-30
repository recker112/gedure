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
	RatingHook,
	SelectHook,
} from '@form-inputs';
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

const labels = {
	1: 'Deplorable',
	2: 'Deteriorada',
	3: 'Regular',
	4: 'Buena',
	5: 'Excelente',
};

export function PersonalEstudianteUbiForm(props) {
	const { 
		onSubmit,
		control,
		user, 
		buttonDisable = false, 
		loading
	} = props;
	
	return (
		<form onSubmit={onSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Ubicación del estudiante
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<SelectHook
						name='personalData.estudi_ubi'
						label='Vivienda'
						control={control}
						disabled={loading}
						defaultValue={user.personal_data.estudi_ubi || ''}
						fullWidth
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Barrio">Barrio</MenuItem>
						<MenuItem value="Caserio">Caserio</MenuItem>
						<MenuItem value="Urbanización">Urbanización</MenuItem>
						<MenuItem value="Zona residencial">Zona residencial</MenuItem>
						<MenuItem value="Otros">Otros</MenuItem>
					</SelectHook>
				</Grid>
				<Grid item xs={12}>
					<SelectHook
						name='personalData.estudi_ubi_tipo'
						label='Tipo de vivienda'
						control={control}
						disabled={loading}
						defaultValue={user.personal_data.estudi_ubi_tipo || ''}
						fullWidth
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Apto">Apto</MenuItem>
						<MenuItem value="Apto-quinta">Apto-quinta</MenuItem>
						<MenuItem value="Casa">Casa</MenuItem>
						<MenuItem value="Casa-quinta">Casa-quinta</MenuItem>
						<MenuItem value="Quinta">Quinta</MenuItem>
						<MenuItem value="Rancho barrio">Rancho barrio</MenuItem>
						<MenuItem value="Refugio">Refugio</MenuItem>
						<MenuItem value="Casa de vecindad">Casa de vecindad</MenuItem>
						<MenuItem value="Improvisado">Improvisado</MenuItem>
						<MenuItem value="Rancho rural">Rancho rural</MenuItem>
					</SelectHook>
				</Grid>
				<Grid item xs={12}>
					<SelectHook
						name='personalData.estudi_ubi_zona'
						label='Zona de la vivienda'
						control={control}
						disabled={loading}
						defaultValue={user.personal_data.estudi_ubi_zona || ''}
						fullWidth
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Rural">Rural</MenuItem>
						<MenuItem value="Urbana">Urbana</MenuItem>
					</SelectHook>
				</Grid>
				<Grid item xs={12}>
					<RatingHook
						label='Cond. de Infraestructura'
						labels={labels}
						name="personalData.estudi_ubi_condiInfra"
						control={control}
						defaultValue={user.personal_data.estudi_ubi_condiInfra || 3}
					/>
				</Grid>
				<Grid item xs={12}>
					<SelectHook
						name='personalData.estudi_ubi_condiVivienda'
						label='Condición de la vivienda'
						control={control}
						disabled={loading}
						defaultValue={user.personal_data.estudi_ubi_condiVivienda || ''}
						fullWidth
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Al cuido">Al cuido</MenuItem>
						<MenuItem value="Alquilada">Alquilada</MenuItem>
						<MenuItem value="Propia pagada">Propia pagada</MenuItem>
						<MenuItem value="Propia pagandose">Propia pagandose</MenuItem>
						<MenuItem value="Otro">Otro</MenuItem>
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
								Actualizar
							</Button>
						</LoadingComponent>
					</Grid>
				)}
			</Grid>
		</form>
	);
}

export default function PersonalEstudianteUbi({ id }) {
	const { userData, loading, user } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalStudiendUbi.loading,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { control, handleSubmit } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalStudiendUbi', true));
		
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
		
		dispatch(updateForms('updatePersonalStudiendUbi', false));
	}
	
	return (
		<Box mb={4}>
			<PersonalEstudianteUbiForm
				onSubmit={handleSubmit(onSubmit)}
				control={control}
				loading={loading}
				user={user}
				buttonText='Actualizar'
			/>
		</Box>
	)
}