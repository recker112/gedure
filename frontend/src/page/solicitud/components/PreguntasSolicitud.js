import React from 'react';

import { 
	Grid,
	Typography,
	TextField,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function DatosReligion() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { register, errors } = useFormContext();
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Preguntas
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={12}>
					<TextField 
						defaultValue={dataStorage.solicitud_pregunta1 || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 10, message: 'Error: Demaciado corto' },
							maxLength: { value: 350, message: 'Error: Demaciado largo' },
						})}
						name='solicitud_pregunta1'
						label='¿Por qué desea estudiar en en plantel? *'
						variant='outlined'
						size='small'
						multiline
						error={Boolean(errors?.solicitud_pregunta1)}
						helperText={errors?.solicitud_pregunta1?.message ? errors.solicitud_pregunta1.message : '* Campo requerido'}
						rows={8}
						fullWidth
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default DatosReligion;