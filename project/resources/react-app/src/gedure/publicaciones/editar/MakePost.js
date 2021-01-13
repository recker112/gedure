import React, { useEffect } from 'react';

import { 
	Grid, 
	Paper,
	TextField,
	Typography,
	Button,
	Box,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import MarkDown from '../crear/MarkDown';
import DropAreaGalery from '../crear/DropAreaGalery';
import { RenderSwitchFormHook } from '../../../components/RendersGlobals';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector } from 'react-redux';

export default function MakePost({ progressUpload }) {
	
	const { data, loading } = useSelector((state) => ({
		data: state.forms.editPost.data,
		loading: state.forms.editPost.loading,
	}));
	
	const { register, errors, control, watch, setValue } = useFormContext();
	
	useEffect(() => {
		data.portada && setValue('portada', data.portada);
		// eslint-disable-next-line
	},[]);
	
	return (
		<Paper className='paper--padding' elevation={0}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' align='center'>Editar publicación</Typography>
				</Grid>
				<Grid container item xs={12}>
					<TextField 
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 6, message: 'Error: Demaciado corto' },
							maxLength: { value: 100, message: 'Error: Demaciado largo' },
						})}
						disabled={loading}
						name='title'
						error={Boolean(errors.title)}
						helperText={errors?.title?.message ? errors.title.message : 'Ingrese un título para su publicación'}
						style={{maxWidth: 450}} 
						label='Título'
						size='small' 
						defaultValue={data.title || ''}
						fullWidth
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
				{!watch('delete_portada', false) && (
					<Grid item xs={12}>
						<input
							name='portada'
							accept="image/*"
							ref={register}
							style={{display: 'none'}}
							id="button-file-portada"
							type="file"
						/>
						<label htmlFor="button-file-portada">
							<Button color='primary' disabled={loading} variant='contained' component='span' disableElevation>
								Actualizar portada
							</Button>
						</label>
						{watch('portada',[]).length ? (
							<Box ml={2} fontSize='body1.fontSize' component='span'>Portada cargada</Box>	
						) : null}
					</Grid>
				)}
				<Grid item xs={12} sm={6} md={4}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={data.only_users || false}
						disabled={loading}
						name='only_users'
						label='Disponible solo para usuarios'
						color='secondary'
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						disabled={Boolean(!data.url_portada) || loading}
						name='delete_portada'
						label='Eliminar portada de la publicación'
						color='secondary'
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						disabled={Boolean(!data.url_imgs) || loading}
						name='delete_galery'
						label='Eliminar Galeria  de la publicación'
						color='secondary'
					/>
				</Grid>
				{!watch('delete_galery', false) && (
					<Grid item xs={12}>
						<DropAreaGalery label='Actualizar galería de imágenes, arrastre o de click para cargar imágenes' defaultValue={data.galery || []} />
					</Grid>
				)}
				<Grid container justify='flex-end' item xs={12}>
					<LoadingComponent 
						loading={loading} 
						progressLoading 
						progress={progressUpload}
						color="inherit"
					>
						<Button type='submit' color='primary' variant='contained' disableElevation>
							Actualizar
						</Button>
					</LoadingComponent>
				</Grid>
			</Grid>
		</Paper>
	)
}