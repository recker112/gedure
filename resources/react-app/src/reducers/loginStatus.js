//Inicar valor del state.
const initialState = {
	auth: false,
	validating: false,
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_LOADING_LOGIN': {
			return {
				...state,
				validating: payload
			};
		}
    case 'AUTH_UPDATE': {
			return {
				...state,
				auth: payload
			};
		}
		case 'LOGOUT': {
			return {
				auth: false,
				loginSI: false,
				validating: false
			};
		}
		default: {
			return state;
		}
	}
};

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;
