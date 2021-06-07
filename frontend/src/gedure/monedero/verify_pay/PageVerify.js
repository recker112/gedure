import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import {
	Grid,
	Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Aside from '../../../components/steppers/Aside';
import Form from './Form';

// Redux
import { useDispatch } from 'react-redux';
import updateSteppersActive from '../../../actions/updateSteppersActive';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		display: 'flex',
	},
	aside: {
		backgroundColor: theme.palette.primary.main + 'c7',
		width: '100%',
	},
}));

const steps = [
	'Pagos pendientes',
	'Seleccionar cuenta', 
	'Datos de la transferencia',
];

export default function PageVerify() {
	document.title = 'La Candelaria - Verificar pago';
	
	const classes = useStyles();
	
	const history = useHistory();
	
	const dispatch = useDispatch();
	
	const handleReturn = () => {
		history.push('/gedure/monedero');
	}
	
	useEffect(() => {
		return () => {
			dispatch(updateSteppersActive('verifyPay', 0, false, {}));
		}
		// eslint-disable-next-line
	}, []);
	
	return (
		<main className={classes.containerMain}>
			<Grid container>
				<Slide direction="right" in={true} mountOnEnter unmountOnExit>
					<Grid container direction='column' justify='space-between' className={classes.aside} item sm={12} md={4}>
						<Aside 
							steps={steps}
							title='Verificar Pagos'
							handleReturn={handleReturn}
							stepperSelect='verifyPay'
						/>
					</Grid>
				</Slide>
				
				<Slide direction="left" in={true} mountOnEnter unmountOnExit>
					<Grid container direction='column' justify='space-between' item sm={12} md={8}>
						<Form
							steps={steps}
							stepperSelect='verifyPay'
						/>
					</Grid>
				</Slide>
			</Grid>
		</main>
	);
}