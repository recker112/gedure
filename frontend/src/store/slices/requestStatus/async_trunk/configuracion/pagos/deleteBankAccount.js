import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../../notistack";
import { refresh } from "../../../../tables";

export const deleteBankAccount = createAsyncThunk(
  'requestStatus/bank/account/delete',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/bank-account/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refresh({ select: 'bankAccounts' }));
      dispatch(refresh({ select: 'bankTransactions' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        // NOTA(RECKER): Setear errores en inputs
        if (status === 404) {
          data.msg = 'La cuenta ya no existe';
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

export const reducersDeleteBankAccount = {
  [deleteBankAccount.pending]: (state, action) => {
    state.deleteBankAccount.loading = true;
  },
  [deleteBankAccount.rejected]: (state, action) => {
    state.deleteBankAccount.loading = false;
  },
  [deleteBankAccount.fulfilled]: (state, action) => {
    state.deleteBankAccount.loading = false;
    state.deleteBankAccount.data = {};
    state.deleteBankAccount.open = false;
  },
}