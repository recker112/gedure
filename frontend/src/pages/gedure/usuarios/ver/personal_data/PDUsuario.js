import React from 'react';

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Box, Divider, Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm, useWatch } from 'react-hook-form';
import { RadioHook } from '../../../../../components/form/radio';
import { InputHook, InputMaskHook } from '../../../../../components/form/inputs';
import DatePickerHook from '../../../../../components/form/datepicker';

// Format
import { format } from 'date-fns';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/requestStatus/async_trunk/users/updateData';

export function PDUsuarioForm({
  control,
  user,
  loading,
  handleSubmit,
}) {
  const docente = useWatch({
    name: 'personal_data.docente',
    control,
    defaultValue: user.personal_data.docente,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Datos del usuario
        </Typography>
        <Box mt={1}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <DatePickerHook
          name="personal_data.nacimiento"
          label="Fecha de nacimiento"
          control={control}
          defaultValue={user.personal_data.nacimiento || ''}
          disableFuture
          disabled={loading}
          size='small'
        />
      </Grid>
      <Grid item xs={12}>
        <InputMaskHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 12, message: 'Error: No válido' },
          }}
          defaultValue={user.personal_data.telefono || '58'}
          name='personal_data.telefono'
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
            maxLength: { value: 100, message: 'Error: Demaciado larga' },
          }}
          defaultValue={user.personal_data.direccion || ''}
          name='personal_data.direccion'
          label='Dirección de domicilio'
          size='small'
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <RadioHook
          control={control}
          defaultValue={user.personal_data.sexo || 'Masculino'}
          disabled={loading}
          label='Sexo'
          name='personal_data.sexo'
          row
          radioList={[
            {
              value: 'Masculino',
              label: 'Masculino',
            },
            {
              value: 'Femenino',
              label: 'Femenino',
            }
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <RadioHook
          control={control}
          defaultValue={user.personal_data.docente || 'No'}
          disabled={loading}
          label='¿Es docente?'
          name='personal_data.docente'
          row
          radioList={[
            {
              value: 'No',
              label: 'No',
            },
            {
              value: 'Si',
              label: 'Si',
            }
          ]}
        />
      </Grid>
      {docente === 'Si' && (
        <>
        <Grid item xs={12}>
          <InputHook
            control={control}
            rules={{
              required: '* Campo requerido',
              minLength: { value: 5, message: 'Error: Demaciado corto' },
              maxLength: { value: 45, message: 'Error: Demaciado largo' },
            }}
            defaultValue={user.personal_data.docente_titulo || ''}
            name='personal_data.docente_titulo'
            label='Título de docencia'
            variant='outlined'
            size='small'
            fullWidth
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <DatePickerHook
            name="personal_data.docente_ingreso"
            label="Año de ingreso al Instituto"
            control={control}
            defaultValue={user.personal_data.docente_ingreso || ''}
            disableFuture
            disabled={loading}
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <DatePickerHook
            name="personal_data.docente_ingreso_MPPE"
            label="Año de ingreso al MPPE"
            control={control}
            defaultValue={user.personal_data.docente_ingreso_MPPE || ''}
            disableFuture
            disabled={loading}
            size='small'
          />
        </Grid>
      </>
      )}
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

export default function PDUsuario() {
  const { id } = useParams();

  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.requestStatus.userShow.userSelected,
    loading: state.requestStatus.personalData.loadingPDU,
  }))
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    shouldUnregister: true,
  });

  const onSubmit = submitData => {
    const { nacimiento, docente_ingreso, docente_ingreso_MPPE } = submitData.personal_data;

    // NOTA(RECKER): Quitar datos
    if (submitData.personal_data.docente === 'No') {
			submitData.personal_data.docente_titulo = null;
			submitData.personal_data.docente_ingreso = null;
			submitData.personal_data.docente_ingreso_MPPE = null;
		}

    // NOTA(RECKER): Parse date
    if (nacimiento) {
      submitData.personal_data.nacimiento = format(new Date(nacimiento),'yyyy/MM/dd');
    }
    if (docente_ingreso) {
      submitData.personal_data.docente_ingreso = format(new Date(docente_ingreso),'yyyy/MM/dd');
    }
    if (docente_ingreso_MPPE) {
      submitData.personal_data.docente_ingreso_MPPE = format(new Date(docente_ingreso_MPPE),'yyyy/MM/dd');
    }

    submitData._method = 'PUT';
    dispatch(updateData({submitData, id, loading: 'loadingPDU'}));
  }

  return (
    <PDUsuarioForm
      user={userSelected}
      control={control}
      loading={loading}
      handleSubmit={handleSubmit(onSubmit)}
    />
  )
}
