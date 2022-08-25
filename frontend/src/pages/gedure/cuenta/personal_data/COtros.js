import React from 'react'

// Form
import { useForm } from 'react-hook-form';

// Components
import { POtrosForm } from '../../usuarios/ver/personal_data/POtros';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../store/slices/requestStatus/async_trunk/users/updateData';
import { updateUserData } from '../../../../store/slices/auth';

export default function COtros() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.requestStatus.personalData.loadingPO,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    shouldUnregister: true,
  });

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    const { estudi_otros_alojado } = submitData.personal_data;

    if (estudi_otros_alojado === 'Si') {
			submitData.personal_data.estudi_otros_direccion = null;
		}

    submitData._method = 'PUT';

    dispatch(updateData({
      submitData,
      loading: 'loadingPO',
      personal: true,
      handleUpdate,
    }));
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <POtrosForm
        control={control}
        user={user}
        loading={loading}
      />
    </form>
  )
}
