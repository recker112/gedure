import React from 'react';

import { Container, Grid, Typography, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import Footer from '../../components/Footer';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
		flexGrow: 1
	},
	margin: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	padding: {
		padding: theme.spacing(2),
	},
}));

function Contacto () {
	const classes = useStyles();
	
	return (
		<React.Fragment>
			<main className={classes.root} ref={()=>{
					document.title = 'La Candelaria - Contáctanos';
				}}>
				<Container maxWidth='md'>
					<Paper className={`${classes.margin} ${classes.padding}`}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography className='box__title'>
									Direcciรณn
								</Typography>
							</Grid>
							<Grid container justify='space-between' alignItems='center' item xs={12}>
								<Grid item xs={12} sm={6}>
									<Typography>
										Urb. El Doral Norte, Calle 34.
										Esquina con Avenida Fuerzas Armadas.
										Edificio Liceo Los Robles.
										Maracaibo, Estado Zulia.
										Venezuela.
									</Typography>
								</Grid>
								<Grid item xs={12} sm>
									<Skeleton variant='rect' height={200} />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Typography className='box__title'>
									Correos
								</Typography>
							</Grid>
							<Grid container justify='space-between' item xs={12}>
								<Grid item xs={12}>
									<ul>
										<li>
											<Typography>
												info_primaria@lacandelaria.com.ve
											</Typography>
										</li>
										<li>
											<Typography>
												info_liceo@lacandelaria.com.ve
											</Typography>
										</li>
									</ul>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Container>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default Contacto;