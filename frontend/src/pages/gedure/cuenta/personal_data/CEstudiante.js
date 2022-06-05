import React from 'react'

// MUI
import { Box } from '@mui/material';

// Format
import { format } from 'date-fns';

// Form
import { useForm } from 'react-hook-form';

// Components
import { PEstudianteForm } from '../../usuarios/ver/personal_data/PEstudiante';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../../store/slices/auth';
import { updateData } from '../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';

export default function CEstudiante() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.gdUPD.loadingPE,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    let { estudi_nacimiento, estudi_nacionalidad } = submitData.personal_data;

    // NOTA(RECKER): NullVars
    if (estudi_nacionalidad !== 'V') {
			submitData.personal_data.estudi_nacimiento_estado = null;
		}

    // NOTA(RECKER): Parse date
    if (estudi_nacimiento) {
      submitData.personal_data.estudi_nacimiento = format(new Date(estudi_nacimiento),'yyyy/MM/dd');
    }

    submitData._method = 'PUT';

    dispatch(updateData({
      submitData,
      loading: 'loadingPE',
      personal: true,
      handleUpdate,
    }));
  }

  return (
    <Box mb={4}>
      <PEstudianteForm
        control={control}
        user={user}
        handleSubmit={handleSubmit(onSubmit)}
        loading={loading}
      />
    </Box>
  )
}
