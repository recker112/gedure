import React from 'react'

// Form
import { useForm } from 'react-hook-form';

// Components
import { PDPadreForm } from '../../usuarios/ver/personal_data/PDPadre';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../../store/slices/auth';
import { updateData } from '../../../../store/slices/requestStatus/async_trunk/users/updateData';

export default function CDPadre() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.requestStatus.personalData.loadingPDP,
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
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <PDPadreForm
        control={control}
        user={user}
        loading={loading}
      />
    </form>
  )
}
