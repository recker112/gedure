import React, { useState, useEffect } from 'react';

import { 
	Container, 
	Typography, 
	Grid,
	InputAdornment,
	IconButton,
	CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import InfiniteScroll from 'react-infinite-scroll-component';

import { useForm } from 'react-hook-form';

import useFetch from '../../hooks/useFetch';

// Component
import {
	InputHook
} from '@form-inputs';
import PreviewNoticia from './PreviewNoticia';
import Footer from '../../components/Footer';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
}));

function PageNews() {
	document.title = 'La Candelaria - Noticias';
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
	
	const { control, handleSubmit } = useForm();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
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
			getNotices(offset, 12);
		}
		
		return () => {
			if (cancelAxios) {
				cancelAxios.cancel();
			}
		}
		// eslint-disable-next-line
	}, [loading]);
	
	useEffect(() => {
		if (!loading && !auth) {
			setData([]);
			setHasFinish(false);
			setLoading(true);
		}
		// eslint-disable-next-line
	},[auth]);
	
	return (
		<React.Fragment>
			<main className={classes.containerMain}>
				<Container>
					<Grid container justify='center' spacing={2}>
						<Grid item xs={12} sm>
							<Typography variant='h4' className='text__bold--big'>
								Noticias
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<form 
								onSubmit={handleSubmit(onSubmit)}
								autoComplete='off'
							>
								<InputHook
									control={control}
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
						
						{data.length > 0 && (
							<Grid item xs={12}>
								<InfiniteScroll
									dataLength={data.length}
									hasMore={!hasFinish}
									inverse={true}
									next={() => {
										setLoading(true);
									}}
									style={{overflow: 'hidden'}}
									className='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 MuiGrid-justify-xs-center'
									scrollThreshold={0.8}
									loader={
										<Grid container justify='center' item xs={12}>
											<CircularProgress />
										</Grid>
									}
									endMessage={
										<Grid item xs={12}>
											<Typography align='center'>
												No hay más noticias publicadas.
											</Typography>
										</Grid>
									}
								>
									{data.map((datos,i)=> (
										<PreviewNoticia key={i} {...datos} />
									))}
								</InfiniteScroll>
							</Grid>
						)}
						
						{!data.length && !hasFinish && !error && (
							<Grid container justify='center' item xs={12}>
								<CircularProgress />
							</Grid>
						)}

						{(noData && !search.length) && (
							<Grid item xs={12}>
								<Typography align='center'>
									No hay noticias publicadas.
								</Typography>
							</Grid>
						)}

						{(noData && search.length !== 0) && (
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
									Se ha producido un error al intentar obtener los datos, intente recargar la página.
								</Typography>
							</Grid>
						)}
					</Grid>
				</Container>
			</main>
			{!auth && <Footer />}
		</React.Fragment>
	);
}

export default PageNews;