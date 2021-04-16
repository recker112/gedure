import React, { useRef } from 'react';

import { useHistory } from 'react-router-dom';

import {
	Container,
	Box,
	Grid,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Componets
import TableDeudas from './TableDeudas';

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

export default function PageDeudasIndex() {
	document.title = 'La Candelaria - Deudas';
	const tableRef = useRef(null);
	
	const history = useHistory();
	
	const classes = useStyles();
	
	const handleCreate = () => {
		history.push('/gedure/deudas/crear');
	}
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Deudas</Box>
				<Grid container spacing={2}>
					<Grid container justify='flex-end' item xs={12}>
						<Button variant='contained' color='primary' onClick={handleCreate}>
							Crear deuda
						</Button>
					</Grid>
					<Grid item xs={12}>
						<TableDeudas tableRef={tableRef} />
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}