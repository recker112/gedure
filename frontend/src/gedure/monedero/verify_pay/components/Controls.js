import React from 'react';

import {
	Grid,
	Button,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateSteppersActive from '../../../../actions/updateSteppersActive';

export default function Controls(props) {
	const { stepper, steps, onFinish } = props;
	
	const { activeStep, dataStorage, loading } = useSelector((state) => ({
		activeStep: state.steppers[stepper].active,
		dataStorage: state.steppers[stepper].data,
		loading: state.steppers[stepper].loading,
	}));
	const dispatch = useDispatch();
	
	const { handleSubmit } = useFormContext();
	
	const handleNext = () => {
		dispatch(updateSteppersActive(stepper, activeStep + 1));
  };
	
	const handleBack = () => {
		dispatch(updateSteppersActive(stepper, activeStep - 1));
  };
	
	const onSaveData = (submitData) => {
		const dataParse = {
			...dataStorage,
			...submitData,
		};
		
		dispatch(updateSteppersActive(stepper, activeStep, false, dataParse));
		handleNext()
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
					disabled={loading}
					onClick={
						handleSubmit(activeStep === (steps.length - 1) ? onFinish : onSaveData)
					}
				>
					{activeStep === steps.length -1 ? 'Terminar' : 'Siguiente'}
				</Button>
			</Grid>
		</Grid>
	);
}