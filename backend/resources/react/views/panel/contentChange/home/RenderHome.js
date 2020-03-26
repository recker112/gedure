import React, { useEffect, useState } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { AnnounceBox } from './AnnounceBox';

function RenderHome() {
	//Register mantiene la cantidad total a mostrar
	const [query, setQuery] = useState({
		StudientsTotal: '-',
		StudientsBlock: '-',
		StudientsPermaBlock: '-',
		PublicNotice: '-',
		PublicAnnounce: '-'
	});
	
	//Variable para verificar solo la primera vez.
	const [first, setFirst] = useState(false);

	//Pedir datos
	useEffect(
		() => {
			let cancel = false;

			//FetchData
			const fetchData = async () => {
				try {
					const res = await axios.get(`api/infobox/announcebox?show=all`);

					const { data } = res;

					//Error
					if (data.status === 'error') {
						throw new Error(data.msg);
					}

					//Verificar si está desmontado el componente
					if (!cancel) {
						setQuery(data.query);
					}
				} catch (error) {
					console.log(error);
				}
			};

			//Realizar consulta
			if (!first) {
				fetchData();
			}

			//Al desmontar
			return () => {
				cancel = true;
				setQuery({
					StudientsTotal: '-',
					StudientsBlock: '-',
					StudientsPermaBlock: '-',
					PublicNotice: '-',
					PublicAnnounce: '-'
				});
			};
		},
		[first]
	);

	//Lista
	const Estados = [
		{
			background: '#4879FC',
			text: 'Estudiantes registrado en el sistema',
			data: query.StudientsTotal
		},
		{
			background: '#F8C822',
			text: 'Estudiantes bloqueados',
			data: query.StudientsBlock
		},
		{
			background: '#FC4850',
			text: 'Estudiantes bloqueados permanentemente',
			data: query.StudientsTotal
		},
		{
			background: '#b448fc',
			text: 'Noticias publicadas',
			data: query.PublicNotice
		},
		{
			background: '#b448fc',
			text: 'Anuncios publicados',
			data: query.PublicAnnounce
		}
		// {
		// 	background: '#39CCCC',
		// 	text: '"Me gusta" recibidos',
		// 	data: 'Likes'
		// }
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