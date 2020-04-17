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
			'Muestra todos los movimientos realizados en toda la app, desde inicios de sesión hasta movimientos en la matrícula.',
		only: ['A-']
	},
	{
		id: 'modify',
		title: 'Consultar y Modificar',
		content:
			'Permite modificar a los estudiantes de una sección, y muestra una lista de los estudantes existentes en una sección.',
		only: ['A-']
	},
	{
		id: 'upload',
		title: 'Cargar',
		content: 'Permite cargar boletas o matricula en el servidor, modificando las ya existentes.',
		only: ['A-']
	},
	{
		id: 'userOptions',
		title: 'Opciones',
		content: 'Configurar algunas opciones del estudiante o una sección completa.',
		only: ['A-']
	},
	{
		id: 'files',
		title: 'Archivos',
		content: 'Cargar o eliminar los archivos los descargables por el estudiante.',
		only: ['A-']
	},
	{
		id: 'delete',
		title: 'Eliminar',
		content: 'Elimina boletas, o secciones del sistema.',
		only: ['A-']
	},
	{
		id: 'posting',
		title: 'Publicar',
		content: 'Publica un auncio o una noticia nueva.',
		only: ['A-', 'CR-']
	},
	{
		id: 'delPosting',
		title: 'Borrar publicación',
		content: 'Permite eliminar una noticia o anuncio publicado',
		only: ['A-', 'CR-']
	},
	{
		id: 'boleta',
		title: 'Boleta',
		content: 'Permite descargar la boleta del estudiante solamente si ya se encuentra cargada en el sistema previamente',
		only: ['V-']
	}
];

export default function RenderPanel({ content }) {
	//Titulo
	document.title = 'La Candelaria - Panel';
	
	return (
		<div className="BoxPagePanel">
			<RenderContent content={content} />
			<ShowInfoContent 
				dataContent={dataContent}
				queryParams={'show'}
				defaultPath="home"
			/>
		</div>
	);
}