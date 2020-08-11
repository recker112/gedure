import React, { useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { connect } from 'react-redux';

import { Container, Paper, Grid, Box, Typography, Avatar, IconButton, Collapse, Menu, MenuItem } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppIcon from '@material-ui/icons/GetApp';

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

function MoreOptions () {
	const [anchorEl, setAnchorEl] = useState();
	
	const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
	
	const handleClose = (event) => {
    setAnchorEl(null);
  };
	
	return (
		<React.Fragment>
			<IconButton aria-controls="menu-options" aria-haspopup="true" onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="menu-options"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>Editar</MenuItem>
				<MenuItem onClick={handleClose}>Eliminar</MenuItem>
			</Menu>
		</React.Fragment>
	);
}

function ShowNotice ({ auth }) {
	let { id } = useParams();
	
	const classes = useStyles();
	
	const dataList = [
		{
			id: 1,
			nombre: 'Recker Ortiz',
			avatar: null,
			titulo: '¿Chavez murió? ¿O solo se multiplicó?',
			contenido:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a',
			fecha: 'Publicado hace 2 días',
			archives: [
				{
					name: 'Archivo de prueba 1',
					size: '400KB',
					url: 'url1'
				},
				{
					name: 'Archivo de prueba 2',
					size: '400KB',
					url: 'url1'
				},
				{
					name: 'Archivo de prueba 3',
					size: '4MB',
					url: 'url1'
				},
				{
					name: 'Archivo de prueba 4',
					size: '650KB',
					url: 'url1'
				}
			]
		},
		{
			id: 2,
			nombre: 'Recker Ortiz',
			avatar: null,
			titulo: '¿Chavez se sacrificó por todos nosotros? Aquí las pruebas',
			contenido:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a',
			fecha: 'Publicado hace 1 semana',
			imgs: ['url1', 'url2', 'url3', 'url4'],
		},
		{
			id: 3,
			nombre: 'Recker Ortiz',
			avatar: null,
			titulo: 'Nuevo sistema en construcción, a ver si aprenden a leer',
			contenido:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet nec diam quis viverra. Phasellus interdum tempor nunc, sit amet malesuada mi tempor ac. Etiam interdum elementum nibh sit amet placerat. Fusce sed elit massa. Integer sodales massa a mauris blandit, et aliquam massa vulputate. Cras dignissim sem ut nisl iaculis, at blandit leo gravida. Etiam fermentum ligula ut tristique ultrices. Vestibulum consequat feugiat sapien, at dictum tellus pellentesque a',
			fecha: 'publicado el 10/04/2020',
			imgs: ['url1', 'url2', 'url3', 'url4'],
			archives: [
				{
					name: 'Archivo de prueba 1',
					size: '400KB',
					url: 'url1'
				},
				{
					name: 'Archivo de prueba 2',
					size: '400KB',
					url: 'url1'
				},
				{
					name: 'Archivo de prueba 3',
					size: '4MB',
					url: 'url1'
				},
				{
					name: 'Archivo de prueba 4',
					size: '650KB',
					url: 'url1'
				}
			]
		},
	];
	
	const [expand, setExpand] = useState(false);
	
	const handleExpand = () => {
		setExpand(!expand);
	}
	
	const selectData = dataList[id - 1];
	const { nombre, avatar, titulo, contenido, fecha, imgs, archives } = selectData;
	const animation = expand ? 'noticia__animation1' : '';
	
	function OptionsBar(){
		return (
			<Paper className={`${classes.margin} ${classes.paddingSmall}`}>
				<Grid container justify='space-between'>
					<Link to='/noticias'>
						<IconButton>
							<ArrowBackIcon />
						</IconButton>
					</Link>
					<MoreOptions />
				</Grid>
			</Paper>
		);
	}
	
	function AvatarZone(){
		return (
			<Grid container justify='flex-start' alignItems='center' direction='column' spacing={1} item xs={12} sm={2}>
				<Grid item xs={12}>
					<Avatar src={avatar} alt="Avatar del usuario" className={classes.largeAvatar}>
						{nombre.substring(0, 1).toUpperCase()}
					</Avatar>
				</Grid>
				<Grid item xs>
					<Box component="span" textAlign="center" className=''>
						{nombre}
					</Box>
				</Grid>
			</Grid>
		);
	}
	
	function TextZone(){
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<Typography component="span" className="noticia__title">
						{titulo}
					</Typography>
				</Grid>
				<Grid container item xs={12}>
					<Box component="span" className={classes.noticia__text} textAlign="justify">
						{contenido}
					</Box>
				</Grid>
			</React.Fragment>
		);
	}
	
	function ImgZone({imgs}) {
		const imagenes = imgs.map((img, i)=>{
			return (
				<Grid item xs={6} sm key={i}>
					<Skeleton variant='rect' height={150} />
				</Grid>
			)
		});
		
		return imagenes;
	}
	
	function ArchivesZone({ state }) {
		const { expand, archives } = state;
		
		return (
			<Collapse in={expand}>
				{archives.map((archive, i)=>{
					return (
						<React.Fragment key={i}>
							<Grid container justify='space-between' alignItems='center'>
								<Grid container alignItems='center' item xs={11}>
									<Avatar>
										L
									</Avatar>
									<Box component='span' className='noticia__titleArchive'>
										{archive.name}
									</Box>
									<Box component='span' className='noticia__sizeArchive'>
										({archive.size})
									</Box>
								</Grid>
								<Grid item xs={1}>
									<IconButton>
										<GetAppIcon />
									</IconButton>
								</Grid>
							</Grid>
							<hr />
						</React.Fragment>
					);
				})}
			</Collapse>
		)
	}
	
	return (
		<React.Fragment>
			<main className={classes.root} ref={()=>{
					document.title = 'La Candelaria - '+titulo;
				}}>
				<Container maxWidth="md">
					<OptionsBar />
					<Paper className={`${classes.margin} ${classes.padding}`}>
						<Grid container justify='space-between' alignItems='flex-start'>
							<AvatarZone />
							<Grid container justify='center' spacing={2} item xs sm>
								<TextZone />
								<Grid container justify='center' alignItems='center' spacing={2} item xs={12}>
									{imgs && <ImgZone imgs={imgs} />}
								</Grid>
								{archives && (
									<Grid container item xs={12}>
										<Grid container justify='space-between' alignItems='center' item xs={12}>
											<Box component='span' className='noticia__archives'>
												Archivos ({archives.length})
											</Box>
											<IconButton onClick={handleExpand}>
												<ExpandMoreIcon className={`noticia__expand ${animation}`} />
											</IconButton>
										</Grid>
										<Grid item xs>
											<ArchivesZone state={{expand, archives}} />
										</Grid>
									</Grid>
								)}
								<hr width='100%' />
								<Grid container justify='flex-end' item xs={12}>
									<Box component="span" textAlign="center" className="noticia__fecha">
										{fecha}
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Container>
			</main>
			{!auth && (
				<footer className='footer'>
					<Footer />
				</footer>
			)}
		</React.Fragment>
	);
}

//REDUX
const mapStateToProps = (state) => ({
	auth: state.userData.auth
});

export default connect(mapStateToProps, null)(ShowNotice);