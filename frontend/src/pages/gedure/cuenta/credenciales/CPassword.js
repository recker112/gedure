import React from 'react';

// Form
import { useForm } from 'react-hook-form';

// Components
import { PPasswordForm } from '../../usuarios/ver/credenciales/PPassword';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../store/slices/requestStatus/async_trunk/users/updateData';
import { updateUserData } from '../../../../store/slices/auth';

export default function CPassword() {
  const loading = useSelector(state => state.requestStatus.personalData.loadingPP);
  const dispatch = useDispatch();

  const { handleSubmit, control, setValue } = useForm();

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    submitData._method = 'PUT';

    dispatch(updateData({
      submitData, 
      loading: 'loadingPP', 
      personal: true,
      handleUpdate,
    }));
  }

  return (
    <PPasswordForm
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
      loading={loading}
      setValue={setValue}
      helperText='* Campo requerido'
    />
  )
}
