import React from 'react';

import {
	Grid,
	FormControlLabel,
	Switch,
} from '@material-ui/core';

import { useWatch } from "react-hook-form";

// Components
import { RenderInputPassword } from '../../../../components/RendersGlobals';

export default function PasswordSection({ register, errors, control }) {
  const password_registred = useWatch({
		control,
    name: 'password_registred',
    defaultValue: false
  });
	
	if (!password_registred) {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<RenderInputPassword
						registerInput={register({
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
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Switch color="primary" />}
						label="Generar contraseña"
					/>
				</Grid>
			</React.Fragment>
		);
	}

  return null;
}