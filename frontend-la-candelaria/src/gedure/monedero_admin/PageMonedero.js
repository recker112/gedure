import React, { useRef } from 'react';

import { useHistory } from 'react-router-dom';

import { 
	Grid, 
	Container,
	Box,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useFetch from '../../hooks/useFetch';

// Components
import DialogConfirmation from '../../components/DialogConfirmation';

// Redux
import { useSelector } from 'react-redux';

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

export default function PageMonederos() {
	document.title = 'La Candelaria - Monederos';
	const tableRef = useRef(null);
	
	const { data, permissions } = useSelector((state) => ({
		data: state.dialogs.deleteConfirmation.data,
		permissions: state.userData.permissions,
	}));
	
	const { fetchData } = useFetch();
	
	const history = useHistory();
	
	const classes = useStyles();
	
	const handleClick = () => {
		history.push('/gedure/publicaciones/crear');
	}
	
	const onConfirm = async handleClose => {
		const prepare = {
			url: `v1/posts/${data.slug}`,
			type: 'delete',
			message404: 'Esta noticia ya no existe',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
	return (
		<main className={classes.containerMain}>
			<Container>
				<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Monederos</Box>
				<Grid container spacing={2}>
					<Grid container justify='flex-end' item xs={12}>
						<Button 
							onClick={handleClick} 
							variant='contained' 
							color='primary'
							data-tour='admin'
							disabled={!permissions?.administrar?.wallet_admin}
						>
							Administrar monederos
						</Button>
					</Grid>
					<Grid item xs={12}>
						
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}