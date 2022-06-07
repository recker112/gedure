import { createSlice } from "@reduxjs/toolkit";
import { createBankAccount } from "./async_trunk/configuracion/pagos/createBankAccount";
import { login } from "./async_trunk/login";


const initialState = {
  login: {
    loading: false,
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
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.login.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.login.loading = false;
    },
    [login.fulfilled]: (state, action) => {
      state.login.loading = false;
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

export const { setRequestStatus, setProgress } = requestStatusSlices.actions;