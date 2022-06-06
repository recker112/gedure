import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refreshCCT } from "./table";

export const deleteCurso = createAsyncThunk(
  'gdGCConfirm/delete',
  async ({ id }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/curso/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refreshCCT());

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'Este curso ya no existe';
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

export const deleteCursoMassive = createAsyncThunk(
  'gdGCConfirm/delete',
  async (ids, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/massive/curso?ids=${encodeURI(JSON.stringify(ids))}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refreshCCT());

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'Los curso seleccionados ya no existe';
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
  delete: {
    open: false,
    loading: false,
    data: {},
  },
  deleteMassive: {
    open: false,
    loading: false,
    data: {},
  }
};

export const gdGCConfirmSlices = createSlice({
  name: "gdGCConfirm",
  initialState,
  reducers: {
    setConfirmConfgsGC: (state, action) => {
      const { open, loading, data, confirm } = action.payload;

      (open !== undefined) && (state[confirm].open = open);
      loading && (state[confirm].loading = loading);
      data && (state[confirm].data = data);
    }
  },
  extraReducers: {
    [deleteCurso.pending]: state => {
      state.delete.loading = true;
    },
    [deleteCurso.rejected]: (state, action) => {
      state.delete.loading = false;
    },
    [deleteCurso.fulfilled]: (state, action) => {
      state.delete.loading = false;
      state.delete.data = {};
      state.delete.open = false;
    },
    [deleteCursoMassive.pending]: state => {
      state.deleteMassive.loading = true;
    },
    [deleteCursoMassive.rejected]: (state, action) => {
      state.deleteMassive.loading = false;
    },
    [deleteCursoMassive.fulfilled]: (state, action) => {
      state.deleteMassive.loading = false;
      state.deleteMassive.data = {};
      state.deleteMassive.open = false;
    },
  }
});

export default gdGCConfirmSlices.reducer;

export const { setConfirmConfgsGC } = gdGCConfirmSlices.actions;