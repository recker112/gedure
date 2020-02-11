//Inicar valor del state.
const initialState = {
  dataA: null,
  dataN: null,
  content: 'noticias',
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CHANGE_CONTENT_NEWS': {
      return {
        ...state,
        content: payload,
      }
    }
    case 'UPDATE_NEWS_ANUNCIOS': {
      return {
        ...state,
        dataA: payload
      }
    }
    case 'UPDATE_NEWS_NOTICIAS': {
      return {
        ...state,
        dataN: payload
      }
    }
    default: {
      return state;
    }
  }
};

// Seleccionar estado del state.
// export const selectDataLogin = state => state.dataLogin.tema;
