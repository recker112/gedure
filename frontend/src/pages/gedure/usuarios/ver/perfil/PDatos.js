import React from 'react';

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Box, Divider, Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';
import { InputHook } from '../../../../../components/form/inputs';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';

export function PDatosForm({ control, loading, handleSubmit, userField = true, user = {} }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Perfil del usuario
				</Typography>
				<Box mt={1}>
					<Divider />
				</Box>
      </Grid>
      {userField && (
        <Grid item xs={12}>
          <InputHook
              control={control}
              rules={{
                required: '* Campo requerido',
                minLength: { value: 3, message: 'Error: Demaciado corto' },
                maxLength: { value: 30, message: 'Error: Demaciado largo' },
              }}
              name='username'
              label='Usuario o cédula'
              helperText='El usuario identificará a esta cuenta dentro del sistema'
              defaultValue={user.username} 
              variant='outlined'
              size='small'
              fullWidth
              disabled={loading}
            />
        </Grid>
      )}
      <Grid item xs={12}>
        <InputHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 3, message: 'Error: Demaciado corto' },
            maxLength: { value: 90, message: 'Error: Demaciado largo' },
          }}
          name='name'
          label='Nombre de la cuenta'
          helperText='El nombre puede ser visto por otros usuarios, tenga discreción con lo que coloque aquí'
          defaultValue={user.name}
          variant='outlined'
          size='small'
          fullWidth
          disabled={loading}
        />
			</Grid>
      <Grid item xs={12}>
        <InputHook
          control={control}
          rules={{
            required: '* Campo requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Error: Correo no válido',
            },
          }}
          name='email'
          label='Correo electónico'
          helperText='Este correo será usado en distintas partes del sistema para una comunicación directa con el usuario'
          defaultValue={user.email}
          variant='outlined'
          size='small'
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid container justifyContent='flex-end' item xs={12}>
        <LoadingButton 
          variant='contained' 
          loading={loading}
          disableElevation
          onClick={handleSubmit}
        >
          Actualizar
        </LoadingButton>
      </Grid>
    </Grid>
  )
}

export default function PDatos() {
  const { id } = useParams();

  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.gdUSelected.userSelected,
    loading: state.gdUPD.loadingPD,
  }))
  const dispatch = useDispatch();

  const { handleSubmit, control, setError } = useForm();

  const onSubmit = submitData => {
    // NOTA(RECKER): Quitar datos únicos
    if(userSelected.username === submitData.username) {
      delete submitData.username;
    }

    if(userSelected.email === submitData.email) {
      delete submitData.email;
    }

    submitData._method = 'PUT';
    dispatch(updateData({submitData, id, errors: setError, loading: 'loadingPD'}));
  }

  return (
    <PDatosForm
      control={control}
      user={userSelected}
      handleSubmit={handleSubmit(onSubmit)}
      loading={loading}
    />
  )
}
