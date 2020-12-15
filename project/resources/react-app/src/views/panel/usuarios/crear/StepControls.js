import React from 'react';

import {
	Grid,
	Button,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import { getSteps } from './Aside';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateSteppersActive from '../../../../actions/updateSteppersActive';
import updateForms from '../../../../actions/updateForms';

function StepControls() {
	const { activeStep, loading, dataStorage } = useSelector((state) => ({
		activeStep: state.settings.steppers.active,
		loading: state.forms.crearUser.loading,
		dataStorage: state.forms.crearUser.data,
	}));
	const dispatch = useDispatch();
	
	const steps = getSteps();
	
	const { handleSubmit } = useFormContext();
	
	const handleNext = () => {
		dispatch(updateSteppersActive(activeStep + 1));
  };
	
	const handleBack = () => {
		dispatch(updateSteppersActive(activeStep - 1));
  };
	
	const onSaveData = (submitData) => {
		const dataParse = {
			...dataStorage,
			...submitData,
		};
			
		dispatch(updateForms('solicitudCupo', false, dataParse));
		console.log(dataParse);
		handleNext();
	};
		
	const onRequest = (submitData) => {
		dispatch(updateForms('solicitudCupo', true));
		
		const dataParse = {
			...dataStorage,
			...submitData,
		};
		
		alert('ENVIAR REQUEST');
		console.log(dataParse);
	};
	
	return (
		<Grid container justify='space-between' spacing={2} item xs={12}>
			<Grid item>
				<Button
					disabled={activeStep === 0 || loading}
					onClick={handleBack}
				>
					Regresar
				</Button>
			</Grid>
			
			<Grid item>
				<Button 
					variant='contained' 
					color='primary'
					onClick={
						handleSubmit(activeStep === 4 ? onRequest : onSaveData)
					}
				>
					{activeStep === steps.length -1 ? 'Terminar' : 'Siguiente'}
				</Button>
			</Grid>
		</Grid>
	);
}

export default StepControls;