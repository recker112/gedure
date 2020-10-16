import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import AccountRouters from './AccountRouters';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
		flexGrow: 1,
		marginBottom: theme.spacing(4),
	}
}));

function Cuenta() {
	const classes = useStyles();
	
	return (
		<main className={classes.root}>
			<AccountRouters />
		</main>
	);
}

export default Cuenta;