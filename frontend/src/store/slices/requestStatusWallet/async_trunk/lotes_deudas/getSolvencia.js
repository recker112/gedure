import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getSolvencia = createAsyncThunk(
  'requestUserWallet/user/solvencia',
  async (search, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/deuda/solvencia?search=${encodeURI(search)}`;

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

export const reducersGetSolvencia = {
  [getSolvencia.rejected]: (state, action) => {
    state.verifySolvencia.dataUserSelected = [];
  },
  [getSolvencia.fulfilled]: (state, action) => {
    const { payload } = action;
    state.verifySolvencia.dataUserSelected = payload;
  },
}