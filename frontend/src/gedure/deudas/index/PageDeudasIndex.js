import React, { useRef } from 'react';

import {
	Container,
	Box,
	Grid,
	Button,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useFetch from '../../../hooks/useFetch';

// Componets
import DialogConfirmation from '../../../components/DialogConfirmation';
import { parseFloatToMoneyString } from '../../../components/funciones/ParseString';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

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
	
	const { data, balance } = useSelector((state) => ({
		data: state.dialogs.deleteConfirmation.data,
		balance: state.userData.user.wallet.balance,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const onConfirm = async handleClose => {
		const prepare = {
			url: `v1/deuda/lote/${data.id}`,
			type: 'delete',
			message404: 'El lote de deuda ya no existe',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>
					<Grid container justify='space-between' alignItems='center'>
						<Grid item xs={12} sm>
							<Typography variant='h4' className='text__bold--big'>
								Deudas
							</Typography>
						</Grid>
						<Grid item xs={12} sm>
							<Typography variant='h6' align='right' data-tour='balance'>
								Saldo en monedero: <Box component='span' color={balance > 0 ? 'success.main' : 'text.secondary'}>{parseFloatToMoneyString(balance || 0)}</Box>
							</Typography>
						</Grid>
					</Grid>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}