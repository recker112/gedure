import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refreshGCDU } from "./table";

export const restoreUser = createAsyncThunk(
  'gdGCDUConfirm/restore',
  async ({ id }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/user-disabled/restore/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, { _method: 'PATCH' }, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refreshGCDU());

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'El usuario ya no existe';
        }

        // NOTA(RECKER): Respuesta del servidor
        dispatch(updateNotistack({ status: status, text: data.msg }));
      } else {
        // NOTA(RECKER): Sin respuesta por parte del servidor
        dispatch(updateNotistack({ status: 'offline', }));
      }
      throw error;
    }
  }
);

export const restoreUserMassive = createAsyncThunk(
  'gdGCDUConfirm/restoreMassive',
  async (ids, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/user-disabled/restore?ids=${encodeURI(JSON.stringify(ids))}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, { _method: 'PATCH' }, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refreshGCDU());

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'Los usuario seleccionados ya no existen';
        }

        // NOTA(RECKER): Respuesta del servidor
        dispatch(updateNotistack({ status: status, text: data.msg }));
      } else {
        // NOTA(RECKER): Sin respuesta por parte del servidor
        dispatch(updateNotistack({ status: 'offline', }));
      }
      throw error;
    }
  }
);

export const destroyUser = createAsyncThunk(
  'gdGCDUConfirm/destroy',
  async ({ id }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/user-disabled/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refreshGCDU());

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'El usuario ya no existe';
        }

        // NOTA(RECKER): Respuesta del servidor
        dispatch(updateNotistack({ status: status, text: data.msg }));
      } else {
        // NOTA(RECKER): Sin respuesta por parte del servidor
        dispatch(updateNotistack({ status: 'offline', }));
      }
      throw error;
    }
  }
);

export const destroyUserMassive = createAsyncThunk(
  'gdGCDUConfirm/destroyMassive',
  async (ids, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/user-disabled?ids=${encodeURI(JSON.stringify(ids))}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refreshGCDU());

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'Los usuario seleccionados ya no existen';
        }

        // NOTA(RECKER): Respuesta del servidor
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
  restore: {
    open: false,
    loading: false,
    data: {},
  },
  restoreMassive: {
    open: false,
    loading: false,
    data: {},
  },
  destroy: {
    open: false,
    loading: false,
    data: {},
  },
  destroyMassive: {
    open: false,
    loading: false,
    data: {},
  }
};

export const gdGCDUConfirmSlices = createSlice({
  name: "gdGCDUConfirm",
  initialState,
  reducers: {
    setConfirmConfgsGCDU: (state, action) => {
      const { open, loading, data, confirm } = action.payload;

      (open !== undefined) && (state[confirm].open = open);
      loading && (state[confirm].loading = loading);
      data && (state[confirm].data = data);
    }
  },
  extraReducers: {
    [restoreUser.pending]: state => {
      state.restore.loading = true;
    },
    [restoreUser.rejected]: (state, action) => {
      state.restore.loading = false;
    },
    [restoreUser.fulfilled]: (state, action) => {
      state.restore.loading = false;
      state.restore.data = {};
      state.restore.open = false;
    },
    [restoreUserMassive.pending]: state => {
      state.restoreMassive.loading = true;
    },
    [restoreUserMassive.rejected]: (state, action) => {
      state.restoreMassive.loading = false;
    },
    [restoreUserMassive.fulfilled]: (state, action) => {
      state.restoreMassive.loading = false;
      state.restoreMassive.data = {};
      state.restoreMassive.open = false;
    },
    [destroyUser.pending]: state => {
      state.destroy.loading = true;
    },
    [destroyUser.rejected]: (state, action) => {
      state.destroy.loading = false;
    },
    [destroyUser.fulfilled]: (state, action) => {
      state.destroy.loading = false;
      state.destroy.data = {};
      state.destroy.open = false;
    },
    [destroyUserMassive.pending]: state => {
      state.destroyMassive.loading = true;
    },
    [destroyUserMassive.rejected]: (state, action) => {
      state.destroyMassive.loading = false;
    },
    [destroyUserMassive.fulfilled]: (state, action) => {
      state.destroyMassive.loading = false;
      state.destroyMassive.data = {};
      state.destroyMassive.open = false;
    },
  }
});

export default gdGCDUConfirmSlices.reducer;

export const { setConfirmConfgsGCDU } = gdGCDUConfirmSlices.actions;