import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import PanelRouters from './PanelRouters';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
		flexGrow: 1
	}
}));

function Panel() {
	const classess = useStyles();
	
	return (
		<React.Fragment>
			<main className={classess.root} ref={()=>{
			document.title = 'La Candelaria - Panel';
		}}>
				<PanelRouters />
			</main>
		</React.Fragment>
	);
}

export default Panel;