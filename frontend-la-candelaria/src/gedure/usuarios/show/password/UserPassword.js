import React, { useState } from 'react';

import {
	Grid,
	Button,
	Divider,
	Box,
	Typography,
	FormControlLabel,
	Switch,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';
import { RenderInputPassword } from '../../../../components/RendersGlobals';
import generatePassword from '../../../../components/funciones/generatePassword';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';

export function UserPasswordForm(props) {
	const { onSubmit, helperText, register, errors, loading, setValue, watch } = props;
	const [generatePass, setGeneratePass] = useState(false);
	
	const handleGeneratePass = (event) => {
		if (event.target.checked) {
			const simplePW = generatePassword(4);
			setValue('password', simplePW);
			setValue('repeat_password', simplePW);
			setGeneratePass(event.target.checked);
		}else {
			setValue('password', '');
			setValue('repeat_password', '');
			setGeneratePass(event.target.checked);
		}
	}
	
	return (
		<form onSubmit={onSubmit} autoComplete='off'>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>Cambiar contraseña</Box>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					<RenderInputPassword
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 4, message: 'Error: Demaciado corto' },
						})}
						name='password'
						error={Boolean(errors?.password)}
						helperText={errors?.password?.message ? errors.password.message : helperText}
						label='Nueva contraseña'
						defaultValue=''
						variant='outlined' 
						size='small'
						disabled={loading}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<RenderInputPassword
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 4, message: 'Error: Demaciado corto' },
							validate: value => value === watch('password', '') || 'Error: La contraseña no coincide'
						})}
						name='repeat_password'
						error={Boolean(errors?.repeat_password)}
						helperText={errors?.repeat_password?.message ? errors.repeat_password.message : '* Campo requerido'}
						label='Repetir contraseña'
						defaultValue=''
						variant='outlined' 
						size='small' 
						disabled={loading}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Switch value={generatePass} onChange={handleGeneratePass} disabled={loading} color="primary" />}
						label="Generar contraseña"
					/>
				</Grid>
				{generatePass && (
					<Grid item xs={12}>
						<Typography className='text__opacity--semi'>
							Contraseña generada: {watch('password')}
						</Typography>
					</Grid>
				)}
				<Grid container justify='flex-end' item xs={12}>
					<LoadingComponent loading={loading}>
						<Button 
							variant='contained' 
							color='primary'
							type='submit'
							disableElevation
						>
							Cambiar contraseña
						</Button>
					</LoadingComponent>
				</Grid>
			</Grid>
		</form>
	);
}

export default function UserPassword({ id }) {
	const { loading } = useSelector((state) => ({
		loading: state.forms.updatePassword.loading,
	}));
	const dispatch = useDispatch();
	
	const { register, handleSubmit, errors, setError, watch, setValue } = useForm({
		mode: 'onTouched',
	});
	const { fetchData } = useFetch(setError);
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePassword', true));
		
		const prepare = {
			url: `v1/user/${id}`,
			type: 'post',
			data: {
				password: submitData.password,
				_method: 'PUT'
			},
			successText: 'Contraseña actualizada',
		};

		// eslint-disable-next-line
		const response = await fetchData(prepare);
		
		dispatch(updateForms('updatePassword', false));
	}
	
	return (
		<UserPasswordForm
			onSubmit={handleSubmit(onSubmit)}
			register={register}
			errors={errors}
			loading={loading}
			setValue={setValue}
			watch={watch}
			helperText='Tenga en cuenta que una vez cambiada la contraseña el usuario ya no podrá acceder con su contraseña antigüa, asegurese de informar al usuario de este cambio'
		/>
	);
}