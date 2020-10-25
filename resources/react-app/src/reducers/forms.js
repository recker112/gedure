//Inicar valor del state.
const initialState = {
	login: {
		loading: false
	},
	registros: {
		loading: false,
		inputs: {
			radioSelect: 'all',
		},
	},
	usuarios: {
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
	
		case 'UPDATE_FORM_DATA': {
			const { form, loading, data } = payload;
			
			let dataSave;
			
			if (data) {
				dataSave = data;
			}else {
				dataSave = state[form].data;
			}
			
			return {
				...state,
				[form]: {
					loading,
					data: dataSave
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