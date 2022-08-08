import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const showTransaction = createAsyncThunk(
  'requestUserWallet/transactions/show',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/transaction/${id}`;

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

export const reducersShowTransaction = {
  [showTransaction.pending]: (state, action) => {
    state.showTransaction.loading = true;
  },
  [showTransaction.rejected]: (state, action) => {
    state.showTransaction.loading = false;
  },
  [showTransaction.fulfilled]: (state, action) => {
    const data = action.payload;
    state.showTransaction.loading = false;
    state.showTransaction.data = data;
  },
}