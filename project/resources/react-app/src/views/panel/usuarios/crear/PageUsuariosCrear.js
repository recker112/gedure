import React, { useEffect } from 'react';

import { 
	Container,
	Grid,
	Stepper,
	Step,
	StepLabel,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm, FormProvider } from "react-hook-form";

// Components
import ShowLocation from '../../../../components/ShowLocation';
import StepperControls from './StepperControls';
import StepRegisterUser from './StepRegisterUser';
import StepDataPersonal from './StepDataPersonal';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateSteppersActive from '../../../../actions/updateSteppersActive';
import updateSteppersSkipped from '../../../../actions/updateSteppersSkipped';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		marginBottom: theme.spacing(6),
		[theme.breakpoints.up('xs')]: {
			marginTop: '48px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(8),
		},
	},
}));

export function getSteps() {
  return ['Registrar usuario', 'Registrar usuario'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <StepRegisterUser />;
    case 1:
      return <StepDataPersonal />;
    case 2:
      return 'Etapa3';
    default:
      return 'Etapa no encontrada.';
  }
}

export const isStepOptional = (step) => {
	return step === 1;
};

function PageUsuariosCrear() {
	const { activeStep, skipped } = useSelector((state) => ({
		activeStep: state.settings.steppers.active,
		skipped: state.settings.steppers.skipped,
	}));
	const dispatch = useDispatch();
	
	const methods = useForm({
		mode: 'onTouched'
	});
	
  const steps = getSteps();
	
	const classes = useStyles();
	
	const isStepSkipped = (step) => {
		return skipped.has(step);
	};
	
	// DESMONTAR
	useEffect(()=>{
		return () => {
			dispatch(updateSteppersActive(0));
			dispatch(updateSteppersSkipped(new Set()));
		}
		// eslint-disable-next-line
	},[])
	
	return (
		<main className={classes.containerMain} ref={()=>{
			document.title = 'La Candelaria - Crear usuario';
		}}>
			<Container maxWidth='md' className='container--margin'>
				<FormProvider {...methods}>
					<form autoComplete='off'>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<ShowLocation />
							</Grid>
							<Grid item xs={12}>
								<Stepper activeStep={activeStep} alternativeLabel>
									{steps.map((label, index) => {
										const stepProps = {};
										const labelProps = {};
										if (isStepOptional(index)) {
											labelProps.optional = (
												<Typography 
													component='div' 
													align='center' variant="caption"
												>
													Opcional
												</Typography>
											);
										}
										if (isStepSkipped(index)) {
											stepProps.completed = false;
										}
										return (
											<Step key={index} {...stepProps}>
												<StepLabel {...labelProps}>{label}</StepLabel>
											</Step>
										);
									})}
								</Stepper>
							</Grid>
							<Grid item xs={12}>
								{activeStep === steps.length ? (
									<Typography>Finish proccess</Typography>
								) : (
									getStepContent(activeStep)
								)}
							</Grid>
							<Grid container justify='flex-end' item xs={12}>
								<StepperControls />
							</Grid>
						</Grid>
					</form>
				</FormProvider>
			</Container>
		</main>
	);
}

export default PageUsuariosCrear;