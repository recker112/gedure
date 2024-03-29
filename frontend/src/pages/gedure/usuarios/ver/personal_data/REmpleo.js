import React from 'react';

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Box, Divider, Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm, useWatch } from 'react-hook-form';
import { InputHook } from '../../../../../components/form/inputs';
import { RadioHook } from '../../../../../components/form/radio';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/requestStatus/async_trunk/users/updateData';

export function REmpleoForm({ control, user, loading, buttonDisable }) {
  const repre_empleo = useWatch({
    name: 'personal_data.repre_empleo',
    control,
    defaultValue: user.personal_data.repre_empleo,
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Empleo del representante
        </Typography>
        <Box mt={1}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <RadioHook
          control={control}
          defaultValue={user.personal_data.repre_empleo || 'No'}
          disabled={loading}
          label='¿Tiene empleo?'
          name='personal_data.repre_empleo'
          row
          radioList={[
            {
              value: 'Si',
              label: 'Si',
            },
            {
              value: 'No',
              label: 'No',
            }
          ]}
        />
      </Grid>
      {repre_empleo === 'Si' && (
        <>
          <Grid item xs={12}>
            <InputHook
              control={control}
              rules={{
                required: '* Campo requerido',
                minLength: { value: 3, message: 'Error: Demaciado corto' },
                maxLength: { value: 30, message: 'Error: Demaciado largo' },
              }}
              defaultValue={user.personal_data.repre_empleo_profesion || ''}
              name='personal_data.repre_empleo_profesion'
              label='Profesión'
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
                minLength: { value: 3, message: 'Error: Demaciado corto' },
                maxLength: { value: 30, message: 'Error: Demaciado largo' },
              }}
              defaultValue={user.personal_data.repre_empleo_lugar || ''}
              name='personal_data.repre_empleo_lugar'
              label='Lugar donde trabaja'
              size='small'
              variant='outlined'
              fullWidth
              disabled={loading}
            />
          </Grid>
        </>
      )}
      {!buttonDisable && (
        <Grid container justifyContent='flex-end' item xs={12}>
          <LoadingButton
            variant='contained' 
            loading={loading}
            disableElevation
            type='submit'
          >
            Actualizar
          </LoadingButton>
        </Grid>
      )}
    </Grid>
  );
}

export default function REmpleo() {
  const { id } = useParams();

  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.requestStatus.userShow.userSelected,
    loading: state.requestStatus.personalData.loadingRE,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    shouldUnregister: true,
  });

  const onSubmit = submitData => {
    const { repre_empleo } = submitData.personal_data;

    if (repre_empleo === 'No') {
			submitData.personal_data.repre_empleo_profesion = null;
			submitData.personal_data.repre_empleo_lugar = null;
		}

    submitData._method = 'PUT';

    dispatch(updateData({submitData, id, loading: 'loadingRE'}));
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <REmpleoForm
        control={control}
        user={userSelected}
        loading={loading}
      />
    </form>
  )
}
