import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { 
	Container,
	IconButton,
	Card,
	CardHeader,
	CardContent,
	Tooltip,
	Avatar,
	Typography,
	CircularProgress,
	Grid,
	Menu,
	MenuItem,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useTheme } from '@material-ui/core/styles';

import useFetch from '../../hooks/useFetch';

import { LazyImage } from 'react-lazy-images';

// Components
import FooterText from '../../components/FooterText';
import VisorImgReact from '../../components/VisorImgReact';
import EditNoticia from '../panel/noticias/EditNoticia';
import DeleteConfirmation from '../../components/DeleteConfirmation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';
import updateDialogs from '../../actions/updateDialogs';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		marginBottom: theme.spacing(6),
		[theme.breakpoints.up('xs')]: {
			marginTop: '48px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(8),
		},
	},
}));

function RenderImgs({ imgs }) {
	const [openView, setOpenView] = useState(false);
	const [currentImg, setCurrentImg] = useState(0);
	
	const closeView = () =>{
		//Reset bar
		document.body.style.overflow = "auto";
		
		setCurrentImg(0);
		setOpenView(false);
	}
	
	const lastImg = 6;
	const restante = imgs.length - lastImg;
	const imagenes = imgs.map((img, i) => {
		if (i === lastImg) {
			return (
				<Grid container justify='center' item xs={6} sm={4} md={3} key={i}>
					<span 
						key={i} 
						className="imagePreview__More"
						onClick={()=>{
							setOpenView(true);
							setCurrentImg(lastImg);
						}}
					>
						+{restante}
					</span>
				</Grid>
			);
		} else if (i < lastImg) {
			return (
				<Grid container justify='center' item xs={6} sm={4} md={3} key={i}>
					<LazyImage
						alt={`imagen${i + 1}`}
						src={img}
						className="imagePreview"
						placeholder={({ imageProps, ref }) => (
							<Skeleton ref={ref} key={i} variant="rect" {...imageProps} />
						)}
						actual={({ imageProps }) => 
							<img 
								key={i}
								alt={`imagen${i + 1}`}
								{...imageProps} 
								onClick={()=>{
									setOpenView(true);
									setCurrentImg(i);
								}}
							/>}
						error={() => (
							<div style={{ 
									width: '110px', 
									height: '100px', 
									background: 'rgb(252, 72, 80)'
								}}>
								<p>Error al obtener imagen</p>
							</div>
						)}
					/>
				</Grid>
			);
		}
		
		return null;
	});
	
	return (
		<Grid container justify='center' spacing={2}>
			{imagenes}
			{openView && (
				<VisorImgReact
					src={imgs}
					onClose={closeView}
					currentImg={currentImg}
					setCurrentImg={setCurrentImg}
				/>
			)}
		</Grid>
	);
}

export function Noticia(props) {
	const {
		id,
		slug,
		user,
		title,
		content,
		fecha_humano,
		url_imgs,
		only_users,
	} = props;
	
	const { auth, userRedux, permissions } = useSelector((state) => ({
		auth: state.userData.auth,
		userRedux: state.userData.user,
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();

	function createMarkup() {
		return { __html: content};
	}

	const theme = useTheme();
	
	const Options = () => {
		const [anchorEl, setAnchorEl] = useState(null);
		
		const history = useHistory();
		
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		
		const handleClose = () => {
			setAnchorEl(null);
		};

		const handleReturn = () => {
			history.push("/noticias");
		}
		
		const handleEdit = () => {
			const data = {
				slug,
				title,
				content,
			};
			dispatch(updateDialogs('editNoticia', true, false, data));
		}
		
		const handleDelete = () => {
			const data = {
				id,
				slug,
			};
			
			dispatch(updateDialogs('deleteConfirmation', true, false, data));
		}
		
		return (
			<React.Fragment>
				<IconButton onClick={handleClick}>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="menu-options"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose} 
				>
					{((auth && userRedux.privilegio === 'A-') && ((user.id === userRedux.id && permissions.administrar.posts_edit) || (permissions.administrar.posts_edit && permissions.administrar.posts_others))) && (
						<MenuItem onClick={handleEdit}>Editar</MenuItem>
					)}
					{((auth && userRedux.privilegio === 'A-') && ((user.id === userRedux.id && permissions.administrar.posts_destroy) || (permissions.administrar.posts_destroy && permissions.administrar.posts_others))) && (
						<MenuItem onClick={handleDelete}>Eliminar</MenuItem>
					)}
					<MenuItem onClick={handleReturn}>Regresar</MenuItem>
				</Menu>
			</React.Fragment>
		);
	}

	return (
		<Card>
			<CardHeader
				style={{ backgroundColor: theme.palette.primary.main }}
				avatar={
					<Tooltip title={user.nombre} arrow>
						<Avatar
							aria-label="skeleton"
							src={user.avatar}
							style={{ backgroundColor: theme.palette.secondary.main }}
						>
							{user.nombre.substring(0, 1).toUpperCase()}
						</Avatar>
					</Tooltip>
				}
				action={
					<Options />
				}
				title={title}
				subheader={`Publicado por ${user.nombre} ${fecha_humano}`}
			/>
			<CardContent>
				<Typography dangerouslySetInnerHTML={createMarkup()} align="justify"></Typography>
			</CardContent>
			{url_imgs && url_imgs.length && (
				<CardContent>
					<RenderImgs imgs={url_imgs} />
				</CardContent>
			)}
			{auth && userRedux.privilegio === 'A-' && (
				<CardContent>
					<Typography variant='body2' align='right' className='text__opacity--semi'>
						Noticia solo para usuarios: {only_users ? 'Si' : 'No'}
					</Typography>
				</CardContent>
			)}
		</Card>
	);
}

function PageShowNoticia() {
	let { slug } = useParams();
	let cancelAxios = window.axios.CancelToken.source();
	
	const { loading, data, auth, userRedux, dataDelete } = useSelector((state) => ({
		data: state.forms.noticia.data,
		loading: state.forms.noticia.loading,
		auth: state.userData.auth,
		userRedux: state.userData.user,
		dataDelete: state.dialogs.deleteConfirmation.data,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const history = useHistory();
	
	const { fetchData } = useFetch();
	
	const handleDelete = async () => {
		const prepare = {
			url: `v1/posts/${data.slug}`,
			type: 'delete',
			message404: 'Esta noticia ya no existe',
		};

		const response = await fetchData(prepare);

		dispatch(updateDialogs('deleteConfirmation', false, true));

		if (response) {
			history.push('/noticias');
		}
	}
	
	const handleRefresh = () => {
		dispatch(updateForms('noticia', true, {}));
	}
	
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
				message404: 'Noticia no encontrada',
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
	
	// Unmount
	useEffect(()=>{
		return () => {
			if (cancelAxios) {
				cancelAxios.cancel();
			}
			dispatch(updateForms('noticia', true, {}));
		}
		// eslint-disable-next-line
	}, []);
	
	return (
		<React.Fragment>
			<main className={classes.containerMain}ref={()=>{
				document.title = `La Candelaria - ${data.title || ''}`;
			}}>
				<Container maxWidth='md' className='container--margin'>
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
					{auth && userRedux.privilegio === 'A-' && (
						<React.Fragment>
							<EditNoticia callback={handleRefresh} />
							<DeleteConfirmation 
								action={`Eliminar noticia #${dataDelete.id}`} 
								callback={handleDelete}
							/>
						</React.Fragment>
					)}
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

export default PageShowNoticia;