import React from 'react';

//Componentes
import ShowInfoContent from '../../components/ShowInfoContent';
import { InfoContentShowPanel } from '../../components/ListDataGlobal';

//Material-UI
import { Paper, Grid } from '@material-ui/core';

export default function PageAccount() {
	//Titulo
	document.title = 'La Candelaria - Account';
	
	return (
		<React.Fragment>
			<main class='Container Container--Panel'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Paper className='Box'>
							Hola
						</Paper>
					</Grid>
				</Grid>
			</main>
			<ShowInfoContent 
				dataContent={InfoContentShowPanel}
			/>
		</React.Fragment>
	);
}