import React from 'react';

import {
	Container,
	Grid,
	Backdrop,
	CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import useFetch from '../../../hooks/useFetch';

import { useSnackbar } from 'notistack';

import { useForm, FormProvider } from "react-hook-form";

import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";

// Components
import Controls from './components/Controls';
import PendingPayments from './components/PendingPayments';
import SelectAccount from './components/SelectAccount';
import DataPayment from './components/DataPayment';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateSteppersActive from '../../../actions/updateSteppersActive';
import updateWallet from '../../../actions/updateWallet';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: 10,
	},
	footer: {
		margin: '10px 0',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
	},
}));

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <PendingPayments />;
		case 1:
			return <SelectAccount />;
		case 2:
			return <DataPayment />;
    default:
      return 'Etapa no encontrada.';
  }
}

export default function Form({ steps, stepperSelect }) {
	const { activeStep, dataStorage, loading } = useSelector((state) => ({
		activeStep: state.steppers[stepperSelect].active,
		dataStorage: state.steppers[stepperSelect].data,
		loading: state.steppers[stepperSelect].loading,
	}));
	const dispatch = useDispatch();
	
	const { enqueueSnackbar } = useSnackbar();
	
	const classes = useStyles();
	
	const methods = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	
	const { fetchData } = useFetch();
	
	const handleFinish = async (submitData) => {
		dispatch(updateSteppersActive(stepperSelect, activeStep, true));
		
		const prepare = {
			url: `v1/bank-account/${dataStorage.bank_account.id}/payment`,
			type: 'post',
			data: submitData,
			messageToFinish: false,
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			if (response.balance) {
				enqueueSnackbar(response.msg, {
					variant: 'success',
				});
				
				dispatch(updateWallet(response.balance));
			}else {
				enqueueSnackbar(response.msg, {
					variant: 'info',
				});
			}
			
			dispatch(updateSteppersActive(stepperSelect, 0, false));
		}else {
			dispatch(updateSteppersActive(stepperSelect, activeStep, false));
		}
	}
	
	return (
		<FormProvider {...methods}>
			<Container maxWidth='md' className={classes.container} data-tour="content">
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
					<form autoComplete='off'>
						<Grid container spacing={2} item xs={12}>
							{getStepContent(activeStep)}
						</Grid>
					</form>
				</MuiPickersUtilsProvider>
			</Container>
			<Container className={classes.footer} data-tour="controls">
				<Controls
					steps={steps}
					stepper={stepperSelect}
					onFinish={handleFinish}
				/>
			</Container>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</FormProvider>
	);
}