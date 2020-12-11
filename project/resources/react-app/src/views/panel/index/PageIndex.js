import React from 'react';

import { 
	Grid, 
	Container,
	Typography,
	Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Content
import NoticiasList from './NoticiasList';
import SoporteList from './SoporteList';
import BoletasList from './BoletasList';
import MoneyStatus from './MoneyStatus';
import DeudasStatus from './DeudasStatus';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		marginBottom: theme.spacing(10),
	},
	header: {
		background: theme.palette.primary.main,
		height: 400,
	},
	content: {
		position: 'relative',
		top: -80,
	}
}));

function Header() {
	const { nombre } = useSelector((state) => ({
		nombre: state.userData.user.nombre,
	}));
	
	return (
		<Container>
			<Grid container justify='space-between'>
				<Grid item xs>
					<Box color='primary.contrastText'>
						<Typography className='text__bold--semi' variant='h4'>
							<Box color='secondary.main' component='span'>Hola</Box> {nombre},
						</Typography>
					<Typography className='text__bold--semi' variant='h5'>
						Bienveido a <Box color='secondary.main' component='span'>Gedure</Box>
						</Typography>
					</Box>
				</Grid>
				<Grid container justify='flex-end' item xs>
					<Box color='primary.contrastText'>
						<Typography align='right' className='text__bold--semi' variant='h4'>
							Hora del sistema
						</Typography>
					<Typography align='right' className='text__bold--semi' variant='h5'>
						<Box color='secondary.main' component='span'>08:12 PM</Box>
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

function PageIndex() {
	document.title = 'La Candelaria - Panel';
	
	const { privilegio } = useSelector((state) => ({
		privilegio: state.userData.user.privilegio,
	}));
	
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain}>
			<Grid container>
				<Grid container alignItems='center' item xs={12} className={classes.header}>
					<Header />
				</Grid>
			</Grid>
			<Container>
				<Grid container spacing={2} item xs={12} className={classes.content}>
					{(privilegio === 'V-' || true) && (
						<React.Fragment>
							<NoticiasList />
							<SoporteList />
							<BoletasList />
							<MoneyStatus />
							<DeudasStatus />
						</React.Fragment>
					)}
				</Grid>
			</Container>
		</main>
	)
}

export default PageIndex;