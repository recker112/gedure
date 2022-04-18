import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";

export const NotiBoxData = createAsyncThunk(
  'gd_home/notiBox',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/info-box';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      //dispatch(updateNotistack({ status: res.status, variant: 'success' }));

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
  loading: true,
  data: {},
};

export const gdHomeSlices = createSlice({
  name: "gd_home",
  initialState,
  reducers: {
    resetData: state => {
      state.data = {};
      state.loading = true;
    },
  },
  extraReducers: {
    [NotiBoxData.pending]: state => {
      state.loading = true;
    },
    [NotiBoxData.rejected]: state => {
      state.loading = false;
    },
    [NotiBoxData.fulfilled]: (state, data) => {
      state.loading = false;
      state.data = data.payload;
    }
  }
});

export default gdHomeSlices.reducer;

export const { resetData } = gdHomeSlices.actions;