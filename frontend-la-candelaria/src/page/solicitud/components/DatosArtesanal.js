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

function DatosArtsanal() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { register, errors } = useFormContext();
	const artesanal = useWatch({
    name: 'artesanal',
    defaultValue: 'No'
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Religión
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={6} md={3}>
					<FormControl component="fieldset">
						<FormLabel component="legend">¿Realizó artesanal?</FormLabel>
						<RadioGroup 
							aria-label="¿Realizó artesanal?" 
							defaultValue={dataStorage.artesanal || 'No'}
							name='artesanal' 
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
				{artesanal === 'Si' && (
					<React.Fragment>
						<Grid item xs={12} sm={6} md={4}>
							<TextField 
								defaultValue={dataStorage.artesanal_centro || null}
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
								})}
								name='artesanal_centro'
								label='Taller trabajado'
								variant='outlined'
								size='small'
								error={Boolean(errors?.artesanal_centro)}
								helperText={errors?.artesanal_centro?.message ? errors.artesanal_centro.message : '* Campo requerido'}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={5}>
							<TextField 
								defaultValue={dataStorage.artesanal_taller || null}
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
								})}
								name='artesanal_taller'
								label='Taller trabajado'
								variant='outlined'
								size='small'
								error={Boolean(errors?.artesanal_taller)}
								helperText={errors?.artesanal_taller?.message ? errors.artesanal_taller.message : '* Campo requerido'}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<TextField 
								defaultValue={dataStorage.artesanal_docente || null}
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
								})}
								name='artesanal_docente'
								label='Nombre del docente'
								variant='outlined'
								size='small'
								error={Boolean(errors?.artesanal_docente)}
								helperText={errors?.artesanal_docente?.message ? errors.artesanal_docente.message : '* Campo requerido'}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField 
								defaultValue={dataStorage.artesanal_experiencia || null}
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 10, message: 'Error: Demaciado corto' },
									maxLength: { value: 350, message: 'Error: Demaciado largo' },
								})}
								name='artesanal_experiencia'
								label='¿Cómo fue tú experiencia?'
								variant='outlined'
								size='small'
								multiline
								error={Boolean(errors?.artesanal_experiencia)}
								helperText={errors?.artesanal_experiencia?.message ? errors.artesanal_experiencia.message : '* Campo requerido'}
								rows={8}
								fullWidth
							/>
						</Grid>
					</React.Fragment>
				)}
			</Grid>
		</React.Fragment>
	)
}

export default DatosArtsanal;