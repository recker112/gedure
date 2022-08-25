import React from 'react'

// Form
import { useForm } from 'react-hook-form';

// Components
import { REmpleoForm } from '../../usuarios/ver/personal_data/REmpleo';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../../store/slices/auth';
import { updateData } from '../../../../store/slices/requestStatus/async_trunk/users/updateData';

export default function CREmpleo() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.requestStatus.personalData.loadingRE,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    shouldUnregister: true,
  });

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    const { repre_empleo } = submitData.personal_data;

    if (repre_empleo === 'No') {
			submitData.personal_data.repre_empleo_profesion = null;
			submitData.personal_data.repre_empleo_lugar = null;
		}

    submitData._method = 'PUT';

    dispatch(updateData({
      submitData,
      loading: 'loadingRE',
      personal: true,
      handleUpdate,
    }));
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <REmpleoForm
        control={control}
        user={user}
        loading={loading}
      />
    </form>
  )
}
