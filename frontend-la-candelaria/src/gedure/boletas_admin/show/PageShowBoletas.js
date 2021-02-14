import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import {
	Container,
	Box,
	CircularProgress,
	Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useFetch from '../../../hooks/useFetch';

// Components
import Boleta from './Boleta';
import DialogConfirmation from '../../../components/DialogConfirmation';
import ReplaceBoleta from './ReplaceBoleta';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDialogs from '../../../actions/updateDialogs';

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

export default function PageShowBoletas() {
	document.title = 'La Candelaria - Boletas';
	const { id } = useParams();
	const [name, setName] = useState('');
	
	const { loading, data, dataDelete } = useSelector((state) => ({
		loading: state.forms.showBoletas.loading,
		data: state.forms.showBoletas.data,
		dataDelete: state.dialogs.deleteConfirmation.data,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const { fetchData } = useFetch();
	
	const getBoletas = async () => {
		dispatch(updateForms('showBoletas', true));

		const prepare = {
			url: `v1/boleta/${id}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);

		if (response) {
			dispatch(updateForms('showBoletas', false, response.boletas));
			setName(response.user.name);
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
	
	const onConfirm = async handleClose => {
		const prepare = {
			url: `v1/boleta/${dataDelete.id}`,
			type: 'delete',
			message404: 'El usuario ya no existe',
		};
		
		const response = await fetchData(prepare);

		dispatch(updateDialogs('deleteConfirmation', false, false));
		
		if (response) {
			getBoletas();
		}
		
		handleClose();
		getBoletas();
	}
	
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
							Boletas subidas de {name}
						</Box>
						<Grid container spacing={2}>
							{data.map((props, key) => (<Boleta key={key} {...props} handleRefresh={getBoletas} />))}
						</Grid>
					</React.Fragment>
				) : null}
				{(!loading && !data.length) && (
					<Box align='center' fontSize='body1.fontSize'>
						No hay boletas cargadas para este estudiante.
					</Box>
				)}
				<DialogConfirmation callback={onConfirm}>
					Estáก a punto de eliminar la boleta <strong>{dataDelete.curso} {dataDelete.seccion} {dataDelete.lapso}° Lapso</strong> de <strong>{name}</strong>. Tenga en cuenta que esta acción no se puede deshacer.
				</DialogConfirmation>
				<ReplaceBoleta handleRefresh={getBoletas} name={name} />
			</Container>
		</main>
	);
}