import React from 'react';

// Form
import { useForm } from 'react-hook-form';

// Format
import { format } from 'date-fns';

// Components
import { PDUsuarioForm } from '../../usuarios/ver/personal_data/PDUsuario';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../../store/slices/auth';
import { updateData } from '../../../../store/slices/requestStatus/async_trunk/users/updateData';

export default function CUsuario() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.requestStatus.personalData.loadingPDU,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    shouldUnregister: true,
  });

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    const { nacimiento, docente_ingreso, docente_ingreso_MPPE } = submitData.personal_data;

    // NOTA(RECKER): Quitar datos
    if (submitData.personal_data.docente === 'No') {
			submitData.personal_data.docente_titulo = null;
			submitData.personal_data.docente_ingreso = null;
			submitData.personal_data.docente_ingreso_MPPE = null;
		}

    // NOTA(RECKER): Parse date
    if (nacimiento) {
      submitData.personal_data.nacimiento = format(new Date(nacimiento),'yyyy/MM/dd');
    }
    if (docente_ingreso) {
      submitData.personal_data.docente_ingreso = format(new Date(docente_ingreso),'yyyy/MM/dd');
    }
    if (docente_ingreso_MPPE) {
      submitData.personal_data.docente_ingreso_MPPE = format(new Date(docente_ingreso_MPPE),'yyyy/MM/dd');
    }

    submitData._method = 'PUT';
    dispatch(updateData({
      submitData, 
      loading: 'loadingPDU',
      personal: true,
      handleUpdate,
    }));
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <PDUsuarioForm
        user={user}
        control={control}
        loading={loading}
      />
    </form>
  )
}
