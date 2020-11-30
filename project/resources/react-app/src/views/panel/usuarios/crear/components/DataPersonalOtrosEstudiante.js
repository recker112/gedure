import React from 'react';

import {
	Typography,
	Grid,
	TextField,
	Paper,
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup,
	Radio,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function DataPersonalOtrosEstudiante() {
	const { register, errors, watch } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Otros datos del estudiante
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<FormControl component="fieldset">
							<FormLabel component="legend">¿Tiene canaima?</FormLabel>
							<RadioGroup 
								aria-label="MASTER-RIZE" 
								defaultValue='No' 
								name='personalData.estudi_otros_canaima' 
								disabled={loading}
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
					<Grid item xs={12} sm={6} md={4}>
						<FormControl component="fieldset">
							<FormLabel component="legend">¿Tiene beca?</FormLabel>
							<RadioGroup 
								aria-label="estudiante-beca" 
								defaultValue='No' 
								name='personalData.estudi_otros_beca' 
								disabled={loading}
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
					<Grid item xs={12} sm={6} md={4}>
						<FormControl component="fieldset">
							<FormLabel component="legend">¿Vive con el representante?</FormLabel>
							<RadioGroup 
								aria-label="estudiante-alojado" 
								defaultValue='Si' 
								name='personalData.estudi_otros_alojado' 
								disabled={loading}
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
					{watch('personalData.estudi_otros_alojado') === 'No' && (
						<Grid item xs={12} sm={6} md={5}>
							<TextField 
								id='datosPersonal-otros-direccion'
								inputRef={register({
									required: { value: true, message: 'Este campo es obligatorio' },
									minLength: { value: 10, message: 'Es muy corta' },
									maxLength: { value: 40, message: 'Es muy larga' },
								})}
								error={Boolean(errors?.personalData?.estudi_otros_direccion)}
								helperText={errors?.personalData?.estudi_otros_direccion?.message ? errors.personalData.estudi_otros_direccion.message : 'Ingrese la dirección'}
								variant='outlined'
								name='personalData.estudi_otros_direccion'
								label='Direccion *'
								size='small'
								disabled={loading}
								fullWidth
							/>
						</Grid>
					)}
				</Grid>
			</Paper>
		</Grid>
	);
}

export default DataPersonalOtrosEstudiante;