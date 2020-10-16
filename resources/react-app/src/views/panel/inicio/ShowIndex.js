import React from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LocationShow from './../../../components/LocationShow';

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	padding: {
		padding: theme.spacing(2),
	},
	marginFinish: {
		marginBottom: theme.spacing(4)
	},
}));

function ShowIndex() {
	const classes = useStyles();
	
	return (
		<Container maxWidth='md' className={classes.marginFinish}>
			<Grid container className={classes.margin}>
				<Grid item xs={12}>
					<LocationShow />
				</Grid>
				<Grid item xs={12}>
					<span>HOLA</span>
				</Grid>
			</Grid>
		</Container>
	);
}

export default ShowIndex;