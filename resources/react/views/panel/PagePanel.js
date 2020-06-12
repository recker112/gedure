import React from 'react';

//Componentes
import PanelRouters from './PanelRouters';
import ShowInfoContent from '../../components/ShowInfoContent';

//InfoContent
const dataContent = [
	{
		path: '/panel/registros',
		title: 'Registros',
		content:
			'Muestra todos los movimientos realizados en toda la app, desde inicios de sesión hasta movimientos en la matrícula.',
		only: ['A-']
	},
	{
		path: '/panel/modifyUsers',
		title: 'Consultar y Modificar',
		content:
			'Permite modificar a los estudiantes de una sección, y muestra una lista de los estudantes existentes en una sección.',
		only: ['A-']
	},
	{
		path: '/panel/desblockAccount',
		title: 'Desbloquear',
		content:
			'Permite desbloquear una cuenta existente en el sistema.',
		only: ['A-']
	},
	{
		path: '/panel/uploadData',
		title: 'Cargar',
		content: 'Permite cargar boletas o matricula en el servidor, modificando las ya existentes.',
		only: ['A-']
	},
	{
		path: '/panel/userOptions',
		title: 'Opciones',
		content: 'Configurar algunas opciones del estudiante o una sección completa.',
		only: ['A-']
	},
	{
		path: '/panel/filesData',
		title: 'Archivos',
		content: 'Cargar o eliminar los archivos los descargables por el estudiante.',
		only: ['A-']
	},
	{
		path: '/panel/deleteData',
		title: 'Eliminar',
		content: 'Elimina boletas, o secciones del sistema.',
		only: ['A-']
	},
	{
		path: '/panel/toPost',
		title: 'Publicar',
		content: 'Publica un auncio o una noticia nueva.',
		only: ['A-', 'CR-']
	},
	{
		path: '/panel/deletePost',
		title: 'Borrar publicación',
		content: 'Permite eliminar una noticia o anuncio publicado',
		only: ['A-', 'CR-']
	},
	{
		path: '/panel/boletas',
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
			<main>
				<PanelRouters />
			</main>
			<ShowInfoContent 
				dataContent={dataContent}
			/>
		</div>
	);
}