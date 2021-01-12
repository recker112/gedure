import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { 
	Container, 
	Typography, 
	Grid,
	CircularProgress,
	Divider,
	IconButton,
	Box,
	Tooltip,
	Menu,
	MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import useFetch from '../../hooks/useFetch';

// Components
import Footer from '../../components/Footer';
import RenderGalery from './RenderGalery';
import { renderersMarkdown } from '../../components/RendersGlobals';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		minHeight: 500,
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
	divider: {
		margin: `${theme.spacing(3)}px 0`
	},
	portada: {
		marginBottom: theme.spacing(2),
		objectFit: 'cover',
	},
	separer: {
		marginBottom: theme.spacing(2)
	},
}));

function Noticia(props) {
	const {
		title,
		content,
		fecha_humano,
		user,
		url_imgs,
		url_portada,
		only_users,
		created_at,
		updated_at,
	} = props;
	
	const { auth, userRedux } = useSelector((state) => ({
		auth: state.userData.auth,
		userRedux: state.userData.user,
	}));
	
	const classes = useStyles();
	
	const NoticiaHead = () => {
		return (
			<Container>
				<Typography className='text__bold--big' variant='h4'>
					{title}
				</Typography>
				<Typography className='text__bold--big text__opacity--semi' variant='h6'>
					Publicado {fecha_humano}
					<Typography className='text__bold--big' variant='h6' component='span' color='primary'> - {user.name}</Typography>
					{created_at !== updated_at && (
						<Typography className='text__opacity--semi' variant='h6' component='span'> (Editado el {updated_at})</Typography>
					)}
				</Typography>
			</Container>
		);
	}
	
	const NoticiaContent = () => (
		<React.Fragment>
			{url_portada ? (
				<img className={classes.portada} src={url_portada} alt='portada de la publicaciรณn' width='100%' height={250} />
			) : null}
			<ReactMarkdown plugins={[gfm]} children={content} renderers={renderersMarkdown} />
		</React.Fragment>
	)
	
	return (
		<React.Fragment>
			<NoticiaHead />
			<Divider className={classes.divider} />
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<NoticiaContent />
					</Grid>
				</Grid>
				{url_imgs?.length && (
					<RenderGalery imgs={url_imgs} />
				)}
				{auth && userRedux.privilegio && (
					<Grid item xs={12}>
						<Typography variant='body2' align='right' className='text__opacity--semi'>
							Noticia solo para usuarios: {only_users ? 'Si' : 'No'}
						</Typography>
					</Grid>
				)}
			</Container>
		</React.Fragment>
	);
}

function Options() {
	const [anchorEl, setAnchorEl] = useState(null);
	
	const { userRedux, permissions, user, auth } = useSelector((state) => ({
		userRedux: state.userData.user,
		permissions: state.userData.permissions,
		user: state.forms.noticia.data.user,
		auth: state.userData.auth,
	}));
	
	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = (event) => {
		setAnchorEl(null);
	};
	
	if ((auth && userRedux.privilegio === 'A-') && (user?.id === userRedux.id || permissions.administrar.posts_others)) {
		const renderMenu = permissions.administrar.posts_edit || permissions.administrar.posts_destroy;
		
		return (
			<React.Fragment>
				<Tooltip title='Opciones' arrow>
					<IconButton onClick={handleOpen} aria-label="opciones">
						<MoreVertIcon />
					</IconButton>
				</Tooltip>
				{renderMenu && (
					<Menu
						id="menu-options"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose} 
					>
						{permissions.administrar.posts_edit && (
							<MenuItem>Editar</MenuItem>
						)}
						{permissions.administrar.posts_destroy && (
							<MenuItem>Eliminar</MenuItem>
						)}
					</Menu>
				)}
			</React.Fragment>
		)
	}
	
	return <div></div>;
}

function PageShowNews() {
	let { slug } = useParams();
	let cancelAxios = window.axios.CancelToken.source();
	
	const { auth, loading, data } = useSelector((state) => ({
		auth: state.userData.auth,
		loading: state.forms.noticia.loading,
		data: state.forms.noticia.data,
	}));
	const dispatch = useDispatch();
	document.title = data.title ? `La Candelaria - ${data.title}` : `La Candelaria`;
	
	const history = useHistory();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	useEffect(()=>{
		const consult = async () => {
			let url;

			if (auth) {
				url = `v1/posts/auth/${slug}`;
			}else {
				url = `v1/posts/${slug}`;
			}

			const prepare = {
				url: url,
				type: 'get',
				messageToFinish: false,
				messageTo404: false,
				data: {
					cancelToken: cancelAxios.token,
				}
			};

			const response = await fetchData(prepare);

			if (response) {
				dispatch(updateForms('noticia', false, response));
			}else {
				dispatch(updateForms('noticia', false));
			}
		}
		
		if (loading) {
			consult();
		}
		
		// eslint-disable-next-line
	}, [loading]);
	
	const handleReturn = () => {
		if (history.length > 2) {
			history.goBack();
		}else {
			history.push('/noticias');
		}
	}
	
	return (
		<React.Fragment>
			<main className={classes.containerMain}>
				<Container>
					<Box mb={3}>
						<Grid container justify='space-between'>
							<Tooltip title='Volver' arrow>
								<IconButton onClick={handleReturn} aria-label="return">
									<ArrowBackIcon />
								</IconButton>
							</Tooltip>
							<Options />
						</Grid>
					</Box>
				</Container>
				{data?.slug && (
					<Noticia {...data} />
				)}
				{loading && (
					<Grid container justify='center'>
						<CircularProgress />
					</Grid>
				)}
				{!data?.slug && !loading && (
					<Grid container justify='center'>
						<Typography>
							No se pudo encontrar esta noticia.
						</Typography>
					</Grid>
				)}
			</main>
			{!auth && <Footer />}
		</React.Fragment>
	);
}

export default PageShowNews;