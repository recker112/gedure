import React from 'react';

import { 
	Grid,
	Paper,
	Typography,
	Box,
} from '@material-ui/core';

function MoneyStatus() {
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={4}>
				<Paper className='paper--padding' elevation={3}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h5' className='text__bold--semi'>
								<Box color='success.main'>Bs/s 4.000.000</Box>
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h6' className='text__bold--semi'>
								Saldo disponible
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</React.Fragment>
	);
}

export default MoneyStatus;