//Inicar valor del state.
const initialState = {
  cedula: '',
  cedulaSin: '',
  name: '',
  curso: '',
  seccion: '',
  nota: '',
  horario: '',
  profeGuia: '',
  privilegio: '',
  avatar: '',
  token: '',
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_DATA_USER': {
      console.log(payload);
      return {
        ...state,
        ...payload,
      }
    }
    default: {
      return state;
    }
  }
};

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;
