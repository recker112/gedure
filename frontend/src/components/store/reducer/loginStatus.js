//Inicar valor del state.
const initialState = {
  auth: false,
  loginSI: false,
  validating: false,
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_VALIDATING_FORM': {
      return {
        ...state,
        validating: payload.validating,
      }
    }
    case 'UPDATE_AUTH': {
      return {
        ...state,
        auth: payload,
      }
    }
    case 'LOGIN_SINCE_INDEX': {
      return {
        ...state,
        loginSI: payload
      }
    }
    default: {
      return state;
    }
  }
};

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;
