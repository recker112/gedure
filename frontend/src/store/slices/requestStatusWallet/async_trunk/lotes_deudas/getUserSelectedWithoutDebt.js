import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getUserSelectedWithoutDebt = createAsyncThunk(
  'requestUserWallet/user/selectedWithout',
  async ({search , id}, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/find/deudas-users?search=${encodeURI(search)}&id_lote_deuda=${id}&not_registred=1`;

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

export const reducersGetUserSelectedWithoutDebt = {
  [getUserSelectedWithoutDebt.rejected]: (state, action) => {
    state.editLoteDeuda.dataSelected = [];
  },
  [getUserSelectedWithoutDebt.fulfilled]: (state, action) => {
    const { payload } = action;
    state.editLoteDeuda.dataSelected = payload;
  },
}