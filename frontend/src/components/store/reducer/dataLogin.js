//Inicar valor del state.
const initialState = {
  user: '',
  pass: '',
  checkbox: false,
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPDATE_INPUT_VALUE": {
      //Obtener input
      const e = payload.input;

      //Obtener valores del input
      const name = e.target.name;
      const value = name === 'checkbox' ? e.target.checked : e.target.value;

      //Regresar state.
      return {
        ...state,
        [name]: value,
      };
    }
    default: {
      return state;
    }
  }
};

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;
