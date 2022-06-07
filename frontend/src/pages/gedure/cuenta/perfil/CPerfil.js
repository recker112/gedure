import React from 'react';

// Form
import { useForm } from 'react-hook-form';

// Components
import { PAvatarForm } from '../../usuarios/ver/perfil/PAvatar';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '../../../../store/slices/requestStatus/async_trunk/users/updateAvatar';
import { updateUserData } from '../../../../store/slices/auth';
import { Box } from '@mui/material';

export default function CPerfil() {
  const { user, loadingUpload, loadingDelete, progress } = useSelector(state => ({
    user: state.auth.user,
    loadingUpload: state.requestStatus.personalAvatar.loadingUpload,
    loadingDelete: state.requestStatus.personalAvatar.loadingDelete,
    progress: state.requestStatus.personalAvatar.progress,
  }));
  const dispatch = useDispatch();
  
  const { handleSubmit, register, resetField } = useForm();

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = async submitData => {
    const formData = new FormData();

    if (submitData.avatar === 'delete') {
      formData.append('delete_avatar', true);
    }else {
      formData.append('avatar', submitData.avatar[0]);
    }
    formData.append('_method', 'PUT');

    await dispatch(updateAvatar({
      data: formData, 
      type: submitData.avatar!=='delete' ? 1 : 2, 
      personal: true,
      handleUpdate,
    }));

    resetField('avatar');
  }

  return (
    <Box mb={4}>
      <PAvatarForm
        user={user}
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        progress={progress}
        loadingUpload={loadingUpload}
        loadingDelete={loadingDelete}
      />
    </Box>
  )
}
