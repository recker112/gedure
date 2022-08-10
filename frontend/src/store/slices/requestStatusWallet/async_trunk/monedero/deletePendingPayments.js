import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refresh } from "../../../tablesWallet";

export const deletePendingPayments = createAsyncThunk(
  'requestStatusWallet/pending-payments/delete',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/pending-payment/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, text: res.data.msg, variant: 'success' }));

      dispatch(refresh({ select: 'pendingPayments' }));

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

export const reducersDeletePendingPayments = {
  [deletePendingPayments.pending]: (state, action) => {
    state.deletePendingPayments.loading = true;
  },
  [deletePendingPayments.rejected]: (state, action) => {
    state.deletePendingPayments.loading = false;
  },
  [deletePendingPayments.fulfilled]: (state, action) => {
    state.deletePendingPayments.loading = false;
    state.deletePendingPayments.open = false;
  },
}