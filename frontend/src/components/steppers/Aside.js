import React from 'react';

import {
	Container,
	Grid,
	Typography,
	IconButton,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Tooltip,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

// Components
import GedureLogo from '../../imgs/gedure-logo-recto.svg';

// Redux
import { useSelector } from 'react-redux';

const useStylesStepper = makeStyles((theme) => ({
	root: {
    background: 'transparent',
		'& .MuiStepConnector-line': {
			borderColor: '#bdbdbd',
		}
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
	color: {
		color: theme.palette.primary.contrastText,
	},
	container: {
		marginTop: 10,
	},
	footer: {
		margin: '10px 0',
		color: theme.palette.primary.contrastText,
	},
	title: {
		marginLeft: 6,
		color: theme.palette.primary.contrastText,
	}
}));

export default function Aside(props) {
	const { steps, title, handleReturn, stepperSelect } = props;
	const { activeStep } = useSelector((state) => ({
		activeStep: state.steppers[stepperSelect].active,
	}));
	
	const classes = useStylesStepper()
	
	return (
		<React.Fragment>
			<Container className={classes.container}>
				<Grid container>
					<Grid container justify='space-between' alignItems='center' item xs={12}>
						<Grid item>
							<Tooltip title="Volver" arrow>
								<IconButton 
									className={classes.color}
									onClick={handleReturn}
									component='span'
								>
									<ArrowBackIcon />
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item xs>
							<Typography className={classes.title} component='div' variant='h5'>
								{title}
							</Typography>
						</Grid>
					</Grid>
					
					<Grid item xs={12}>
						<Stepper activeStep={activeStep} orientation="vertical" classes={{
								root: classes.root,
							}}
						>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel classes={{
										label: classes.label,
										active: classes.active,
										iconContainer: classes.icon,
										completed: classes.completed,
									}}>{label}</StepLabel>
									<StepContent />
								</Step>
							))}
						</Stepper>
					</Grid>
				</Grid>
			</Container>
			<Container className={classes.footer}>
				<Grid container justify='center' alignItems='center'>
					<Typography component='span' variant='h6' className='text__bold--semi'>
						Powered by
					</Typography>
					<img style={{marginLeft:3}} src={GedureLogo} alt='Logo de Gedure' height={25} />
				</Grid>
			</Container>
		</React.Fragment>
	);
}