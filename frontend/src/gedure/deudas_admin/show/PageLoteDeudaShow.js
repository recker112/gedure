import React, { useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import {
	Container,
	Box,
	Tooltip,
	IconButton,
	Grid,
	Paper,
	CircularProgress,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import useFetch from '../../../hooks/useFetch';

// Components
import { parseFloatToMoneyString } from '../../../components/funciones/ParseString';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';

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

function InfoBox({ data, color=null }) {
	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Paper className='paper--padding'>
				<Box fontSize='h5.fontSize' mb={2}>{data.title}</Box>
				<Box fontSize='body.fontSize' color={color}>{data.description}</Box>
			</Paper>
		</Grid>
	);
}

export default function PageLoteDeudaShow() {
	const { id } = useParams();
	document.title = 'La Candelaria - Ver deuda #'+id;
	
	const { loading, data } = useSelector((state) => ({
		loading: state.forms.pageShowLoteDeuda.loading,
		data: state.forms.pageShowLoteDeuda.data,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const history = useHistory();
	
	const classes = useStyles();
	
	const handleReturn = () => {
		history.push('/gedure/lotes-deudas');
	}
	
	useEffect(() => {
		const getInfo = async () => {
			const prepare = {
				url: `v1/deuda/lote/${id}`,
				type: 'get',
				messageToFinish: false,
			};
			
			const response = await fetchData(prepare);
			
			if (response) {
				response.amount_to_pay = parseFloatToMoneyString(response.amount_to_pay);
				response.amount_to_pay_exchange = parseFloatToMoneyString(response.amount_to_pay_exchange);
				dispatch(updateForms('pageShowLoteDeuda', false, response));
			}else {
				dispatch(updateForms('pageShowLoteDeuda', false, {}));
			}
		}

		getInfo();
		
		return () => {
			dispatch(updateForms('pageShowLoteDeuda', true, {}));
		}
		
		// eslint-disable-next-line
	},[]);
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>
					Lote deuda #{id}
				</Box>
				<Box mb={2}>
					<Tooltip title='Volver' arrow>
						<span>
							<IconButton
								disabled={loading} 
								onClick={handleReturn} 
								aria-label="return"
							>
								<ArrowBackIcon />
							</IconButton>
						</span>
					</Tooltip>
				</Box>
				{(!loading && Object.keys(data).length > 0) && (
					<Grid container justify='center' spacing={2}>
						<InfoBox
							data={{
								title: 'Motivo de la deuda', 
								description: data.reason
							}}
						/>
						<InfoBox
							data={{
								title: 'Monto a pagar', 
								description: data.exchange_rate_type === 'Bs.S' ? data.amount_to_pay : data.amount_to_pay_exchange
							}}
							color='success.main'
						/>
						<InfoBox
							data={{
								title: 'Fecha de creación', 
								description: data.created_at
							}}
						/>
						<InfoBox
							data={{
								title: 'Última edición', 
								description: data.updated_at
							}}
						/>
						<InfoBox
							data={{
								title: 'Deuda asigada a', 
								description: `${data.debts_count} usuario(s)`
							}}
						/>
						<InfoBox
							data={{
								title: 'Solventes', 
								description: `${data.debts_pagas_count} usuario(s)`
							}}
							color='info.main'
						/>
						<InfoBox
							data={{
								title: 'No solventes', 
								description: `${data.debts_no_pagadas_count} usuario(s)`
							}}
							color='error.main'
						/>
						<InfoBox
							data={{
								title: 'Reembolsados', 
								description: `${data.debts_reembolsados_count} usuario(s)`
							}}
							color='text.secondary'
						/>
					</Grid>
				)}
				{(!loading && Object.keys(data).length === 0) && (
					<Typography align='center'>
						No se ha podido encontrar el lote de deuda.
					</Typography>
				)}
				{loading && (
					<Grid container justify='center' spacing={2}>
						<CircularProgress />
					</Grid>
				)}
			</Container>
		</main>
	);
}