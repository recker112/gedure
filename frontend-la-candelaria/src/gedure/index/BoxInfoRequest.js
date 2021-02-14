import React from 'react';

import { 
	Grid,
	Paper,
	Divider,
	Box,
	Typography,
	CircularProgress,
} from '@material-ui/core';

export default function BoxInfoRequest({ title, data = null, loading}) {
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Paper className='paper--padding'elevation={3}>
				<Box mb={3} fontSize='h6.fontSize' className='text__bold--semi'>
					{title}
				</Box>
				{!loading && data?.map((item, i) => (
					<React.Fragment key={i}>
						<Typography className='text__bold--semi' noWrap>
							{item.textPrimary}
						</Typography>
						<Box fontSize='body1.fontSize' color='text.secondary'>
							{item.textSecondary}
						</Box>
						{(data.length !== i+1) && (
							<Box my={2}>
								<Divider />
							</Box>
						)}
					</React.Fragment>
				))}
				{(data?.length === 0 && !loading) && (
					<Typography className='text__bold--semi'>
						Nada que mostrar
					</Typography>
				)}
				{loading && (
					<Box align='center'>
						<CircularProgress />
					</Box>
				)}
			</Paper>
		</Grid>
	);
}