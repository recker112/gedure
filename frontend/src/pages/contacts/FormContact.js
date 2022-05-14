import React from 'react';

import { useForm } from 'react-hook-form';

// MUI
import { Grid, Paper, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import { InputHook, InputMaskHook } from '../../components/form/inputs';
import { useDispatch, useSelector } from 'react-redux';
import { contactsData } from '../../store/slices/contacts';
import useNotifier from '../../hooks/useNotifier';

const classes = {
  container: {
    marginTop: 3,
  }
}

export default function FormContact() {
	useNotifier({
		message422: 'Ya tiene una solicitud en cola',
	})

 const loading = useSelector(state => state.contacts.loading);
	const dispatch = useDispatch();
	const maxMensaje = 350;

 const { handleSubmit, watch, control } = useForm({
		mode: 'onTouched',
	});

  const onSubmit = (data) => {
			dispatch(contactsData(data));
  }

  return (
    <Paper className='paper--padding' sx={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={2} justifyContent='center'>
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
					<Grid container justifyContent='flex-end' item xs={12}>
						<LoadingButton 
							type='submit'
							loading={loading} 
							color='primary' 
							disableElevation 
							variant='contained'
						>
							Enviar
						</LoadingButton>
					</Grid>
        </Grid>
      </form>
    </Paper>
  )
}
