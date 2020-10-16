//Inicar valor del state.
const initialState = {
	confirmAction: {
		open: false,
		loading: false,
		data: {},
	},
	verUser: {
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
							...initialState[dialog].data,
						},
					},
				};
			}

			//NOTE (RECKER): No hacer nada
			/* Esto se pone para que al la data venir como null no realize ningún cambio en el estado */
			if (data === null) {
				return {
					...state,
					[dialog]: {
						open,
						loading,
						data: {
							...state[dialog].data,
						},
					},
				};
			}

			//NOTE (RECKER): Fix useSelector
			/* Debido a que la referencia del objeto no cambia, es necesario refrescarla de esa manera, así se pueden refrescar los datos */

			return {
				...state,
				[dialog]: {
					open,
					loading,
					data: {
						...state[dialog].data,
						...data,
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