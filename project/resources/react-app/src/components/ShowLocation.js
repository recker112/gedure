import React from 'react';

import {
  useLocation,
} from "react-router-dom";

import { Typography, Breadcrumbs } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	breadCrumbs: {
		marginBottom: theme.spacing(2),
	}
}));

function LocationShow(){
	const classes = useStyles();
	
	let location = useLocation();
	
	let BreadCrumbsRouters = location.pathname.split('/');
	// eslint-disable-next-line
	let removed = BreadCrumbsRouters.splice(0,1);
	
	return (
		<Breadcrumbs 
			data-tour="showSection" 
			separator={<NavigateNextIcon fontSize="small" />} 
			aria-label="breadcrumb" 
			className={classes.breadCrumbs}
		>
			{BreadCrumbsRouters.map((route, i) => {
				const lastItem = i === (BreadCrumbsRouters.length - 1);
				if (route === "panel") {
					return (
						<Typography 
							key={i} 
							color={lastItem ? "textPrimary" : "initial"}
						>
						Gedure Panel
					</Typography>);
				}
				
				if (route === "solicitudes-contacto") {
					return (
						<Typography 
							key={i} 
							color={lastItem ? "textPrimary" : "initial"}
						>
						Solicitudes de contacto
					</Typography>);
				}
				
				const RouteName = route[0].toUpperCase() + route.slice(1);
				
				return (
					<Typography 
						key={i} 
						color={lastItem ? "textPrimary" : "initial"}
					>
					{RouteName}
				</Typography>);
			})}
		</Breadcrumbs>
	);
}

export default LocationShow;
