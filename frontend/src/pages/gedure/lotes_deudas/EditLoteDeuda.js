import React from 'react';

// Router
import { NavLink } from 'react-router-dom';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';

// Components
import AnimationDialog from '../../../components/AnimationDialog';
import { SelectHook } from '../../../components/form/select';
import { AutoCompleteAsyncHook, InputHook, InputMaskHook } from '../../../components/form/inputs';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatusWallet';
import { getUserSelectedWithoutDebt } from '../../../store/slices/requestStatusWallet/async_trunk/lotes_deudas/getUserSelectedWithoutDebt';
import { editLoteDebts } from '../../../store/slices/requestStatusWallet/async_trunk/lotes_deudas/editLoteDebts';

export default function EditLoteDeuda() {
  const { loading, open, data, dataSelected, administrar_transac } = useSelector(state => ({
    loading: state.requestStatusWallet.editLoteDeuda.loading,
    open: state.requestStatusWallet.editLoteDeuda.open,
    data: state.requestStatusWallet.editLoteDeuda.data,
    dataSelected: state.requestStatusWallet.editLoteDeuda.dataSelected,
    administrar_transac: state.auth.permissions.administrar_transac,
  }));
  const dispatch = useDispatch();

  const { control, watch, handleSubmit } = useForm({
		shouldUnregister: true,
	});

  const handleGetSelectedWithoutDebt = async (search) => {
    await dispatch(getUserSelectedWithoutDebt({ search, id: data.id }));
  }

  const handleClose = () => {
    dispatch(setRequestStatus({ select: 'editLoteDeuda', open: false }));
  }

  const onSubmit = submitData => {
    // NOTA(RECKER): Fix array users
		if (submitData.selected_users) {
			const users = submitData.selected_users.map(obj => obj.id);
			submitData.selected_users = users;
		}

    submitData._method = 'PUT';

    dispatch(editLoteDebts({ submitData, id: data.id }));
  }
  
  return (
    <Dialog
      open={open}
      TransitionComponent={AnimationDialog}
    >
      <DialogTitle >Editar lote de deuda #{data.id}</DialogTitle>
      <DialogContent>
        <form autoComplete='off'>
          <Grid container spacing={1}>
            <Grid item xs={12}>
							<DialogContentText>
                NOTA: Al usar otra moneda que no sea el bolivar, el sistema convertirá a bolívares el equivalente al precio actual registrado en el sistema, para más información vaya <Link component={NavLink} to='/gedure/preguntas-frecuentes'>aquí</Link>.
              </DialogContentText>
						</Grid>
            <Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 6, message: 'Error: Demaciado corto' },
									maxLength: { value: 100, message: 'Error: Demaciado largo' },
								}}
								name='reason'
								label='Motivo'
								helperText='Ingrese el motivo de la deuda'
								defaultValue={data.reason}
								fullWidth
								disabled={loading}
                size='small'
							/>
						</Grid>
            <Grid item xs={12}>
							<SelectHook
								name='exchange_rate_type'
								label='Tipo de moneda'
								control={control}
								disabled={loading}
                size='small'
								helperText='Seleccione la moneda que desea usar para esta deuda'
                defaultValue={data.exchange_rate_id !== null ? '$' : 'Bs.'}
								fullWidth
							>
								<MenuItem value='$'>USD</MenuItem>
								<MenuItem value='Bs.'>Bs.</MenuItem>
							</SelectHook>
						</Grid>
            <Grid item xs={12}>
							<InputMaskHook
								control={control}
								rules={{
									required: '* Campo requerido',
									min: { value: 0, message: 'Error: El monto debe ser mayor a 0' },
								}}
								name='amount_to_pay'
								label='Monto a pagar'
								helperText='Ingrese el monto a pagar de la deuda'
								fullWidth
                size='small'
								disabled={loading}
                decimalScale={2}
                thousandSeparator='.'
                decimalSeparator=','
                defaultValue={data.exchange_rate_id !== null ? data.exchange_amount : data.amount_to_pay}
                allowNegative={false}
								prefix={watch('exchange_rate_type') ? watch('exchange_rate_type')+' ' : data.exchange_rate?.type === 'USD' ? '$ ' : 'Bs. '}
							/>
						</Grid>
            {administrar_transac.debt_create && (
							<Grid item xs={12}>
                <AutoCompleteAsyncHook
                  data={dataSelected}
                  multiple
                  name='selected_users'
                  label='Agregar estudiantes'
                  helperText='Ingrese a los estudiantes que desea agregar a esta deuda'
                  placeholder="Cédula"
                  control={control}
                  disabled={loading}
                  getOptionLabel={(option) => (`${option.privilegio}${option.username} - ${option.name}`) || ''}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  limitTags={2}
                  handleRequest={handleGetSelectedWithoutDebt}
                />
              </Grid>
						)}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color='inherit'
        >
          Cancelar
        </Button>
        <LoadingButton onClick={handleSubmit(onSubmit)} loading={loading} variant="text" color="inherit">
          Actualizar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
