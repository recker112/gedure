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

// Components
import { RenderSelectFormHook } from '../../../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

function DataPersonalUbiRepre() {
	const { register, errors, control, watch } = useFormContext();
	
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
					<Grid item xs={3}>
						<Autocomplete
							id="datosPersonal-representante-ubicacionEsta"
							getOptionLabel={(option) => option}
							options={[
								'amazonas'
							]}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Estado *"
									variant="outlined"
									size="small"
									name='dataPersonal.repre_ubi_estado'
									inputRef={register({
										required: { value: true, message: 'Este campo es obligatorio' },
									})}
									error={Boolean(errors?.dataPersonal?.repre_ubi_estado)}
									helperText={errors?.dataPersonal?.repre_ubi_estado?.message ? errors.dataPersonal.repre_ubi_estado.message : 'Seleccione un estado'}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							id="datosPersonal-representante-ubicacionMuni"
							getOptionLabel={(option) => option}
							options={
								watch('dataPersonal.repre_ubi_estado', '') !== ''
							? ['Amazonas']
							: []
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Municipio *"
									variant="outlined"
									size="small"
									name='dataPersonal.repre_ubi_municipio'
									inputRef={register({
										required: { value: true, message: 'Este campo es obligatorio' },
									})}
									error={Boolean(errors?.dataPersonal?.repre_ubi_municipio)}
									helperText={errors?.dataPersonal?.repre_ubi_municipio?.message ? errors.dataPersonal.repre_ubi_municipio.message : 'Seleccione un municipio'}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={5}>
						<Autocomplete
							id="datosPersonal-representante-ubicacionParro"
							getOptionLabel={(option) => option}
							options={
								watch('dataPersonal.repre_ubi_municipio', '') !== '' &&
								watch('dataPersonal.repre_ubi_estado', '') !== '' ?
									['Amazonas']
								:
									[]
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Parroquia *"
									variant="outlined"
									size="small"
									name='dataPersonal.repre_ubi_parroquia'
									inputRef={register({
										required: { value: true, message: 'Este campo es obligatorio' },
									})}
									error={Boolean(errors?.dataPersonal?.repre_ubi_parroquia)}
									helperText={errors?.dataPersonal?.repre_ubi_parroquia?.message ? errors.dataPersonal.repre_ubi_parroquia.message : 'Seleccione una parroquia'}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<RenderSelectFormHook
							id='datosPersonal-viaRepresentante'
							name='dataPersonal.repre_ubi_via'
							nameLabel='Tipo de via *'
							control={control}
							defaultValue=''
							errors={errors?.dataPersonal?.repre_ubi_via}
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
							<MenuItem value="Callejรณn">Callejรณn</MenuItem>
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