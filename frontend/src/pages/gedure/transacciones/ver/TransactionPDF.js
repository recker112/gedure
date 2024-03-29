import React from 'react';

// MUI
import { Box, Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// Components
import Logo from '../../../../img/favicon.png';
import GedureLogo from '../../../../img/gedure-logo-recto.svg';
import { BankListSearch } from '../../../../components/Utils/BankList';
import { parseFloatToMoneyString } from '../../../../components/Utils/ParseString';

export default function TransactionPDF({
  id,
  user,
  type,
  payload,
  amount,
	previous_balance,
  exonerado,
  exonerante,
  created_at,
  payment_method,
}) {
	let amount_parse = amount;

	if (type === 'deuda pagada' || (type === 'transferencia de saldo' && payload?.extra_data?.sender)) {
		amount_parse = amount_parse * -1;
	}

  return (
    <Paper className='paper--padding' id='PDF'>
      <Grid container>
        <Grid container item xs={12} md={6}>
					<Box mr={2}>
						<img src={Logo} width='75' alt='Logo del instituto' />
					</Box>
					<Grid item xs>
						<Typography className='text__bold--semi'>
							U.E.P A.P.E.P "La Candelaria"
						</Typography>
						<Typography className='text__opacity--semi'>
							N° Recibo #{id}
						</Typography>
					</Grid>
				</Grid>
        <Grid container justifyContent='flex-end' alignItems='center' item xs={12} md={6}>
					<Box 
						fontSize={{ xs: 'h5.fontSize', md: 'h4.fontSize' }}
						className='text__bold--big' 
						color='#00ddff'
					>
						Transacción <Box color='#2a86ff' component='span'>realizada</Box>
					</Box>
				</Grid>
      </Grid>

      <Box my={3}>
				<Divider />
			</Box>

      <Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography className='text__bold--semi'>
						Comprobante a nombre de:
					</Typography>
					<Typography>
						{user.name} ({user.privilegio+user.username})
					</Typography>
				</Grid>
				{type === 'pago verificado' && (
					<Grid item xs={12} sm={6}>
						<Typography align='right' className='text__bold--semi'>
							Pago realizado a:
						</Typography>
						<Typography align='right'>
							{payload.extra_data.name}
							<br />
							J-{payload.extra_data.rif.slice(0,-1)}-{payload.extra_data.rif.charAt(payload.extra_data.rif.length - 1)}
							<br />
							{BankListSearch[payload.extra_data.code]}
							<br />
							{payload.extra_data.type}
						</Typography>
					</Grid>
				)}
        {(type === 'deuda pagada') && (
					<Grid item xs={12} sm={6}>
						<Typography align='right' className='text__bold--semi'>
							Pago realizado a:
						</Typography>
						<Typography align='right'>
							Plataforma
						</Typography>
					</Grid>
				)}
				{type === 'transferencia de saldo' && (
					<Grid item xs={12} sm={6}>
						<Typography align='right' className='text__bold--semi'>
							{payload.extra_data.sender ? 'Pago realizado a:' : 'Pago recibido de:'}
						</Typography>
						<Typography align='right'>
							{payload.extra_data.name} ({payload.extra_data.username})
						</Typography>
					</Grid>
				)}
				{type === 'manual' && (
					<Grid item xs={12} sm={6}>
						<Typography align='right' className='text__bold--semi'>
							{amount <= 0 ? 'Pago realizado a:' : 'Pago recibido de:'}
						</Typography>
						<Typography align='right'>
							Plataforma
						</Typography>
					</Grid>
				)}
			</Grid>

      <Grid container style={{margin: '15px 0'}}>
				<Grid item xs={12} sm={6}>
					<Typography className='text__bold--semi'>Fecha:</Typography>
					<Typography>
						{created_at}
					</Typography>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Typography className='text__bold--semi' align='right'>
						Método de pago:
					</Typography>
					<Typography align='right'>
						{payment_method.charAt(0).toUpperCase()+payment_method.slice(1)}
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
						{payload.actions && payload.actions.map((action, i) => (
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

      <Box mt={2} mb={14} textAlign='right'>
				<Typography component='span' className='text__bold--semi'>
					Total:
				</Typography>
				<Typography component='span'>
					{' '+parseFloatToMoneyString(amount)}
				</Typography>
				<br/>
				<Typography component='span' className='text__bold--semi'>
					Saldo anterior: 
				</Typography>
				<Typography component='span'>
					{' '+parseFloatToMoneyString(previous_balance)}
				</Typography>
				<br/>
				<Typography component='span' className='text__bold--semi'>
					Nuevo saldo disponible: 
				</Typography>
				<Typography component='span'>
					{' '+parseFloatToMoneyString(exonerado ? previous_balance : amount_parse+previous_balance)}
				</Typography>
			</Box>

      <Grid container justifyContent='center'>
				<Grid item xs={8} sm={6} md={4}>
					<Divider />
					<Typography align='center'>Sello</Typography>
				</Grid>
			</Grid>
			
			<Grid 
				container
				justifyContent='center' 
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

			{exonerado === 1 && (
				<Box sx={{textAlign: {xs: 'center', sm: 'left'}}} mt={2} style={{opacity: 0.6}}>
					<Typography className='text__bold--semi'>
						Pago exonerado por: 
					</Typography>
					<Typography>U.E.P A.P.E.P "La Candelaria"</Typography>
				</Box>
			)}
    </Paper>
  )
}
