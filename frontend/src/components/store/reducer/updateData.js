const initialState = {
  tema: "light"
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPDATE_THEME": {
      return {
        ...state,
        tema: payload
      };
    }
    default: {
      return state;
    }
  }
};

// Seleccionar estado del state.
// export const selectTheme = state => state.tema;
