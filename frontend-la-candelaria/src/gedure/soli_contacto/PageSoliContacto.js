import React, { useRef } from 'react';

import {
	Box,
	Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useFetch from '../../hooks/useFetch';

// Components
import TableContact from './TableContact';
import DialogConfirmation from '../../components/DialogConfirmation';
import ShowSoliContact from './ShowSoliContact';
import TourSoliContacto from './TourSoliContacto';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../actions/updateDialogs';

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

export default function PageSoliContacto() {
	document.title = 'La Candelaria - Solicitudes de contácto';
	const tableRef = useRef(null);
	const { data } = useSelector((state) => ({
		data: state.dialogs.deleteConfirmation.data,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const onConfirm = async handleClose => {
		const prepare = {
			url: `v1/contacto/${data.id}`,
			type: 'delete',
			message404: 'La solicitud ya no existe',
		};
		
		const response = await fetchData(prepare);

		dispatch(updateDialogs('deleteConfirmation', false, false));
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>
					Solicitudes de contácto
				</Box>
				<TableContact tableRef={tableRef} />
				<ShowSoliContact />
				<DialogConfirmation callback={onConfirm}>
					Estáก a punto de eliminar la solicitud "<strong>{data.asunto}</strong>", esta acción no se puede deshacer.
				</DialogConfirmation>
			</Container>
			<TourSoliContacto />
		</main>
	);
}