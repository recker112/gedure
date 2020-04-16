import React, { useEffect, useState } from 'react';

//Material-UI
import { Paper, Grid } from '@material-ui/core';

//Componentes
import { AnnounceBox } from './AnnounceBox';
import ConverterCursoCode from '../../../../components/reutilizar/ConverterCursoCode';

//SnackBar
import { useSnackbar } from 'notistack';

//Redux
import { connect } from 'react-redux';

function RenderHome({ data }) {
	const { privilegio } = data;
	
	const textIntroAdmin = (
		<p>
			Le damos la bienvenida al Panel de Administación, aquí usted prodrá realizar acciones como: Cargar matricula, ver registros, consultar, modificar, cargar archivos, cargar boletas, entre otros. Para más información por favor vaya a la opción deseada.
		</p>
	);
	
	const textIntroCreador = (
		<p>
		Le damos la bienvenida al Panel de Administación, aquí usted prodrá realizar acciones como: Publicar y borrar publicaciones propias. Para más información por favor vaya a la opción deseada.
		</p>
	);
	
	const textIntroEstudante = (
		<p>
		Le damos la bienvenida al Panel de Administación, aquí usted prodrá realizar acciones como: Ver boletas. Para más información por favor vaya a la opción deseada.
		</p>
	);

	return (
		<React.Fragment>
			{privilegio !== 'V-' && <RenderAnnounceBox privilegio={privilegio} />}
			<Grid container spacing={2} className="FixGrid">
				<Grid item xs={12}>
					<Paper variant="outlined" className="Box">
						<span className="title">Bienvenidos</span>
						<div className="content">
							{privilegio === 'A-' && textIntroAdmin}
							{privilegio === 'CR-' && textIntroCreador}
							{privilegio === 'V-' && textIntroEstudante}
						</div>
					</Paper>
				</Grid>
				{privilegio === 'V-' && <RenderInfoStudiend data={data} />}
			</Grid>
		</React.Fragment>
	);
}

function RenderAnnounceBox({ privilegio }) {
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	//Query mantiene la cantidad total a mostrar
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
			let cancel;
			let CancelAxios = axios.CancelToken;

			//FetchData
			const fetchData = async () => {
				try {
					const res = await axios.get('api/infobox/announcebox?show=all', {
						cancelToken: new CancelAxios(c => {
							cancel = c;
						})
					});

					//Actualizar datos
					setQuery(res.data);
				} catch (error) {
					if (axios.isCancel(error)) {
						//Mensaje al cancelar peticion
					} else {
						if (error.response) {
							//Errores HTTP
							const { status, data } = error.response;

							if (status === 400) {
								enqueueSnackbar(data.description, {
									variant: 'warning'
								});
							} else if (status === 403) {
								enqueueSnackbar(data.description, {
									variant: 'error'
								});
							} else {
								enqueueSnackbar('Error al pedir los infobox al servidor', {
									variant: 'error'
								});
							}
						} else {
							//Error interno
						}
					}
				}
			};

			//Realizar consulta solo en la primera carga
			if (!first) {
				fetchData();
			}

			//Al desmontar
			return () => {
				//Ejectuar axios CANCEL SI la peticion fue cancelada
				if (cancel) {
					cancel();
				}

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

	//Listas
	const listAdmin = [
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
			data: query.StudientsPermaBlock
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

	const listCreadores = [
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
		<Grid container spacing={2} justify="center">
			{privilegio === 'A-' &&
				listAdmin.map((element, i) => (
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
			{privilegio === 'CR-' &&
				listCreadores.map((element, i) => (
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
	);
}

function RenderInfoStudiend ({ data }) {
	const { 
		privilegio,
		cedula,
		name,
		curso,
		seccion,
		lista,
		profeGuia
	} = data;
	
	return (
		<Grid item xs={12}>
			<Paper variant="outlined" className="Box">
				<span className="title">Datos del estudiante</span>
				<div className="content">
					<p>
						Cedula: {privilegio + cedula}
						<br/>
						Nombre: {name}
						<br/>
						Curso: {ConverterCursoCode(curso+seccion) + ' ' + seccion}
						<br/>
						Número de lista: {lista}
						<br/>
						Profesor Guia: {profeGuia === null ? 'No asignado' : profeGuia}
					</p>
				</div>
			</Paper>
		</Grid>
	)
}

//Redux
const mapStateToProps = state => ({
	data: state.userData
});

export default connect(mapStateToProps)(RenderHome);