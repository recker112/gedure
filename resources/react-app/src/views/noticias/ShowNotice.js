import React, { useState, useEffect } from 'react';

import { Link, useParams, useHistory } from 'react-router-dom';

import { Container, Paper, Grid, Box, Typography, Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import useFetch from '../../hooks/useFetch';

import Footer from '../../components/Footer';
import ConfirmAction from '../../components/ConfirmAction';

import { useSelector, useDispatch } from 'react-redux';
import updateAppData from '../../actions/updateAppData';
import updateDialogs from '../../actions/updateDialogs';

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

function MoreOptions ({ data, handleClick, handleClose, anchorEl }) {
	const dispatch = useDispatch();
	
	const handleDelete = () => {
		dispatch(updateDialogs('confirmAction', true, false, { id: data.id }));
		handleClose();
	}
	
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
				<MenuItem onClick={handleDelete}>Eliminar</MenuItem>
			</Menu>
		</React.Fragment>
	);
}

function ShowNotice () {
	let { id } = useParams();
	
	const { fetchData } = useFetch();
	
	const { auth, loading, noticeData, permissions, userData } = useSelector((state) => ({
		auth: state.userData.auth,
		loading: state.appData.noticiaSelected.loading,
		noticeData: state.appData.noticiaSelected.data,
		permissions: state.userData.permissions,
		userData: state.userData.user
	}));
	const dispatch = useDispatch();
	
	const history = useHistory();
	
	const classes = useStyles();
	
	useEffect(()=>{
		const consult = async () => {
			let url;

			if (auth) {
				url = `v1/noticias/user/${id}`;
			}else {
				url = `v1/noticias/${id}`;
			}

			const prepare = {
				url: url,
				type: 'get',
				messageToFinish: false,
			};

			const response = await fetchData(prepare);

			if (response) {
				dispatch(updateAppData('noticiaSelected', false, response));
			}else {
				dispatch(updateAppData('noticiaSelected', false));
			}
		}
		
		if (loading) {
			consult()
		}
		
		// eslint-disable-next-line
	}, [loading]);
	
	const confirm = async () => {
		const prepare = {
			url: `v1/noticias/${noticeData.id}`,
			type: 'delete',
		};

		const response = await fetchData(prepare);

		if (response) {
			history.push("/noticias");
		}

		dispatch(updateDialogs('confirmAction', false, true));
	}
	
	const { title, content, imgs, fechaHumano, user_id_owner, user } = noticeData;
	
	function createMarkup() {
		return {__html: content};
	}
	
	function OptionsBar(){
		const [anchorEl, setAnchorEl] = useState();
		
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		
		const handleClose = (event) => {
			setAnchorEl(null);
		};
		
		return (
			<Paper className={`${classes.margin} ${classes.paddingSmall}`}>
				<Grid container justify='space-between'>
					<Link to='/noticias'>
						<IconButton>
							<ArrowBackIcon />
						</IconButton>
					</Link>
					
					{((user_id_owner === userData.id || permissions.publicaciones?.modify_otros) && !loading && noticeData?.content) && (
						<MoreOptions 
							data={noticeData} 
							handleClick={handleClick}
							handleClose={handleClose}
							anchorEl={anchorEl}
						/>
					)}
				</Grid>
			</Paper>
		);
	}
	
	function AvatarZone(){
		return (
			<Grid container alignContent="flex-start" spacing={1} item xs={12} sm={2}>
				<Grid container justify="center" item xs={12}>
					<Avatar src={user.avatar} alt="Avatar del usuario" className={classes.largeAvatar}>
						{user.nombre.substring(0, 1).toUpperCase()}
					</Avatar>
				</Grid>
				<Grid container justify="center" item xs>
					<Box component="span" textAlign="center" className=''>
						{user.nombre}
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
						{title}
					</Typography>
				</Grid>
				<Grid container item xs={12}>
					<Box 
						dangerouslySetInnerHTML={createMarkup()} 
						component="span"
					/>
				</Grid>
			</React.Fragment>
		);
	}
	
	function ImgZone({imgs}) {
		const imgsParse = JSON.parse(imgs) || [];
		
		const imagenes = imgsParse.map((img, i)=>{
			return (
				<Grid item xs={6} sm key={i}>
					<Skeleton variant='rect' height={150} />
				</Grid>
			)
		});
		
		return imagenes;
	}
	
	function Notice() {
		return (
			<Paper className={`${classes.margin} ${classes.padding}`}>
				<Grid container spacing={1}>
					{user && <AvatarZone />}
					<Grid container justify='center' spacing={2} item xs sm>
						<TextZone />
						<Grid container justify='center' alignItems='center' spacing={2} item xs={12}>
							{imgs && <ImgZone imgs={imgs} />}
						</Grid>
						<hr width='100%' />
						<Grid container justify='flex-end' item xs={12}>
							<Box component="span" textAlign="center" className="noticia__fecha">
								{fechaHumano}
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		)
	}
	
	return (
		<React.Fragment>
			<main className={classes.root} ref={()=>{
					document.title = title ? `La Candelaria - ${title}` : 'La Candelaria - Cargando..';
				}}>
				<Container maxWidth="md">
					<OptionsBar />
					{noticeData?.content && (<Notice />)}
					{(!noticeData?.content && loading) && (<NoticeSkeleton />)}
					{(!noticeData?.content && !loading) && (
						<p style={{ textAlign: 'center' }}>
							<b>Noticia no disponible.</b>
						</p>
					)}
					<ConfirmAction action={`Eliminar noticia #${noticeData.id}`} callback={confirm} />
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

function NoticeSkeleton () {
	const classes = useStyles();
	
	return (
		<Paper className={`${classes.margin} ${classes.padding}`}>
			<Grid container spacing={1}>
				<Grid container alignContent="flex-start" spacing={2} item xs={12} sm={2}>
					<Grid container justify="center" item xs={12}>
						<Skeleton variant="circle" className={classes.largeAvatar} />
					</Grid>
					<Grid container justify="center" item xs>
						<Skeleton variant="text" width={80} />
					</Grid>
				</Grid>
				<Grid container spacing={2} justify="center" item xs={12} sm>
					<Grid item xs={12}>
						<Skeleton variant="text" width={200} height={35} />
					</Grid>
					<Grid container spacing={1} item xs={12}>
						<Grid item xs={12}>
							<Skeleton variant="text" />
						</Grid>
						<Grid item xs={12}>
							<Skeleton variant="text" />
						</Grid>
						<Grid item xs={12}>
							<Skeleton variant="text" />
						</Grid>
						<Grid item xs={12}>
							<Skeleton variant="text" />
						</Grid>
						<Grid item xs={12}>
							<Skeleton variant="text" />
						</Grid>
						<Grid item xs={12}>
							<Skeleton variant="text" />
						</Grid>
					</Grid>
					<Grid container spacing={2} item xs={12}>
						<Grid item xs={6} sm>
							<Skeleton variant='rect' height={150} />
						</Grid>
						<Grid item xs={6} sm>
							<Skeleton variant='rect' height={150} />
						</Grid>
						<Grid item xs={6} sm>
							<Skeleton variant='rect' height={150} />
						</Grid>
						<Grid item xs={6} sm>
							<Skeleton variant='rect' height={150} />
						</Grid>
					</Grid>
					<hr width='100%' />
					<Grid container justify='flex-end' item xs={12}>
						<Skeleton variant="text" width={150} />
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default ShowNotice;