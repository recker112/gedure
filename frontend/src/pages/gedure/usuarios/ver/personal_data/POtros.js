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
import { updateData } from '../../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';

export function POtrosForm({ control, loading, user, handleSubmit, buttonDisable }) {
  const estudi_otros_alojado = useWatch({
    control,
    name: "personal_data.estudi_otros_alojado",
    defaultValue: user.personal_data.estudi_otros_alojado,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Otros datos del estudiante 
        </Typography>
        <Box mt={1}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <RadioHook
          control={control}
          defaultValue={user.personal_data.estudi_otros_canaima || 'No'}
          disabled={loading}
          label='¿Tiene canaima?'
          name='personal_data.estudi_otros_canaima'
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
      <Grid item xs={12}>
        <RadioHook
          control={control}
          defaultValue={user.personal_data.estudi_otros_beca || 'No'} 
          disabled={loading}
          label='¿Tiene beca?'
          name='personal_data.estudi_otros_beca' 
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
      <Grid item xs={12}>
        <RadioHook
          control={control}
          defaultValue={user.personal_data.estudi_otros_alojado || 'Si'}
          disabled={loading}
          label='¿Vive con el representante?'
          name='personal_data.estudi_otros_alojado'
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
      {estudi_otros_alojado === 'No' && (
        <Grid item xs={12}>
          <InputHook
            control={control}
            rules={{
              required: '* Campo requerido',
              minLength: { value: 10, message: 'Error: Demaciado corto' },
              maxLength: { value: 40, message: 'Error: Demaciado largo' },
            }}
            defaultValue={user.personal_data.estudi_otros_direccion || ''} 
            name='personal_data.estudi_otros_direccion'
            label='Direccion'
            variant='outlined'
            size='small'
            fullWidth
            disabled={loading}
          />
        </Grid>
      )}
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

export default function POtros() {
  const { id } = useParams();
  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.gdUSelected.userSelected,
    loading: state.gdUPD.loadingPO,
  }));
  const dispatch = useDispatch()

  const { handleSubmit, control } = useForm({
    shouldUnregister: true,
  });

  const onSubmit = submitData => {
    const { estudi_otros_alojado } = submitData.personal_data;

    if (estudi_otros_alojado === 'Si') {
			submitData.personal_data.estudi_otros_direccion = null;
		}

    submitData._method = 'PUT';

    dispatch(updateData({submitData, id, loading: 'loadingPO'}));
  }

  return (
    <Box mb={4}>
      <POtrosForm
        control={control}
        user={userSelected}
        handleSubmit={handleSubmit(onSubmit)}
        loading={loading}
      />
    </Box>
  )
}
