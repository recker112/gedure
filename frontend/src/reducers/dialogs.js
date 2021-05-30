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
	deleteConfirmation: {
		open: false,
		loading: false,
		data: {},
	},
	updateSeccion: {
		open: false,
		loading: false,
		data: {},
	},
	uploadBoletas: {
		open: false,
		loading: false,
		data: {},
	},
	replaceBoleta: {
		open: false,
		loading: false,
		data: {},
	},
	showSoliContact: {
		open: false,
		loading: false,
		data: {},
	},
	crearLoteDeuda: {
		open: false,
		loading: false,
		data: {},
	},
	editLoteDeuda: {
		open: false,
		loading: false,
		data: {},
	},
	editBankAccount: {
		open: false,
		loading: false,
		data: {}
	},
	assignBankTransaction: {
		open: false,
		loading: false,
		data: {}
	},
	deleteBankTransaction: {
		open: false,
		loading: false,
		data: {}
	},
	editWallet: {
		open: false,
		loading: false,
		data: {}
	},
};

const reducer =  (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_DIALOGS_DATA': {
			const { dialog, open, loading, data } = payload;
			
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
					data: dataSave,
				},
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