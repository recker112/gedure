//Inicar valor del state.
const initialState = {
	sections: {
		password: {
			loading: false,
			passA: '',
			passN: '',
			passR: '',
			error: {
				passA: {
					status: false,
					message: ''
				},
				passN: {
					status: false,
					message: ''
				},
				passR: {
					status: false,
					message: ''
				}
			}
		},
		avatar: {
			loading: false,
			file: []
		}
	}
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
	switch (type) {
		/* CHANGE AVATAR */
		case 'UPDATE_VALUE_ACCOUNT_AVATAR': {
			//Obtener input
			const e = payload;

			//Obtener valores del input
			const name = e.target.name;
			const value = e.target.files;

			return {
				...state,
				sections: {
					...state.sections,
					avatar: {
						...state.sections.avatar,
						[name]: value
					}
				}
			};
		}
		case 'UPDATE_LOADING_ACCOUNT_AVATAR': {
			return {
				...state,
				sections: {
					...state.sections,
					avatar: {
						...state.sections.avatar,
						loading: payload
					}
				}
			};
		}

		/* CHANGE PASSWORD */
		case 'UPDATE_VALUE_ACCOUNT_PASSWORD': {
			//Obtener input
			const e = payload;

			//Obtener valores del input
			const name = e.target.name;
			const value = e.target.value;

			return {
				...state,
				sections: {
					...state.sections,
					password: {
						...state.sections.password,
						[name]: value,
						error: {
							...state.sections.password.error,
							[name]: {
								status: false,
								message: ''
							}
						}
					}
				}
			};
		}
		case 'ERROR_INFO_ACCOUNT_PASSWORD': {
			return {
				...state,
				sections: {
					...state.sections,
					password: {
						...state.sections.password,
						error: {
							...state.sections.password.error,
							[payload.input]: {
								status: true,
								message: payload.message
							}
						}
					}
				}
			};
		}
		case 'UPDATE_LOADING_ACCOUNT_PASSWORD': {
			return {
				...state,
				sections: {
					...state.sections,
					password: {
						...state.sections.password,
						loading: payload
					}
				}
			};
		}

		default: {
			return state;
		}
	}
};

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;