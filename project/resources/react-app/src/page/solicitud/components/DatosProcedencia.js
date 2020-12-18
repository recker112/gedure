import React from 'react';

import { 
	Grid,
	Typography,
	TextField,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function DatosProcedencia() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { register, errors } = useFormContext();
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Escuela de procedencia
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={12} sm={6}>
					<TextField 
						defaultValue={dataStorage.escuela_procedencia || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 8, message: 'Error: Demaciado corto' },
							maxLength: { value: 40, message: 'Error: Demaciado largo' },
						})}
						name='escuela_procedencia'
						label='Nombre de la escuela'
						variant='outlined'
						size='small'
						error={Boolean(errors?.escuela_procedencia)}
						helperText={errors?.escuela_procedencia?.message ? errors.escuela_procedencia.message : '* Campo requerido'}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField 
						defaultValue={dataStorage.escuela_procedencia_docente || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 10, message: 'Error: Nombre no válido' },
							maxLength: { value: 60, message: 'Error: Demaciado largo' },
						})}
						name='escuela_procedencia_docente'
						label='Nombre y apellido del docente'
						variant='outlined'
						size='small'
						error={Boolean(errors?.escuela_procedencia_docente)}
						helperText={errors?.escuela_procedencia_docente?.message ? errors.escuela_procedencia_docente.message : '* Campo requerido'}
						fullWidth
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default DatosProcedencia;