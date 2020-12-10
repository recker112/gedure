import React from 'react';

import { useHistory } from 'react-router-dom';

import {
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useFormContext } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import { isStepOptional, getSteps } from './PageUsuariosCrear';
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateSteppersActive from '../../../../actions/updateSteppersActive';
import updateSteppersSkipped from '../../../../actions/updateSteppersSkipped';
import updateForms from '../../../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
  buttonMargin: {
		marginLeft: 10,
  },
}));

function StepperControls() {
	const { activeStep, skipped, loading, dataStorage } = useSelector((state) => ({
		activeStep: state.settings.steppers.active,
		skipped: state.settings.steppers.skipped,
		loading: state.forms.registerUser.loading,
		dataStorage: state.forms.registerUser.data,
	}));
	const dispatch = useDispatch();
	
	const { handleSubmit } = useFormContext();
	
	const { fetchData } = useFetch();
	
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
	
	const handleFinish = () => {
		let step = activeStep;
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}
		
		dispatch(updateSteppersActive(step + 2));
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
	
	const createRequest = async (data) => {
		dispatch(updateForms('registerUser', true));
		
		if (data.type_register === 'manual') {
			const prepare = {
				url: `v1/user`,
				type: 'post',
				data: data,
				messageToFinish: false,
				message404Server: true,
				messageTo422: true,
				message422: 'El correo ya existe',
			};

			const response = await fetchData(prepare);

			if (response) {
				dispatch(updateForms('registerUser', false, response));
				handleNext();
			}else {
				dispatch(updateForms('registerUser', false));
			}	
		}else {
			dispatch(updateForms('registerUser', false));
			handleFinish();
		}
	}
	
	const updatePersonalRequest = async (data) => {
		dispatch(updateForms('registerUser', true));
		data._method= 'PUT';
		
		const prepare = {
			url: `v1/user-data/${dataStorage.id}`,
			type: 'post',
			data: data,
			messageToFinish: false,
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateForms('registerUser', false, {}));
			handleNext();
		}else {
			dispatch(updateForms('registerUser', false));
		}
	}
	
	return (
		<React.Fragment>
			{activeStep !== 1 && (
				<Button
					onClick={handleReturn}
					disabled={loading}
				>
					{activeStep === 2 ? 'Volver' : 'Cancelar'}
				</Button>
			)}

			{isStepOptional(activeStep) && (
				<Button
					variant="contained"
					color="primary"
					onClick={handleSkip}
					disabled={loading}
				>
					Saltar
				</Button>
			)}

			{activeStep < 2 && (
				<LoadingComponent className={classes.buttonMargin} loading={loading}>
					<Button 
						variant="contained" 
						className={classes.buttonMargin} 
						color="primary"
						onClick={
							handleSubmit(activeStep === 0 ? createRequest : updatePersonalRequest)
						}
					>
						{activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
					</Button>
				</LoadingComponent>
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