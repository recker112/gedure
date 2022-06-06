import React, { useState } from 'react';

// Form
import { useForm } from 'react-hook-form';

// MUI
import { Box, Button, MobileStepper } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DoneIcon from '@mui/icons-material/Done';
import LoadingButton from '@mui/lab/LoadingButton';

// Format
import { format } from 'date-fns';

// Components
import { PUbicacionForm } from '../usuarios/ver/personal_data/PUbicacion';
import { PEstudianteForm } from '../usuarios/ver/personal_data/PEstudiante';
import { POtrosForm } from '../usuarios/ver/personal_data/POtros';
import { RDatosForm } from '../usuarios/ver/personal_data/RDatos';
import { RUbicacionForm } from '../usuarios/ver/personal_data/RUbicacion';
import { REmpleoForm } from '../usuarios/ver/personal_data/REmpleo';
import { PDMadreForm } from '../usuarios/ver/personal_data/PDMadre';
import { PDPadreForm } from '../usuarios/ver/personal_data/PDPadre';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../store/slices/auth';
import { updateData } from '../../../store/slices/gedure/usuarios/ver/requests/gdUPD';

export default function SectionUser() {
  const { user, loading } = useSelector(state => ({
    user: state.auth.user,
    loading: state.gdUPD.loadingActiveAccount,
  }));
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState(user);
  const maxSteps = 3;


  const { control, handleSubmit, watch } = useForm();

  const handleNext = submitData => {
    setData(userData => ({...userData, personal_data: {...userData.personal_data, ...submitData}}));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpdate = ({ user }) => {
    dispatch(updateUserData({ user }));
  }

  const onSubmit = submitData => {
    // NOTA(RECKER): Parse data
    if (submitData.personal_data.estudi_nacionalidad !== 'V') {
      submitData.personal_data.estudi_nacimiento_estado = null;
    }

    if (submitData.personal_data.estudi_nacimiento) {
      submitData.personal_data.estudi_nacimiento = format(new Date(submitData.personal_data.estudi_nacimiento),'yyyy/MM/dd');
    }

    if (submitData.personal_data.estudi_otros_alojado === 'Si') {
      submitData.personal_data.estudi_otros_direccion = null;
    }

    if (submitData.personal_data.repre_nacimiento) {
      submitData.personal_data.repre_nacimiento = format(new Date(submitData.personal_data.repre_nacimiento),'yyyy/MM/dd');
    }

    if (submitData.personal_data.repre_nacionalidad === 'E') {
      submitData.personal_data.repre_ubi_estado = null;
      submitData.personal_data.repre_ubi_municipio = null;
      submitData.personal_data.repre_ubi_parroquia = null;
      submitData.personal_data.repre_ubi_via = null;
    }
    

    if (submitData.personal_data.repre_empleo === 'No') {
      submitData.personal_data.repre_empleo_profesion = null;
      submitData.personal_data.repre_empleo_lugar = null;
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
    <>
      <form autoComplete='off'>
        {activeStep === 0 && (
          <React.Fragment>
            <Box mb={4}>
              <PEstudianteForm
                control={control}
                user={data}
                handleSubmit={null}
                loading={loading}
                buttonDisable
              />
            </Box>
            <Box mb={4}>
              <PUbicacionForm
                control={control}
                user={data}
                handleSubmit={null}
                loading={loading}
                buttonDisable
              />
            </Box>
            <Box mb={4}>
              <POtrosForm
                control={control}
                user={data}
                handleSubmit={null}
                loading={loading}
                buttonDisable
              />
            </Box>
          </React.Fragment>
        )}
        {activeStep === 1 && (
          <React.Fragment>
            <Box mb={4}>
              <RDatosForm
                control={control}
                user={data}
                handleSubmit={null}
                loading={loading}
                buttonDisable
              />
            </Box>
            {(watch('personal_data.repre_nacionalidad', user.personal_data.repre_nacionalidad) !== 'E') && (
              <Box mb={4}>
                <RUbicacionForm
                  control={control}
                  user={data}
                  handleSubmit={null}
                  loading={loading}
                  buttonDisable
                />
              </Box>
            )}
            <Box mb={4}>
              <REmpleoForm
                control={control}
                user={data}
                handleSubmit={null}
                loading={loading}
                buttonDisable
              />
            </Box>
          </React.Fragment>
        )}
        {activeStep === 2 && (
          <React.Fragment>
            <Box mb={4}>
              <PDMadreForm
                control={control}
                user={data}
                handleSubmit={null}
                loading={loading}
                buttonDisable
              />
            </Box>
            <Box mb={4}>
              <PDPadreForm
                control={control}
                user={data}
                handleSubmit={null}
                loading={loading}
                buttonDisable
              />
            </Box>
          </React.Fragment>
        )}
      </form>
      <MobileStepper
        variant='dots'
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <LoadingButton
            size="small"
            variant='contained'
            loading={loading}
            onClick={activeStep === maxSteps - 1 ? handleSubmit(onSubmit) :  handleSubmit(handleNext)}
            disabled={activeStep === maxSteps}
            endIcon={activeStep < maxSteps - 1 ? <KeyboardArrowRight /> : <DoneIcon />}
          >
            {activeStep >= 2 ? 'Activar cuenta' : 'Siguiente'}
          </LoadingButton>
        }
        backButton={
          <Button 
            size="small"
            variant='contained'
            onClick={handleBack}
            disabled={activeStep === 0 || loading}
            startIcon={<KeyboardArrowLeft />}
          >
            Regresar
          </Button>
        }
      />
    </>
  )
}
