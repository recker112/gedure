import { createSlice } from "@reduxjs/toolkit";
import { reducersCreateBankAccount } from "./async_trunk/configuracion/pagos/createBankAccount";

// Async request
import { reducersContacts } from "./async_trunk/contacts";
import { reducersInfoBox } from "./async_trunk/home/getInfoBox";
import { reducersLogin } from "./async_trunk/login";
import { reducersNewsPreview } from "./async_trunk/news/getNewsPreviews";
import { reducersNewsShow } from "./async_trunk/news/getNewsShow";
import { reducersUserCreate } from "./async_trunk/users/createUser";
import { reducersDisableUser } from "./async_trunk/users/disableUser";
import { reducersDisableUserMassive } from "./async_trunk/users/disableUserMassive";
import { reducersGetCurso } from "./async_trunk/users/getCursos";
import { reducersGetUser } from "./async_trunk/users/getUser";
import { reducersUpdateSeccion } from "./async_trunk/users/updateSeccion";
import { reducersUploadMatricula } from "./async_trunk/users/uploadMatricula";


const initialState = {
  login: {
    loading: false,
  },
  contacts: {
    loading: false,
  },
  newsPreview: {
    loading: true,
    hasFinish: false,
    search: '',
    data: [],
    error: false,
  },
  newsShow: {
    loading: true,
    data: {},
  },
  infoBox: {
    loading: true,
    data: {},
  },
  showReg: {
    open: false,
    data: {},
  },
  createUser: {
    open: false,
    loading: false,
    data: null,
  },
  uploadMatricula: {
    open: false,
    loading: false,
    progress: 0,
  },
  disableUser: {
    open: false,
    loading: false,
    data: {},
  },
  disableUserMassive: {
    open: false,
    loading: false,
    data: {},
  },
  updateSeccion: {
    open: false,
    loading: false,
    data: {},
  },
  userShow: {
    loading: true,
    userSelected: {
      alumno: {
        curso: {}
      },
      personal_data: {},
    },
    permissions: {
      sin_asignar: {},
      administrar: {},
      administrar_transac: {},
      gedure: {},
    }
  },
  createBankAccount: {
    loading: false,
  },
};

export const requestStatusSlices = createSlice({
  name: "requestStatus",
  initialState,
  reducers: {
    setRequestStatus: (state, action) => {
      const { open, loading, data, select } = action.payload;

      (open !== undefined) && (state[select].open = open);
      loading && (state[select].loading = loading);
      data && (state[select].data = data);
    },
    setProgress: (state, action) => {
      const { select, percentCompleted } = action.payload;
      console.log(percentCompleted);
      state[select].progress = percentCompleted;
    },
    updateInputs: (state, action) => {
      const { select, input, value } = action.payload;

      state[select][input] = value;

      if (select === 'newsPreview') {
        state[select].data = [];
      } else if (select === 'newsShow' || select === 'infoBox') {
        state[select].data = {};
      }
    },
    resetDataRequest: (state, action) => {
      const { select } = action.payload;

      state[select] = {...initialState[select]};
    },
  },
  extraReducers: {
    ...reducersLogin,
    ...reducersContacts,
    ...reducersNewsPreview,
    ...reducersNewsShow,
    ...reducersInfoBox,
    ...reducersUserCreate,
    ...reducersGetCurso,
    ...reducersUploadMatricula,
    ...reducersDisableUser,
    ...reducersDisableUserMassive,
    ...reducersUpdateSeccion,
    ...reducersGetUser,
    ...reducersCreateBankAccount,
  }
});

export default requestStatusSlices.reducer;

export const { setRequestStatus, setProgress, resetDataRequest, updateInputs } = requestStatusSlices.actions;