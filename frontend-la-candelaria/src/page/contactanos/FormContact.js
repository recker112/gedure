import React from 'react';

import { 
	Typography, 
	Grid, 
	Paper,
	Button
} from '@material-ui/core';

import { useForm } from 'react-hook-form';

import useFetch from '../../hooks/useFetch';

// Components
import {
	InputHook,
	InputMaskHook,
} from '@form-inputs';
import LoadingComponent from '../../components/LoadingComponent';

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
	
	const { handleSubmit, watch, control } = useForm({
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
						<InputHook
							control={control}
							rules={{
								required: '* Campo requerido',
								minLength: { value: 8, message: 'Error: No válido' },
								maxLength: { value: 50, message: 'Error: No válido' },
							}}
							name='nombre'
							label='* Nombre y Apellido'
							variant='outlined'
							size='small'
							helperText='Ingrese su nombre'
							fullWidth
							disabled={loading}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<InputHook
							control={control}
							rules={{
								required: '* Campo requerido',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Error: No válido',
								},
							}}
							name='email'
							label='* Correo Electrónico'
							variant='outlined'
							size='small'
							helperText='Ingrese un correo de contacto'
							fullWidth
							disabled={loading}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<InputMaskHook
							control={control}
							defaultValue='58'
							rules={{
								required: '* Campo requerido',
								minLength: { value: 12, message: 'Error: No válido' },
							}}
							name='telefono'
							label='* Teléfono'
							variant='outlined'
							size='small'
							helperText='Ingrese un número telefónico válido'
							fullWidth
							disabled={loading}
							format='+## (###) ###-####'
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<InputHook
							control={control}
							rules={{
								required: '* Campo requerido',
								minLength: { value: 4, message: 'Error: Demaciado corto' },
								maxLength: { value: 30, message: 'Error: Demaciado largo' },
							}}
							name='asunto'
							label='* Asunto'
							variant='outlined'
							size='small'
							helperText='Ingrese el asunto'
							fullWidth
							disabled={loading}
						/>
					</Grid>
					<Grid item xs={12}>
						<InputHook
							control={control}
							rules={{
								required: '* Campo requerido',
								minLength: { value: 10, message: 'Error: Demaciado corto' },
								maxLength: { value: maxMensaje, message: 'Error: Demaciado largo' },
							}}
							name='content'
							label='* Mensaje'
							variant='outlined'
							size='small'
							multiline
							rows={8}
							helperText={`${watch('content')?.length || 0}/${maxMensaje} Caracteres`}
							fullWidth
							disabled={loading}
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