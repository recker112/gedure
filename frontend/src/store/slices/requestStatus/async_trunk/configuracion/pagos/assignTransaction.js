import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../../notistack";
import { refresh } from "../../../../tables";

export const assignTransactionRequest = createAsyncThunk(
  'requestStatus/bank/transaction/assign',
  async ({submitData, id}, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/bank-transaction/${id}/assign`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refresh({ select: 'bankTransactions' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

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

export const reducersAssignTransaction = {
  [assignTransactionRequest.pending]: (state, action) => {
    state.assignTransaction.loading = true;
  },
  [assignTransactionRequest.rejected]: (state, action) => {
    state.assignTransaction.loading = false;
  },
  [assignTransactionRequest.fulfilled]: (state, action) => {
    state.assignTransaction.loading = false;
    state.assignTransaction.open = false;
  },
}