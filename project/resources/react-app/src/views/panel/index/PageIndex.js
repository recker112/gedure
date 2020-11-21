import React from 'react';

import { 
	Container,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		marginBottom: theme.spacing(8),
		[theme.breakpoints.up('xs')]: {
			marginTop: '48px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(8),
		},
	},
}));

function PageIndex() {
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain} ref={()=>{
			document.title = 'La Candelaria - Panel';
		}}>
			<Container maxWidth='md' className='container--margin'>
				<Typography>
					Index
				</Typography>
			</Container>
		</main>
	);
}

export default PageIndex;