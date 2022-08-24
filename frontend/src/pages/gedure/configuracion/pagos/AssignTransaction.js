import React from 'react';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Form
import { useForm } from 'react-hook-form';
import { AutoCompleteAsyncHook } from '../../../../components/form/inputs';

// Components
import AnimationDialog from '../../../../components/AnimationDialog';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../../store/slices/requestStatus';
import { parseFloatToMoneyString } from '../../../../components/Utils/ParseString';
import { searchUser } from '../../../../store/slices/requestStatus/async_trunk/configuracion/pagos/searchUser';
import { assignTransactionRequest } from '../../../../store/slices/requestStatus/async_trunk/configuracion/pagos/assignTransaction';

export default function AssignTransaction() {
  const { autoComplete, data, open, loading } = useSelector(state => state.requestStatus.assignTransaction);
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { control, handleSubmit } = useForm({
    shouldUnregister: true,
  })

  const handleClose = () => {
    dispatch(setRequestStatus({open: false, data: {}, select: 'assignTransaction'}))
  }

  const onSubmit = submitData => {
    submitData.user_selected = submitData.user_selected.id;

    dispatch(assignTransactionRequest({submitData, id: data.id}));
  }

  const handleRequest = async (valueInput) => {
    await dispatch(searchUser(valueInput));
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={AnimationDialog}
      fullScreen={fullScreen}
    >
      <DialogTitle>Asignar transacción bancaria #{data.id}</DialogTitle>
      <DialogContent>
        <form autoComplete='off'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DialogContentText>
                Ha seleccionado la transacción bancaria <strong>#{data.id}</strong> para asigarla a un usuario, esta acción acreditará <strong>{parseFloatToMoneyString(data.amount || 0)}</strong> a la cuenta del usuario seleccionado.
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <AutoCompleteAsyncHook
                data={autoComplete}
                label='Seleccionar usuario'
							  name='user_selected'
                helperText='Busque al usuario que desea seleccionar'
                control={control}
                disabled={loading}
                getOptionLabel={(option) => `${option.privilegio}${option.username} - ${option.name}` || ""}
                isOptionEqualToValue={(option, value) => option.n_account === value.n_account}
                handleRequest={handleRequest}
                rules={{
                  required: { value: true, message: '* Campo requerido' },
                }}
              />
						</Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button sx={{ml: 1}} color='inherit' disabled={loading} onClick={handleClose}>
          Cancelar
        </Button>
        <LoadingButton onClick={handleSubmit(onSubmit)} loading={loading} variant="text" color="inherit">
          Asignar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
