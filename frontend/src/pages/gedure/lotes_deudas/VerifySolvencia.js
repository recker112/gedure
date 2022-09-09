import React from 'react';

// MUI
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Components
import AnimationDialog from '../../../components/AnimationDialog';
import { parseFloatToMoneyString } from '../../../components/Utils/ParseString';

// Form
import { useForm } from 'react-hook-form';
import { AutoCompleteAsyncHook } from '../../../components/form/inputs';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatusWallet';
import { getSolvencia } from '../../../store/slices/requestStatusWallet/async_trunk/lotes_deudas/getSolvencia';

const colorChip = {
  'no pagada': 'error',
  'pagada': 'success',
  'exonerada': 'info',
}

export default function VerifySolvencia() {
  const { loading, open, dataUserSelected } = useSelector(state => ({
    loading: state.requestStatusWallet.verifySolvencia.loading,
    open: state.requestStatusWallet.verifySolvencia.open,
    dataUserSelected: state.requestStatusWallet.verifySolvencia.dataUserSelected,
  }));
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { control, handleSubmit, watch } = useForm({
		shouldUnregister: true,
	});

  const handleClose = () => {
    dispatch(setRequestStatus({ select: 'verifySolvencia', open: false }));
  }

  const handleGetUser = async (valueInput) => {
    await dispatch(getSolvencia(valueInput));
  }

  const onSubmit = submitData => {
    console.log(submitData);
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={AnimationDialog}
			fullScreen={fullScreen}
      fullWidth
    >
      <DialogTitle>Verificar solvencia</DialogTitle>
      <DialogContent>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography color='text.secondary'>
                Usuario seleccionado
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteAsyncHook
                data={dataUserSelected}
                label='Buscar estudiante'
                name='user'
                handleRequest={handleGetUser}
                getOptionLabel={(option) => option.username || ''}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.privilegio}{option.username} - {option.name}
                  </Box>
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                placeholder='Cédula'
                control={control}
                disabled={loading}
                rules={{
                  required: { value: true, message: '* Campo requerido' },
                }}
              />
            </Grid>

            <Grid sx={{mt: 4}} item xs={12}>
              <Typography color='text.secondary'>
                Información de estado
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                Estado en el sistema
              </Typography>
              <Typography variant="body2" sx={{ color: watch('user')?.is_solvente ? 'success.main' : 'error.main' }}>
                {watch('user')?.is_solvente ? 'Solvente' : 'No solvente'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                Total de deudas
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {watch('user')?.debts_count ? watch('user')?.debts_count : 0} deuda(s)
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                Deudas pagadas
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {watch('user')?.debts_pagas_count ? watch('user')?.debts_pagas_count : 0} deuda(s)
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                Deudas no pagadas
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {watch('user')?.debts_no_pagadas_count ? watch('user')?.debts_no_pagadas_count : 0} deuda(s)
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                Deudas exoneradas
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {watch('user')?.debts_exoneradas_count ? watch('user')?.debts_exoneradas_count : 0} deuda(s)
              </Typography>
            </Grid>

            <Grid sx={{mt: 4}} item xs={12}>
              <Typography color='text.secondary'>
                Deudas no pagadas
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Table size="small" aria-label="table">
                <TableHead>
                  <TableRow>
                    <TableCell>Deuda</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Monto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {watch('user')?.debts && watch('user')?.debts.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {item.debt_lote.reason}
                      </TableCell>
                      <TableCell>
                        <Chip
                          color={colorChip[item.status]}
                          variant='outlined'
                          label={item.status}
                        />
                      </TableCell>
                      <TableCell>{parseFloatToMoneyString(item.debt_lote.amount_to_pay)}</TableCell>
                    </TableRow>
                  ))}
                  {(!watch('user')?.id || watch('user')?.debts.length === 0) && (
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={3} sx={{textAlign: 'center'}}>
                        No hay resultados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color='inherit'
        >
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  )
}
