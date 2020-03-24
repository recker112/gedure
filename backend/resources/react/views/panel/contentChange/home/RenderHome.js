import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { AnnounceBox } from './AnnounceBox';

function RenderHome() {
	const Estados = [
		{
			background: '#4879FC',
			text: 'Estudiantes registrado en el sistema',
			data: 'StudientsTotal'
		},
		{
			background: '#F8C822',
			text: 'Usuarios bloqueados',
			data: 'StudientsBlock'
		},
		{
			background: '#FC4850',
			text: 'Usuarios bloqueados permanentemente',
			data: 'StudientsPermaBlock'
		},
		{
			background: '#b448fc',
			text: 'Noticias publicadas',
			data: 'PublicNotice'
		},
		{
			background: '#39CCCC',
			text: '"Me gusta" recibidos',
			data: 'Likes'
		}
	];
	return (
		<React.Fragment>
			<Grid container spacing={2} justify="center">
				{Estados.map((element, i) => (
					<Grid key={i} item xs={12} sm={6} md={4}>
						<AnnounceBox
							options={{
								background: element.background,
								text: element.text,
								data: element.data
							}}
						/>
					</Grid>
				))}
			</Grid>
			<Grid container spacing={2} className="FixGrid">
				<Grid item xs={12}>
					<Paper variant="outlined" className="Box">
						<span className="title">Bienvenidos</span>
						<div className="content">
							<p>
								Le damos la bienvenida al Panel de Administación, aquí usted prodrá realizar
								acciones como: cargar matricula, ver registros, consultar, modificar, cargar
								archivos, cargar boletas, entre otros. Para más información por favor mantenga el
								mouse encima de la opción que desea saber más información en el menú.
							</p>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default RenderHome;