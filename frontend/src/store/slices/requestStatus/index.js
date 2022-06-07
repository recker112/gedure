import { createSlice } from "@reduxjs/toolkit";
import { createBankAccount } from "./async_trunk/configuracion/pagos/createBankAccount";

// Async request
import { sendContact } from "./async_trunk/contacts";
import { getInfoBox } from "./async_trunk/home/getInfoBox";
import { reducersLogin } from "./async_trunk/login";
import { getNewsPreviews } from "./async_trunk/news/getNewsPreviews";
import { getNewsShow } from "./async_trunk/news/getNewsShow";


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
    [sendContact.pending]: (state, action) => {
      state.contacts.loading = true;
    },
    [sendContact.rejected]: (state, action) => {
      state.contacts.loading = false;
    },
    [sendContact.fulfilled]: (state, action) => {
      state.contacts.loading = false;
    },
    [getNewsPreviews.pending]: (state, action) => {
      state.newsPreview.loading = true;
      state.newsPreview.error = false;
      state.newsPreview.hasFinish = false;
    },
    [getNewsPreviews.rejected]: (state, action) => {
      state.newsPreview.loading = false;
      state.newsPreview.error = true;
    },
    [getNewsPreviews.fulfilled]: (state, action) => {
      const { data, finish } = action.payload;
      
      state.newsPreview.loading = false;
      state.newsPreview.data = [...state.newsPreview.data, ...data];
      state.newsPreview.hasFinish = finish;
    },
    [getNewsShow.pending]: state => {
      state.newsShow.loading = true;
      state.newsShow.data = {};
    },
    [getNewsShow.rejected]: state => {
      state.newsShow.loading = false;
      state.newsShow.data = {};
    },
    [getNewsShow.fulfilled]: (state, action) => {
      const data = action.payload;

      state.newsShow.loading = false;
      state.newsShow.data = data;
    },
    [getInfoBox.pending]: state => {
      state.infoBox.loading = true;
    },
    [getInfoBox.rejected]: state => {
      state.infoBox.loading = false;
    },
    [getInfoBox.fulfilled]: (state, data) => {
      state.infoBox.loading = false;
      state.infoBox.data = data.payload;
    },
    [createBankAccount.pending]: (state, action) => {
      state.createBankAccount.loading = true;
    },
    [createBankAccount.rejected]: (state, action) => {
      state.createBankAccount.loading = false;
    },
    [createBankAccount.fulfilled]: (state, action) => {
      state.createBankAccount.loading = false;
    },
  }
});

export default requestStatusSlices.reducer;

export const { setRequestStatus, setProgress, resetDataRequest, updateInputs } = requestStatusSlices.actions;