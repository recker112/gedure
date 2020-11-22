import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { 
	Container,
	IconButton,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Tooltip,
	Avatar,
	Typography,
	CircularProgress,
	Grid,
	Menu,
	MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useTheme } from '@material-ui/core/styles';

import useFetch from '../../hooks/useFetch';

// Components
import FooterText from '../../components/FooterText';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

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

export function Noticia(props) {
	const {
		user,
		title,
		extracto,
		content,
		fecha_humano,
		url_imgs,
		fecha_humano_modify,
		slug,
	} = props;

	function createMarkup() {
		return { __html: content};
	}

	const theme = useTheme();
	
	const { auth } = useSelector((state) => ({
		auth: state.userData.auth,
	}));
	
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
		</Card>
	);
}

function PageShowNoticia() {
	let { slug } = useParams();
	let cancelAxios = window.axios.CancelToken.source();
	
	const { loading, data, auth } = useSelector((state) => ({
		data: state.forms.noticia.data,
		loading: state.forms.noticia.loading,
		auth: state.userData.auth,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const { fetchData } = useFetch();
	
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
	
	//Unmount
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