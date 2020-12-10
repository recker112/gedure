import React, { useState } from 'react';

import { 
	Grid,
	Typography,
	Container,
	CircularProgress,
	Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { useForm, FormProvider } from "react-hook-form";

import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";

// Components
import Aside, { getSteps } from './Aside';
import StepDataEstudiante from './StepDataEstudiante';
import StepDataSolicitud from './StepDataSolicitud';
import StepDataArtesanal from './StepDataArtesanal';
import StepDataRepresentante from './StepDataRepresentante';
import StepDataPadres from './StepDataPadres';

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
      return <StepDataEstudiante />;
    case 1:
      return <StepDataSolicitud />;
		case 2:
      return <StepDataArtesanal />;
		case 3:
      return <StepDataRepresentante />;
		case 4:
      return <StepDataPadres />;
    default:
      return 'Etapa no encontrada.';
  }
}

function Form() {
	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);
	// eslint-disable-next-line
	const [open, setOpen] = useState(false);
	
	const { activeStep } = useSelector((state) => ({
		activeStep: state.settings.steppers.active,
	}));
	
	const steps = getSteps();
	
	const methods = useForm({
		mode: 'onTouched'
	});
	
	return (
		<Container maxWidth='md' style={{minHeight: 400}} className='container--margin'>
			<FormProvider {...methods}>
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
					<form autoComplete='off'>
						<Grid container spacing={2}>
							{(open && !loading && activeStep !== steps.length) && (
								getStepContent(activeStep)
							)}

							{(open && !loading && activeStep === steps.length) && (
								<Grid container justify='center' spacing={2} item xs={12}>
									<Grid item xs={12}>
										<Typography align='center' variant='h4' className='text__bold--big'>
											Proceso terminado
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography align='center'>
											Ha completado el proceso satisfactoriamente. Nos comunicaremos con usted si queda seleccionado.
										</Typography>
									</Grid>
								</Grid>
							)}

							{loading && (
								<Grid container justify='center' item xs={12}>
									<CircularProgress />
								</Grid>
							)}

							{!open && !loading && (
								<Grid container justify='center' spacing={2} item xs={12}>
									<Grid item xs={12}>
										<Typography align='center' variant='h4' className='text__bold--big'>
											Proceso cerrado
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography align='center'>
											Actualmente el proceso de solicitud de cupo se encuentra cerrado, esté atento a las noticias para poder saber cuando se abrirá el proceso.
										</Typography>
									</Grid>
								</Grid>
							)}
						</Grid>
					</form>
				</MuiPickersUtilsProvider>
			</FormProvider>
		</Container>
	);
}

function PageSolicitud() {
	document.title = 'La Candelaria - Solicitud de cupo';
	
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