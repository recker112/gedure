import React from 'react'

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Box, Divider, Grid, MenuItem, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm, useWatch } from 'react-hook-form';
import { RadioHook } from '../../../../../components/form/radio';
import { SelectHook } from '../../../../../components/form/select';
import DatePickerHook from '../../../../../components/form/datepicker';
import { InputHook, AutoCompleteHook } from '../../../../../components/form/inputs';

// Components
import { estadosVE } from '../../../../../components/Utils/LocationVE';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';


export function PEstudianteForm({ control, user, handleSubmit, loading }) {
  const estudi_nacionalidad = useWatch({
    control,
    name: "personal_data.estudi_nacionalidad",
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Datos del estudiante
        </Typography>
        <Box mt={1}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <RadioHook
          label='Sexo'
          name='personal_data.estudi_sexo'
          defaultValue={user.personal_data.estudi_sexo || 'Masculino'}
          control={control}
          disabled={loading}
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
          row
        />
      </Grid>
      <Grid item xs={12}>
        <SelectHook
          name='personal_data.estudi_estado_civil'
          label='Estado civil'
          control={control}
          disabled={loading}
          defaultValue={user.personal_data.estudi_estado_civil || ''}
          variant='standard'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="Soltero">Soltero</MenuItem>
          <MenuItem value="Concubino">Concubino</MenuItem>
          <MenuItem value="Casado">Casado</MenuItem>
        </SelectHook>
      </Grid>
      <Grid item xs={12}>
        <SelectHook
          name='personal_data.estudi_lateralidad'
          label='Lateralidad'
          control={control}
          disabled={loading}
          defaultValue={user.personal_data.estudi_lateralidad || ''}
          variant='standard'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="Derecho">Derecho</MenuItem>
          <MenuItem value="Zurdo">Zurdo</MenuItem>
          <MenuItem value="Ambidiestro">Ambidiestro</MenuItem>
        </SelectHook>
      </Grid>
      <Grid item xs={12}>
        <SelectHook
          name='personal_data.estudi_nacionalidad'
          label='Nacionalidad'
          control={control}
          disabled={loading}
          defaultValue={user.personal_data.estudi_nacionalidad || ''}
          variant='standard'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="V">Venezolano</MenuItem>
          <MenuItem value="E">Extranjero</MenuItem>
        </SelectHook>
      </Grid>
      <Grid item xs={12}>
        <DatePickerHook
          disableFuture
          label="Fecha de nacimiento"
          control={control}
          name="personal_data.estudi_nacimiento"
          defaultValue={user.personal_data.estudi_nacimiento || ''}
        />
      </Grid>
      {estudi_nacionalidad === 'V' && (
        <Grid item xs={12}>
          <AutoCompleteHook
            name='personal_data.estudi_nacimiento_estado'
            label='Estado'
            size='small'
            options={estadosVE}
            control={control}
            defaultValue={user.personal_data.estudi_nacimiento_estado || ''}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <InputHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 10, message: 'Error: Demaciado corto' },
            maxLength: { value: 50, message: 'Error: Demaciado largo' },
          }}
          defaultValue={user.personal_data.estudi_nacimiento_lugar || ''}
          name='personal_data.estudi_nacimiento_lugar'
          label='Lugar de nacimiento'
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

export default function PEstudiante() {
  const { id } = useParams();

  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.gdUSelected.userSelected,
    loading: state.gdUPD.loadingPE,
  }));
  const dispatch = useDispatch()

  const { handleSubmit, control } = useForm({
    shouldUnregister: true,
  });

  const onSubmit = submitData => {
    let { estudi_nacimiento, estudi_nacionalidad } = submitData.personal_data;

    // NOTA(RECKER): NullVars
    if (estudi_nacionalidad !== 'V') {
			submitData.personal_data.estudi_nacimiento_estado = null;
		}

    // NOTA(RECKER): Parse date
    if (typeof estudi_nacimiento === 'string') {
      estudi_nacimiento = new Date(estudi_nacimiento);
    }
    estudi_nacimiento && (submitData.personal_data.estudi_nacimiento = `${estudi_nacimiento.getFullYear()}/${estudi_nacimiento.getMonth() + 1}/${estudi_nacimiento.getDate()}`);

    submitData._method = 'PUT';

    dispatch(updateData({submitData, id, loading: 'loadingPE'}));
  }

  return (
    <Box mb={4}>
      <PEstudianteForm
        control={control}
        user={userSelected}
        handleSubmit={handleSubmit(onSubmit)}
        loading={loading}
      />
    </Box>
  )
}
