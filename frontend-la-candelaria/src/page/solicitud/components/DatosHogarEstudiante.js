import React from 'react';

import { 
	Grid,
	Typography,
	TextField,
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup,
	Radio,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useFormContext, Controller } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function DatosHogarEstudiante() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { register, errors, control } = useFormContext();
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Datos del hogar
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={12} md={8}>
					<TextField 
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
						})}
						defaultValue={dataStorage.estudi_direccion || null}
						error={Boolean(errors?.estudi_direccion)}
						helperText={errors?.estudi_direccion?.message ? errors.estudi_direccion.message : '* Campo requerido'}
						variant='outlined'
						name='estudi_direccion'
						label='Dirección'
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={5} md={4}>
					<FormControl component="fieldset">
						<FormLabel component="legend">¿Vive con el representante?</FormLabel>
						<RadioGroup 
							aria-label="sexo" 
							name='estudi_vive_representante' 
							defaultValue={dataStorage.estudi_vive_representante || 'Si'}
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
				<Grid item xs={12} sm={7} md={6}>
					<Controller 
						render={({onChange, onBlur, value, ref})=> (
							<Autocomplete
								id="estudiante-vives-con"
								multiple
								getOptionLabel={(option) => option}
								options={[
									'Madre',
									'Padre',
									'Abuelo',
									'Abuela',
									'Tio',
									'Tia',
									'Hermanos',
									'Otros',
								]}
								onBlur={onBlur}
								onChange={(e,selected) => {onChange(selected)}}
								value={value}
								renderInput={(params) => (
									<TextField
										{...params}
										label="¿Con quienes vives?"
										variant="outlined"
										size="small"
										inputRef={ref}
										error={Boolean(errors?.estudi_vives_con)}
										helperText={errors?.estudi_vives_con?.message ? errors.estudi_vives_con.message : '* Campo requerido'}
									/>
								)}
							/>
						)}
						control={control}
						name='estudi_vives_con'
						defaultValue={dataStorage.estudi_vives_con || []}
						rules={{
							validate: value => value.length || '* Campo requerido',
						}}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default DatosHogarEstudiante;