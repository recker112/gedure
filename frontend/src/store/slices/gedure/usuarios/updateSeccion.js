import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";
import { refresh } from "./table";

export const updateData = createAsyncThunk(
  'gdUUpdateSeccion/update',
  async (data, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/massive/user/seccion';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, data, {
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
  open: false,
  loading: false,
  data: {},
};

export const gdUUpdateSeccionSlices = createSlice({
  name: "gdUUpdateSeccion",
  initialState,
  reducers: {
    setConfgs: (state, action) => {
      const { open, loading, data } = action.payload;

      (open !== undefined) && (state.open = open);
      loading && (state.loading = loading);
      data && (state.data = data);
    }
  },
  extraReducers: {
    [updateData.pending]: state => {
      state.loading = true;
    },
    [updateData.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = {};
      state.open = false;
    },
  }
});

export default gdUUpdateSeccionSlices.reducer;

export const { setConfgs } = gdUUpdateSeccionSlices.actions;