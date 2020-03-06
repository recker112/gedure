//Inicar valor del state.
const initialState = {
  content: 'home',
  infoDialog: false,
  drawer: {
    open: false,
    index: 0
  },
  modifySection: {
    cedula: '',
    name: '',
    option: 'insert',
    pass: '',
    privilegio: 'V-',
    curso: '',
    seccion: '',
    loading: false,
    error: {
      cedula: {
        status: false,
        message: "",
      },
      name: {
        status: false,
        message: "",
      },
      pass: {
        status: false,
        message: "",
      },
      seccion: {
        status: false,
        message: "",
      },
      curso: {
        status: false,
        message: "",
      }
    }
  },
  uploadSection: {
    uploadOption: 'matricula',
    curso: '',
    seccion: '',
    files: [],
    loading: false,
    error: {
      seccion: {
        status: false,
        message: "",
      },
      curso: {
        status: false,
        message: "",
      }
    }
  },
  optionsSection: {
    option: 'estudiante',
    nota: true,
    horario: true,
    cedula: '',
    seccion: '',
    curso: '',
    error: {
      cedula: {
        status: false,
        message: ''
      },
      seccion: {
        status: false,
        message: ''
      },
      curso: {
        status: false,
        message: ''
      }
    }
  }
};

// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default (state = initialState, { type, payload }) => {
  switch (type) {
    //PANEL OPTIONS
    case 'UPDATE_PANEL_CONTENT': {
      const noInfo = ['home', 'news'];
      let found = false;
      const storage = JSON.parse(localStorage.getItem('noListStorage'));

      //Verificar listas
      noInfo.map(content => {
        if (payload === content && !found) {
          found = true;
        }
        return null;
      });

      if (storage !== null) {
        storage.map(content => {
          if (payload === content && !found) {
            found = true;
          }
          return null;
        });
      }

      const open = found ? false : true;

      return {
        ...state,
        content: payload,
        infoDialog: open
      };
    }
    case 'UPDATE_INFO_DIALOG': {
      return {
        ...state,
        infoDialog: !state.infoDialog
      };
    }
    case 'TOGGLE_DRAWER': {
      return {
        ...state,
        drawer: {
          ...state.drawer,
          open: payload
        }
      };
    }
    case 'UPDATE_INDEX_DRAWER': {
      return {
        ...state,
        drawer: {
          ...state.drawer,
          index: payload
        }
      };
    }

    //MODIFY
    case 'UPDATE_INPUT_VALUE_MODIFY_EXTERNO': {
      //Obtener ser
      const user = payload.input;

      //Verificar si es un estudiante
      if (typeof payload.curso === 'undefined'){
        user.curso = '1';
        user.seccion = 'A';
      }

      //Eliminar combiCedula
      if (typeof user.combiCedula !== 'undefined') {
        delete user.combiCedula;
      }

      return {
        ...state,
        modifySection: {
          ...state.modifySection,
          ...user,
          pass: 'none',
          option: 'update',
          error: {
            ...initialState.modifySection.error
          }
        }
      };
    }
    case 'UPDATE_INPUT_VALUE_MODIFY': {
      //Obtener input
      const e = payload.input;

      //Obtener valores del input
      const name = e.target.name;
      const value = e.target.value;
      return {
        ...state,
        modifySection: {
          ...state.modifySection,
          [name]: value,
          error: {
            ...state.modifySection.error,
            [name]: {
              status: false,
              message: '',
            }
          }
        }
      };
    }
    case 'UPDATE_LOADING_MODIFY': {
      return {
        ...state,
        modifySection: {
          ...state.modifySection,
          loading: payload
        }
      };
    }
    case 'ERROR_INFO_MODIFY': {
      return {
        ...state,
        modifySection: {
          ...state.modifySection,
          error: {
            ...state.modifySection.error,
            [payload.input]: {
              status: true,
              message: payload.message
            }
          }
        }
      };
    }
    case 'VERIFY_EMPTY': {
      if (payload.name === "privilegio") {
        let curso = '';
        let seccion = '';
        //Verificación de privilegio
        if (payload.value !== "V-") {
          curso = '1';
          seccion = 'A';
        }

        return {
          ...state,
          modifySection: {
            ...state.modifySection,
            curso: curso,
            seccion: seccion,
            error: {
              ...state.modifySection.error,
              seccion: {
                status: false,
                message: "",
              },
              curso: {
                status: false,
                message: "",
              }
            }
          }
        };
      }

      //Verificar acción
      if(payload.name === 'option') {
        let pass = '';
        let name = '';

        if (payload.value === 'update') {
          pass = 'none';
        }else if (payload.value === 'delete'){
          pass = 'none';
          name = 'none';
        }

        return {
          ...state,
          modifySection: {
            ...state.modifySection,
            name: name,
            pass: pass,
            error: {
              ...state.modifySection.error,
              name: {
                status: name === 'none' ? false : state.modifySection.error.name.status,
                message: state.modifySection.error.name.message !== '' ?  state.modifySection.error.name.message : '' ,
              },
              pass: {
                status: false,
                message: "",
              }
            }
          }
        }
      }

      //Regresar todo normal sin cambios
      return {
        ...state
      };
    }

    //UPLOAD
    case 'UPDATE_INPUT_VALUE_UPLOAD': {
      //Obtener input
      const e = payload.input;

      //Obtener valores del input
      const name = e.target.name;
      const value = name === 'files' ? e.target.files : e.target.value;

      return {
        ...state,
        uploadSection: {
          ...state.uploadSection,
          [name]: value,
          error: {
            ...state.uploadSection.error,
            [name]: {
              status: false,
              message: ""
            }
          }
        }
      };
    }
    case 'UPDATE_LOADING_UPLOAD': {
      return {
        ...state,
        uploadSection: {
          ...state.uploadSection,
          loading: payload
        }
      };
    }
    case 'ERROR_INFO_UPDATE': {
      return {
        ...state,
        uploadSection: {
          ...state.uploadSection,
          error: {
            ...state.uploadSection.error,
            [payload.input]: {
              status: true,
              message: payload.message
            }
          }
        }
      };
    }

    //OPTIONS
    case 'UPDATE_INPUT_VALUE_OPTIONS': {
      //Obtener input
      const e = payload.input;

      //Obtener valores del input
      const name = e.target.name;
      const value = e.target.value;

      return {
        ...state,
        optionsSection: {
          ...state.optionsSection,
          [name]: value,
          error: {
            ...state.optionsSection.error,
            [name]: {
              status: false,
              message: ""
            }
          }
        }
      };
    }

    //LOGOUT
    case 'LOGOUT': {
      //Reset State
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};

// Seleccionar estado del state.
// export const selectTheme = state => state.settings.tema;