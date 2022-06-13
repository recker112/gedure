import React from 'react';

// MUI
import { Box } from '@mui/material';

// Form
import { useForm } from 'react-hook-form';

// Components
import { PUbicacionForm } from '../../usuarios/ver/personal_data/PUbicacion';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../../store/slices/auth';
import { updateData } from '../../../../store/slices/requestStatus/async_trunk/users/updateData';

export default function CUbicacion() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.requestStatus.personalData.loadingPU,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    submitData._method = 'PUT';
    dispatch(updateData({
      submitData,
      loading: 'loadingPU',
      personal: true,
      handleUpdate,
    }));
  }

  return (
    <Box mb={4}>
      <PUbicacionForm
        control={control}
        user={user}
        handleSubmit={handleSubmit(onSubmit)}
        loading={loading}
      />
    </Box>
  )
}
