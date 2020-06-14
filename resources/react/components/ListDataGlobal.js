export const CursosList = [
	{
		value: '1G',
		name: '1 grado'
	},
	{
		value: '2G',
		name: '2 grado'
	},
	{
		value: '3G',
		name: '3 grado'
	},
	{
		value: '4G',
		name: '4 grado'
	},
	{
		value: '5G',
		name: '5 grado'
	},
	{
		value: '6G',
		name: '6 grado'
	},
	{
		value: '1',
		name: '1 año'
	},
	{
		value: '2',
		name: '2 año'
	},
	{
		value: '3',
		name: '3 año'
	},
	{
		value: '4',
		name: '4 año'
	},
	{
		value: '5',
		name: '5 año'
	},
	{
		value: '6',
		name: '6 año'
	}
];

export const SeccionList = [
	{
		value: 'A',
		name: 'A'
	},
	{
		value: 'B',
		name: 'B'
	},
	{
		value: 'C',
		name: 'C'
	},
	{
		value: 'U',
		name: 'U'
	}
];

//InfoContent Panel
export const InfoContentShowPanel = [
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