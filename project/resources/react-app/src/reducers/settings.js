//Verificar si ya existe el almacenamiento local de la variable
//theme para evitar reescribirla
if (!localStorage.getItem('theme')) {
	localStorage.setItem('theme', 'light');
}

if (!localStorage.getItem('tour-index-v1')) {
	localStorage.setItem('tour-index-v1', JSON.stringify(true));
}

if (!localStorage.getItem('tour-registros-v1')) {
	localStorage.setItem('tour-registros-v1', JSON.stringify(true));
}

if (!localStorage.getItem('tour-noticias-v1')) {
	localStorage.setItem('tour-noticias-v1', JSON.stringify(true));
}

if (!localStorage.getItem('tour-solicitudContacto-v1')) {
	localStorage.setItem('tour-solicitudContacto-v1', JSON.stringify(true));
}

//Inicar valor del state.
const initialState = {
	tema: localStorage.getItem('theme'),
	drawer: false,
	tour: {
		index: JSON.parse(localStorage.getItem('tour-index-v1')),
		registros: JSON.parse(localStorage.getItem('tour-registros-v1')),
		noticias: JSON.parse(localStorage.getItem('tour-noticias-v1')),
		solicitudContacto: JSON.parse(localStorage.getItem('tour-solicitudContacto-v1')),
	}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_THEME': {
			//Verificar tema actual
			const temaActual = state.tema;

			//Cambiar tema actual
			let changeThemeTo = temaActual === 'light' ? 'dark' : 'light';

			//Aplicar cambio en el almacenamiento local.
			localStorage.setItem('theme', changeThemeTo);

			//Regresar state.
			return {
				...state,
				tema: changeThemeTo
			};
		}
		
		case 'UPDATE_DRAWER': {
			return {
				...state,
				drawer: payload
			};
		}
			
		case 'UPDATE_TOUR': {
			const { open, tour } = payload;
			
			localStorage.setItem(`tour-${tour}-v1`, JSON.stringify(open));
			
			return {
				...state,
				tour: {
					...state.tour,
					[tour]: open,
				}
			};
		}
			
		default: {
			return state;
		}
	}
};

// Seleccionar estado del state.
// export const selectTheme = state => state.settings.tema;