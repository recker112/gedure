import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { 
	Container, 
	Typography, 
	Grid,
	CircularProgress,
	Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

import useFetch from '../../hooks/useFetch';

import { LazyImage } from 'react-lazy-images';

// Components
import Footer from '../../components/Footer';
import VisorImgReact from '../../components/VisorImgReact';

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
	}
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
						width={110}
						height={100}
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
		<Grid container justify='center' spacing={2} item xs={12}>
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

function Noticia(props) {
	const {
		title,
		content,
		fecha_humano,
		user,
		url_imgs,
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
	
	const NoticiaContent = () => {
		function createMarkup() {
			return { __html: content};
		}
		
		return (
			<Typography dangerouslySetInnerHTML={createMarkup()} align="justify" />
		);
	}
	
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
					<RenderImgs imgs={['plas.png']} />
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

function PageShowNews() {
	let { slug } = useParams();
	let cancelAxios = window.axios.CancelToken.source();
	
	const { auth, loading,  data } = useSelector((state) => ({
		auth: state.userData.auth,
		loading: state.forms.noticia.loading,
		data: state.forms.noticia.data,
	}));
	const dispatch = useDispatch();
	document.title = data.title ? `La Candelaria - ${data.title}` : `La Candelaria`;
	
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
	
	return (
		<React.Fragment>
			<main className={classes.containerMain}>
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