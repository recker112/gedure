//Inicar valor del state.
const initialState = {
	noticiaSelected: {
		loading: true,
		data: {},
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_APPDATA': {
			const { selected, loading, data } = payload;
			
			if (data === 'clear') {
				return {
					...state,
					[selected]: {
						...state[selected],
						loading,
						data: {}
					}
				}
			}
			
			return {
				...state,
				[selected]: {
					loading,
					data: {
						...state[selected].data,
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