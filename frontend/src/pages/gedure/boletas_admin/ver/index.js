import React, { useEffect } from 'react'

// Router
import { useNavigate, useParams } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Grid, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";

// Components
import Boleta from "./Boleta";
import useNotifier from '../../../../hooks/useNotifier';
import DialogConfirmation from '../../../../components/DialogConfirmation';
import conveterCursorCode from '../../../../components/Utils/converterCursoCode';
import ReplaceBoleta from './ReplaceBoleta';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../../store/slices/requestStatus';
import { deleteBoleta } from '../../../../store/slices/requestStatus/async_trunk/boletas_admin/deleteBoleta';
import { getBoletas } from '../../../../store/slices/requestStatus/async_trunk/boletas_admin/verBoletas';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function VerBoleta() {
  const { id } = useParams();
  useNotifier();

  const { loading, data, count_notify } = useSelector(state => ({
    loading: state.requestStatus.verBoletas.loading,
    data: state.requestStatus.verBoletas.data,
    count_notify: state.auth.notify.count,
  }));
  const dispatch = useDispatch();

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Boletas - La Candelaria` : 'Boletas - La Candelaria';

  let navigate = useNavigate();

  const handleReturn = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/gedure/publicaciones");
    }
  };

  const handleRefresh = () => {
    dispatch(setRequestStatus({ loading: true, select: 'verBoletas' }));
  }

  useEffect(() => {
    if (loading) {
      dispatch(getBoletas(id));
    }

    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    return () => {
      dispatch(setRequestStatus({ loading: true, select: 'verBoletas' }));
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Box component='main' sx={classes.container}>
      <Container>
        <Box mb={3}>
          <Grid container justifyContent='space-between'>
            <Tooltip title="Volver" arrow>
              <IconButton
                disabled={loading}
                onClick={handleReturn}
                aria-label="return"
                component='span'
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Recargar" arrow>
              <IconButton
                disabled={loading}
                onClick={handleRefresh}
                aria-label="return"
                component='span'
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Box>
        {loading && (
					<Box textAlign='center'>
						<CircularProgress />
					</Box>
				)}
        {(!loading && data.boletas?.length) ? (
					<React.Fragment>
						<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>
							Boletas subidas de {data.user}
						</Box>
						<Grid container spacing={2}>
							{data.boletas.map((props, key) => (<Boleta key={key} {...props} />))}
						</Grid>
					</React.Fragment>
				) : null}
        {(!loading && !data.boletas?.length) && (
					<Box textAlign='center' fontSize='body1.fontSize'>
						No hay boletas cargadas para este estudiante.
					</Box>
				)}
        <DialogConfirmation
          rdx1='requestStatus' 
          rdx2='deleteBoleta'
          close={
            setRequestStatus({open: false, data: {}, select: 'deleteBoleta'})
          }
          request={
            data => deleteBoleta({ submitData: data, refresh: handleRefresh })
          }
        >
          {(dataR) => (<span>Está a punto de eliminar la boleta <strong>{conveterCursorCode(dataR.curso?.curso)} {dataR.curso?.seccion} - {dataR.lapso}° Lapso</strong> de <strong>{data.user}</strong>. Tenga en cuenta que esta acción no se puede deshacer.</span>)}
        </DialogConfirmation>
        <ReplaceBoleta />
      </Container>
    </Box>
  )
}
