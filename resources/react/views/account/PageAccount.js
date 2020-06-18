import React from 'react';

//Componentes
import ChangeAvatar from './ChangeAvatar';
import ChangePassword from './ChangePassword';

//Material-UI
import { Paper, Grid } from '@material-ui/core';

export default function PageAccount() {
	//Titulo
	document.title = 'La Candelaria - Account';
	
	return (
		<main class='Container'>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} md={6}>
					<Paper className='Box'>
						<span className='Box__Title Box__Title--NoBorder'>
							Cambiar Avatar
						</span>
						<div className='Box__Content'>
							<ChangeAvatar />
						</div>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<Paper className='Box'>
						<span className='Box__Title Box__Title--NoBorder'>
							Cambiar Contraseña
						</span>
						<div className='Box__Content'>
							<ChangePassword />
						</div>
					</Paper>
				</Grid>
			</Grid>
		</main>
	);
}