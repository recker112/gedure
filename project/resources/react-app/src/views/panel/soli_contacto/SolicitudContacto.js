import React from 'react';

import { 
	Container,
	Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable from 'material-table';

// Components
import ShowLocation from '../../../components/ShowLocation';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		marginBottom: theme.spacing(6),
		[theme.breakpoints.up('xs')]: {
			marginTop: '48px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(8),
		},
	},
}));

function SolicitudContacto() {
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain} ref={()=>{
			document.title = 'La Candelaria - Solicitudes de contacto';
		}}>
			<Container maxWidth='md' className='container--margin'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ShowLocation />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<MaterialTable 
						columns={[
							{ title: 'Asunto', field: 'asunto' },
							{ title: 'Nombre', field: 'nombre' },
							{ title: 'Correo', field: 'email'},
							{ title: 'Fecha de creación', field: 'created_at' },
						]}
					/>
				</Grid>
			</Container>
		</main>
	);
}

export default SolicitudContacto;