import React from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { Box, Button, Container, Grid, Typography } from '@mui/material';

// Components
import { parseFloatToMoneyString } from '../../../components/Utils/ParseString';
import Table from './Table';

// Redux
import { useSelector } from 'react-redux';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Monedero() {
  const { count_notify, balance } = useSelector(state => ({
    count_notify: state.auth.notify.count,
    balance: state.auth.user.wallet.balance,
  }));

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Monedero - La Candelaria` : `Monedero - La Candelaria`;

	const navigate = useNavigate();

	const handleVerify = () => {
		navigate('/gedure/monedero/verificar-pagos');
	}

	const handleTransfer = () => {
		navigate('/gedure/monedero/transferir-saldo');
	}

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box mb={3}>
					<Grid container justifyContent='space-between' alignItems='center'>
						<Grid item xs={12} sm={4}>
							<Typography variant='h4' className='text__bold--big'>
								Monedero
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
					<Grid container justifyContent='flex-end' spacing={1} item xs={12}>
						<Grid item>
							<Button
								variant='contained' 
								color='primary'
								onClick={handleTransfer}
								data-tour='transfer'
							>
								Transferir saldo
							</Button>
						</Grid>
						<Grid item>
							<Button 
								variant='contained' 
								color='primary'
								onClick={handleVerify}
								data-tour='verify_pay'
							>
								Verificar pago
							</Button>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Table />
					</Grid>
				</Grid>
      </Container>
    </Box>
  )
}