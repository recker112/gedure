import clearAllData from '../components/reutilizar/clearAllData';

//Inicar valor del state.
const initialState = {
	cedula: '',
	name: '',
	curso: '',
	seccion: '',
	nota: '',
	horario: '',
	profeGuia: '',
	privilegio: '',
	avatar: '',
	access_key: ''
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_DATA_USER': {
			return {
				...state,
				...payload
			};
		}
		case 'LOGOUT': {
			clearAllData();
			return {
				...initialState
			}
		}
		default: {
			return state;
		}
	}
};

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;