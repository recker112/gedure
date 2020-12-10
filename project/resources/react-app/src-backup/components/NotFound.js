import React from 'react';

import { Grid, Typography, Hidden, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import studient from '../imgs/studient-notfound.svg';

const useStyles = makeStyles((theme) => ({
	notFound: {
		flexGrow: 1,
		display: 'flex',
		marginBottom: theme.spacing(8),
		[theme.breakpoints.up('xs')]: {
			marginTop: '48px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(8),
		},
	},
	img: {
		width: '307px'
	},
	text: {
		position: 'absolute',
		color: 'white',
	},
}));


function NotFound() {
	const classes = useStyles();
	
	return (
		<main className={classes.notFound}>
			<Container maxWidth='md' className='container--margin' style={{display: 'flex'}} >
				<Grid 
					container 
					justify='center' 
					alignContent='center' 
					alignItems='center'
				>
					<Grid container justify='center' alignItems='center' item xs={12}>
						<Grid item>
							<Hidden xsDown>
								<Typography 
									className='notFound__icon notFound__left text__opacity--big text__bold--big'
								>
									¿
								</Typography>
							</Hidden>
						</Grid>
						<Grid container justify='center' alignItems='center' item xs={12} sm={6} md={4}>
							<img src={studient} className={classes.img} alt='Error 404' />
							<Typography variant='h2' className={`${classes.text} text__opacity--big text__bold--big`}>
								404
							</Typography>
						</Grid>
						<Grid item>
							<Hidden xsDown>
								<Typography 
									align='right' 
									className='notFound__icon notFound__right text__opacity--big text__bold--big'
								>
									?
								</Typography>
							</Hidden>
						</Grid>
					</Grid>
					<Grid item xs={10}>
						<Typography align='center' variant='h5'>
							Vaya... Parece que intentas acceder a un lugar el cual no existe, intente probar otra opción.
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}

export default NotFound;