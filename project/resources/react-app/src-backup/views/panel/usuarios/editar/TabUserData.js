import React from 'react';

import { 
	Grid,
	Button,
	Paper,
} from '@material-ui/core';

/*
- Datos principales (Usuario, Nombre)
- Avatar
- Curso
- Permisos

*/

function TabUserData() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Paper className='paper--padding'>
					Datos principales
				</Paper>
			</Grid>
			
			<Grid item xs={12}>
				<Paper className='paper--padding'>
					Avatar
				</Paper>
			</Grid>
			
			<Grid item xs={12}>
				<Paper className='paper--padding'>
					Curso
				</Paper>
			</Grid>
			
			<Grid item xs={12}>
				<Paper className='paper--padding'>
					Permisos
				</Paper>
			</Grid>
		</Grid>
	);
}

export default TabUserData;