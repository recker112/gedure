import React from 'react';

// MUI
import { Box, Container, Grid, Typography } from '@mui/material';

// Components
import Table from './Table';
import { parseFloatToMoneyString } from '../../../components/Utils/ParseString';

// Redux
import { useSelector } from 'react-redux';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Deudas() {
  const { count_notify, balance } = useSelector(state => ({
    count_notify: state.auth.notify.count,
    balance: state.auth.user.wallet.balance,
  }));

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Deudas - La Candelaria` : `Deudas - La Candelaria`;

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box mb={3}>
					<Grid container justifyContent='space-between' alignItems='center'>
						<Grid item xs={12} sm={4}>
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
						<Table />
					</Grid>
        </Grid>
      </Container>
    </Box>
  )
}
