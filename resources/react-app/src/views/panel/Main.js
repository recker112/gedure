import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import PanelRouters from './PanelRouters';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
		flexGrow: 1,
		marginBottom: theme.spacing(4),
	}
}));

function Panel() {
	const classess = useStyles();
	
	return (
		<main className={classess.root} ref={()=>{
		document.title = 'La Candelaria - Panel';
		}}>
			<PanelRouters />
		</main>
	);
}

export default Panel;