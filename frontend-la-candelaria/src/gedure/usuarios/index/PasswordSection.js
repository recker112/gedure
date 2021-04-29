import React, { useState } from 'react';

import {
	Grid,
	FormControlLabel,
	Switch,
	Typography,
} from '@material-ui/core';

import { useWatch } from "react-hook-form";

// Components
import {
	InputPasswordHook,
} from '@form-inputs';
import generatePassword from '../../../components/funciones/generatePassword';

export default function PasswordSection({ control, disabled, setValue }) {
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
			setGeneratePass(true);
		}else {
			setValue('password', '');
			setGeneratePass(false);
		}
	}
	
	if (!invitation_mode) {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<InputPasswordHook
						control={control}
						rules={{
							required: '* Campo requerido',
							minLength: { value: 4, message: 'Error: Demaciado corto' },
						}}
						name='password'
						label='Contraseña'
						size='small'
						disabled={disabled}
						fullWidth
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