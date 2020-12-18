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

function DatosMadre() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { register, errors, control } = useFormContext();
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Información de la madre
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={12} sm={6} md={3}>
					<RenderSelectFormHook
						id='madre-nacionalidad'
						name='madre_nacionalidad'
						nameLabel='Nacionalidad'
						control={control}
						defaultValue={dataStorage.madre_nacionalidad || ''}
						errors={errors?.madre_nacionalidad}
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
						defaultValue={dataStorage.madre_cedula || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 7, message: 'Error: Demaciado corto' },
							maxLength: { value: 25, message: 'Error: Demaciado largo' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						})}
						error={Boolean(errors?.madre_cedula)}
						helperText={errors?.madre_cedula?.message ? errors.madre_cedula.message : '* Campo requerido'}
						variant='outlined'
						name='madre_cedula'
						label='Cédula'
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={5}>
					<TextField 
						defaultValue={dataStorage.madre_nombre || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 8, message: 'Error: Demaciado corto' },
							maxLength: { value: 80, message: 'Error: Demaciado largo' },
						})}
						error={Boolean(errors?.madre_nombre)}
						helperText={errors?.madre_nombre?.message ? errors.madre_nombre.message : '* Campo requerido'}
						variant='outlined'
						name='madre_nombre'
						label='Nombre y apellido'
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField 
						type='tel'
						defaultValue={dataStorage.madre_telefono || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 6, message: 'Error: Teléfono no válido' },
							maxLength: { value: 30, message: 'Error: Teléfono no válido' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						})}
						error={Boolean(errors?.madre_telefono)}
						helperText={errors?.madre_telefono?.message ? errors.madre_telefono.message : '* Campo requerido'}
						variant='outlined'
						name='madre_telefono'
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
						defaultValue={dataStorage.madre_direccion || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 6, message: 'Error: Demaciado corto' },
							maxLength: { value: 30, message: 'Error: Demaciado largo' },
						})}
						error={Boolean(errors?.madre_direccion)}
						helperText={errors?.madre_direccion?.message ? errors.madre_direccion.message : '* Campo requerido'}
						variant='outlined'
						name='madre_direccion'
						label='Dirección'
						size='small'
						fullWidth
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default DatosMadre;