import React, { useRef } from 'react';

import { 
	Grid, 
	Container,
	Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import TableMonedero from './TableMonedero';
import EditMonedero from './EditMonedero';
import TourMonedero from './TourMonedero';

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

export default function PageMonederos() {
	document.title = 'La Candelaria - Monederos';
	const tableRef = useRef(null);
	
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Monederos</Box>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TableMonedero tableRef={tableRef} />
						<EditMonedero tableRef={tableRef} />
					</Grid>
				</Grid>
			</Container>
			<TourMonedero />
		</main>
	);
}