import React, { useState } from 'react';

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

// Components
import MakePost from './MakePost';
import ShowPreview from './ShowPreview';

// Redux
import { useDispatch } from 'react-redux';
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
	
	const dispatch = useDispatch();
	
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
	
	const onSubmit = submitData => {
		alert("X");
		console.log(submitData);
	}
	
	return(
		<main className={classes.containerMain}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} autoComplete='off'>
					<Container>
						<Box mb={3}>
							<Grid container justify='space-between'>
								<Tooltip title='Volver' arrow>
									<IconButton aria-label="return">
										<ArrowBackIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title={preview ? 'Editar' : 'Visualizar'} arrow>
									<IconButton onClick={methods.handleSubmit(handlePreview)} aria-label="preview">
										{preview ? (<EditIcon />) : (<VisibilityIcon />)}
									</IconButton>
								</Tooltip>
							</Grid>
						</Box>
						{!preview && (
							<MakePost />
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