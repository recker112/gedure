import React from 'react'

// Form
import { useForm } from 'react-hook-form';

// Components
import { PDPadreForm } from '../../usuarios/ver/personal_data/PDPadre';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../../store/slices/auth';
import { updateData } from '../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';

export default function CDPadre() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.gdUPD.loadingPDP,
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
      loading: 'loadingPDP',
      personal: true,
      handleUpdate,
    }));
  }

  return (
    <PDPadreForm
      control={control}
      user={user}
      handleSubmit={handleSubmit(onSubmit)}
      loading={loading}
    />
  )
}
