//Inicar valor del state.
const initialState = {
  content: 'home',
  toggleDrawe: false,
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPDATE_PANEL_CONTENT": {
      return ({
        ...state,
        content: payload
      })
    }
    default: {
      return state;
    }
  }
};

// Seleccionar estado del state.
// export const selectTheme = state => state.settings.tema;
