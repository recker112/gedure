import React from 'react';

import { 
	Grid,
	Typography,
	TextField,
	InputAdornment,
	MenuItem,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import { RenderSelectFormHook } from '../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

function DatosPadre() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { register, errors, control } = useFormContext();
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Información del padre
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={12} sm={6} md={3}>
					<RenderSelectFormHook
						id='padre-nacionalidad'
						name='padre_nacionalidad'
						nameLabel='Nacionalidad'
						control={control}
						defaultValue={dataStorage.padre_nacionalidad || ''}
						errors={errors?.padre_nacionalidad}
						helperText='* Campo requerido'
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="V">Venezolano</MenuItem>
						<MenuItem value="E">Extranjero</MenuItem>
					</RenderSelectFormHook>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<TextField 
						defaultValue={dataStorage.padre_cedula || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 7, message: 'Error: Demaciado corto' },
							maxLength: { value: 25, message: 'Error: Demaciado largo' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						})}
						error={Boolean(errors?.padre_cedula)}
						helperText={errors?.padre_cedula?.message ? errors.padre_cedula.message : '* Campo requerido'}
						variant='outlined'
						name='padre_cedula'
						label='Cédula'
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={5}>
					<TextField 
						defaultValue={dataStorage.padre_nombre || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 8, message: 'Error: Demaciado corto' },
							maxLength: { value: 80, message: 'Error: Demaciado largo' },
						})}
						error={Boolean(errors?.padre_nombre)}
						helperText={errors?.padre_nombre?.message ? errors.padre_nombre.message : 'Ingrese el nombre y apellido'}
						variant='outlined'
						name='padre_nombre'
						label='Nombre y apellido'
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField 
						type='tel'
						defaultValue={dataStorage.padre_telefono || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 6, message: 'Error: Teléfono no válido' },
							maxLength: { value: 30, message: 'Error: Teléfono no válido' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Ingrese solo números',
							},
						})}
						error={Boolean(errors?.padre_telefono)}
						helperText={errors?.padre_telefono?.message ? errors.padre_telefono.message : '* Campo requerido'}
						variant='outlined'
						name='padre_telefono'
						label='Teléfono'
						size='small'
						InputProps={{
							startAdornment: <InputAdornment position='start'>+58</InputAdornment>
						}}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField 
						defaultValue={dataStorage.padre_direccion || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 6, message: 'Error: Teléfono no válido' },
							maxLength: { value: 30, message: 'Error: Teléfono no válido' },
						})}
						error={Boolean(errors?.padre_direccion)}
						helperText={errors?.padre_direccion?.message ? errors.padre_direccion.message : '* Campo requerido'}
						variant='outlined'
						name='padre_direccion'
						label='Dirección'
						size='small'
						fullWidth
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default DatosPadre;