import React, { useState } from 'react';

import {
	Typography,
	Grid,
	Paper,
	FormControlLabel,
	Switch,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import { RenderInputPassword } from '../../../../../components/RendersGlobals';
import generatePassword from '../../../../../components/funciones/generatePassword';

// Redux
import { useSelector } from 'react-redux';

function PasswordAccount() {
	const [generatePass, setGeneratePass] = useState(false);
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	const { register, errors, watch, setValue } = useFormContext();
	
	const handleGeneratePass = (event) => {
		if (event.target.checked) {
			const simplePW = generatePassword(5);
			setValue('password', simplePW);
			setValue('confirm_password', simplePW);
			setGeneratePass(event.target.checked);
		}else {
			setValue('password', '');
			setValue('confirm_password', '');
			setGeneratePass(event.target.checked);
		}
	}
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Contraseña de la cuenta
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<RenderInputPassword 
							registerInput={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 4, message: 'Esta contraseña es muy corta' },
							})}
							id='register-password'
							name='password'
							label='Contraseña *'
							variant='outlined'
							size='small'
							error={Boolean(errors?.password)}
							helperText={errors?.password?.message ? errors.password.message : 'Ingresa una contraseña'}
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<RenderInputPassword 
							registerInput={register({
								required: { value: true, message: 'Este campo es obligatorioi' },
								minLength: { value: 4, message: 'Esta contraseña es muy corta' },
								validate: {
									verifyPass: (value) => value === watch('password'),
								},
							})}
							id='register-confirm'
							name='confirm_password'
							label='Repetir contraseña *'
							variant='outlined'
							size='small'
							error={Boolean(errors?.confirm_password)}
							helperText={errors?.confirm_password?.message ? errors.confirm_password.message : 'Repita la contraseña'}
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel control={
								<Switch
									value={generatePass}
									onChange={handleGeneratePass}
									disabled={loading}
								/>
							} 
							label="Generar contraseña"
						/>
					</Grid>
					{generatePass && (
						<Grid item xs={12}>
							<Typography className='text__opacity--semi'>
								Contraseña generada: {watch('password', null)}
							</Typography>
						</Grid>
					)}
				</Grid>
			</Paper>
		</Grid>
	);
}

export default PasswordAccount;