import React from 'react';

import { 
	Grid,
	Paper,
	Divider,
	Box,
	Typography,
} from '@material-ui/core';

function NoticiasList() {
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={4}>
				<Paper className='paper--padding'elevation={3}>
					<Box mb={3} fontSize='h6.fontSize' className='text__bold--semi'>
						Últimas noticias
					</Box>
					<Typography className='text__bold--semi' noWrap>Título de la noticia</Typography>
					<Box fontSize='body1.fontSize' noWrap color='text.secondary'>
						Fecha de publicación
					</Box>
					<Box my={2}>
						<Divider />
					</Box>
					<Typography className='text__bold--semi' noWrap>Título de la noticia</Typography>
					<Box fontSize='body1.fontSize' noWrap color='text.secondary'>
						Fecha de publicación
					</Box>
					<Box my={2}>
						<Divider />
					</Box>
					<Typography className='text__bold--semi' noWrap>Título de la noticia</Typography>
					<Box fontSize='body1.fontSize' noWrap color='text.secondary'>
						Fecha de publicación
					</Box>
				</Paper>
			</Grid>
		</React.Fragment>
	);
}

export default NoticiasList;