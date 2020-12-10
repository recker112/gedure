import React from 'react';

import { 
	Grid,
	Typography,
	TextField,
} from '@material-ui/core'

import { useFormContext } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function DatosHogarRepresentante() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { register, errors } = useFormContext();
	
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
						defaultValue={dataStorage.repre_direccion || null}
						error={Boolean(errors?.repre_direccion)}
						helperText={errors?.repre_direccion?.message ? errors.repre_direccion.message : '* Campo requerido'}
						variant='outlined'
						name='repre_direccion'
						label='Dirección'
						size='small'
						fullWidth
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default DatosHogarRepresentante;