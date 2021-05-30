import React from 'react';

import { 
	Grid,
	Button,
	Typography,
	Box,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

function ArchivosEstudiante() {
	
	const { register, errors } = useFormContext();
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Archivos necesarios
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<input
					id='estudiante-notas'
					defaultValue={null}
					ref={register({
						required: { value: true, message: '* Debe subir un archivo' },
					})}
					style={{display: 'none'}}
					accept="image/*,application/pdf"
					name='estudi_notas'
					type="file"
				/>
				<Grid item xs={12}>
					<label htmlFor="estudiante-notas">
						<Button variant='contained' color='secondary' component="span">
							Subir notas certificadas o boleta
						</Button>
					</label>
					{Boolean(errors.estudi_notas) && (
						<Box color='#f44336'>
							<Typography >{errors.estudi_notas.message}</Typography>
						</Box>
					)}
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default ArchivosEstudiante;