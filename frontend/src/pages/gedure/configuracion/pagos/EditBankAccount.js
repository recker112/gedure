import React, { useCallback } from 'react';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material';

// Form
import { useForm } from 'react-hook-form';
import { InputHook, InputMaskHook } from '../../../../components/form/inputs';
import { SwitchHook } from '../../../../components/form/switch';
import { SelectHook } from '../../../../components/form/select';

// Components
import AnimationDialog from '../../../../components/AnimationDialog';
import { BankList } from '../../../../components/Utils/BankList';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../../store/slices/requestStatus';

export default function EditBankAccount() {
  const { data, open, loading } = useSelector(state => state.requestStatus.editBankAccount);
  const dispatch = useDispatch();

  const { control, watch } = useForm({
    shouldUnregister: true,
  })

  const handleClose = () => {
    dispatch(setRequestStatus({open: false, data: {}, select: 'editBankAccount'}))
  }

  const MenuItemList = BankList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.label}</MenuItem>
	),[]));

  return (
    <Dialog
      open={open}
      TransitionComponent={AnimationDialog}
    >
      <DialogTitle>Editar cuenta bancaria #{data.id}</DialogTitle>
      <DialogContent>
        <form autoComplete='off'>
          <Grid container spacing={2}>
            {watch('important_data') === true && (
              <Grid item xs={12}>
                <InputMaskHook
                  control={control}
                  rules={{
                    required: '* Campo requerido',
                    minLength: { value: 20, message: 'Error: Cuenta no válida' },
                    maxLength: { value: 20, message: 'Error: Cuenta no válida' },
                  }}
                  name='n_account'
                  label='N° de cuenta'
                  fullWidth
                  size='small'
                  variant='standard'
                  disabled={loading}
                  defaultValue={data.n_account}
                  format="#### #### #### #### ####"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <InputMaskHook
                control={control}
                rules={{
                  required: '* Campo requerido',
                  minLength: { value: 9, message: 'Error: RIF no válida' },
                  maxLength: { value: 9, message: 'Error: RIF no válida' },
                }}
                name='rif'
                label='RIF'
                fullWidth
                size='small'
                variant='standard'
                disabled={loading}
                defaultValue={data.rif}
                format="J-########-#"
              />
            </Grid>
            <Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 6, message: 'Error: Demaciado corto' },
									maxLength: { value: 100, message: 'Error: Demaciado largo' },
								}}
								name='name'
								label='Nombre'
                size='small'
                variant='standard'
								fullWidth
								disabled={loading}
								defaultValue={data.name}
							/>
						</Grid>
            <Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Error: Correo no válido',
									},
								}}
								name='email'
								label='Correo'
                size='small'
                variant='standard'
								fullWidth
								disabled={loading}
								defaultValue={data.email}
							/>
						</Grid>
            <Grid item xs={12}>
							<SelectHook
								name='type'
								label='Tipo de cuenta'
								control={control}
								disabled={loading}
                size='small'
                variant='standard'
								fullWidth
								defaultValue={data.type}
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								<MenuItem value='ahorro'>
									Ahorro
								</MenuItem>
								<MenuItem value='corriente'>
									Corriente
								</MenuItem>
							</SelectHook>
						</Grid>
            <Grid item xs={12}>
							<SelectHook
								name='code'
								label='Banco'
								control={control}
								disabled={loading}
                size='small'
                variant='standard'
								fullWidth
								defaultValue={data.code}
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								{MenuItemList}
							</SelectHook>
						</Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <SwitchHook
					control={control}
					name='important_data'
					label="Modificar campos importantes"
					labelPlacement="start"
					color="primary"
					disabled={loading}
				/>
        <Button sx={{ml: 1}} color='inherit' disabled={loading} onClick={handleClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
