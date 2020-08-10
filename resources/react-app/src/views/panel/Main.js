import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
		flexGrow: 1
	}
}));

function Panel() {
	const classess = useStyles();
	
	return <main className={classess.root} ref={()=>{
			document.title = 'La Candelaria - Panel';
		}}>Panel</main>
}

export default Panel;