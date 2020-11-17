//Inicar valor del state.
const initialState = {
	auth: false,
	access_key: '',
	user: {},
	permissions: {}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_DATA_USER': {
			return {
				...state,
				...payload
			};
		}
			
		case 'AUTH_UPDATE': {
			return {
				...state,
				auth: payload
			};
		}
			
		case 'LOGOUT': {
			sessionStorage.removeItem('access_key');
			localStorage.removeItem('access_key');
			
			return {
				...initialState
			};
		}
			
		default: {
			return state;
		}
	}
};

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;