import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";
import { refreshBT } from "./table";

export const deleteBoleta = createAsyncThunk(
  'gdBDelete/delete',
  async ({ lapso, ids }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/massive/boleta?ids=${encodeURI(JSON.stringify(ids))}&lapso=${lapso}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      dispatch(refreshBT());

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
  open: false,
  loading: false,
  data: {},
};

export const ggdBDeleteSlices = createSlice({
  name: "gdBDelete",
  initialState,
  reducers: {
    setConfgsBD: (state, action) => {
      const { open, loading, data } = action.payload;

      (open !== undefined) && (state.open = open);
      loading && (state.loading = loading);
      data && (state.data = data);
    }
  },
  extraReducers: {
    [deleteBoleta.pending]: state => {
      state.loading = true;
    },
    [deleteBoleta.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteBoleta.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = {};
      state.open = false;
    },
  }
});

export default ggdBDeleteSlices.reducer;

export const { setConfgsBD } = ggdBDeleteSlices.actions;