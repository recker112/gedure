import React from 'react';

import { 
	Grid,
	Paper,
	Divider,
	Box,
	Typography,
} from '@material-ui/core';

function BoletasList() {
	return (
		<React.Fragment>
			<Grid item xs={12} md={4}>
				<Paper className='paper--padding' elevation={3}>
					<Box mb={3} fontSize='h6.fontSize' className='text__bold--semi'>
						Últimas boletas cargadas
					</Box>
					<Typography className='text__bold--semi' noWrap>6 B - 1° Lapso</Typography>
					<Box fontSize='body1.fontSize' noWrap color='text.secondary'>
						Fecha de carga
					</Box>
					<Box my={2}>
						<Divider />
					</Box>
					<Typography className='text__bold--semi' noWrap>6 B - 2° Lapso</Typography>
					<Box fontSize='body1.fontSize' noWrap color='text.secondary'>
						Fecha de carga
					</Box>
					<Box my={2}>
						<Divider />
					</Box>
					<Typography className='text__bold--semi' noWrap>6 B - 3° Lapso</Typography>
					<Box fontSize='body1.fontSize' noWrap color='text.secondary'>
						Fecha de carga
					</Box>
				</Paper>
			</Grid>
		</React.Fragment>
	);
}

export default BoletasList;