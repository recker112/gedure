import React from 'react';

// MUI
import { Box } from '@mui/material';

// Format
import { format } from 'date-fns';

// Form
import { useForm } from 'react-hook-form';

// Components
import { RDatosForm } from '../../usuarios/ver/personal_data/RDatos';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../store/slices/requestStatus/async_trunk/users/updateData';
import { updateUserData } from '../../../../store/slices/auth';

export default function CRDatos() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.requestStatus.personalData.loadingRD,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    let { repre_nacionalidad, repre_nacimiento } = submitData.personal_data;

    // NOTA(RECKER): Reset Ubi
    if (repre_nacionalidad === 'E') {
			submitData.personal_data.repre_ubi_estado = null;
			submitData.personal_data.repre_ubi_municipio = null;
			submitData.personal_data.repre_ubi_parroquia = null;
			submitData.personal_data.repre_ubi_via = null;
		}

    // NOTA(RECKER): Parse date
    if (repre_nacimiento) {
      submitData.personal_data.repre_nacimiento = format(new Date(repre_nacimiento),'yyyy/MM/dd');
    }

    submitData._method = 'PUT';

    dispatch(updateData({
      submitData, 
      loading: 'loadingRD',
      personal: true,
      handleUpdate,
    }));
  }

  return (
    <Box component='form' autoComplete='off' onSubmit={handleSubmit(onSubmit)} mb={4}>
      <RDatosForm
        control={control}
        user={user}
        loading={loading}
      />
    </Box>
  )
}
