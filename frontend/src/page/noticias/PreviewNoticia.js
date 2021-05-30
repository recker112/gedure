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
		borderRadius: 4,
		color: theme.palette.secondary.contrastText,
	},
	withImg: {
		backgroundColor: theme.palette.secondary.main + 'A9',
		height: 200,
		borderRadius: 4,
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
		url_portada,
	} = props;
	
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const handleClick = () => {
		const prepareData = {
			...props
		};
		dispatch(updateForms('noticia', false, prepareData));
	};
	
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Paper style={{background: url_portada ? `url("${url_portada}")` : '', backgroundSize: 'cover'}}>
				<Grid container className={`${url_portada ? classes.withImg : classes.colorsito } paper--padding`}>
					<Grid item xs={12}>
						<Typography>
							{title.length > 100 ? `${title.substring(0, 100)}...` : title}
						</Typography>
						<Typography className='text__opacity--semi'>
							Publicado {fecha_humano}
						</Typography>
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