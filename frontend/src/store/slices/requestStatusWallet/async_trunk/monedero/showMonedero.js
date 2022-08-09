import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const showMonedero = createAsyncThunk(
  'requestUserWallet/transactions/user/show',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/transaction/${id}/user`;

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
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'La transacción no existe';
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

export const reducersShowMonedero = {
  [showMonedero.pending]: (state, action) => {
    state.showMonedero.loading = true;
  },
  [showMonedero.rejected]: (state, action) => {
    state.showMonedero.loading = false;
  },
  [showMonedero.fulfilled]: (state, action) => {
    const data = action.payload;
    state.showMonedero.loading = false;
    state.showMonedero.data = data;
  },
}