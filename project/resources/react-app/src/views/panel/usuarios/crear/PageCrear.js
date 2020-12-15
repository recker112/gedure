import React from 'react';

import { 
	Grid,
	Container,
	Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { useForm, FormProvider } from "react-hook-form";

import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";

// Components
import Aside from './Aside';
import StepType from './StepType';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
	},
	aside: {
		backgroundColor: theme.palette.primary.main,
		width: '100%',
	},
}));

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <StepType />;
    case 1:
      return 'Step2';
    default:
      return 'Etapa no encontrada.';
  }
}

function Form() {
	const { activeStep } = useSelector((state) => ({
		activeStep: state.settings.steppers.active,
	}));
	
	const methods = useForm({
		mode: 'onTouched'
	});
	
	return (
		<Container maxWidth='md' style={{minHeight: 400}} className='container--margin'>
			<FormProvider {...methods}>
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
					<form autoComplete='off'>
						{getStepContent(activeStep)}
					</form>
				</MuiPickersUtilsProvider>
			</FormProvider>
		</Container>
	);
}

function PageSolicitud() {
	document.title = 'La Candelaria - Crear usuario';
	
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain}>
			<Grid container style={{height: '100%'}}>
				<Slide direction="right" in={true} mountOnEnter unmountOnExit>
					<Grid className={classes.aside} item sm={12} md={4}>
						<Aside />
					</Grid>
				</Slide>
				
				<Slide direction="left" in={true} mountOnEnter unmountOnExit>
					<Grid item sm={12} md={8}>
						<Form />
					</Grid>
				</Slide>
			</Grid>
		</main>
	);
}

export default PageSolicitud;