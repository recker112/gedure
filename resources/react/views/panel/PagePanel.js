import React from 'react';

//Componentes
import RenderContent from './RenderContent';
import ShowInfoContent from '../../components/ShowInfoContent';

//InfoContent
const dataContent = [
	{
		id: 'reg',
		title: 'Registros',
		content:
			'Muestra todos los movimientos realizados en toda la app, desde inicios de sesión hasta movimientos en la matrícula.'
	},
	{
		id: 'modify',
		title: 'Consultar y Modificar',
		content:
			'Permite modificar a los estudiantes de una sección, y muestra una lista de los estudantes existentes en una sección.'
	},
	{
		id: 'upload',
		title: 'Cargar',
		content: 'Permite cargar boletas o matricula en el servidor, modificando las ya existentes.'
	},
	{
		id: 'userOptions',
		title: 'Opciones',
		content: 'Configurar algunas opciones del estudiante o una sección completa.'
	},
	{
		id: 'files',
		title: 'Archivos',
		content: 'Cargar o eliminar los archivos los descargables por el estudiante.'
	},
	{
		id: 'delete',
		title: 'Eliminar',
		content: 'Elimina boletas, o secciones del sistema.'
	},
	{
		id: 'posting',
		title: 'Publicar',
		content: 'Publica un auncio o una noticia nueva.'
	},
	{
		id: 'delPosting',
		title: 'Borrar publicación',
		content: 'Permite eliminar una noticia o anuncio publicado'
	},
	{
		id: 'boleta',
		title: 'Boleta',
		content: 'Permite descargar la boleta del estudiante solamente si ya se encuentra cargada en el sistema previamente'
	}
];

export default function RenderPanel({ content }) {
	//Titulo
	document.title = 'La Candelaria - Panel';
	
	return (
		<div className="BoxPagePanel">
			<RenderContent content={content} />
			<ShowInfoContent dataContent={dataContent} 
				noShowInfo={['home']} 
				queryParams={'show'}
				defaultPath={'home'}
			/>
		</div>
	);
}