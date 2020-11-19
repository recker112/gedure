import React, { useState, useEffect } from 'react';

import { 
	Container, 
	Typography, 
	Grid, 
	TextField,
	Hidden,
	IconButton,
	InputAdornment,
	CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import SearchIcon from '@material-ui/icons/Search';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { useForm } from 'react-hook-form';

import useFetch from '../../hooks/useFetch';

import InfiniteScroll from 'react-infinite-scroll-component';

// Components
import FooterText from '../../components/FooterText';
import { NoticiaSkeleton, NoticiaPreview } from './ComponentNoticia';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		marginBottom: theme.spacing(8),
		[theme.breakpoints.up('xs')]: {
			marginTop: '48px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(8),
		},
	},
}));

function PageNoticias() {
	const [view, setView] = useState('module');
	const [hasFinish, setHasFinish] = useState(false);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const noData = data.length === 0 && hasFinish;
	let cancelAxios = window.axios.CancelToken.source();
	
	const { auth } = useSelector((state) => ({
		auth: state.userData.auth,
	}));
	
	const classes = useStyles();
	
	const { register, handleSubmit } = useForm();
	
	const { fetchData } = useFetch();
	
	const handleChange = (event, newView) => {
		if (newView !== null) {
			setView(newView);
		}
  };
	
	const onSubmit = (data) => {
		setData([]);
		setHasFinish(false);
		setSearch(data.search);
		setLoading(true);
  };
	
	useEffect(()=>{
		const getNotices = async (offset, limit) => {
			let url;

			if (auth) {
				url = `v1/posts/auth?offset=${offset}&limit=${limit}&search=${encodeURI(search)}`;
			}else {
				url = `v1/posts?offset=${offset}&limit=${limit}&search=${encodeURI(search)}`;
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
				setData([ ...data, ...response.data ]);
				setHasFinish(response.data.length ? response.finish : true);
			} else {
				setError(true);
			}

			setLoading(false);
		};
		
		if (loading) {
			const offset = data.length;
			getNotices(offset, 6);
		}
		
		return () => {
			if (cancelAxios) {
				cancelAxios.cancel();
			}
		}
		// eslint-disable-next-line
	}, [loading]);
	
	return (
		<React.Fragment>
			<main className={classes.containerMain} ref={()=>{
					document.title = 'La Candelaria - Noticias';
				}}>
				<Container maxWidth='md' className='container--margin'>
					<Grid container justify='center' spacing={2}>
						<Grid container alignItems='center' item xs={12}>
							<Grid item xs>
								<Hidden xsDown>
									<ToggleButtonGroup value={view} exclusive onChange={handleChange}>
										<ToggleButton value="list" aria-label="list">
											<ViewListIcon />
										</ToggleButton>
										<ToggleButton value="module" aria-label="module">
											<ViewModuleIcon />
										</ToggleButton>
									</ToggleButtonGroup>
								</Hidden>
							</Grid>
							<Grid container justify='flex-end' item xs={12} sm={7} md={5}>
								<form 
									autoComplete='off' 
									onSubmit={handleSubmit(onSubmit)}
									style={{width: '100%'}}
								>
									<TextField 
										inputRef={register}
										name='search'
										label='Buscar noticia'
										variant='outlined'
										size='small'
										fullWidth
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton 
														size='small' 
														disabled={loading} 
														type='submit'
													>
														<SearchIcon />
													</IconButton>
												</InputAdornment>
											)
										}}
									/>
								</form>
							</Grid>
						</Grid>
						<Grid container spacing={2} justify='center' item xs={12}>
							{data.length > 0 && (
								<Grid container item xs={12}>
									<InfiniteScroll
										dataLength={data.length}
										hasMore={!hasFinish}
										next={() => {
											setLoading(true);
										}}
										style={{overflow: 'hidden'}}
										className='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 MuiGrid-justify-xs-center'
										scrollThreshold={0.6}
										loader={<NoticiaSkeleton view={view} />}
										endMessage={
											<Grid item xs={12}>
												<Typography align='center'>
													No hay más noticias publicadas.
												</Typography>
											</Grid>
										}
									>
										{data.map((datos,i)=> (
											<NoticiaPreview key={i} view={view} {...datos} />
										))}
									</InfiniteScroll>
								</Grid>
							)}
							
							{!data.length && !hasFinish && !error && (
								<Grid container justify='center' item xs={12}>
									<CircularProgress />
								</Grid>
							)}
							
							{noData && !search.length && (
								<Grid item xs={12}>
									<Typography align='center'>
										No hay noticias publicadas.
									</Typography>
								</Grid>
							)}
							
							{noData && search.length && (
								<React.Fragment>
									<Grid item xs={12}>
										<Typography align='center'>
											No se ha encontrado nada relacionado con "{search}".
											<br/>
											Intente probar con otras palabras.
										</Typography>
									</Grid>
								</React.Fragment>
							)}
							
							{error && (
								<Grid item xs={12}>
									<Typography align='center'>
										Se ha producido un error al intentar obtener los datos, intente recargar la pรกgina.
									</Typography>
								</Grid>
							)}
						</Grid>
					</Grid>
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

export default PageNoticias;