import React from 'react'

// MUI
import { Grid } from '@mui/material'

// Components
import { AutoCompleteAsyncHook } from '../../../../components/form/inputs/index';

// Forms
import { useWatch } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurso } from '../../../../store/slices/gedure/usuarios/forms';

export default function Curso({ disabled, control }) {
  const privilegio = useWatch({
    control,
    name: "privilegio",
  });

  const data = useSelector(state => state.gdUForms.create.data);
  const dispatch = useDispatch();

  const handleRequest = async (valueInput) => {
    await dispatch(getCurso(valueInput));
  }

  if (privilegio === 'V-') {
    return (
      <Grid item xs={12}>
        <AutoCompleteAsyncHook
          data={data}
          name='curso_id'
          label='Seleccionar un curso'
          helperText='Seleccione el curso en el cual desea ingresar al usuario'
          control={control}
          disabled={disabled}
          getOptionLabel={(option) => option.code || ''}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          handleRequest={handleRequest}
          rules={{
            required: { value: true, message: '* Campo requerido' },
          }}
        />
      </Grid>
    )
  }

  return null;
}
