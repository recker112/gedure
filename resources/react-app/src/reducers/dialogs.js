//Inicar valor del state.
const initialState = {
	confirmAction: {
		open: false,
		loading: false,
		data: {},
	},
	editUser: {
		open: false,
		loading: false,
		data: {},
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_DIALOG': {
			const { dialog, open, loading, data } = payload;
			
			if (data === 'clear') {
				return {
					...state,
					[dialog]: {
						open,
						loading,
						data: {
							...initialState[dialog].data
						},
					},
				};
			}
			
			return {
				...state,
				[dialog]: {
					open,
					loading,
					data: {
						...state[dialog].data,
						...data
					},
				},
			};
		}

		default: {
			return state;
		}
	}
};

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;