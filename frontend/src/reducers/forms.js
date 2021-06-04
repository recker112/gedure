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
	invitation: {
		loading: true,
		data: {},
	},
	setup: {
		loading: false,
		data: {
			personal_data: {}
		},
	},
	pageIndex: {
		loading: true,
		data: {},
	},
	registerPassword: {
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
	},
	showUser: {
		loading: true,
		data: {},
	},
	updatePerfil: {
		loading: false,
		data: {},
	},
	updateAvatar: {
		loading: false,
		data: {},
	},
	updatePassword: {
		loading: false,
		data: {},
	},
	updatePermissions: {
		loading: false,
		data: {},
	},
	updatePersonalUser: {
		loading: false,
		data: {},
	},
	updatePersonalStudiend: {
		loading: false,
		data: {},
	},
	updatePersonalStudiendUbi: {
		loading: false,
		data: {},
	},
	updatePersonalStudiendOtros: {
		loading: false,
		data: {},
	},
	updatePersonalMadre: {
		loading: false,
		data: {},
	},
	updatePersonalPadre: {
		loading: false,
		data: {},
	},
	updatePersonalRepre: {
		loading: false,
		data: {},
	},
	updatePersonalRepreUbi: {
		loading: false,
		data: {},
	},
	updatePersonalRepreEmpleo: {
		loading: false,
		data: {},
	},
	updateCurso: {
		loading: false,
		data: {},
	},
	resendEmail: {
		loading: false,
		data: {},
	},
	logoutAll: {
		loading: false,
		data: {},
	},
	boletasIndex: {
		loading: false,
		data: {},
	},
	showBoletas: {
		loading: false,
		data: [],
	},
	crearCurso: {
		loading: false,
		data: {},
	},
	pageShowLoteDeuda: {
		loading: true,
		data: {},
	},
	createBankAccount: {
		loading: false,
		data: {},
	},
	uploadBankTransaction: {
		loading: false,
		data: {},
	},
	showTransaction: {
		loading: true,
		data: {},
	}
};

const reducer = (state = initialState, { type, payload }) => {
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
export default reducer;

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;