import React from 'react';

import { 
	Grid,
	Paper,
	Typography,
	Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
}));

function NoticiasList() {
	const classes = useStyles();
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={4}>
				<Paper className='paper--padding'elevation={3}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography variant='h6' className='text__bold--semi'>
								Últimas noticias
							</Typography>
						</Grid>
						<Grid container item xs={12}>
							<Grid item xs={12}>
								<Typography className='text__bold--semi'>
									Título de la noticia
								</Typography>
								<Typography className='text__opacity--semi'>
									Fecha de publicación
								</Typography>
							</Grid>
							<Grid item xs={12} className={classes.margin}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<Typography className='text__bold--semi'>
									Título de la noticia
								</Typography>
								<Typography className='text__opacity--semi'>
									Fecha de publicación
								</Typography>
							</Grid>
							<Grid item xs={12} className={classes.margin}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<Typography className='text__bold--semi'>
									Título de la noticia
								</Typography>
								<Typography className='text__opacity--semi'>
									Fecha de publicación
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</React.Fragment>
	);
}

export default NoticiasList;