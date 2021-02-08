import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import {
	Container,
	Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Components
import SectionAdmin from './SectionAdmin';
import SectionUser from './SectionUser';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(5),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
}));

export default function PageSetup() {
	document.title = 'La Candelaria - Setup';
	
	const { actived_at, privilegio } = useSelector((state) => ({
		actived_at: state.userData.user.actived_at,
		privilegio: state.userData.user.privilegio,
	}));
	
	const history = useHistory();
	
	const classes = useStyles();
	
	useEffect(() => {
		if (actived_at) {
			history.push('/gedure');
		}
		
		// eslint-disable-next-line
	},[]);
	
	return (
		<main className={classes.containerMain}>
			<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
				<Container>
					<Box fontSize='h4.fontSize' mb={2} align='center'>
						Antes de empezar necesitamos algunos datos de usted...
					</Box>
					{(privilegio === 'A-') && (
						<SectionAdmin />
					)}
					{(privilegio === 'V-') && (
						<SectionUser />
					)}
				</Container>
			</MuiPickersUtilsProvider>
		</main>
	);
}