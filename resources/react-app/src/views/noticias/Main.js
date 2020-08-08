import React from 'react';

import { Link } from 'react-router-dom';

import { Container, Paper, Grid, Box, Typography, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Footer from '../../components/Footer';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
		flexGrow: 1,
	},
	margin: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	padding: {
		padding: theme.spacing(2),
	},
	paddingSmall: {
		padding: theme.spacing(1),
	},
	largeAvatar: {
		width: theme.spacing(10),
		height: theme.spacing(10),
		background: theme.palette.secondary.main,
	}
}));

function Noticia(props) {
	const { nombre, avatar, titulo, preview, fecha, id } = props.data;

	const classes = useStyles();

	return (
		<Paper className={`${classes.margin} ${classes.padding}`} id={`NID_${id}`}>
			<Grid container spacing={2}>
				<Grid
					container
					direction="column"
					alignItems="center"
					justify="center"
					spacing={1}
					item
					xs={12}
					sm={3}
				>
					<Grid container justify="center" item>
						<Avatar src={avatar} alt="Avatar del usuario" className={classes.largeAvatar}>
							{nombre.substring(0, 1).toUpperCase()}
						</Avatar>
					</Grid>
					<Grid container justify="center" item>
						<Box component="span" textAlign="center">
							{nombre}
						</Box>
					</Grid>
				</Grid>
				<Grid container spacing={2} justify="flex-start" item xs={12} sm={9}>
					<Grid container item xs={12}>
						<Typography component="span" className="noticia__title">
							{titulo}
						</Typography>
					</Grid>
					<Grid container item xs={12}>
						<Box component="span" textAlign="justify">
							{preview}
						</Box>
					</Grid>
				</Grid>
			</Grid>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs={6}>
					<Box component="span" textAlign="center" className="noticia__fecha">
						{fecha}
					</Box>
				</Grid>
				<Grid container justify="flex-end" item xs>
					<Link to={`noticias/${id}`}>
						<Button color="secondary">Ver Publicación</Button>
					</Link>
				</Grid>
			</Grid>
		</Paper>
	);
}

function Noticias() {
	const classes = useStyles();

	const dataList = [
		{
			id: 1,
			nombre: 'Recker Ortiz',
			avatar: null,
			titulo: '¿Chavez murió? ¿O solo se multiplicó?',
			preview:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a...',
			fecha: 'Publicado hace 2 días'
		},
		{
			id: 2,
			nombre: 'Recker Ortiz',
			avatar: null,
			titulo: '¿Chavez se sacrificó por todos nosotros? Aquí las pruebas',
			preview:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a...',
			fecha: 'Publicado hace 1 semana'
		},
		{
			id: 3,
			nombre: 'Recker Ortiz',
			avatar: null,
			titulo: 'Nuevo sistema en construcción, a ver si aprenden a leer',
			preview:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a...',
			fecha: 'Publicado el 10/04/2020'
		},
	];
	
	return (
		<React.Fragment>
			<main className={classes.root}>
				<Container maxWidth="md">
					{dataList.map((data, i) => (
						<Noticia data={data} key={i} />
					))}
				</Container>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default Noticias;