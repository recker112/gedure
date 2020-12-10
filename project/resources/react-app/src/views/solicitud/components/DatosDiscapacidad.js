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

import { useFormContext, useWatch } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function DatosDiscapacidad() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { register, errors } = useFormContext();
	const estudi_disca = useWatch({
    name: 'estudi_disca',
    defaultValue: 'No'
  });
	const estudi_disca_medica = useWatch({
    name: 'estudi_disca_medica',
    defaultValue: 'No'
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Condición o discapacidad
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={6} sm={4} md={3}>
					<FormControl component="fieldset">
						<FormLabel component="legend">¿Posee alguna?</FormLabel>
						<RadioGroup 
							aria-label="¿Posee discapacidad?" 
							defaultValue={dataStorage.estudi_disca || 'No'}
							name='estudi_disca' 
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
				{estudi_disca === 'Si' && (
					<Grid item xs={12} sm={8} md={5}>
						<TextField 
							defaultValue={dataStorage.estudi_disca_cual || null}
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
							})}
							error={Boolean(errors?.estudi_disca_cual)}
							helperText={errors?.estudi_disca_cual?.message ? errors.estudi_disca_cual.message : '* Campo requerido'}
							variant='outlined'
							name='estudi_disca_cual'
							label='¿Cual?'
							size='small'
							fullWidth
						/>
					</Grid>
				)}
				<Grid item xs={6} sm={4} md={4}>
					<FormControl component="fieldset">
						<FormLabel component="legend">¿Toma medicamentos?</FormLabel>
						<RadioGroup 
							aria-label="¿Toma medicamentos?" 
							defaultValue={dataStorage.estudi_disca_medica || 'No'}
							name='estudi_disca_medica' 
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
				{estudi_disca_medica === 'Si' && (
					<Grid item xs={12} sm={8} md={5}>
						<TextField 
							defaultValue={dataStorage.estudi_disca_medica_cual || null}
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
							})}
							error={Boolean(errors?.estudi_disca_medica_cual)}
							helperText={errors?.estudi_disca_medica_cual?.message ? errors.estudi_disca_medica_cual.message : '* Campo requerido'}
							variant='outlined'
							name='estudi_disca_medica_cual'
							label='¿Cual?'
							size='small'
							fullWidth
						/>
					</Grid>
				)}
			</Grid>
		</React.Fragment>
	)
}

export default DatosDiscapacidad;