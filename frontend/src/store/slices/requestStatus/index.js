import { createSlice } from "@reduxjs/toolkit";
import { reducersCreateBankAccount } from "./async_trunk/configuracion/pagos/createBankAccount";

// Async request
import { reducersContacts } from "./async_trunk/contacts";
import { reducersInfoBox } from "./async_trunk/home/getInfoBox";
import { reducersLogin } from "./async_trunk/login";
import { reducersNewsPreview } from "./async_trunk/news/getNewsPreviews";
import { reducersNewsShow } from "./async_trunk/news/getNewsShow";


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
      const { payload } = action;
      state.upload.progress = payload;
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
    ...reducersCreateBankAccount,
  }
});

export default requestStatusSlices.reducer;

export const { setRequestStatus, setProgress, resetDataRequest, updateInputs } = requestStatusSlices.actions;