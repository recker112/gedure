import React from 'react'

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Box, Divider, Grid, MenuItem, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm, useWatch } from 'react-hook-form';
import { AutoCompleteHook } from '../../../../../components/form/inputs';
import { SelectHook } from '../../../../../components/form/select';

// Components
import { buscarMunicipioVE, buscarParroquiaVE, estadosVE } from '../../../../../components/Utils/LocationVE';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/requestStatus/async_trunk/users/updateData';

export function RUbicacionForm({ loading, control, user, buttonDisable }) {
  const repre_ubi_estado = useWatch({
    name: 'personal_data.repre_ubi_estado',
    control,
    defaultValue: user.personal_data.repre_ubi_estado,
  });

  const repre_ubi_municipio = useWatch({
    name: 'personal_data.repre_ubi_municipio',
    control,
    defaultValue: user.personal_data.repre_ubi_municipio,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Datos del representante
        </Typography>
        <Box mt={1}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <AutoCompleteHook
          name='personal_data.repre_ubi_estado'
          label='Estado'
          size='small'
          options={estadosVE}
          control={control}
          defaultValue={user.personal_data.repre_ubi_estado || ''}
          isOptionEqualToValue={(option, value) => option === value}
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <AutoCompleteHook
          name='personal_data.repre_ubi_municipio'
          label='Municipio'
          size='small'
          options={repre_ubi_estado ? buscarMunicipioVE(repre_ubi_estado) : []}
          control={control}
          defaultValue={user.personal_data.repre_ubi_municipio || ''}
          isOptionEqualToValue={(option, value) => option === value}
          disabled={loading || !Boolean(repre_ubi_estado)}
        />
      </Grid>
      <Grid item xs={12}>
        <AutoCompleteHook
          name='personal_data.repre_ubi_parroquia'
          label='Parroquia'
          size='small'
          options={
            (repre_ubi_estado && repre_ubi_municipio) 
            ? 
            buscarParroquiaVE(repre_ubi_estado,repre_ubi_municipio)
            :
            []
          }
          control={control}
          defaultValue={user.personal_data.repre_ubi_parroquia || ''}
          isOptionEqualToValue={(option, value) => option === value}
          disabled={loading || (!Boolean(repre_ubi_estado) || !Boolean(repre_ubi_municipio))}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectHook
          name='personal_data.repre_ubi_via'
          label='Tipo de via'
          defaultValue={user.personal_data.repre_ubi_via || ''}
          control={control}
          disabled={loading}
          size='small'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="Aut">Aut</MenuItem>
          <MenuItem value="Av">Av</MenuItem>
          <MenuItem value="Blvr">Blvr</MenuItem>
          <MenuItem value="Calle">Calle</MenuItem>
          <MenuItem value="Callejón">Callejón</MenuItem>
          <MenuItem value="Carretera">Carretera</MenuItem>
          <MenuItem value="Manzana">Manzana</MenuItem>
          <MenuItem value="Prolongación">Prolongación</MenuItem>
          <MenuItem value="Transversal">Transversal</MenuItem>
          <MenuItem value="Vereda">Vereda</MenuItem>
        </SelectHook>
      </Grid>
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

export default function RUbicacion() {
  const { id } = useParams();

  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.requestStatus.userShow.userSelected,
    loading: state.requestStatus.personalData.loadingRU,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const onSubmit = submitData => {
    // NOTA(RECKER): Reset Ubi
    if (userSelected.personal_data.repre_nacionalidad === 'E') {
			submitData.personal_data.repre_ubi_estado = null;
			submitData.personal_data.repre_ubi_municipio = null;
			submitData.personal_data.repre_ubi_parroquia = null;
			submitData.personal_data.repre_ubi_via = null;
		}

    submitData._method = 'PUT';

    dispatch(updateData({submitData, id, loading: 'loadingRU'}));
  }

  if (userSelected.personal_data.repre_nacionalidad !== 'V') {
    return null;
  }

  return (
    <Box component='form' autoComplete='off' onSubmit={handleSubmit(onSubmit)} mb={4}>
      <RUbicacionForm
        control={control}
        user={userSelected}
        loading={loading}
      />
    </Box>
  )
}
