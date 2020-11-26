import React from 'react';

import { useHistory } from 'react-router-dom';

import {
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import { isStepOptional, getSteps } from './PageUsuariosCrear';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateSteppersActive from '../../../../actions/updateSteppersActive';
import updateSteppersSkipped from '../../../../actions/updateSteppersSkipped';

const useStyles = makeStyles((theme) => ({
  buttonMargin: {
		marginLeft: 5,
  },
}));

function StepperControls() {
	const { activeStep, skipped } = useSelector((state) => ({
		activeStep: state.settings.steppers.active,
		skipped: state.settings.steppers.skipped,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const steps = getSteps();
	
	const history = useHistory();
	
	const isStepSkipped = (step) => {
		return skipped.has(step);
	};
	
	const handleNext = () => {
		let step = activeStep;
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}
		
		dispatch(updateSteppersActive(step + 1));
		dispatch(updateSteppersSkipped(newSkipped));
  };

	const handleSkip = () => {
		let step = activeStep;
		if (!isStepOptional(activeStep)) {
			throw new Error("No puedes omitir este paso porque no es omitible.");
		}

		dispatch(updateSteppersActive(step + 1));
		const newSkipped = new Set(skipped.values());
		newSkipped.add(activeStep);
		dispatch(updateSteppersSkipped(newSkipped));
	};
	
  const handleReset = () => {
		dispatch(updateSteppersActive(0));
  };
	
	const handleReturn = () => {
		history.push('/panel/usuarios');
	}
	
	const handleRequest1 = () => {
		handleNext();
	}
	
	return (
		<React.Fragment>
			{activeStep !== 1 && (
				<Button
					onClick={handleReturn}
				>
					{activeStep === 2 ? 'Cerrar' : 'Cancelar'}
				</Button>
			)}

			{isStepOptional(activeStep) && (
				<Button
					variant="contained"
					color="primary"
					onClick={handleSkip}
				>
					Saltar
				</Button>
			)}

			{activeStep < 2 && (
				<Button 
					variant="contained" 
					className={classes.buttonMargin} 
					color="primary"
					onClick={
						() => {
							if (activeStep === 0) {
								handleNext();
							}else if (activeStep === 1) {
								handleRequest1();
							}
						}	
					}
				>
					{activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
				</Button>
			)}

			{activeStep === 2 && (
				<Button className={classes.buttonMargin} onClick={handleReset}>
					Crear otro usuario
				</Button>
			)}
		</React.Fragment>
	);
}

export default StepperControls;