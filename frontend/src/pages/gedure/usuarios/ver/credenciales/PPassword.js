import React, { useState } from 'react'

// Router
import { useParams } from 'react-router-dom'

// MUI
import { Divider, Grid, Typography, Box, FormControlLabel, Switch } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm, useWatch } from 'react-hook-form'
import { InputPasswordHook } from '../../../../../components/form/inputs';

// Components
import generatePassword from '../../../../../components/Utils/GeneratePassword';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/requestStatus/async_trunk/users/updateData';

export function PPasswordForm({ control, setValue, loading, helperText }) {
  const [generatePass, setGeneratePass] = useState(false);
  const password = useWatch({
    name: 'password',
    control,
  });

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Cambiar contraseña
        </Typography>
        <Box mt={1}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <InputPasswordHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 4, message: 'Error: No válido' },
            maxLength: { value: 25, message: 'Error: No válida' }
          }}
          name='password'
          label='Contraseña'
          helperText={helperText}
          size='small'
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <InputPasswordHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 4, message: 'Error: No válido' },
            maxLength: { value: 25, message: 'Error: No válida' },
            validate: value => value === password || 'Error: La contraseña no coincide'
          }}
          name='repeat_password'
          label='Repetir contraseña'
          helperText='* Campo requerido'
          size='small'
          fullWidth
          disabled={loading}
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
      <Grid container justifyContent='flex-end' item xs={12}>
        <LoadingButton
          variant='contained' 
          loading={loading}
          disableElevation
          type='submit'
        >
          Cambiar contraseña
        </LoadingButton>
      </Grid>
    </Grid>
  )
}

export default function PPassword() {
  const { id } = useParams();

  const loading = useSelector(state => state.requestStatus.personalData.loadingPP);
  const dispatch = useDispatch();

  const { handleSubmit, control, setValue } = useForm();

  const onSubmit = submitData => {
    submitData._method = 'PUT';

    dispatch(updateData({submitData, id, loading: 'loadingPP'}));
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <PPasswordForm
        control={control}
        loading={loading}
        setValue={setValue}
        helperText='Tenga en cuenta que una vez cambiada la contraseña el usuario ya no podrá acceder con su contraseña antigüa, asegurese de informar al usuario de este cambio'
      />
    </form>
  )
}
