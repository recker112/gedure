import React from 'react';

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Box, Divider, Grid, MenuItem, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';
import { SelectHook } from '../../../../../components/form/select';
import RatingHook from '../../../../../components/form/rating';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';

const labels = {
	1: 'Deplorable',
	2: 'Deteriorada',
	3: 'Regular',
	4: 'Buena',
	5: 'Excelente',
};

function PUbicacionForm({ control, loading, buttonDisable, handleSubmit, user }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Ubicación del estudiante
        </Typography>
        <Box mt={1}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <SelectHook
          name='personal_data.estudi_ubi'
          label='Vivienda'
          control={control}
          disabled={loading}
          defaultValue={user.personal_data.estudi_ubi || ''}
          size='small'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="Barrio">Barrio</MenuItem>
          <MenuItem value="Caserio">Caserio</MenuItem>
          <MenuItem value="Urbanización">Urbanización</MenuItem>
          <MenuItem value="Zona residencial">Zona residencial</MenuItem>
          <MenuItem value="Otros">Otros</MenuItem>
        </SelectHook>
      </Grid>
      <Grid item xs={12}>
        <SelectHook
          name='personal_data.estudi_ubi_tipo'
          label='Tipo de vivienda'
          control={control}
          disabled={loading}
          defaultValue={user.personal_data.estudi_ubi_tipo || ''}
          size='small'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="Apto">Apto</MenuItem>
          <MenuItem value="Apto-quinta">Apto-quinta</MenuItem>
          <MenuItem value="Casa">Casa</MenuItem>
          <MenuItem value="Casa-quinta">Casa-quinta</MenuItem>
          <MenuItem value="Quinta">Quinta</MenuItem>
          <MenuItem value="Rancho barrio">Rancho barrio</MenuItem>
          <MenuItem value="Refugio">Refugio</MenuItem>
          <MenuItem value="Casa de vecindad">Casa de vecindad</MenuItem>
          <MenuItem value="Improvisado">Improvisado</MenuItem>
          <MenuItem value="Rancho rural">Rancho rural</MenuItem>
        </SelectHook>
      </Grid>
      <Grid item xs={12}>
        <SelectHook
          name='personal_data.estudi_ubi_zona'
          label='Zona de la vivienda'
          control={control}
          disabled={loading}
          defaultValue={user.personal_data.estudi_ubi_zona || ''}
          size='small'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="Rural">Rural</MenuItem>
          <MenuItem value="Urbana">Urbana</MenuItem>
        </SelectHook>
      </Grid>
      <Grid item xs={12}>
        <RatingHook
          label='Cond. de Infraestructura'
          labels={labels}
          name="personal_data.estudi_ubi_condiInfra"
          control={control}
          defaultValue={Number(user.personal_data.estudi_ubi_condiInfra) || 3}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectHook
          name='personal_data.estudi_ubi_condiVivienda'
          label='Condición de la vivienda'
          control={control}
          disabled={loading}
          defaultValue={user.personal_data.estudi_ubi_condiVivienda || ''}
          size='small'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="Al cuido">Al cuido</MenuItem>
          <MenuItem value="Alquilada">Alquilada</MenuItem>
          <MenuItem value="Propia pagada">Propia pagada</MenuItem>
          <MenuItem value="Propia pagandose">Propia pagandose</MenuItem>
          <MenuItem value="Otro">Otro</MenuItem>
        </SelectHook>
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

export default function PUbicacion() {
  const { id } = useParams();
  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.gdUSelected.userSelected,
    loading: state.gdUPD.loadingPU,
  }));
  const dispatch = useDispatch()

  const { handleSubmit, control } = useForm();

  const onSubmit = submitData => {
    submitData._method = 'PUT';
    dispatch(updateData({submitData, id, loading: 'loadingPU'}));
  }

  return (
    <Box mb={4}>
      <PUbicacionForm
        control={control}
        user={userSelected}
        handleSubmit={handleSubmit(onSubmit)}
        loading={loading}
      />
    </Box>
  )
}
