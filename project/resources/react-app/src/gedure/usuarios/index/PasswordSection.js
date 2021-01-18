import React, { useState } from 'react';

import {
	Grid,
	FormControlLabel,
	Switch,
	Typography,
} from '@material-ui/core';

import { useWatch } from "react-hook-form";

// Components
import { RenderInputPassword } from '../../../components/RendersGlobals';
import generatePassword from '../../../components/funciones/generatePassword';

export default function PasswordSection({ register, errors, control, disabled, setValue }) {
	const [generatePass, setGeneratePass] = useState(false);
  const invitation_mode = useWatch({
		control,
    name: 'invitation_mode',
    defaultValue: false
  });
	const password = useWatch({
		control,
    name: 'password',
    defaultValue: ''
  });
	
	const handleGeneratePass = (event) => {
		if (event.target.checked) {
			const simplePW = generatePassword(4);
			setValue('password', simplePW);
			setGeneratePass(event.target.checked);
		}else {
			setValue('password', '');
			setGeneratePass(event.target.checked);
		}
	}
	
	if (!invitation_mode) {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<RenderInputPassword
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 4, message: 'Error: No válido' },
							maxLength: { value: 25, message: 'Error: No válida' },
						})}
						name='password'
						variant='standard'
						size='small'
						error={Boolean(errors?.password)}
						helperText={errors?.password?.message ? errors.password.message : '* Campo requerido'}
						label='Contraseña'
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Switch value={generatePass} onChange={handleGeneratePass} disabled={disabled} color="primary" />}
						label="Generar contraseña"
					/>
				</Grid>
				{generatePass && (
					<Grid item xs={12}>
						<Typography className='text__opacity--semi'>
							Contraseña generada: {password}
						</Typography>
					</Grid>
				)}
			</React.Fragment>
		);
	}

  return null;
}