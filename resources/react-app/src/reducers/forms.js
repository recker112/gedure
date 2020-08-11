//Inicar valor del state.
const initialState = {
	login: {
		loading: false,
		inputs: {
			user: '',
			password: '',
			checkbox: true,
		},
	},
	registros: {
		loading: false,
		inputs: {
			radioSelect: 'all',
		},
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_FORM': {
			const { form, loading, inputs } = payload;
			
			let data;
			
			if (inputs) {
				data = inputs;
			}else {
				data = state[form].inputs;
			}
			
			return {
				...state,
				[form]: {
					loading,
					inputs: {
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