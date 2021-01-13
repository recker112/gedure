//Inicar valor del state.
const initialState = {
	contacto: {
		loading: false,
		data: {},
	},
	noticia: {
		loading: true,
		data: {},
	},
	solicitudCupo: {
		loading: false,
		data: {},
	},
	login: {
		loading: false,
		data: {},
	},
	recuperar: {
		loading: false,
		data: {},
	},
	registros: {
		loading: false,
	},
	usersIndex: {
		loading: false,
		data: {},
	},
	crearUser: {
		loading: false,
		data: {},
	},
	crearPost: {
		loading: false,
		data: {},
	},
	editPost: {
		loading: false,
		data: {},
	}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_FORM_DATA': {
			const { form, loading, data } = payload;
			
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
					data: dataSave,
				},
			};
		}
		
		case 'LOGOUT': {
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