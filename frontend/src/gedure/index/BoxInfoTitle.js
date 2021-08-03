import React from 'react';

import { 
	Grid,
	Paper,
	Typography,
	Box,
} from '@material-ui/core';

function BoxInfoTitle({ title, subTitle, color = 'text.primary' }) {
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Paper className='paper--padding' elevation={3}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--semi'>
							<Box color={color}>{title}</Box>
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h6' className='text__bold--semi'>
							{subTitle}
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default BoxInfoTitle;