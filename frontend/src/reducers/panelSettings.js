//Inicar valor del state.
const initialState = {
	content: 'home',
	infoDialog: false,
	toggleDrawer: false,
	modifySection: {
		cedula: '',
		name: '',
		option: 'insert',
		pass: '',
		privilegio: 'V-',
		curso: '',
		seccion: '',
		loading: false,
	}
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_PANEL_CONTENT': {
			const noInfo = ['home', 'news'];
			let found = false;
			const storage = JSON.parse(localStorage.getItem('noListStorage'));

			//Verificar listas
			noInfo.map(content => {
				if (payload === content && !found) {
					found = true;
				}
				return null;
			});

			if (storage !== null) {
				storage.map(content => {
					if (payload === content && !found) {
						found = true;
					}
					return null;
				});
			}

			const open = found ? false : true;

			return {
				...state,
				content: payload,
				infoDialog: open
			};
		}
		case 'UPDATE_INFO_DIALOG': {
			return {
				...state,
				infoDialog: !state.infoDialog
			};
		}
		case 'TOGGLE_DRAWER': {
			return {
				...state,
				toggleDrawer: !state.toggleDrawer
			};
		}
		case 'UPDATE_INFO_MODIFY': {
			return {
				...state,
				modifySection: {
					...payload,
					pass: 'none',
					option: 'update'
				}
			};
		}
		case 'UPDATE_INFO_INPUT': {
			return {
				...state,
				modifySection: {
					...state.modifySection,
					...payload
				}
			};
		}
		case 'UPDATE_MODIFY_LOADING': {
			return {
				...state,
				modifySection: {
					...state.modifySection,
					loading: !state.modifySection.loading
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