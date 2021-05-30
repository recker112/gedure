import React, { useEffect } from 'react';

import { 
	Grid, 
	Paper,
	Typography,
	Button,
	Box,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import {
	InputHook,
	SwitchHook,
} from '@form-inputs';
import MarkDown from './MarkDown';
import DropAreaGalery from './DropAreaGalery';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector } from 'react-redux';

export default function MakePost({ progressUpload }) {
	const { data, loading } = useSelector((state) => ({
		data: state.forms.crearPost.data,
		loading: state.forms.crearPost.loading,
	}));
	
	const { register, control, watch, setValue } = useFormContext();
	
	useEffect(() => {
		data.portada && setValue('portada', data.portada);
		// eslint-disable-next-line
	},[]);
	
	return (
		<Paper className='paper--padding' elevation={0}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' align='center'>Crear publicación</Typography>
				</Grid>
				<Grid container item xs={12}>
					<InputHook
						control={control}
						rules={{
							required: '* Campo requerido',
							minLength: { value: 6, message: 'Error: Demaciado corto' },
							maxLength: { value: 100, message: 'Error: Demaciado largo' },
						}}
						name='title'
						label='Título'
						helperText='Ingrese un título para su publicación'
						size='small'
						fullWidth
						defaultValue={data.title || ''}
						disabled={loading}
					/>
				</Grid>
				<Grid container item xs={12}>
					<MarkDown
						defaultValue={data.markdown || ''}
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h6' className="text__bold--big text__opacity--semi">
						Opcionales
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<input
						{...register('portada')}
						accept="image/*"
						style={{display: 'none'}}
						id="button-file-portada"
						type="file"
					/>
					<label htmlFor="button-file-portada">
						<Button color='primary' disabled={loading} variant='contained' component='span' disableElevation>
							Cargar portada
						</Button>
					</label>
					{watch('portada',[]).length ? (
						<Box ml={2} fontSize='body1.fontSize' component='span'>Portada cargada</Box>	
					) : null}
				</Grid>
				<Grid item xs={12}>
					<SwitchHook
						control={control}
						disabled={loading}
						defaultValue={data.only_users || false}
						name='only_users'
						label='Disponible solo para usuarios'
						color='secondary'
					/>
				</Grid>
				<Grid item xs={12}>
					<DropAreaGalery label='Galería de imágenes, arrastre o de click para cargar imágenes' defaultValue={data.galery || []} />
				</Grid>
				<Grid container justify='flex-end' item xs={12}>
					<LoadingComponent 
						loading={loading} 
						progressLoading 
						progress={progressUpload}
						color="inherit"
					>
						<Button type='submit' color='primary' variant='contained' disableElevation>
							Crear
						</Button>
					</LoadingComponent>
				</Grid>
			</Grid>
		</Paper>
	)
}