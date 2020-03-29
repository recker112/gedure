//Inicar valor del state.
const initialState = {
  content: 'home',
  infoDialog: false,
  drawer: {
    open: false,
    index: 0
  },
	logsSection: {
		selectSearch: 'all',
		dataTable: null,
		searching: true
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
    option: 'matricula',
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
    nota: 'activo',
    horario: 'activo',
    estudiante: '',
    seccion: '',
    curso: '',
    loading: false,
    error: {
      estudiante: {
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
  },
  deleteSection: {
    option: 'seccion',
    seccion: '',
    curso: '',
    loading: false,
    error: {
      seccion: {
        status: false,
        message: ''
      },
      curso: {
        status: false,
        message: ''
      }
    }
  },
  publicarSection: {
    option: 'noticia',
    title: '',
    content: '',
    img: [],
    loading: false,
    error: {
      title: {
        status: false,
        message: ''
      },
      content: {
        status: false,
        message: ''
      }
    }
  },
  menuUser: {
    openDialog: false,
    option: null,
    response: false,
    loading: false,
    sections: {
      password: {
        passA: '',
        passN: '',
        passR: '',
        error: {
          passA: {
            status: false,
            message: ''
          },
          passN: {
            status: false,
            message: ''
          },
          passR: {
            status: false,
            message: ''
          }
        }
      },
      avatar: {
        file: [],
        error: {
          file: {
            status: false,
            message: ''
          }
        }
      }
    }
  },
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

		/* LOGS */
		case 'UPDATE_INPUT_VALUE_LOGS_DATATABLE': {
      //Obtener dataTable
      const dataTable = payload.input;

      return {
        ...state,
        logsSection: {
          ...state.logsSection,
          dataTable: dataTable,
        }
      };
		}
		case 'UPDATE_INPUT_VALUE_LOGS_SELECT': {
      //Obtener Select
      const selected = payload.input;

      return {
        ...state,
        logsSection: {
          ...state.logsSection,
          selectSearch: selected,
        }
      };
		}
		case 'UPDATE_LOADING_LOGS_SEARCHING': {
      return {
        ...state,
        logsSection: {
          ...state.logsSection,
          searching: payload,
        }
      };
		}

    /* MODIFY */
    case 'UPDATE_INPUT_VALUE_MODIFY_EXTERNO': {
      //Obtener ser
      const user = payload.input;

      //Verificar si es un estudiante
      if (typeof user.curso === 'undefined'){
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
    case 'ERROR_INFO_OPTIONS': {
      return {
        ...state,
        optionsSection: {
          ...state.optionsSection,
          error: {
            ...state.optionsSection.error,
            [payload.input]: {
              status: true,
              message: payload.message
            }
          }
        }
      };
    }
    case 'UPDATE_LOADING_OPTIONS': {
      return {
        ...state,
        optionsSection: {
          ...state.optionsSection,
          loading: payload
        }
      };
    }

    //DELETE
    case 'UPDATE_INPUT_VALUE_DELETE': {
      //Obtener input
      const e = payload.input;

      //Obtener valores del input
      const name = e.target.name;
      const value = e.target.value;

      return {
        ...state,
        deleteSection: {
          ...state.deleteSection,
          [name]: value,
          error: {
            ...state.deleteSection.error,
            [name]: {
              status: false,
              message: ""
            }
          }
        }
      };
    }
    case 'ERROR_INFO_DELETE': {
      return {
        ...state,
        deleteSection: {
          ...state.deleteSection,
          error: {
            ...state.deleteSection.error,
            [payload.input]: {
              status: true,
              message: payload.message
            }
          }
        }
      };
    }
    case 'UPDATE_LOADING_DELETE': {
      return {
        ...state,
        deleteSection: {
          ...state.deleteSection,
          loading: payload
        }
      };
    }

    //PUBLICAR
    case 'UPDATE_INPUT_VALUE_PUBLICAR': {
      //Obtener input
      const e = payload.input;

      //Obtener valores del input
      const name = e.target.name;
      const value = name === 'img' ? e.target.files : e.target.value;

      return {
        ...state,
        publicarSection: {
          ...state.publicarSection,
          [name]: value,
          error: {
            ...state.publicarSection.error,
            [name]: {
              status: false,
              message: ""
            }
          }
        }
      };
    }
    case 'ERROR_INFO_PUBLICAR': {
      return {
        ...state,
        publicarSection: {
          ...state.publicarSection,
          error: {
            ...state.publicarSection.error,
            [payload.input]: {
              status: true,
              message: payload.message
            }
          }
        }
      };
    }
    case 'UPDATE_LOADING_PUBLICAR': {
      return {
        ...state,
        publicarSection: {
          ...state.publicarSection,
          loading: payload
        }
      };
    }

    //MENU USER
    case 'UPDATE_MENU_USER_DIALOG': {
      return {
        ...state,
        menuUser: {
          ...state.menuUser,
          openDialog: payload.open,
          option: payload.option,
          response: false,
          loading: false,
        }
      };
    }
    case 'UPDATE_LOADING_MENU_USER_DIALOG': {
      return {
        ...state,
        menuUser: {
          ...state.menuUser,
          loading: payload
        }
      };
    }
    case 'RESPONSE_MENU_USER_DIALOG': {
      return {
        ...state,
        menuUser: {
          ...state.menuUser,
          response: {...payload},
          loading: false,
        }
      };
    }
    //CHANGE PASSWORD
    case 'UPDATE_INPUT_VALUE_PASSWORD': {
      //Obtener input
      const e = payload.input;

      //Obtener valores del input
      const name = e.target.name;
      const value = e.target.value;

      return {
        ...state,
        menuUser: {
          ...state.menuUser,
          sections: {
            ...state.menuUser.sections,
            password: {
              ...state.menuUser.sections.password,
              [name]: value,
                error: {
                  ...state.menuUser.sections.password.error,
                  [name]: {
                    status: false,
                    message: ""
                  }
                }
            }
          }
        }
      };
    }
    case 'ERROR_INFO_PASSWORD': {
      return {
        ...state,
        menuUser: {
          ...state.menuUser,
          sections: {
            ...state.menuUser.sections,
            password: {
              ...state.menuUser.sections.password,
              error: {
                ...state.menuUser.sections.password.error,
                [payload.input]: {
                    status: true,
                    message: payload.message
                  }
                }
              }
            }
          }
      };
    }
    //CHANGE AVATAR
    case 'UPDATE_INPUT_VALUE_AVATAR': {
      //Obtener input
      const e = payload.input;

      //Obtener valores del input
      const name = e.target.name;
      const value = e.target.files;

      return {
        ...state,
        menuUser: {
          ...state.menuUser,
          sections: {
            ...state.menuUser.sections,
            avatar: {
              ...state.menuUser.sections.avatar,
              [name]: value,
                error: {
                  ...state.menuUser.sections.avatar.error,
                  [name]: {
                    status: false,
                    message: ""
                  }
                }
            }
          }
        }
      };
    }
    case 'ERROR_INFO_AVATAR': {
      return {
        ...state,
        menuUser: {
          ...state.menuUser,
          sections: {
            ...state.menuUser.sections,
            avatar: {
              ...state.menuUser.sections.avatar,
              error: {
                ...state.menuUser.sections.avatar.error,
                [payload.input]: {
                    status: true,
                    message: payload.message
                  }
                }
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