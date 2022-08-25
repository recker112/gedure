import React from 'react';

// Router
import { NavLink } from 'react-router-dom';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Form
import { useForm } from "react-hook-form";
import { AutoCompleteAsyncHook, InputHook, InputMaskHook } from '../../../components/form/inputs';
import { SelectHook } from '../../../components/form/select';
import { SwitchHook } from '../../../components/form/switch';

// Components
import AnimationDialog from '../../../components/AnimationDialog';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatusWallet';
import { getUserSelected } from '../../../store/slices/requestStatusWallet/async_trunk/lotes_deudas/getUserSelected';
import { getCursos } from '../../../store/slices/requestStatus/async_trunk/users/getCursos';
import { createLoteDebts } from '../../../store/slices/requestStatusWallet/async_trunk/lotes_deudas/createLoteDebts';

export default function CreateLoteDeuda() {
  const { loading, open, dataUserSelected, dataCurso } = useSelector(state => ({
    loading: state.requestStatusWallet.createLoteDeuda.loading,
    open: state.requestStatusWallet.createLoteDeuda.open,
    dataUserSelected: state.requestStatusWallet.createLoteDeuda.dataUserSelected,
    dataCurso: state.requestStatus.createUser.data,
  }));
  const dispatch = useDispatch();

	const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { control, watch, handleSubmit } = useForm({
		shouldUnregister: true,
	});

  const handleClose = () => {
    dispatch(setRequestStatus({ select: 'createLoteDeuda', open: false }));
  }

  const handleGetSelected = async (valueInput) => {
    await dispatch(getUserSelected(valueInput));
  }

  const handleGetCurso = async (valueInput) => {
    await dispatch(getCursos(valueInput));
  }

  const onSubmit = submitData => {
    // NOTA(RECKER): Acomodar arrays
		if (submitData.selected_users) {
			const users = submitData.selected_users.map(obj => obj.id);
			submitData.selected_users = users;
		}else if (submitData.cursos) {
			const cursos = submitData.cursos.map(obj => obj.id);
			submitData.cursos = cursos;
		}

    dispatch(createLoteDebts({ submitData, handleClose }));
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={AnimationDialog}
			fullScreen={fullScreen}
    >
      <DialogTitle>Crear lote de deudas</DialogTitle>
      <DialogContent>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
                size='small'
								helperText='Ingrese el motivo de la deuda'
								fullWidth
								disabled={loading}
							/>
						</Grid>
            <Grid item xs={12} sm={6}>
							<SelectHook
								name='exchange_rate_type'
								label='Tipo de moneda'
								control={control}
								disabled={loading}
                size='small'
								helperText='Seleccione la moneda que desea usar para esta deuda'
								fullWidth
							>
                <MenuItem value=''><em>Ninguno</em></MenuItem>
								<MenuItem value='$'>USD</MenuItem>
								<MenuItem value='Bs.'>Bs.</MenuItem>
							</SelectHook>
						</Grid>
            <Grid item xs={12} sm={6}>
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
								disabled={loading || !watch('exchange_rate_type')?.length}
                decimalScale={2}
                thousandSeparator='.'
                decimalSeparator=','
                allowNegative={false}
								prefix={watch('exchange_rate_type')+' '}
							/>
						</Grid>
            <Grid item xs={12}>
							<SelectHook
								name='type'
								label='Deuda para'
								control={control}
								disabled={loading}
								helperText='Seleccione a los estudiantes que recibirán esta deuda'
                size='small'
								fullWidth
							>
								<MenuItem value=''><em>Ninguno</em></MenuItem>
								<MenuItem value='all_studiends'>Todos los estudiantes</MenuItem>
								<MenuItem value='selected'>Estudiantes seleccionados</MenuItem>
								<MenuItem value='cursos'>Cursos</MenuItem>
							</SelectHook>
						</Grid>

            {watch('type') === 'selected' && (
							<Grid item xs={12}>
                <AutoCompleteAsyncHook
                  data={dataUserSelected}
                  multiple
                  name='selected_users'
                  label='Buscar estudiantes'
                  control={control}
                  disabled={loading}
                  getOptionLabel={(option) => (`${option.privilegio}${option.username} - ${option.name}`) || ''}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  limitTags={2}
                  placeholder="Cédula"
                  handleRequest={handleGetSelected}
                  rules={{
                    required: { value: true, message: '* Campo requerido' },
                    validate: value => value.length > 0 || 'Error: Debe de seleccionar al menos a 1 usuario',
                  }}
                />
							</Grid>
						)}

            {watch('type') === 'cursos' && (
							<Grid item xs={12}>
								<AutoCompleteAsyncHook
                  data={dataCurso}
									multiple
									label='Buscar cursos'
									name='cursos'
									handleRequest={handleGetCurso}
									getOptionLabel={(option) => option.code}
                  isOptionEqualToValue={(option, value) => option.code === value.code}
                  limitTags={2}
                  placeholder='Código'
									control={control}
                  disabled={loading}
									rules={{
										required: { value: true, message: '* Campo requerido' },
										validate: value => value.length > 0 || 'Error: Debe de seleccionar al menos a 1 usuario',
									}}
								/>
							</Grid>
						)}
          </Grid>
					<input type='submit' hidden />
        </form>
      </DialogContent>
      <DialogActions>
        <SwitchHook
					control={control}
					name='create_more'
					label="Crear más de uno"
					labelPlacement="start"
					color="primary"
					disabled={loading}
				/>
        <Button
					sx={{ml: 1}}
          onClick={handleClose}
          color='inherit'
        >
          Cancelar
        </Button>
        <LoadingButton onClick={handleSubmit(onSubmit)} loading={loading} variant="text" color="inherit">
          crear
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
