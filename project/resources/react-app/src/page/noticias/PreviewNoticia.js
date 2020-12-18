import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
	Grid,
	Paper,
	Typography,
	IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// Redux
import { useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	colorsito: {
		backgroundColor: theme.palette.secondary.main,
		height: 200,
		borderRadius: 5,
		color: theme.palette.secondary.contrastText,
	},
	withImg: {
		backgroundColor: theme.palette.secondary.main + '90',
		height: 200,
		borderRadius: 5,
		color: theme.palette.secondary.contrastText,
	},
	button: {
		color: theme.palette.secondary.contrastText,
	},
}));

function PreviewNoticia(props) {
	const { 
		title,
		slug,
		fecha_humano,
	} = props;
	
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const handleClick = () => {
		const { 
			id,
			user,
			title,
			content,
			fecha_humano,
			slug,
			url_imgs,
			fecha_humano_modify,
			only_users,
		} = props;
		
		const prepareData = {
			id,
			user,
			title,
			content,
			fecha_humano,
			slug,
			url_imgs,
			fecha_humano_modify,
			only_users,
		};
		dispatch(updateForms('noticia', false, prepareData));
	};
	
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Paper>
				<Grid container alignItems='space-between' className={`${classes.colorsito} paper--padding`}>
					<Grid item xs={12}>
						<Typography>
							{title.length > 100 ? `${title.substring(0, 100)}...` : title}
						</Typography>
						<Typography className='text__opacity--semi'>Publicado {fecha_humano}</Typography>
					</Grid>
					<Grid container justify='flex-end' alignItems='flex-end' item xs={12}>
						<IconButton onClick={handleClick} component={RouterLink} to={`noticias/${slug}`} className={classes.button}>
							<ArrowForwardIcon />
						</IconButton>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default PreviewNoticia;