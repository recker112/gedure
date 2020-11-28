import React from 'react';

import {
	Grid,
} from '@material-ui/core';

// Components
import DataPersonalMadre from './components/DataPersonalMadre';
import DataPersonalPadre from './components/DataPersonalPadre';
import DataPersonalRepresentante from './components/DataPersonalRepresentante';
import DataPersonalUbiRepre from './components/DataPersonalUbiRepre';
import DataPersonalEmpleoRepre from './components/DataPersonalEmpleoRepre';
import DataPersonalEstudiante from './components/DataPersonalEstudiante';
import DataPersonalUbiEstudi from './components/DataPersonalUbiEstudi';
import DataPersonalOtrosEstudiante from './components/DataPersonalOtrosEstudiante';

import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

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
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
					<DataPersonalMadre />
					<DataPersonalPadre />
					<DataPersonalRepresentante />
					<DataPersonalUbiRepre />
					<DataPersonalEmpleoRepre />
					<DataPersonalEstudiante />
					<DataPersonalUbiEstudi />
					<DataPersonalOtrosEstudiante />
				</MuiPickersUtilsProvider>
			)}
		</Grid>
	);
}

export default StepDataPersonal;