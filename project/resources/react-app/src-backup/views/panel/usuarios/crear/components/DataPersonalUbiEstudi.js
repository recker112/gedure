import React, { useState } from 'react';

import {
	Typography,
	Grid,
	MenuItem,
	Paper,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { useFormContext } from "react-hook-form";
import { Controller } from 'react-hook-form';

// Components
import { RenderSelectFormHook } from '../../../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

function DataPersonalUbiRepre() {
	const [labelRanking, setLabelRanking] = useState(3);
	
	const { errors, control, watch } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	const labels = {
		1: 'Deplorable',
		2: 'Deteriorada',
		3: 'Regular',
		4: 'Buena',
		5: 'Excelente',
	};
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Ubicación del estudiante
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<RenderSelectFormHook
							id='datosPersonal-estudiante-vivienda'
							name='personalData.estudi_ubi'
							nameLabel='Vivienda *'
							control={control}
							defaultValue=''
							errors={errors?.personalData?.estudi_ubi}
							helperText='Seleccione una vivienda'
							disabled={loading}
							>
							<MenuItem value=''>
								<em>Ninguno</em>
							</MenuItem>
							<MenuItem value="Rancho">Rancho</MenuItem>
							<MenuItem value="Caserio">Caserio</MenuItem>
							<MenuItem value="Urbanización">Ubrbanizaciรณn</MenuItem>
							<MenuItem value="Zona residencial">Zona residencial</MenuItem>
							<MenuItem value="Otros">Otros</MenuItem>
						</RenderSelectFormHook>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<RenderSelectFormHook
							id='datosPersonal-estudiante-viviendaType'
							name='personalData.estudi_ubi_tipo'
							nameLabel='Tipo de vivienda *'
							control={control}
							defaultValue=''
							errors={errors?.personalData?.estudi_ubi_tipo}
							helperText='Seleccione un tipo de vivienda'
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
					<Grid item xs={12} sm={6} md={4}>
						<RenderSelectFormHook
							id='datosPersonal-estudiante-viviendaZona'
							name='personalData.estudi_ubi_zona'
							nameLabel='Zona de la vivienda *'
							control={control}
							defaultValue=''
							errors={errors?.personalData?.estudi_ubi_zona}
							helperText='Seleccione una zona'
							disabled={loading}
							>
							<MenuItem value=''>
								<em>Ninguno</em>
							</MenuItem>
							<MenuItem value="Rural">Rural</MenuItem>
							<MenuItem value="Urbana">Urbana</MenuItem>
						</RenderSelectFormHook>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
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
							defaultValue={3}
						/>
						<Typography>
							{
								labels[labelRanking !== -1 ? labelRanking : watch('personalData.estudi_ubi_condiInfra', 3)]
							}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<RenderSelectFormHook
							id='datosPersonal-estudiante-viviendaCondi'
							name='personalData.estudi_ubi_condiVivienda'
							nameLabel='Condiciรณn de la vivienda *'
							control={control}
							defaultValue=''
							errors={errors?.personalData?.estudi_ubi_condiVivienda}
							helperText='Seleccione una condiciรณn'
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
				</Grid>
			</Paper>
		</Grid>
	);
}

export default DataPersonalUbiRepre;