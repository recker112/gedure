import React, { useEffect } from 'react';

import {
	Container,
	Box,
	CircularProgress,
	Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useFetch from '../../hooks/useFetch';

// Components
import Boleta from './Boleta';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(5),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
}));

export default function PageBoletas() {
	document.title = 'La Candelaria - Boletas';
	
	const { loading, data } = useSelector((state) => ({
		loading: state.forms.showBoletas.loading,
		data: state.forms.showBoletas.data,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const { fetchData } = useFetch();
	
	const getBoletas = async () => {
		dispatch(updateForms('showBoletas', true));

		const prepare = {
			url: 'v1/boletas',
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);

		if (response) {
			dispatch(updateForms('showBoletas', false, response));
		}else {
			dispatch(updateForms('showBoletas', false, []));
		}
	}
	
	useEffect(() => {
		getBoletas();
		
		return () => {
			dispatch(updateForms('showBoletas', false, []));
		}
		
		// eslint-disable-next-line
	},[]);
	
	return (
		<main className={classes.containerMain}>
			<Container>
				{loading && (
					<Box align='center'>
						<CircularProgress />
					</Box>
				)}
				{(!loading && data.length) ? (
					<React.Fragment>
						<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>
							Boletas
						</Box>
						<Grid container spacing={2}>
							{data.map((props, key) => (<Boleta key={key} {...props} />))}
						</Grid>
					</React.Fragment>
				) : null}
				{(!loading && !data.length) && (
					<Box align='center' fontSize='body1.fontSize'>
						No tiene boletas subidas por los momentos.
					</Box>
				)}
			</Container>
		</main>
	);
}