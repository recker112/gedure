import React, { useRef } from 'react';

import { 
	Grid, 
	Container,
	Box,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import TablePosts from './TablePosts';

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

export default function PagePublicaciones() {
	document.title = 'La Candelaria - Publicaciones';
	const tableRef = useRef(null);
	
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Publicaciones</Box>
				<Grid container spacing={2}>
					<Grid container justify='flex-end' item xs={12}>
						<Button variant='contained' color='primary'>
							Crear
						</Button>
					</Grid>
					<Grid item xs={12}>
						<TablePosts tableRef={tableRef} />
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}