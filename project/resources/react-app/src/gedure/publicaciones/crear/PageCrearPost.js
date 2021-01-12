import React, { useState, useCallback } from 'react';

import { Link as RouteLink } from 'react-router-dom';

import { 
	Grid, 
	Container,
	Box,
	IconButton,
	Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

import { useForm, FormProvider } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Components
import MakePost from './MakePost';
import ShowPreview from './ShowPreview';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import updateForms from '../../../actions/updateForms';

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

export default function PageCrearPost() {
	document.title = 'La Candelaria - Crear publicaciones';
	const [preview, setPreview] = useState(false);
	const [progress, setProgress] = useState(0);
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.crearPost.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const methods = useForm({
		mode: 'onTouched',
	});
	
	const handlePreview = submitData => {
		if (Object.keys(submitData).length > 1) {
			console.log(submitData);
			dispatch(updateForms('crearPost', false, submitData));
		}
		setPreview(!preview);
	}
	
	const onUploadProgress = useCallback((progressEvent) => {
		let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

		setProgress(percentCompleted);
		// eslint-disable-next-line
	}, []);
	
	const onSubmit = async submitData => {
		dispatch(updateForms('crearPost', true, {}));
		
		// FormData
		console.log(submitData);
		const formData = new FormData();
		formData.append('title', submitData.title);
		formData.append('content', submitData.markdown);
		formData.append('only_users', submitData.only_users);
		submitData.portada[0] && formData.append('portada', submitData.portada[0]);
		submitData.galery.forEach(img => {
			formData.append('galery[]', img.file);
		});
		
		const prepare = {
			url: `v1/posts`,
			type: 'post',
			data: formData,
			otherData: {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: onUploadProgress,
			},
		};
		
		const response = await fetchData(prepare);

		if (response) {
			setProgress(0);
		}
		
		dispatch(updateForms('crearPost', false, {}));
	}
	
	return(
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
						{!preview && (
							<MakePost progressUpload={progress} />
						)}
					</Container>
				</form>
			</FormProvider>
			{preview && (
				<ShowPreview />
			)}
		</main>
	)
}