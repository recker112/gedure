const initialState = {
	verifyPay: {
		active: 0,
		skipped: new Set(),
		loading: false,
		data: {},
	}
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_STEPPER_ACTIVE': {
			const { stepper, active, loading, data } = payload;
			
			let dataSave;

			if (data) {
				dataSave = data;
			} else {
				dataSave = state[stepper].data;
			}

			return {
				...state,
				[stepper]: {
					...state[stepper],
					active,
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