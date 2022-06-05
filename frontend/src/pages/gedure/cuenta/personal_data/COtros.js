import React from 'react'

// Form
import { useForm } from 'react-hook-form';

// Components
import { POtrosForm } from '../../usuarios/ver/personal_data/POtros';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';
import { updateUserData } from '../../../../store/slices/auth';

export default function COtros() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.gdUPD.loadingPO,
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
    <POtrosForm
      control={control}
      user={user}
      handleSubmit={handleSubmit(onSubmit)}
      loading={loading}
    />
  )
}
