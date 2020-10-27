import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

import useFetch from '../../hooks/useFetch';

import { Container, Paper, Grid, Box, Typography, Avatar, Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import Footer from '../../components/Footer';

import { useSelector, useDispatch } from 'react-redux';
import updateAppData from '../../actions/updateAppData';

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
	},
}));

function Noticia({ data }) {
	const { user, title, content, fechaHumano, id } = data;

	const classes = useStyles();
	
	const dispatch = useDispatch();
	
	const handleClick = () => {
		dispatch(updateAppData('noticiaSelected', false, data));
	}
	
	function createMarkup() {
		let texto
		
		if (content.length > 400) {
			texto = content.substring(0,400) + "..."
		}else {
			texto = content
		}
		
		return {__html: texto};
	}

	return (
		<Paper className={`${classes.padding} ${classes.margin}`} id={`NID_${id}`}>
			<Grid container justify="center" spacing={2}>
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
						<Avatar 
							src={user.avatar} 
							alt="Avatar del usuario" 
							className={classes.largeAvatar}
						>
							{user.nombre.substring(0, 1).toUpperCase()}
						</Avatar>
					</Grid>
					<Grid container justify="center" item>
						<Box component="span" textAlign="center">
							{user.nombre}
						</Box>
					</Grid>
				</Grid>
				<Grid container spacing={2} justify="flex-start" item xs={12} sm={9}>
					<Grid container item xs={12}>
						<Typography component="span" className="noticia__title">
							{title}
						</Typography>
					</Grid>
					<Grid container item xs={12}>
						<Box 
							dangerouslySetInnerHTML={createMarkup()} 
							component="span" 
							textAlign="justify"
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs={6}>
					<Box component="span" textAlign="center" className="noticia__fecha">
						Publicado {fechaHumano}
					</Box>
				</Grid>
				<Grid container justify="flex-end" item xs>
					<Link to={`noticias/${id}`} onClick={handleClick}>
						<Button color="secondary">Ver Publicación</Button>
					</Link>
				</Grid>
			</Grid>
		</Paper>
	);
}

function NoticiaSkeleton() {
	const classes = useStyles();

	return (
		<Paper className={`${classes.padding} ${classes.margin}`} id={`NID_0`}>
			<Grid container justify="center" spacing={2}>
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
						<Skeleton variant="circle" className={classes.largeAvatar} />
					</Grid>
					<Grid container justify="center" item>
						<Skeleton variant="text" width={80} />
					</Grid>
				</Grid>
				<Grid container spacing={2} justify="flex-start" item xs={12} sm={9}>
					<Grid container item xs={12}>
						<Skeleton variant="text" width={200} />
					</Grid>
					<Grid container item xs={12}>
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
				</Grid>
			</Grid>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs={12}>
					<Skeleton variant="text" width={130} />
				</Grid>
			</Grid>
		</Paper>
	);
}

function Noticias() {
	const [hasFinish, setHasFinish] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const noData = data.length === 0 && hasFinish;

	const classes = useStyles();

	const { auth } = useSelector((state) => ({
		auth: state.userData.auth,
	}));
	
	const { fetchData } = useFetch();

	const getNotices = async (offset, limit) => {
		let url;
		
		if (auth) {
			url = `v1/noticias/user?offset=${offset}&limit=${limit}`;
		}else {
			url = `v1/noticias?offset=${offset}&limit=${limit}`;
		}
		
		const prepare = {
			url: url,
			type: 'get',
			messageToFinish: false,
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			setData([ ...data, ...response.data ]);
			setHasFinish(response.finish);
		}
		
		setLoading(false);
		// eslint-disable-next-line
	};

	useEffect(() => {
		if (loading) {
			const offset = data.length;
			getNotices(offset, 5);
		}

		// eslint-disable-next-line
	}, [loading]);

	return (
		<React.Fragment>
			<main
				className={classes.root}
				ref={() => {
					document.title = 'La Candelaria - Noticias';
				}}
			>
				<Container maxWidth="md">
					{data.length > 0 && (
						<InfiniteScroll
							dataLength={data.length}
							hasMore={!hasFinish}
							next={() => {
								setLoading(true);
							}}
							scrollThreshold={0.8}
							loader={<NoticiaSkeleton />}
							endMessage={
								<p style={{ textAlign: 'center' }}>
									<b>No hay más noticias que cargar.</b>
								</p>
							}
						>
							{data.map((data, i) => (
								<Noticia data={data} key={i} />
							))}
						</InfiniteScroll>
					)}

					{!data.length && !hasFinish && (
						<React.Fragment>
							<NoticiaSkeleton />

							<NoticiaSkeleton />

							<NoticiaSkeleton />
						</React.Fragment>
					)}

					{noData && (
						<Grid container spacing={4} className={classes.margin}>
							<Grid item xs={12}>
								<p style={{ textAlign: 'center' }}>
									<b>No hay noticias publicadas.</b>
								</p>
							</Grid>
						</Grid>
					)}
				</Container>
			</main>
			{!auth && (
				<footer className="footer">
					<Footer />
				</footer>
			)}
		</React.Fragment>
	);
}

export default Noticias;