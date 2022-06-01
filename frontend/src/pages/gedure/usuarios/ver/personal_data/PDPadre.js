import React from 'react'

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Box, Divider, Grid, MenuItem, Typography } from '@mui/material';

// Form
import { useForm } from 'react-hook-form';
import { SelectHook } from '../../../../../components/form/select';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';
import { InputHook, InputMaskHook } from '../../../../../components/form/inputs';
import LoadingButton from '@mui/lab/LoadingButton';

function PDPadreForm({ control, loading, user, handleSubmit, buttonDisable }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Datos del padre
        </Typography>
        <Box mt={1}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <SelectHook
          name='personal_data.padre_nacionalidad'
          label='Nacionalidad'
          defaultValue={user.personal_data.padre_nacionalidad || ''}
          control={control}
          disabled={loading}
          size='small'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value='V'>Venezolano</MenuItem>
          <MenuItem value='E'>Extranjero</MenuItem>
        </SelectHook>
      </Grid>
      <Grid item xs={12}>
        <InputHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 7, message: 'Error: Demaciado corto' },
            maxLength: { value: 14, message: 'Error: Demaciado largo' },
            pattern: {
              value: /^[0-9]*$/,
              message: 'Error: Solo números',
            },
          }}
          defaultValue={user.personal_data.padre_cedula || ''}
          name='personal_data.padre_cedula'
          label='Cédula'
          size='small'
          variant='outlined'
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <InputHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 8, message: 'Error: Demaciado corto' },
            maxLength: { value: 90, message: 'Error: Demaciado largo' },
          }}
          defaultValue={user.personal_data.padre_nombre || ''}
          name='personal_data.padre_nombre'
          label='Nombre y apellido'
          size='small'
          variant='outlined'
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <InputMaskHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 12, message: 'Error: No válido' },
          }}
          defaultValue={user.personal_data.padre_telefono || '58'}
          name='personal_data.padre_telefono'
          label='Teléfono'
          variant='outlined'
          size='small'
          format='+## (###) ###-####'
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
            maxLength: { value: 100, message: 'Error: Demaciado largo' },
          }}
          defaultValue={user.personal_data.padre_direccion || ''}
          name='personal_data.padre_direccion'
          label='Dirección de domicilio'
          size='small'
          variant='outlined'
          fullWidth
          disabled={loading}
        />
      </Grid>
      {!buttonDisable && (
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
      )}
    </Grid>
  );
}

export default function PDPadre() {
  const { id } = useParams();

  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.gdUSelected.userSelected,
    loading: state.gdUPD.loadingPDP,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    shouldUnregister: true,
  });

  const onSubmit = submitData => {
    submitData._method = 'PUT';

    dispatch(updateData({submitData, id, loading: 'loadingPDP'}));
  }

  return (
    <Box mb={4}>
      <PDPadreForm
        control={control}
        user={userSelected}
        handleSubmit={handleSubmit(onSubmit)}
        loading={loading}
      />
    </Box>
  )
}
