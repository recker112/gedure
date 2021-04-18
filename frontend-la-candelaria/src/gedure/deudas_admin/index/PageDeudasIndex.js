import React, { useRef } from 'react';

import {
	Container,
	Box,
	Grid,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Componets
import TableDeudas from './TableDeudas';
import CrearDeuda from './CrearDeuda';

// Redux
import { useSelector, useDispatch } from 'react-redux';
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

export default function PageDeudasIndex() {
	document.title = 'La Candelaria - Lotes de deudas';
	const tableRef = useRef(null);
	
	const { data, permissions } = useSelector((state) => ({
		data: state.dialogs.deleteConfirmation.data,
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const handleCreate = () => {
		dispatch(updateDialogs('crearLoteDeuda', true, false));
	}
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Lotes de deudas</Box>
				<Grid container spacing={2}>
					<Grid container justify='flex-end' item xs={12}>
						<Button 
							variant='contained' 
							color='primary' 
							onClick={handleCreate}
							disabled={!permissions.administrar?.debt_lote_create}
						>
							Crear lote de deudas
						</Button>
					</Grid>
					<Grid item xs={12}>
						<TableDeudas tableRef={tableRef} />
					</Grid>
					<CrearDeuda tableRef={tableRef} />
				</Grid>
			</Container>
		</main>
	);
}