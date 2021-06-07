//Verificar si ya existe el almacenamiento local de la variable
//theme para evitar reescribirla
if (!localStorage.getItem('gd-theme')) {
	localStorage.setItem('gd-theme', 'light');
}

if (!localStorage.getItem('gd-tour')) {
	localStorage.setItem('gd-tour', JSON.stringify({}));
}

//Inicar valor del state.
const initialState = {
	tema: localStorage.getItem('gd-theme'),
	drawer: false,
	tour: {
		index: JSON.parse(localStorage.getItem('gd-tour')).index_v1,
		registros: JSON.parse(localStorage.getItem('gd-tour')).registros_v1,
		usuarios: JSON.parse(localStorage.getItem('gd-tour')).usuarios_v1,
		ver_usuarios: JSON.parse(localStorage.getItem('gd-tour')).ver_usuarios_v1,
		publicaciones: JSON.parse(localStorage.getItem('gd-tour')).publicaciones_v1,
		boletas_admin: JSON.parse(localStorage.getItem('gd-tour')).boletas_admin_v1,
		gedure: JSON.parse(localStorage.getItem('gd-tour')).gedure_v1,
		cuenta: JSON.parse(localStorage.getItem('gd-tour')).cuenta_v1,
		soli_contacto: JSON.parse(localStorage.getItem('gd-tour')).soli_contacto_v1,
		monedero: JSON.parse(localStorage.getItem('gd-tour')).monedero_v1,
	}
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_THEME': {
			//Verificar tema actual
			const temaActual = state.tema;

			//Cambiar tema actual
			let changeThemeTo = temaActual === 'light' ? 'dark' : 'light';

			//Aplicar cambio en el almacenamiento local.
			localStorage.setItem('gd-theme', changeThemeTo);

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
			const { open, tour, version } = payload;
			const selected = `${tour}_${version}`;
			
			let tours = JSON.parse(localStorage.getItem('gd-tour'));
			tours[selected] = open;
			localStorage.setItem('gd-tour', JSON.stringify(tours));
			
			return {
				...state,
				tour: {
					...state.tour,
					[tour]: open,
				}
			};
		}
		
		case 'RESET_TOURS': {
			localStorage.setItem('gd-tour', JSON.stringify({}));
			
			let tours = state.tour;
			let resetTours = {};
			
			for(const key in tours) {
				resetTours[key] = false;
			}
			
			return {
				...state,
				tour: {
					...resetTours,
				},
			};
		}
			
		default: {
			return state;
		}
	}
};
export default reducer;

// Seleccionar estado del state.
// export const selectTheme = state => state.settings.tema;