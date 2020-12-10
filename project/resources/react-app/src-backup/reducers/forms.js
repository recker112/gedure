//Inicar valor del state.
const initialState = {
	contacto: {
		loading: false,
		status: null,
		data: {},
	},
	noticia: {
		loading: true,
		status: null,
		data: {},
	},
	login: {
		loading: false,
		status: null,
		data: {},
	},
	recuperar: {
		loading: false,
		status: null,
		data: {},
	},
	registros: {
		loading: false,
		status: null,
		data: {
			type: 'all'
		},
	},
	registerUser: {
		loading: false,
		status: null,
		data: {},
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_FORM_DATA': {
			const { form, loading, data, status } = payload;
			
			let dataSave;

			if (data) {
				dataSave = data;
			} else {
				dataSave = state[form].data;
			}

			return {
				...state,
				[form]: {
					...state[form],
					loading,
					status,
					data: dataSave,
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