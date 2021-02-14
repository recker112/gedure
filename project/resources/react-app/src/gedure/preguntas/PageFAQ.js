import React, { useState } from 'react';

import {
	Container,
	Box,
	Grid,
	Slide,
	Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import AccordionAdmin from './AccordionAdmin';
import AccordionUser from './AccordionUser';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
	},
	header: {
		background: theme.palette.primary.main,
		height: 300,
		borderRadius: '0px 0px 15px 15px'
	},
	content: {
		position: 'relative',
		top: -60,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	}
}));

function Header() {
	return (
		<Container>
			<Grid container>
				<Grid item xs>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize', md: 'h4.fontSize' }} className='text__bold--semi'>
						<Box color='secondary.main' component='span'>Preguntas</Box> frecuentes,
					</Box>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize' }} className='text__bold--semi'>
						resuelva sus dudas sobre <Box color='secondary.main' component='span'>Gedure</Box>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default function PageFAQ() {
	document.title = 'La Candelaria - Preguntas Frecuentes';
	const [expanded, setExpanded] = useState(false);
	const { privilegio } = useSelector((state) => ({
		privilegio: state.userData.user.privilegio,
	}));
	
	const classes = useStyles();
	
	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	}
	
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
				<Container className={classes.content}>
					{privilegio === 'A-' && (
						<AccordionAdmin 
							expanded={expanded} 
							handleChange={handleChange}
							classes={classes}
						/>
					)}
					{privilegio === 'V-' && (
						<AccordionUser
							expanded={expanded} 
							handleChange={handleChange}
							classes={classes}
						/>
					)}
				</Container>
			</Fade>
		</main>
	);
}