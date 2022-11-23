import React from 'react';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Form
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

// Components
import AnimationDialog from '../../../components/AnimationDialog';
import { InputHook, InputMaskHook } from '../../../components/form/inputs';
import { parseFloatToMoneyString } from '../../../components/Utils/ParseString';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatusWallet';
import { editWallets } from '../../../store/slices/requestStatusWallet/async_trunk/wallets/editWallets';

function StatusAccount({ control, data = {} }) {
	const balance = useWatch({
    control,
    name: 'data',
    defaultValue: [{amount:0}]
  });
	let new_balance = data?.balance || 0;
	balance.map((item) => new_balance += parseFloat(item.amount) || 0);
	
	return (
		<DialogContentText>
			<strong>Saldo actual del usuario:</strong> {parseFloatToMoneyString(data.balance || 0)}
			<br />
			<strong>Nuevo saldo:</strong> {parseFloatToMoneyString(new_balance || 0)}
			<br />
			Tenga en cuenta que el nuevo saldo no puede dar como resultado un número negativo.
		</DialogContentText>
	);
}

export default function EditWallets() {
  const { open, data, loading } = useSelector(state => state.requestStatusWallet.editWallets);
   const dispatch = useDispatch();

	const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const { control, handleSubmit } = useForm({
		shouldUnregister: true,
	});
	
  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
		shouldUnregister: true,
  });

   const handleClose = () => {
    dispatch(setRequestStatus({open: false, select: 'editWallets'}));
   }

	 const onSubmit = submitData => {
		if (submitData.data.length <= 0) {
			return null;
		}

		dispatch(editWallets({ submitData, id: data.wallet.id }));
	 }

  return (
    <Dialog 
      open={open}
      fullWidth={true}
			fullScreen={fullScreen}
      TransitionComponent={AnimationDialog}
    >
			<DialogTitle>Editar monedero de {data?.privilegio + data?.username}</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<DialogContentText>
							<strong>NOTA:</strong> Le recomendamos encarecidamente revisar la sección de preguntas frecuentes y buscar sobre el administrador de monederos antes de realizar alguna acción.
						</DialogContentText>
					</Grid>
					{fields.map((field, i) => (
						<React.Fragment key={field.id}>
							<Grid item xs={12}>
								<InputHook
									control={control}
									rules={{
										required: '* Campo requerido',
										minLength: { value: 3, message: 'Error: Demaciado corto' },
										maxLength: { value: 60, message: 'Error: Demaciado largo' },
									}}
									autoComplete='off'
									name={`data.${i}.reason`}
									label='Descripción'
									size='small'
									helperText='Ingrese una descripción a la acción'
									variant='outlined'
									fullWidth
									disabled={loading}
								/>
							</Grid>
							<Grid item xs={12}>
								<InputMaskHook
									control={control}
									rules={{
										required: '* Campo requerido',
										validate: {
											noZero: v => v !== 0 || 'Error: El monto no debe ser igual a 0'
										},
									}}
									autoComplete='off'
									name={`data.${i}.amount`}
									label='Importe'
									helperText='Ingrese la cantidad del importe'
									fullWidth
									size='small'
									disabled={loading}
									decimalScale={2}
									thousandSeparator='.'
									decimalSeparator=','
									prefix='Bs. '
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									size='small'
									onClick={() => remove(i)}
								>
									Eliminar
								</Button>
							</Grid>
						</React.Fragment>
					))}
					<Grid item xs={12}>
						<Button
							variant='outlined'
							onClick={() => append()}
						>
							Agregar acción
						</Button>
					</Grid>
					<Grid item xs={12}>
						<StatusAccount 
							data={data.wallet}
							control={control}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='inherit'>
					Cancelar
				</Button>
				<LoadingButton onClick={handleSubmit(onSubmit)} loading={loading} variant="text" color="inherit">
          Crear
        </LoadingButton>
			</DialogActions>
		</Dialog>
  )
}
