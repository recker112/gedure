import React, { useState } from 'react';

import {
	Grid,
	Button,
	Divider,
	Box,
	Typography,
	MenuItem,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { useForm, Controller } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';
import { RenderSelectFormHook } from '../../../../components/RendersGlobals';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export default function PersonalEstudianteUbi({ id }) {
	const [labelRanking, setLabelRanking] = useState(3);
	const { dataUser, loading, user } = useSelector((state) => ({
		dataUser: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalStudiendUbi.loading,
		user: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { control, errors, watch, handleSubmit } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch();
	
	const labels = {
		1: 'Deplorable',
		2: 'Deteriorada',
		3: 'Regular',
		4: 'Buena',
		5: 'Excelente',
	};
	
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
			
			if (response.user?.id === user.id) {
				dispatch(updateDataUser({
					user: response.user
				}));
			}
		}
		
		dispatch(updateForms('updatePersonalStudiendUbi', false));
	}
	
	return (
		<Box mb={4}>
			<form onSubmit={handleSubmit(onSubmit)}>
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
						<RenderSelectFormHook
							name='personalData.estudi_ubi'
							nameLabel='Vivienda'
							control={control}
							defaultValue={dataUser.personal_data.estudi_ubi || ''}
							errors={errors?.personalData?.estudi_ubi}
							disabled={loading}
							>
							<MenuItem value=''>
								<em>Ninguno</em>
							</MenuItem>
							<MenuItem value="Rancho">Rancho</MenuItem>
							<MenuItem value="Caserio">Caserio</MenuItem>
							<MenuItem value="Urbanización">Ubrbanización</MenuItem>
							<MenuItem value="Zona residencial">Zona residencial</MenuItem>
							<MenuItem value="Otros">Otros</MenuItem>
						</RenderSelectFormHook>
					</Grid>
					<Grid item xs={12}>
						<RenderSelectFormHook
							name='personalData.estudi_ubi_tipo'
							nameLabel='Tipo de vivienda'
							control={control}
							defaultValue={dataUser.personal_data.estudi_ubi_tipo || ''}
							errors={errors?.personalData?.estudi_ubi_tipo}
							disabled={loading}
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
						</RenderSelectFormHook>
					</Grid>
					<Grid item xs={12}>
						<RenderSelectFormHook
							name='personalData.estudi_ubi_zona'
							nameLabel='Zona de la vivienda'
							control={control}
							defaultValue={dataUser.personal_data.estudi_ubi_zona || ''}
							errors={errors?.personalData?.estudi_ubi_zona}
							disabled={loading}
						>
							<MenuItem value=''>
								<em>Ninguno</em>
							</MenuItem>
							<MenuItem value="Rural">Rural</MenuItem>
							<MenuItem value="Urbana">Urbana</MenuItem>
						</RenderSelectFormHook>
					</Grid>
					<Grid item xs={12}>
						<Typography>Cond. de Infraestructura</Typography>
						<Controller 
							name="personalData.estudi_ubi_condiInfra"
							as={
								<Rating 
									onChangeActive={(event, newHover) => {
										setLabelRanking(newHover);
									}}
								/>	
							}
							control={control}
							defaultValue={dataUser.personal_data.estudi_ubi_condiInfra || 3}
						/>
						<Typography>
							{
								labels[labelRanking !== -1 ? labelRanking : watch('personalData.estudi_ubi_condiInfra', 3)]
							}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<RenderSelectFormHook
							name='personalData.estudi_ubi_condiVivienda'
							nameLabel='Condición de la vivienda'
							control={control}
							defaultValue={dataUser.personal_data.estudi_ubi_condiVivienda || ''}
							errors={errors?.personalData?.estudi_ubi_condiVivienda}
							disabled={loading}
						>
							<MenuItem value=''>
								<em>Ninguno</em>
							</MenuItem>
							<MenuItem value="Al cuido">Al cuido</MenuItem>
							<MenuItem value="Alquilada">Alquilada</MenuItem>
							<MenuItem value="Propia pagada">Propia pagada</MenuItem>
							<MenuItem value="Propia pagandose">Propia pagandose</MenuItem>
							<MenuItem value="Otro">Otro</MenuItem>
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
		</Box>
	)
}