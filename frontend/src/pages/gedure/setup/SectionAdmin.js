import React from 'react'

// Form
import { useForm } from 'react-hook-form';

// Format
import { format } from 'date-fns';

// Components
import { PDUsuarioForm } from '../usuarios/ver/personal_data/PDUsuario';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../store/slices/auth';
import { updateData } from '../../../store/slices/gedure/usuarios/ver/requests/gdUPD';

export default function SectionAdmin() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.gdUPD.loadingActiveAccount,
  }));
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm();

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    const { nacimiento, docente_ingreso, docente_ingreso_MPPE } = submitData.personal_data;

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
      loading: 'loadingActiveAccount',
      personal: true,
      handleUpdate,
    }));
  }

  return (
    <PDUsuarioForm
      user={user}
      control={control}
      loading={loading}
      handleSubmit={handleSubmit(onSubmit)}
      buttonText='Activar cuenta'
    />
  )
}
