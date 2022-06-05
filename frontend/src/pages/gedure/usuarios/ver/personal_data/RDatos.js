import React from 'react';

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Box, Divider, Grid, MenuItem, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form'
import { SelectHook } from '../../../../../components/form/select';
import { InputHook, InputMaskHook } from '../../../../../components/form/inputs';
import { RadioHook } from '../../../../../components/form/radio';
import DatePickerHook from '../../../../../components/form/datepicker';

// Format
import { format } from 'date-fns';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';

function RDatosForm({ control, loading, user, handleSubmit, buttonDisable }) {
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
        <SelectHook
          name='personal_data.repre_nacionalidad'
          label='Nacionalidad'
          defaultValue={user.personal_data.repre_nacionalidad || ''}
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
            minLength: { value: 7, message: 'Error: No válido' },
            maxLength: { value: 14, message: 'Error: No válido' },
            pattern: {
              value: /^[0-9]*$/,
              message: 'Error: Solo números',
            },
          }}
          name='personal_data.repre_cedula'
          label='Cédula'
          size='small'
          variant='outlined'
          fullWidth
          defaultValue={user.personal_data.repre_cedula || ''}
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
          name='personal_data.repre_nombre'
          label='Nombre y apellido'
          size='small'
          variant='outlined'
          fullWidth
          defaultValue={user.personal_data.repre_nombre || ''}
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
          defaultValue={user.personal_data.repre_telefono || '58'}
          name='personal_data.repre_telefono'
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
          name='personal_data.repre_direccion'
          label='Dirección de domicilio'
          size='small'
          variant='outlined'
          fullWidth
          defaultValue={user.personal_data.repre_direccion || ''}
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <RadioHook
          control={control}
          defaultValue={user.personal_data.repre_sexo || 'Masculino'}
          disabled={loading}
          label='Sexo'
          name='personal_data.repre_sexo'
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
        <SelectHook
          name='personal_data.repre_tipo_familiar'
          label='Tipo de familiar'
          defaultValue={user.personal_data.repre_tipo_familiar || ''}
          control={control}
          disabled={loading}
          size='small'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="Madre">Madre</MenuItem>
          <MenuItem value="Padre">Padre</MenuItem>
          <MenuItem value="Abuela(o)">Abuela(o)</MenuItem>
          <MenuItem value="Padrastro">Padrastro</MenuItem>
          <MenuItem value="Madastra">Madastra</MenuItem>
          <MenuItem value="Tia(o)">Tia(o)</MenuItem>
          <MenuItem value="Otro">Otro</MenuItem>
        </SelectHook>
      </Grid>
      <Grid item xs={12}>
        <SelectHook
          name='personal_data.repre_estado_civil'
          label='Estado civil'
          defaultValue={user.personal_data.repre_estado_civil || ''}
          control={control}
          disabled={loading}
          size='small'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="Soltero">Soltero</MenuItem>
          <MenuItem value="Casado">Casado</MenuItem>
          <MenuItem value="Viudo">Viudo</MenuItem>
          <MenuItem value="Concubino">Concubino</MenuItem>
          <MenuItem value="Divorciado">Divorciado</MenuItem>
        </SelectHook>
      </Grid>
      <Grid item xs={12}>
        <DatePickerHook
          name="personal_data.repre_nacimiento"
          label="Fecha de nacimiento"
          control={control}
          defaultValue={user.personal_data.repre_nacimiento || ''}
          disableFuture
          disabled={loading}
          size='small'
        />
      </Grid>
      <Grid item xs={12}>
        <InputHook
          control={control}
          rules={{
            required: '* Campo requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Error: No válido',
            },
          }}
          type='email'
          name='personal_data.repre_email'
          label='Correo'
          size='small'
          variant='outlined'
          fullWidth
          defaultValue={user.personal_data.repre_email || ''}
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
  )
}

export default function RDatos() {
  const { id } = useParams();

  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.gdUSelected.userSelected,
    loading: state.gdUPD.loadingRD,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const onSubmit = submitData => {
    let { repre_nacionalidad, repre_nacimiento } = submitData.personal_data;

    // NOTA(RECKER): Reset Ubi
    if (repre_nacionalidad === 'E') {
			submitData.personal_data.repre_ubi_estado = null;
			submitData.personal_data.repre_ubi_municipio = null;
			submitData.personal_data.repre_ubi_parroquia = null;
			submitData.personal_data.repre_ubi_via = null;
		}

    // NOTA(RECKER): Parse date
    if (typeof repre_nacimiento === 'string') {
      submitData.personal_data.repre_nacimiento = format(new Date(repre_nacimiento),'yyyy/MM/dd');
    }

    submitData._method = 'PUT';

    dispatch(updateData({submitData, id, loading: 'loadingRD'}));
  }

  return (
    <Box mb={4}>
      <RDatosForm
        control={control}
        user={userSelected}
        handleSubmit={handleSubmit(onSubmit)}
        loading={loading}
      />
    </Box>
  )
}
