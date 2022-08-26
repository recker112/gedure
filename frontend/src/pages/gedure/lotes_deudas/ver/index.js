import React, { useEffect } from 'react';

// Router
import { useNavigate, useParams } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Components
import TourVerLotes from './TourVerLotes';
import useNotifier from '../../../../hooks/useNotifier';
import { parseFloatToMoneyString } from '../../../../components/Utils/ParseString';
import Table from './Table';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getLoteDebts } from '../../../../store/slices/requestStatusWallet/async_trunk/lotes_deudas/getLoteDebts';
import { resetDataRequest } from '../../../../store/slices/requestStatusWallet';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function ShowDebtLote() {
  useNotifier();
  const { id } = useParams();

  const { count_notify, show: { loading, data } } = useSelector(state => ({
    count_notify: state.auth.notify.count,
    show: state.requestStatusWallet.showLoteDeuda,
  }));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleReturn = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/gedure/lotes-deudas');
    }
  }

  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(getLoteDebts(id));
    }

    return () => {
      if (loading) {
        promise.abort();
      }
      dispatch(resetDataRequest({ select: 'showLoteDeuda' }));
    }
    // eslint-disable-next-line
  }, []);

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Ver lote de deuda #${id} - La Candelaria` : `Ver lote de deuda #${id} - La Candelaria`;

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box mb={3}>
          <Grid container justifyContent='space-between'>
            <Tooltip title='Volver' arrow>
              <IconButton onClick={handleReturn} aria-label="return">
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Box>
        {loading && (
          <Box textAlign='center'>
            <CircularProgress />
          </Box>
        )}

        {(!loading && Object.keys(data).length > 0) && (
          <>
            <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
              Lote de deuda #{id}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper className='paper--padding' data-tour="view-data">
                  <Grid justifyContent='center' container rowSpacing={2}>
                    <Grid item xs={12}>
                      <Stack alignItems='center' direction="row" spacing={2}>
                        <ReceiptIcon />
                        <Typography variant='h6' className='text__bold--semi'>
                          Detalles del lote de deudas
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography align='center'>
                        Motivo de la deuda
                      </Typography>
                      <Typography align='center' variant="body2" sx={{ color: "text.secondary" }}>
                        {data.reason}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography align='center'>
                        Monto a pagar
                      </Typography>
                      <Typography align='center' variant="body2" sx={{ color: "text.secondary" }}>
                        {parseFloatToMoneyString(data.amount_to_pay)}
                      </Typography>
                    </Grid>
                    {(data.exchange_rate_id !== null && data.exchange_rate.type === 'USD') && (
                      <>
                        <Grid item xs={12} sm={6} md={4}>
                          <Typography align='center'>
                            Monto en dólares a pagar
                          </Typography>
                          <Typography align='center' variant="body2" sx={{ color: "text.secondary" }}>
                            {parseFloatToMoneyString(data.exchange_amount, '$ ')}
                          </Typography>
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography align='center'>
                        Deuda asigada a
                      </Typography>
                      <Typography align='center' variant="body2" sx={{ color: "text.secondary" }}>
                        {data.debts_count} usuario(s)
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography align='center'>
                        Usuarios solventes
                      </Typography>
                      <Typography align='center' variant="body2" sx={{ color: "text.secondary" }}>
                        {data.debts_pagas_count} usuario(s)
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography align='center'>
                        Usuarios no solventes
                      </Typography>
                      <Typography align='center' variant="body2" sx={{ color: "text.secondary" }}>
                        {data.debts_no_pagadas_count} usuario(s)
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography align='center'>
                        Fecha de creación
                      </Typography>
                      <Typography align='center' variant="body2" sx={{ color: "text.secondary" }}>
                        {data.created_at}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography align='center'>
                        Última edición
                      </Typography>
                      <Typography align='center' variant="body2" sx={{ color: "text.secondary" }}>
                        {data.updated_at}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Table />
              </Grid>
            </Grid>
          </>
        )}

        {(!loading && Object.keys(data).length <= 0) && (
          <Typography align='center'>
            El lote de deudas #{id} no existe.
          </Typography>
        )}
      </Container>
      <TourVerLotes />
    </Box>
  )
}