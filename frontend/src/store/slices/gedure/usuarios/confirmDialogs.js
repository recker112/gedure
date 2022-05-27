import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";
import { refresh } from "./table";

export const confirmData = createAsyncThunk(
  'gdUConfirmDisabledAccount/confirm',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/user/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      dispatch(refresh());

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        // NOTA(RECKER): Respuesta del servidor
        const { data, status } = error.response;
        dispatch(updateNotistack({ status: status, text: data.msg }));
      } else {
        // NOTA(RECKER): Sin respuesta por parte del servidor
        dispatch(updateNotistack({ status: 'offline', }));
      }
      throw error;
    }
  }
);

export const confirmDataMassive = createAsyncThunk(
  'gdUConfirmDisabledAccount/confirmMassive',
  async (ids, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/massive/user?ids=${encodeURI(JSON.stringify(ids))}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      dispatch(refresh());

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        // NOTA(RECKER): Respuesta del servidor
        const { data, status } = error.response;
        dispatch(updateNotistack({ status: status, text: data.msg }));
      } else {
        // NOTA(RECKER): Sin respuesta por parte del servidor
        dispatch(updateNotistack({ status: 'offline', }));
      }
      throw error;
    }
  }
);


const initialState = {
  disabledAccount: {
    open: false,
    loading: false,
    data: {},
  },
  disabledAccountMassive: {
    open: false,
    loading: false,
    data: {},
  },
};

export const gdUConfirmSlices = createSlice({
  name: "gdUConfirmDisabledAccount",
  initialState,
  reducers: {
    setConfirmConfgs: (state, action) => {
      const { open, loading, data, confirm } = action.payload;

      (open !== undefined) && (state[confirm].open = open);
      loading && (state[confirm].loading = loading);
      data && (state[confirm].data = data);
    }
  },
  extraReducers: {
    [confirmData.pending]: state => {
      state.disabledAccount.loading = true;
    },
    [confirmData.rejected]: (state, action) => {
      state.disabledAccount.loading = false;
    },
    [confirmData.fulfilled]: (state, action) => {
      state.disabledAccount.loading = false;
      state.disabledAccount.data = {};
      state.disabledAccount.open = false;
    },
    [confirmDataMassive.pending]: state => {
      state.disabledAccountMassive.loading = true;
    },
    [confirmDataMassive.rejected]: (state, action) => {
      state.disabledAccountMassive.loading = false;
    },
    [confirmDataMassive.fulfilled]: (state, action) => {
      state.disabledAccountMassive.loading = false;
      state.disabledAccountMassive.data = {};
      state.disabledAccountMassive.open = false;
    }
  }
});

export default gdUConfirmSlices.reducer;

export const { setConfirmConfgs } = gdUConfirmSlices.actions;