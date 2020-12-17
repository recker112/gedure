//Inicar valor del state.
const initialState = {
	showRegistros: {
		open: false,
		loading: false,
		data: {},
	},
	crearUser: {
		open: false,
		loading: false,
		data: {},
	},
	uploadMatricula: {
		open: false,
		loading: false,
		data: {},
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_DIALOG_DATA': {
			const { dialog, open, loading, data, status } = payload;
			
			let dataSave;

			if (data) {
				dataSave = data;
			} else {
				dataSave = state[dialog].data;
			}

			return {
				...state,
				[dialog]: {
					...state[dialog],
					open,
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