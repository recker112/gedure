import React, { useRef } from 'react';

import { 
	Grid, 
	Container,
	Box,
	Typography,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import TableTU from './TableTU';
import { parseFloatToMoneyString } from '../../../components/funciones/ParseString';

// Redux
import { useSelector } from 'react-redux';

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
	button: {
		marginRight: theme.spacing(1),
	},
}));

export default function PageIndex() {
	document.title = 'La Candelaria - Monedero';
	const tableRef = useRef(null);
	
	const { balance } = useSelector((state) => ({
		balance: state.userData.user.wallet.balance,
	}));
	
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box mb={3}>
					<Grid container justify='space-between' alignItems='center'>
						<Grid item xs={12} sm>
							<Typography variant='h4' className='text__bold--big'>
								Monedero
							</Typography>
						</Grid>
						<Grid item xs={12} sm>
							<Typography variant='h6' align='right'>
								Saldo en monedero: <Box component='span' color='success.main'>{parseFloatToMoneyString(balance || 0)}</Box>
							</Typography>
						</Grid>
					</Grid>
				</Box>
				<Grid container spacing={2}>
					<Grid container justify='flex-end' item xs={12}>
						<Button 
							variant='contained' 
							color='primary'
							data-tour='create'
							className={classes.button}
						>
							Transferir saldo
						</Button>
						<Button 
							variant='contained' 
							color='primary'
							data-tour='create'
						>
							Verificar pago
						</Button>
					</Grid>
					<Grid item xs={12}>
						<TableTU tableRef={tableRef} />
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}