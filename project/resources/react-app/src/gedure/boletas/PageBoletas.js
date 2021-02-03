import React from 'react';

import { 
	Grid, 
	Container,
	Box,
	Typography,
	TextField,
	InputAdornment,
	IconButton,
	Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import {
	FilePdf as FilePdfIcon,
} from 'mdi-material-ui';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
}));

function PageBoletas() {
	document.title = 'La Candelaria - Boletas';
	
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Grid container spacing={3}>
					<Grid item xs={12} sm>
						<Typography variant='h4' className='text__bold--big'>
							Boletas
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField
							name='search'
							label='Buscar boleta'
							variant='outlined'
							size='small'
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton 
											size='small'
											type='submit'
										>
											<SearchIcon />
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid container spacing={2} item xs={12}>
						<Grid item xs={12} sm={6} md={4}>
							<Paper elevation={0} className='paper--padding'>
								<Grid container spacing={2}>
									<Grid container spacing={2} alignItems='center' item>
										<Grid item>
											<FilePdfIcon style={{ fontSize: 60, color: '#FC8948' }} />
										</Grid>
										<Grid item>
											<Box fontSize='h6.fontSize' className='text__bold--semi' color='#FC8948'>
												6 año - 1° Lapso
											</Box>
											<Box fontSize='body1.fontSize' color='text.secondary'>
												Subido el 12/08/202
											</Box>
										</Grid>
									</Grid>
									
									<Grid container justify='flex-end' item>
										<Grid item>
											<IconButton>
												<GetAppIcon />
											</IconButton>
										</Grid>
										<Grid item>
											<IconButton>
												<VisibilityIcon />
											</IconButton>
										</Grid>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}

export default PageBoletas;