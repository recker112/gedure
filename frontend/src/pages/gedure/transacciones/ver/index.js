import React, { useEffect } from 'react';

// Router
import { useNavigate, useParams } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Grid, IconButton, Tooltip } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';

// Components
import TransactionPDF from './TransactionPDF';
import useNotifier from '../../../../hooks/useNotifier';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { showTransaction } from '../../../../store/slices/requestStatusWallet/async_trunk/transacciones/showTransaction';
import { resetDataRequest } from '../../../../store/slices/requestStatusWallet';
import { downloadTransaction } from '../../../../store/slices/requestStatusWallet/async_trunk/transacciones/downloadTransaction';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function VerTransacciones() {
  const { id } = useParams();
  useNotifier();

  const { count_notify, data, loading, progress, loadingDownload } = useSelector(state => ({
    count_notify: state.auth.notify.count,
    data: state.requestStatusWallet.showTransaction.data,
    loading: state.requestStatusWallet.showTransaction.loading,
    progress: state.requestStatusWallet.showTransaction.progress,
    loadingDownload: state.requestStatusWallet.showTransaction.loadingDownload,
  }));
  const dispatch = useDispatch();

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Ver transacciones - La Candelaria` : `Ver transacciones - La Candelaria`;

  const navigate = useNavigate();

  const handleReturn = () => {
    if (window.history.state && window.history.state.usr?.backPanel) {
      navigate(-1);
    } else {
      navigate('/gedure/transacciones');
    }
  }

  const handleDownload = () => {
    dispatch(downloadTransaction(id));
  }

  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(showTransaction(id));
    }

    return () => {
      if (loading) {
        promise.abort();
      }
      dispatch(resetDataRequest({ select: 'showTransaction' }));
    }
    // eslint-disable-next-line
  }, []);
  
  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Grid sx={{mb: 3}} container justifyContent='space-between'>
          <Grid item xs>
            <Tooltip title='Volver' arrow>
              <IconButton onClick={handleReturn} aria-label="return">
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title='Descargar' arrow>
              <LoadingButton 
                loading={loadingDownload}
                component='span'
                disabled={loading || Object.keys(data).length <= 0} 
                loadingIndicator={loadingDownload && progress < 99 ? `${progress}%` : null} 
                onClick={handleDownload} 
                color='inherit'
              >
                <DownloadIcon />
              </LoadingButton>
            </Tooltip>
          </Grid>
        </Grid>
        {loading && (
          <Box textAlign='center'>
            <CircularProgress />
          </Box>
        )}

        {(!loading && Object.keys(data).length > 0) && (
          <TransactionPDF {...data} />
        )}

        {(!loading && Object.keys(data).length <= 0) && (
					<Box textAlign='center'>
						No se pudo encontrar la transacción solicitada.
					</Box>
				)}
      </Container>
    </Box>
  )
}