import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getBoletasUser = createAsyncThunk(
  'requestStatus/boletas/userGet',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/boletas`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

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

export const reducersGetBoletasUser = {
  [getBoletasUser.pending]: state => {
    state.verBoletasUser.loading = true;
  },
  [getBoletasUser.rejected]: (state, action) => {
    state.verBoletasUser.loading = false;
  },
  [getBoletasUser.fulfilled]: (state, action) => {
    state.verBoletasUser.loading = false;
    state.verBoletasUser.data = action.payload;
  }
}