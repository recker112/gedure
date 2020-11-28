import React from 'react';

import {
	Typography,
	Grid,
	TextField,
	Paper,
	FormControl,
	FormLabel,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function DataPersonalEmpleoRepre() {
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
							Empleo del representante
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<FormControl component="fieldset">
							<FormLabel component="legend">¿Tiene empleo?</FormLabel>
							<RadioGroup 
								aria-label="empleo" 
								defaultValue='No' 
								name='personalData.repre_empleo' 
								row
							>
								<FormControlLabel 
									value="No" 
									control={
										<Radio inputRef={register} />
									} 
									label="No"
								/>
								<FormControlLabel 
									value="Si" 
									control={
										<Radio inputRef={register} />
									} 
									label="Si"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					{watch('personalData.repre_empleo') === 'Si' && (
						<React.Fragment>
							<Grid item xs={5}>
								<TextField 
									inputRef={register({
										required: { value: true, message: 'Este campo es obligatorio' },
										minLength: { value: 3, message: 'Es muy corto' },
										maxLength: { value: 30, message: 'Es demaciado largo' },
									})}
									error={Boolean(errors?.dataPersonal?.repre_empleo_profesion)}
									helperText={errors?.dataPersonal?.repre_empleo_profesion?.message ? errors.dataPersonal.repre_empleo_profesion.message : 'Ingrese su profesión'}
									variant='outlined'
									name='dataPersonal.repre_empleo_profesion'
									label='Profesión *'
									size='small'
									disabled={loading}
									fullWidth
								/>
							</Grid>
							<Grid item xs={5}>
								<TextField 
									inputRef={register({
										required: { value: true, message: 'Este campo es obligatorio' },
										minLength: { value: 3, message: 'Es muy corto' },
										maxLength: { value: 30, message: 'Es demaciado largo' },
									})}
									error={Boolean(errors?.dataPersonal?.repre_empleo_lugar)}
									helperText={errors?.dataPersonal?.repre_empleo_lugar?.message ? errors.dataPersonal.repre_empleo_lugar.message : 'Ingrese su lugar de trabajo'}
									variant='outlined'
									name='dataPersonal.repre_empleo_lugar'
									label='Lugar donde trabaja *'
									size='small'
									disabled={loading}
									fullWidth
								/>
							</Grid>
						</React.Fragment>
					)}
				</Grid>
			</Paper>
		</Grid>
	);
}

export default DataPersonalEmpleoRepre;