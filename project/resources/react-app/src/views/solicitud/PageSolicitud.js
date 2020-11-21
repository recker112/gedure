import React from 'react';

import { 
	Container,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import FooterText from '../../components/FooterText';

// Redux
import { useSelector } from 'react-redux';

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

function PageSolicitud() {
	const { auth } = useSelector((state) => ({
		auth: state.userData.auth,
	}));
	
	const classes = useStyles();
	
	return (
		<React.Fragment>
			<main className={classes.containerMain} ref={()=>{
					document.title = 'La Candelaria - Solicitud de cupo';
				}}>
				<Container maxWidth='md' className='container--margin'>
					<Typography align='center'>
						Actualmente esta función no está disponible.
					</Typography>
				</Container>
			</main>
			{!auth && (
				<footer className='footer'>
					<FooterText />
				</footer>
			)}
		</React.Fragment>
	);
}

export default PageSolicitud;