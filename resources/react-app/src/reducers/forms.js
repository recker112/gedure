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
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_FORM': {
			const { form, loading, inputs } = payload;
			
			let data;
			
			if (form === 'login') {
				if (inputs) {
					data = inputs;
				}else {
					data = state.login.inputs;
				}
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