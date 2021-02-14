import React from 'react';

import Tour from 'reactour';

import { 
	Button,
} from '@material-ui/core';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateTour from '../actions/updateTour';

function TourComponent({ steps, select }) {
	const { tourOpen } = useSelector((state) => ({
		tourOpen: state.settings.tour[select],
	}));
	const dispatch = useDispatch();
	
	const handleClose = ()=>{
		dispatch(updateTour(false, select));
	}
	
	return (
		<Tour 
			steps={steps}
			isOpen={tourOpen}
			disableInteraction={true}
			onAfterOpen={() => {document.body.style.overflowY = 'hidden'}}
			onBeforeClose={() => {document.body.style.overflowY = 'auto'}}
			showCloseButton={false}
			rounded={5}
			lastStepNextButton={
				<Button size='small' color='primary' onClick={handleClose}>Terminar guía</Button>
			}
		/>
	);
}

export default TourComponent;