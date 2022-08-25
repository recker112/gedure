import React from 'react'

// MUI
import { Box } from '@mui/material';

// Form
import { useForm } from 'react-hook-form';

// Components
import { PDatosForm } from '../../usuarios/ver/perfil/PDatos';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../store/slices/requestStatus/async_trunk/users/updateData';
import { updateUserData } from '../../../../store/slices/auth';

export default function CDatos() {
  const { user, loading, users_edit_admins } = useSelector(state => ({
    user: state.auth.user,
    loading: state.requestStatus.personalData.loadingPD,
    users_edit_admins: state.auth.permissions.administrar.users_edit_admins,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control, setError } = useForm();

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    // NOTA(RECKER): Quitar datos únicos
    if(user.username === submitData.username) {
      delete submitData.username;
    }

    if(user.email === submitData.email) {
      delete submitData.email;
    }

    submitData._method = 'PUT';
    dispatch(updateData({
      submitData,
      errors: setError, 
      loading: 'loadingPD',
      personal: true,
      handleUpdate,
    }));
  }

  return (
    <Box component='form' autoComplete='off' onSubmit={handleSubmit(onSubmit)} mb={4}>
      <PDatosForm
        control={control}
        user={user}
        loading={loading}
        userField={user.privilegio === 'A-' && users_edit_admins}
        nameField={user.privilegio !== 'V-'}
      />
    </Box>
  )
}
