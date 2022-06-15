import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../../notistack";
import { refresh } from "../../../../tables";

export const deleteMassiveBankTransaction = createAsyncThunk(
  'requestStatus/bank/transaction/deleteMassive',
  async (ids, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/bank-transaction?ids=${encodeURI(JSON.stringify(ids))}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
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

        // NOTA(RECKER): Setear 404
        if (status === 404) {
          data.msg = 'La transacción ya no existe';
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

export const reducersDeleteMassiveBankTransaction = {
  [deleteMassiveBankTransaction.pending]: (state, action) => {
    state.deleteMassiveBankTransaction.loading = true;
  },
  [deleteMassiveBankTransaction.rejected]: (state, action) => {
    state.deleteMassiveBankTransaction.loading = false;
  },
  [deleteMassiveBankTransaction.fulfilled]: (state, action) => {
    state.deleteMassiveBankTransaction.loading = false;
    state.deleteMassiveBankTransaction.data = {};
    state.deleteMassiveBankTransaction.open = false;
  },
}