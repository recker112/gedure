import React from 'react';

import { Box, Container, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Footer from '../../components/Footer';

import logo from './../../imgs/favicon.png';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
		flexGrow: 1
	},
	title: {
		color: 'white',
		[theme.breakpoints.down('xs')]: {
			fontSize: 25,
		},

		[theme.breakpoints.up('sm')]: {
			fontSize: 30,
		},
	},
	margin: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	etapa1: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '20px 20px 0px 0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '20px 0px 0px 0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '20px 0px 0px 0px',
		},
	},
	etapa2: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px 0px 0px 0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px 20px 0px 0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px 0px 0px 0px',
		},
	},
	etapa3: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px 0px 0px 0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px 0px 0px 20px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px 20px 0px 0px',
		},
	},
	etapa4: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px 0px 20px 20px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px 0px 20px 0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px 0px 0px 20px',
		},
	},
}));

function Index({ auth }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<main className={classes.root} ref={()=>{
					document.title = 'La Candelaria';
				}}>
				<Box component="div" className="headIndex__boxImg">
					<Box component="div" className="headIndex__box">
						<Container maxWidth="md">
							<Grid
								container
								spacing={4}
								direction="column"
								justify="center"
								alignItems="center"
								className="headIndex__fixGidIndex"
							>
								<Grid item>
									<img src={logo} alt="Logo de la institución" className="headIndex__logoEscuela" />
								</Grid>
								<Grid item>
									<Box
										variant="h4"
										fontWeight="fontWeightMedium"
										textAlign="center"
										component="h1"
										className={classes.title}
									>
										U.E.P A.P.E.P La Candelaria
									</Box>
								</Grid>
							</Grid>
						</Container>
					</Box>
				</Box>
				<Container maxWidth="md">
					<Grid
						container
						spacing={2}
						justify="space-between"
						alignItems="center"
						className={classes.margin}
					>
						<Grid container item xs={12} sm={5} justify="center">
							<Box component="span" className="MuiPaper-elevation1 fondoBox fondoBox--azul">
								Enfocados en el estudio y la fe
							</Box>
						</Grid>
						<Grid container item xs={12} sm={7}>
							<Box component="span" textAlign="justify">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin imperdiet
								ante consectetur laoreet. Vivamus sed tellus eu justo tincidunt efficitur eu in
								enim. Praesent nisl est, maximus quis tempus non, consequat eget quam. Nunc sed
								ipsum nec tortor fringilla tincidunt in quis libero. Pellentesque viverra interdum
								cursus. Ut accumsan faucibus metus a vulputate. Sed efficitur condimentum elit in
								tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada
								fames ac turpis egestas. Vestibulum at posuere nisl. Donec quis nulla nec lorem
								dignissim vulputate. Donec eget lacus hendrerit, convallis quam ac, facilisis arcu.
							</Box>
						</Grid>
					</Grid>
					<Divider />
					<Grid
						container
						spacing={2}
						justify="space-between"
						alignItems="flex-start"
						className={classes.margin}
					>
						<Grid container item xs={12} sm={6} alignItems="center" direction="column">
							<Box component="span" className="MuiPaper-elevation1 fondoBox fondoBox--naranja">
								Misión
							</Box>
							<Box component="span" textAlign="justify">
								Aenean dapibus massa non nunc viverra porta. Aenean a lectus sit amet erat porttitor
								maximus vitae in risus. Duis ipsum magna, blandit ut magna id, vestibulum ornare
								velit. Cras sit amet quam laoreet elit tempor scelerisque. Duis tempor maximus
								maximus. Curabitur eu massa vitae eros consectetur dictum. Pellentesque varius eu
								purus vel maximus. In vel massa in turpis vehicula facilisis. Duis eu orci velit.
								Nam nunc elit, mollis id accumsan in, rutrum at risus.
							</Box>
						</Grid>
						<Grid container item xs={12} sm={6} alignItems="center" direction="column">
							<Box component="span" className="MuiPaper-elevation1 fondoBox fondoBox--naranja">
								Visión
							</Box>
							<Box component="span" textAlign="justify">
								Aenean dapibus massa non nunc viverra porta. Aenean a lectus sit amet erat porttitor
								maximus vitae in risus. Duis ipsum magna, blandit ut magna id, vestibulum ornare
								velit. Cras sit amet quam laoreet elit tempor scelerisque. Duis tempor maximus
								maximus. Curabitur eu massa vitae eros consectetur dictum. Pellentesque varius eu
								purus vel maximus. In vel massa in turpis vehicula facilisis. Duis eu orci velit.
								Nam nunc elit, mollis id accumsan in, rutrum at risus.
								<br />
								<br />
								Aenean dapibus massa non nunc viverra porta. Aenean a lectus sit amet erat porttitor
								maximus vitae in risus. Duis ipsum magna, blandit ut magna id, vestibulum ornare
								velit. Cras sit amet quam laoreet elit tempor scelerisque. Duis tempor maximus
								maximus. Curabitur eu massa vitae eros consectetur dictum. Pellentesque varius eu
								purus vel maximus. In vel massa in turpis vehicula facilisis. Duis eu orci velit.
								Nam nunc elit, mollis id accumsan in, rutrum at risus.
							</Box>
						</Grid>
					</Grid>
					<Divider />
					<Grid
						container
						spacing={2}
						direction="column"
						justify="space-between"
						alignItems="flex-start"
						className={classes.margin}
					>
						<Grid container item xs={12} alignItems="center" direction="column">
							<Box component="span" className="MuiPaper-elevation1 fondoBox fondoBox--naranja">
								Historia
							</Box>
							<Box component="span" textAlign="justify">
								Nam interdum ipsum sit amet odio posuere tincidunt. Curabitur eu nibh semper,
								elementum lacus sed, cursus erat. Aenean at lacus scelerisque, condimentum eros id,
								tincidunt leo. Nullam risus arcu, fermentum in suscipit sit amet, volutpat vehicula
								elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
								inceptos himenaeos. Suspendisse odio purus, sodales quis ligula nec, porta placerat
								orci. Fusce tellus nisl, tempor consectetur tempor eget, commodo vel magna. Donec
								pretium felis vel egestas fringilla. Praesent diam nisl, sagittis sit amet tempus
								vel, ornare non justo. Aenean semper, ligula vel convallis posuere, tellus ligula
								placerat ex, eu suscipit neque nunc vitae ex. Aenean sed arcu in massa dapibus
								blandit. Ut finibus erat lobortis consectetur euismod. Nam vulputate sem vel eros
								mollis, eu condimentum diam hendrerit. Proin a augue sed lorem ornare varius ac
								pretium massa. Proin porttitor ac velit nec hendrerit. Aliquam erat volutpat. Proin
								risus orci, congue id pulvinar sed, rhoncus vel lectus. Donec id volutpat ex, a
								aliquam sapien. Vestibulum vel mollis nibh, id auctor elit. Aenean ac elementum
								justo, id faucibus odio. Pellentesque dictum aliquet ipsum, at commodo ligula
								commodo sed. Sed euismod mauris nisl. Sed vulputate vel libero ut porttitor. Nunc
								tortor augue, laoreet non velit ut, ultricies iaculis velit. Duis dapibus libero et
								ligula bibendum lobortis. Etiam erat leo, tempus quis vulputate sed, aliquam sit
								amet sem. Curabitur fringilla rhoncus risus a mollis. Donec blandit ac nunc nec
								condimentum. Nullam dignissim lorem quis lectus tempor facilisis. Praesent sagittis
								nunc sit amet rutrum rhoncus. Fusce quis enim ut risus dignissim dignissim.
							</Box>
						</Grid>
					</Grid>
					<Divider />
					<Grid
						container
						spacing={2}
						direction="column"
						justify="space-between"
						alignItems="center"
						className={classes.margin}
					>
						<Grid container item xs={12} alignItems="center" direction="column">
							<Box component="span" className="MuiPaper-elevation1 fondoBox fondoBox--rojo">
								Etapas Educativas
							</Box>
						</Grid>
						<Grid container item xs={12} spacing={2} justify="space-between">
							<Grid
								container
								direction="column"
								className={`MuiPaper-elevation1 fondoBox fondoBox--negro fondoBox--big ${classes.etapa1}`}
								justify="center"
								alignItems="center"
								item
								xs={12}
								sm={6}
								md={4}
							>
								<Box component="span" textAlign='center'>Educación Primaria</Box>
								<Box component="span" className="fondoBox__subText">
									Desde 1° hasta 6° Grado
								</Box>
							</Grid>
							<Grid
								container
								direction="column"
								className={`MuiPaper-elevation1 fondoBox fondoBox--rosa fondoBox--big ${classes.etapa2}`}
								justify="center"
								alignItems="center"
								item
								xs={12}
								sm={6}
								md={4}
							>
								<Box component="span" textAlign='center'>Educación Técnica Comercio</Box>
								<Box component="span" className="fondoBox__subText">
									Desde 1° hasta 6° Año
								</Box>
							</Grid>
							<Grid
								container
								direction="column"
								className={`MuiPaper-elevation1 fondoBox fondoBox--morado fondoBox--big ${classes.etapa3}`}
								justify="center"
								alignItems="center"
								item
								xs={12}
								sm={6}
								md={4}
							>
								<Box component="span" textAlign='center'>Educación Técnica Computación</Box>
								<Box component="span" className="fondoBox__subText">
									Desde 1° hasta 6° Año
								</Box>
							</Grid>
							<Grid
								container
								direction="column"
								className={`MuiPaper-elevation1 fondoBox fondoBox--verde fondoBox--big ${classes.etapa4}`}
								justify="center"
								alignItems="center"
								item
								xs={12}
								sm={6}
								md={4}
							>
								<Box component="span" textAlign='center'>Educación Técnica Contabilidad</Box>
								<Box component="span" className="fondoBox__subText">
									Desde 1° hasta 6° Año
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</main>
			<footer className='footer'>
				<Footer />
			</footer>
		</React.Fragment>
	);
}

export default Index;