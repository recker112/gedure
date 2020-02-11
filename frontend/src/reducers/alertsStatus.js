//Inicar valor del state.
const initialState = {
  open: false,
  severity: 'success',
  text: '',
  timeOut: false,
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "OPEN_ALERT": {
      return {
        ...state,
        ...payload,
      }
    }
    case 'CLOSE_ALERT': {
      return {
        ...state,
        open: false,
        timeOut: false,
      }
    }
    default: {
      return state;
    }
  }
};

// Seleccionar estado del state.
// export const selectTheme = state => state.alertStatus.tema;
