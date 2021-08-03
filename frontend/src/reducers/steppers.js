const initialState = {
	verifyPay: {
		active: 0,
		skipped: new Set(),
		loading: false,
		data: {},
	},
	setup: {
		active: 0,
		skipped: new Set(),
		loading: false,
		data: {
			personal_data: {}
		},
	}
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'UPDATE_STEPPER_ACTIVE': {
			const { stepper, active, loading, data } = payload;
			
			let dataSave = state[stepper].data;

			if (data) {
				dataSave = data;
			}
			
			let activeStep = state[stepper].active;
			if (active !== null) {
				activeStep = active;
			}

			return {
				...state,
				[stepper]: {
					...state[stepper],
					active: activeStep,
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