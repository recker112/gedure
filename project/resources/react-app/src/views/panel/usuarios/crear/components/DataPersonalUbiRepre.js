import React from 'react';

import {
	Typography,
	Grid,
	MenuItem,
	TextField,
	Paper,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useFormContext } from "react-hook-form";
import { Controller } from 'react-hook-form';

// Components
import { RenderSelectFormHook } from '../../../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

function DataPersonalUbiRepre() {
	const { errors, control, watch } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Ubicación del representante
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Controller 
							render={({onChange, onBlur, value, ref})=> (
								<Autocomplete
									id="datosPersonal-representante-ubicacionEsta"
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
											label="Estado *"
											variant="outlined"
											size="small"
											inputRef={ref}
											error={Boolean(errors?.personalData?.repre_ubi_estado)}
											helperText={errors?.personalData?.repre_ubi_estado?.message ? errors.personalData.repre_ubi_estado.message : 'Seleccione un estado'}
										/>
									)}
								/>
							)}
							control={control}
							name='personalData.repre_ubi_estado'
							defaultValue={null}
							rules={{
								required: { value: true, message: 'Este campo es obligatorio' },
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Controller 
							render={({onChange, onBlur, value, ref})=> (
								<Autocomplete
									id="datosPersonal-representante-ubicacionMuni"
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
											label="Municipio *"
											variant="outlined"
											size="small"
											inputRef={ref}
											error={Boolean(errors?.personalData?.repre_ubi_municipio)}
											helperText={errors?.personalData?.repre_ubi_municipio?.message ? errors.personalData.repre_ubi_municipio.message : 'Seleccione un municipio'}
										/>
									)}
								/>
							)}
							control={control}
							name='personalData.repre_ubi_municipio'
							defaultValue={null}
							rules={{
								required: { value: true, message: 'Este campo es obligatorio' },
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Controller 
							render={({onChange, onBlur, value, ref})=> (
								<Autocomplete
									id="datosPersonal-representante-ubicacionParro"
									getOptionLabel={(option) => option}
									options={
										watch('personalData.repre_ubi_municipio', null) !== null &&
										watch('personalData.repre_ubi_estado', null) !== null ?
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
											label="Parroquia *"
											variant="outlined"
											size="small"
											inputRef={ref}
											error={Boolean(errors?.personalData?.repre_ubi_parroquia)}
											helperText={errors?.personalData?.repre_ubi_parroquia?.message ? errors.personalData.repre_ubi_parroquia.message : 'Seleccione una parroquia'}
										/>
									)}
								/>
							)}
							control={control}
							name='personalData.repre_ubi_parroquia'
							defaultValue={null}
							rules={{
								required: { value: true, message: 'Este campo es obligatorio' },
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<RenderSelectFormHook
							id='datosPersonal-viaRepresentante'
							name='personalData.repre_ubi_via'
							nameLabel='Tipo de via *'
							control={control}
							defaultValue=''
							errors={errors?.personalData?.repre_ubi_via}
							helperText='Seleccione un tipo de via'
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
							<MenuItem value="Prolongaciรณn">Prolongaciรณn</MenuItem>
							<MenuItem value="Transversal">Transversal</MenuItem>
							<MenuItem value="Vereda">Vereda</MenuItem>
						</RenderSelectFormHook>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default DataPersonalUbiRepre;