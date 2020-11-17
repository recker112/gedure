import React from 'react';

import { Box, Container, Grid, Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Carousel from 'react-material-ui-carousel';

//Components
import FooterText from '../../components/FooterText';
import logo from './../../imgs/favicon.png';

const useStyles = makeStyles((theme) => ({
	title: {
		color: 'white',
		[theme.breakpoints.down('xs')]: {
			fontSize: 25,
		},

		[theme.breakpoints.up('sm')]: {
			fontSize: 30,
		},
	},
	margin: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	etapa1: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '20px 20px 0px 0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '20px 0px 0px 0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '20px 0px 0px 0px',
		},
	},
	etapa2: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px 0px 0px 0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px 20px 0px 0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px 0px 0px 0px',
		},
	},
	etapa3: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px 0px 0px 0px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px 0px 0px 20px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px 20px 0px 0px',
		},
	},
	etapa4: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '0px 0px 20px 20px',
		},
		[theme.breakpoints.up('sm')]: {
			borderRadius: '0px 0px 20px 0px',
		},
		[theme.breakpoints.up('md')]: {
			borderRadius: '0px 0px 0px 20px',
		},
	},
}));

function CarrouselHeader() {
	const classes = useStyles();
	
	const Item1 = () => {
		return (
			<Box component="div" className="headIndex__boxImg">
				Item 1
			</Box>
		);
	}
	
	return (
		<Carousel interval={10000}>
			<Item1 />
			<Item1 />
		</Carousel>
	);
}

function PageIndex() {
	const classes = useStyles();
	
	return (
		<React.Fragment>
			<main className='container' ref={()=>{
					document.title = 'La Candelaria';
				}}>
				<CarrouselHeader />
			</main>
			<footer className='footer'>
				<FooterText />
			</footer>
		</React.Fragment>
	);
}

export default PageIndex;