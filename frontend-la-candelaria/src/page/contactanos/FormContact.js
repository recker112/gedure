import React from 'react';

import { 
	Typography, 
	Grid, 
	Paper, 
	TextField,
	Button
} from '@material-ui/core';

import { useForm } from 'react-hook-form';

import useFetch from '../../hooks/useFetch';

// Components
import LoadingComponent from '../../components/LoadingComponent';
import { NumberFormatInput } from '../../components/RendersGlobals';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

function FormContact() {
	const maxMensaje = 350;
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.contacto.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const { register, handleSubmit, errors, watch, control } = useForm({
		mode: 'onTouched',
	});
	
	const onSubmit = async (data) => {
		dispatch(updateForms('contacto', true));
		
		const prepareDate = {
			url: 'v1/contacto',
			data: data,
			message422: 'Ya tiene una solicitud en cola',
			successText: 'Mensaje enviado',
		}
		
		const response = await fetchData(prepareDate);
		
		if (response) {
			dispatch(updateForms('contacto', false));
		}else {
			dispatch(updateForms('contacto', false));
		}
	}
	
	return (
		<Paper className='paper--padding container--margin'>
			<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
				<Grid container spacing={2} justify='center'>
					<Grid item xs={12}>
						<Typography 
							className='text__bold--big' 
							align='center'
							variant='h6'
						>
							Envianos un mensaje
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField 
							inputRef={register({
								required: { value: true, message: '* Campo obligatorio' },
								minLength: { value: 8, message: 'Nombre no válido' },
								maxLength: { value: 50, message: 'Nombre no válido' },
							})}
							id='contacto-nombre'
							name='nombre'
							label='Nombre y Apellido *'
							variant='outlined'
							size='small'
							error={Boolean(errors?.nombre)}
							helperText={errors?.nombre?.message ? errors.nombre.message : 'Ingrese su nombre'}
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField 
							inputRef={register({
								required: { value: true, message: '* Campo obligatorio' },
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'El correo no es válido',
								},
							})}
							type='email'
							id='contacto-correo'
							name='email'
							label='Correo Electrónico *'
							variant='outlined'
							size='small'
							error={Boolean(errors?.email)}
							helperText={errors?.email?.message ? errors.email.message : 'Ingrese un correo de contacto'}
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<NumberFormatInput
							disabled={loading}
							error={Boolean(errors.telefono)}
							helperText={errors?.telefono?.message ? errors.telefono.message : 'Ingrese un número telefónico válido'}
							label='Teléfono *'
							variant='outlined'
							size='small'
							mask='phone'
							fullWidth
							name='telefono'
							control={control}
							defaultValue='58'
							rules={{
								required: { value: true, message: '* Campo requerido' },
								minLength: { value: 12, message: 'El teléfono no es válido' },
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField 
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
								minLength: { value: 4, message: 'Demaciado corto' },
								maxLength: { value: 30, message: 'Demaciado largo' },
							})}
							id='contacto-asunto'
							name='asunto'
							label='Asunto *'
							variant='outlined'
							size='small'
							error={Boolean(errors?.asunto)}
							helperText={errors?.asunto?.message ? errors.asunto.message : 'Ingrese el asunto'}
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField 
							inputRef={register({
								required: { value: true, message: '* Campo obligatorio' },
								minLength: { value: 10, message: 'Demaciado corto' },
								maxLength: { value: maxMensaje, message: 'Demaciado largo' },
							})}
							id='contacto-mensaje'
							name='content'
							label='Mensaje *'
							variant='outlined'
							size='small'
							multiline
							error={Boolean(errors?.content)}
							helperText={errors?.content?.message ? errors.content.message : `${watch('content', []).length}/${maxMensaje} Caracteres`}
							disabled={loading}
							rows={8}
							fullWidth
						/>
					</Grid>
					<Grid container justify='flex-end' item xs={12}>
						<LoadingComponent loading={loading}>
							<Button 
								type='submit' 
								variant='contained' 
								color='primary' 
								disableElevation
							>
								Enviar
							</Button>
						</LoadingComponent>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
}

export default FormContact;