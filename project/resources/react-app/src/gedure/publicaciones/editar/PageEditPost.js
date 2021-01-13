import React, { useState, useCallback, useEffect } from 'react';

import { useParams, Link as RouteLink } from 'react-router-dom';

import { 
	Container,
	Box,
	Grid,
	Tooltip,
	IconButton,
	CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

import { useForm, FormProvider } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Components
import ShowPreview from './ShowPreview';
import MakePost from './MakePost';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import updateForms from '../../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(5),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
}));

export default function PageEditPost() {
	const { slug } = useParams();
	const [preview, setPreview] = useState(false);
	const [progress, setProgress] = useState(0);
	const [request, setRequest] = useState(true);
	document.title = 'La Candelaria - Editar noticia';
	
	const { loading, data } = useSelector((state) => ({
		loading: state.forms.editPost.loading,
		data: state.forms.editPost.data,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const { fetchData } = useFetch();
	
	const methods = useForm({
		mode: 'onTouched',
	});
	
	useEffect(()=>{
		const requestPost = async () => {
			const prepare = {
				url: `v1/posts/auth/${slug}`,
				type: 'get',
				messageToFinish: false,
				messageTo404: false,
			};
			
			const response = await fetchData(prepare);

			if (response) {
				response.markdown = response.content;
				delete response.content;
				dispatch(updateForms('editPost', false, response));
			}
			
			setRequest(false);
		}
		
		requestPost();
		
		return () => {
			dispatch(updateForms('editPost', false, {}));
		}
		// eslint-disable-next-line
	},[]);
	
	const handlePreview = submitData => {
		if (Object.keys(submitData).length > 1) {
			// Fix change
			submitData.slug = data.slug;
			submitData.url_imgs = data.url_imgs;
			submitData.url_portada = data.url_portada;
			
			dispatch(updateForms('editPost', false, submitData));
		}
		setPreview(!preview);
	}
	
	const onUploadProgress = useCallback((progressEvent) => {
		let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

		setProgress(percentCompleted);
		// eslint-disable-next-line
	}, []);
	
	const onSubmit = submitData => {
		// Request del modify
	}
	
	return (
		<main className={classes.containerMain}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} autoComplete='off'>
					<Container>
						<Box mb={3}>
							<Grid container justify='space-between'>
								<Tooltip title='Volver' arrow>
									<IconButton disabled={loading} component={RouteLink} to='/gedure/publicaciones' aria-label="return">
										<ArrowBackIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title={preview ? 'Editar' : 'Visualizar'} arrow>
									<IconButton disabled={loading} onClick={methods.handleSubmit(handlePreview)} aria-label="preview">
										{preview ? (<EditIcon />) : (<VisibilityIcon />)}
									</IconButton>
								</Tooltip>
							</Grid>
						</Box>
						{(!preview && data.slug) && (
							<MakePost progressUpload={progress} />
						)}
						{request && (
							<Box align='center'>
								<CircularProgress />
							</Box>
						)}
						{(!request && !data.slug) && (
							<Box align='center' fontSize='body1.fontSize'>
								La noticia no existe.
							</Box>
						)}
					</Container>
				</form>
			</FormProvider>
			{preview && (
				<ShowPreview />
			)}
		</main>
	);
}