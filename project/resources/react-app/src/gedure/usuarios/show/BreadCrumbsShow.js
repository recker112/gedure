import React from 'react';

import { useLocation } from 'react-router-dom';

import { 
	Grid, 
	Avatar,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
	},
}));

export default function BreadCrumbsShow() {
	const { data } = useSelector((state) => ({
		data: state.forms.showUser.data,
	}));
	
	const classes = useStyles();
	
	let location = useLocation();
	
	let BreadCrumbsRouters = location.pathname.split('/');
	// eslint-disable-next-line
	let removed = BreadCrumbsRouters.splice(0,1);
	
	let route = BreadCrumbsRouters[BreadCrumbsRouters.length - 1].toString().replace('-', ' ');
	
	return (
		<Grid container alignItems='center' spacing={2}>
			<Grid item>
				<Avatar src={data.user?.avatar} className={classes.avatar} alt={`Avatar de ${data.user?.name}`}>
					{data.user?.name.substring(0, 1).toUpperCase()}
				</Avatar>
			</Grid>
			<Grid item>
				<Typography variant='h6' className='text__bold--semi'>{data.user?.name}</Typography>
			</Grid>
			<Grid item>
				<Typography variant='h6' className='text__bold--semi'>/</Typography>
			</Grid>
			<Grid item>
				<Typography variant='h6' className='text__bold--semi'>
				{(BreadCrumbsRouters.length - 1 !== 4 || route === '') ? 'Perfil' : route[0].toUpperCase() + route.slice(1) }
				</Typography>
			</Grid>
		</Grid>
	);
}