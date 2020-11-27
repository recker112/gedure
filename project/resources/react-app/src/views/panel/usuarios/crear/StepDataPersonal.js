import React from 'react';

import {
	Grid,
} from '@material-ui/core';

// Components
import DataPersonalMadre from './components/DataPersonalMadre';
import DataPersonalPadre from './components/DataPersonalPadre';
import DataPersonalRepresentante from './components/DataPersonalRepresentante';

// Redux
import { useSelector } from 'react-redux';

function StepDataPersonal() {
	const { loading, data } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
		data: state.forms.registerUser.data,
	}));
	
	return (
		<Grid container spacing={2}>
			{(data.privilegio === 'V-' || true) && (
				<React.Fragment>
					<DataPersonalMadre />
					<DataPersonalPadre />
					<DataPersonalRepresentante />
				</React.Fragment>
			)}
		</Grid>
	);
}

export default StepDataPersonal;