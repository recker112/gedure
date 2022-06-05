import { Box } from '@mui/material';
import React from 'react'

// Form
import { useForm } from 'react-hook-form';

// Components
import { RUbicacionForm } from '../../usuarios/ver/personal_data/RUbicacion';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../../store/slices/auth';
import { updateData } from '../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';

export default function CRUbicacion() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.gdUPD.loadingRU,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    // NOTA(RECKER): Reset Ubi
    if (user.personal_data.repre_nacionalidad === 'E') {
			submitData.personal_data.repre_ubi_estado = null;
			submitData.personal_data.repre_ubi_municipio = null;
			submitData.personal_data.repre_ubi_parroquia = null;
			submitData.personal_data.repre_ubi_via = null;
		}

    submitData._method = 'PUT';

    dispatch(updateData({
      submitData, 
      loading: 'loadingRU',
      personal: true,
      handleUpdate,
    }));
  }

  if (user.personal_data.repre_nacionalidad !== 'V') {
    return null;
  }

  return (
    <Box mb={4}>
      <RUbicacionForm
        control={control}
        user={user}
        handleSubmit={handleSubmit(onSubmit)}
        loading={loading}
      />
    </Box>
  )
}
