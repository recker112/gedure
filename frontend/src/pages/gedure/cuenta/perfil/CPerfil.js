import React from 'react';

// Form
import { useForm } from 'react-hook-form';

// Components
import { PAvatarForm } from '../../usuarios/ver/perfil/PAvatar';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { uploadAvatar } from '../../../../store/slices/gedure/usuarios/ver/requests/gdUPA';
import { updateUserData } from '../../../../store/slices/auth';

export default function CPerfil() {
  const { user, loadingUpload, loadingDelete, progress } = useSelector(state => ({
    user: state.auth.user,
    loadingUpload: state.gdUPA.loadingUpload,
    loadingDelete: state.gdUPA.loadingDelete,
    progress: state.gdUPA.progress,
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

    await dispatch(uploadAvatar({
      data: formData, 
      type: submitData.avatar!=='delete' ? 1 : 2, 
      personal: true,
      handleUpdate,
    }));

    resetField('avatar');
  }

  return (
    <PAvatarForm
      user={user}
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      progress={progress}
      loadingUpload={loadingUpload}
      loadingDelete={loadingDelete}
    />
  )
}
