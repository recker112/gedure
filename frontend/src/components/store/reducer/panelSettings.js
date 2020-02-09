//Inicar valor del state.
const initialState = {
  content: 'home',
  toggleDrawer: false,
  modifySection: {
    cedula: '',
    name: '',
    option: 'insert',
    pass: '',
    privilegio: 'V-',
    curso: '',
    seccion: '',
  }
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
    case 'TOGGLE_DRAWER': {
      return ({
        ...state,
        toggleDrawer: !state.toggleDrawer
      })
    }
    case 'UPDATE_INFO_MODIFY': {
      return ({
        ...state,
        modifySection: {
          ...payload,
          pass: 'none',
          option: 'update',
        }
      })
    }
    case 'UPDATE_INFO_INPUT': {
      return ({
        ...state,
        modifySection: {
          ...state.modifySection,
          ...payload,
        }
      })
    }
    default: {
      return state;
    }
  }
};

// Seleccionar estado del state.
// export const selectTheme = state => state.settings.tema;
