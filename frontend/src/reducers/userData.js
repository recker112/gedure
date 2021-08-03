//Inicar valor del state.
const initialState = {
	auth: false,
	access_key: '',
	user: {
		personal_data: {},
		wallet: {}
	},
	permissions: {}
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_DATA_USER': {
			return {
				...state,
				...payload
			};
		}
			
		case 'UPDATE_WALLET_USER': {
			const { balance } = payload;
			
			return {
				...state,
				user: {
					...state.user,
					wallet: {
						...state.user.wallet,
						balance: balance
					}
				}
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
export default reducer;

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;