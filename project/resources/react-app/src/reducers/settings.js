//Verificar si ya existe el almacenamiento local de la variable
//theme para evitar reescribirla
let dataTour = JSON.parse(localStorage.getItem('gd-tour')) || {};

if (!localStorage.getItem('gd-theme')) {
	localStorage.setItem('gd-theme', 'light');
}

if (Object.keys(dataTour).length === 0) {
	dataTour.index_v1 = true;
	dataTour.registros_v1 = true;
	dataTour.usuarios_v1 = true;
	dataTour.ver_usuarios_v1 = true;
	dataTour.publicaciones_v1 = true;
	dataTour.gedure_v1 = true;
	dataTour.boletas_admin_v1 = true;
	dataTour.cuenta_v1 = true;
	dataTour.soli_contacto_v1 = true;
	localStorage.setItem('gd-tour', JSON.stringify(dataTour));
}

//Inicar valor del state.
const initialState = {
	tema: localStorage.getItem('gd-theme'),
	drawer: false,
	steppers: {
		active: 0,
		skipped: new Set(),
	},
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
			
		case 'UPDATE_STEPPER_ACTIVE': {
			return {
				...state,
				steppers: {
					...state.steppers,
					active: payload
				}
			};
		}
	
		case 'UPDATE_STEPPER_SKIPPED': {
			
			return {
				...state,
				steppers: {
					...state.steppers,
					skipped: payload
				}
			};
		}
			
		case 'UPDATE_TOUR': {
			const { open, tour } = payload;
			
			let tours = JSON.parse(localStorage.getItem('gd-tour'));
			tours[`${tour}_v1`] = open;
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
			localStorage.removeItem('gd-tour');
			
			let tours = {};
			for(const key in state.tour) {
				tours[key] = true;
			}
			localStorage.setItem('gd-tour', JSON.stringify(tours));
			
			return {
				...state,
				tour: tours,
			};
		}
			
		default: {
			return state;
		}
	}
};

// Seleccionar estado del state.
// export const selectTheme = state => state.settings.tema;