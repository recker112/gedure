import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { 
	Box,
	Container,
	Grid,
	Typography, 
	Stepper,
	Step,
	StepLabel,
	StepContent,
	IconButton,
	Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Components
import logoGedure from '../../../../imgs/Gedure-Logo.png';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateSteppersActive from '../../../../actions/updateSteppersActive';

const useStylesStepper = makeStyles((theme) => ({
	root: {
    background: theme.palette.primary.main,
  },
	active: {
		color: 'rgba(255, 255, 255, 0.87) !important',
	},
	completed: {
		color: 'white !important',
	},
	icon: {
		'& .MuiStepIcon-active': {
			color: theme.palette.secondary.main,
		},
		
		'& .MuiStepIcon-completed': {
			color: theme.palette.secondary.main,
		}
	},
	label: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
	button: {
		color: theme.palette.secondary.contrastText,
	},
}));

export function getSteps() {
  return [
		'Tipo de creación', 
		'Datos del usuario',
	];
}

function Aside() {
	const { activeStep } = useSelector((state) => ({
		activeStep: state.settings.steppers.active,
	}));
	const dispatch = useDispatch();
	
	let history = useHistory();
	
	const steps = getSteps();
	
	const classesStepper = useStylesStepper();
	
	// DESMONTAR
	useEffect(()=>{
		return () => {
			dispatch(updateSteppersActive(0));
		}
		// eslint-disable-next-line
	},[])
	
	return (
		<Container style={{height: '100%'}}>
			<Box py={2} color='primary.contrastText' style={{height: '100%'}}>
				<Grid container direction='column' justify='space-between' style={{height: '100%'}}>
					<Grid container item>
						<Grid container alignItems='center' item xs={12}>
							<IconButton 
								className={classesStepper.button}
								onClick={()=>{
									if (history.length > 2) {
										history.goBack();
									}else {
										history.push('/panel/usuarios');
									}
								}}
							>
								<ArrowBackIcon />
							</IconButton>
							<Box display='inline-block' ml={1} color="primary.contrastText">
								<Typography component='div' variant='h5'>
									Crear usuario
								</Typography>
							</Box>
						</Grid>
						
						<Grid item xs={12}>
							<Stepper activeStep={activeStep} orientation="vertical" classes={{
									root: classesStepper.root,
								}}
							>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel classes={{
											label: classesStepper.label,
											active: classesStepper.active,
											iconContainer: classesStepper.icon,
											completed: classesStepper.completed,
										}}>{label}</StepLabel>
										<StepContent />
									</Step>
								))}
							</Stepper>
						</Grid>
					</Grid>
					
					<Grid container justify='center' alignItems='center' item>
						<Box display='inline-block' color="primary.contrastText" mr={1}>
							<Typography component='div' variant='h6' className='text__bold--big text__opacity--semi'>
								Powered by
							</Typography>
						</Box>
						<Link style={{display: 'inherit'}} href='https://github.com/recker112/gedure'>
							<img src={logoGedure} alt='Logo de Gedure' height={20} />
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default Aside;