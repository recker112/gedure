import React from 'react';

import { 
	Grid,
	Typography,
	TextField,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@material-ui/core';

import { useFormContext, useWatch } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function ProfesionRepresentante() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	const repre_empleo = useWatch({
		name: 'repre_empleo',
		defaultValue: 'No',
	});
	
	const { register, errors } = useFormContext();
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Profesión
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={6} md={3}>
					<FormControl component="fieldset">
						<FormLabel component="legend">¿Tiene empleo?</FormLabel>
						<RadioGroup 
							aria-label="¿Tiene empleo?" 
							defaultValue={dataStorage.repre_empleo || 'No'}
							name='repre_empleo' 
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
				{repre_empleo === 'Si' && (
					<React.Fragment>
						<Grid item xs={12} sm={6} md={4}>
							<TextField 
								defaultValue={dataStorage.repre_empleo_profesion || null}
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 4, message: 'Error: Demaciado corto' },
									maxLength: { value: 40, message: 'Error: Demaciado largo' },
								})}
								error={Boolean(errors?.repre_empleo_profesion)}
								helperText={errors?.repre_empleo_profesion?.message ? errors.repre_empleo_profesion.message : '* Campo requerido'}
								variant='outlined'
								name='repre_empleo_profesion'
								label='Profesión'
								size='small'
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={5}>
							<TextField 
								defaultValue={dataStorage.repre_empleo_lugar || null}
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 4, message: 'Error: Demaciado corto' },
									maxLength: { value: 60, message: 'Error: Demaciado largo' },
								})}
								error={Boolean(errors?.repre_empleo_lugar)}
								helperText={errors?.repre_empleo_lugar?.message ? errors.repre_empleo_lugar.message : '* Campo requerido'}
								variant='outlined'
								name='repre_empleo_lugar'
								label='Lugar de trabajo'
								size='small'
								fullWidth
							/>
						</Grid>
					</React.Fragment>
				)}
			</Grid>
		</React.Fragment>
	)
}

export default ProfesionRepresentante;