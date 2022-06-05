import React from 'react';

import Tour from 'reactour';

// MUI
import { Button } from '@mui/material';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateTour } from '../store/slices/configs';

function TourComponent({ steps, select, version = 'v1' }) {
	const { tourOpen } = useSelector((state) => ({
		tourOpen: state.configs.tour[select],
	}));
	const dispatch = useDispatch();
	
	const handleClose = ()=>{
		dispatch(updateTour({open: true, tour: select, version}));
	}
	
	return (
		<Tour 
			steps={steps}
			isOpen={!tourOpen}
			disableInteraction={true}
			onAfterOpen={() => {document.body.style.overflowY = 'hidden'}}
			onBeforeClose={() => {document.body.style.overflowY = 'auto'}}
			showCloseButton={false}
			rounded={5}
			lastStepNextButton={
				<Button component='span' size='small' color='primary' onClick={handleClose}>Terminar guía</Button>
			}
		/>
	);
}

export default TourComponent;