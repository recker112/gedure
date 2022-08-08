import { createSlice } from "@reduxjs/toolkit";

// Async request
import { reducersGetUserSelected } from "./async_trunk/lotes_deudas/getUserSelected";
import { reducersGetUserSelectedWithoutDebt } from "./async_trunk/lotes_deudas/getUserSelectedWithoutDebt";
import { reducersCreateLoteDebts } from "./async_trunk/lotes_deudas/createLoteDebts";
import { reducersEditLoteDebts } from "./async_trunk/lotes_deudas/editLoteDebts";
import { reducersDestroyLoteDebts } from "./async_trunk/lotes_deudas/destroyLoteDebts";
import { reducersGetLoteDebts } from "./async_trunk/lotes_deudas/getLoteDebts";
import { reducersShowTransaction } from "./async_trunk/transacciones/showTransaction";
import { reducersDownloadTransaction } from "./async_trunk/transacciones/downloadTransaction";

const initialState = {
  createLoteDeuda: {
    open: false,
    loading: false,
    dataUserSelected: [],
  },
  editLoteDeuda: {
    open: false,
    loading: false,
    data: {},
    dataSelected: [],
  },
  deleteLoteDeuda: {
    open: false,
    loading: false,
    data: {},
  },
  showLoteDeuda: {
    loading: true,
    data: {},
  },
  showTransaction: {
    loading: true,
    data: {},
    progress: 0,
    loadingDownload: false,
  },
};

export const requestStatusWalletSlices = createSlice({
  name: "requestStatusWallet",
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
      state[select].progress = percentCompleted;
    },
    setUserSelected: (state, action) => {
      const { user, permissions } = action.payload;
      state.userShow.userSelected = user;
      state.userShow.permissions = permissions;
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
    ...reducersGetUserSelected,
    ...reducersCreateLoteDebts,
    ...reducersGetUserSelectedWithoutDebt,
    ...reducersEditLoteDebts,
    ...reducersDestroyLoteDebts,
    ...reducersGetLoteDebts,
    ...reducersShowTransaction,
    ...reducersDownloadTransaction,
  }
});

export default requestStatusWalletSlices.reducer;

export const { setRequestStatus, setProgress, resetDataRequest, updateInputs, setUserSelected } = requestStatusWalletSlices.actions;