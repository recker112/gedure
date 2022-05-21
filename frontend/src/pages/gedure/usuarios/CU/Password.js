import React, { useState } from 'react';

// MUI
import { FormControlLabel, Grid, Switch, Typography } from '@mui/material';

// Form
import { useWatch } from 'react-hook-form';
import { InputPasswordHook } from '../../../../components/form/inputs/InputPasswordHook';

// Components
import generatePassword from '../../../../components/Utils/GeneratePassword';

export default function Password({ control, loading, setValue }) {
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
      <>
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
            variant='standard'
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
              Contraseña generada: {password}
            </Typography>
          </Grid>
        )}
      </>
    )
  }

  return null;
}
