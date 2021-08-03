import React from 'react';

import {
	Paper,
	Grid,
	Typography,
	Box,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core';

// Components
import Logo from '../../../imgs/favicon.png';
import GedureLogo from '../../../imgs/gedure-logo-recto.svg';
import { BankListSearch } from '../../../components/funciones/BankList';
import { parseFloatToMoneyString } from '../../../components/funciones/ParseString';

export default function TransactionPDF({ data, pdfRef }) {
	return (
		<Paper className='paper--padding' ref={pdfRef} id='PDF'>
			<Grid container>
				<Grid container item xs={12} md={6}>
					<Box mr={2}>
						<img src={Logo} width='75' alt='Logo del instituto' />
					</Box>
					<Grid item xs>
						<Typography className='text__bold--semi'>
							U.E.P.A.P.E.P "La Candelaria"
						</Typography>
						<Typography className='text__opacity--semi'>
							Movimiento #{data.id}
						</Typography>
					</Grid>
				</Grid>
				<Grid container justify='flex-end' alignItems='center' item xs={12} md={6}>
					<Box 
						fontSize={{ xs: 'h5.fontSize', md: 'h4.fontSize' }}
						className='text__bold--big' 
						color='#00ddff'
					>
						Transacción <Box color='#2a86ff' component='span'>realizada</Box>
					</Box>
				</Grid>
			</Grid>
			
			<Box my={2}>
				<Divider style={{height: 3}} />
			</Box>
			
			<Grid container>
				<Grid item xs={12} sm={6}>
					<Typography className='text__bold--semi'>
						Comprobante a nombre de:
					</Typography>
					<Typography>
						{data.user.name} ({data.user.privilegio+data.user.username})
					</Typography>
				</Grid>
				{data.type === 'pago verificado' && (
					<Grid item xs={12} sm={6}>
						<Typography align='right' className='text__bold--semi'>
							Pago realizado a:
						</Typography>
						<Typography align='right'>
							{data.payload.extra_data.name}
							<br />
							J-{data.payload.extra_data.rif.slice(0,-1)}-{data.payload.extra_data.rif.charAt(data.payload.extra_data.rif.length - 1)}
							<br />
							{BankListSearch[data.payload.extra_data.code]}
							<br />
							{data.payload.extra_data.type}
						</Typography>
					</Grid>
				)}
			</Grid>
			
			<Grid container style={{margin: '15px 0'}}>
				<Grid item xs={12} sm={6}>
					<Typography className='text__bold--semi'>Fecha:</Typography>
					<Typography>
						{data.created_at}
					</Typography>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Typography className='text__bold--semi' align='right'>
						Método de pago:
					</Typography>
					<Typography align='right'>
						{data.payment_method.charAt(0).toUpperCase()+data.payment_method.slice(1)}
					</Typography>
				</Grid>
			</Grid>
			
			<Box>
				<Typography variant='h5' className='text__bold--semi'>Acciones</Typography>
				<Table aria-label="actions table">
					<TableHead>
						<TableRow>
							<TableCell>
								Descripción
							</TableCell>
							<TableCell align='right'>
								Importe
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.payload.actions && data.payload.actions.map((action, i) => (
							<TableRow key={i}>
								<TableCell>
									{action.reason}
								</TableCell>
								<TableCell align='right'>
									{parseFloatToMoneyString(action.amount)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
			
			<Box mt={2} mb={14} align='right'>
				<Typography component='span' className='text__bold--semi'>
					Total:
				</Typography>
				<Typography component='span'>
					{' '+parseFloatToMoneyString(data.amount)}
				</Typography>
				<br/>
				<Typography component='span' className='text__bold--semi'>
					Saldo en monedero: 
				</Typography>
				<Typography component='span'>
					{' '+parseFloatToMoneyString(data.amount+data.previous_balance)}
				</Typography>
			</Box>
			
			<Grid container justify='center'>
				<Grid item xs={8} sm={6} md={4}>
					<Divider style={{height: 3}} />
					<Typography align='center'>Sello/Firma</Typography>
				</Grid>
			</Grid>
			
			{data.exonerado === 1 && (
				<Box mt={2} style={{opacity: 0.6}}>
					<Typography className='text__bold--semi'>
						Pago exonerado por: 
					</Typography>
					{data.exonerante && (
						<Typography>{data.exonerante.name} ({data.exonerante.privilegio+data.exonerante.username})</Typography>
					)}
					{!data.exonerante && (
						<Typography>U.E.P.A.P.E.P "La Candelaria"</Typography>
					)}
				</Box>
			)}
			
			<Grid 
				container
				justify='center' 
				alignItems='center'
				style={{opacity: 0.5, marginTop: 15}}
			>
				<Box 
					style={{marginRight: 3}}
					fontSize='body1.fontSize' 
					className='text__bold--semi' 
					component='span'
				>
					Powered by
				</Box>
				<img src={GedureLogo} alt='logo de Gedure' height='22' />
			</Grid>
		</Paper>
	);
}