import React from 'react';

import { 
	Grid, 
	Container,
	Box,
	Slide,
	Fade,
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
		borderRadius: '0px 0px 15px 15px'
	},
	content: {
		position: 'relative',
		top: -80,
	}
}));

function Header() {
	const { name } = useSelector((state) => ({
		name: state.userData.user.name,
	}));
	
	return (
		<Container>
			<Grid container justify='space-between'>
				<Grid item xs>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize', md: 'h4.fontSize' }} className='text__bold--semi'>
						<Box color='secondary.main' component='span'>Hola</Box> {name},
					</Box>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize' }} className='text__bold--semi'>
						Bienveido a <Box color='secondary.main' component='span'>Gedure</Box>
					</Box>
				</Grid>
				<Grid item xs>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize', md: 'h4.fontSize' }} className='text__bold--semi' align='right'>
						Versión del sistema
					</Box>
					<Box color='secondary.main' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize' }} className='text__bold--semi' align='right'>v5.0.0-Alpha.0</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default function PageUserIndex() {
	document.title = 'La Candelaria - Panel';
	
	const { privilegio } = useSelector((state) => ({
		privilegio: state.userData.user.privilegio,
	}));
	
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain}>
			<Slide direction="down" in={true} timeout={1000} mountOnEnter unmountOnExit>
				<Grid container>
					<Grid container alignItems='center' item xs={12} className={classes.header}>
						<Header />
					</Grid>
				</Grid>
			</Slide>
			<Fade in={true} style={{ transitionDelay: '1000ms' }}>
				<Container>
					<Grid container justify='center' spacing={2} item xs={12} className={classes.content}>
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
			</Fade>
		</main>
	)
}