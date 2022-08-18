import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateWallet } from "../../../auth";
import { updateNotistack } from "../../../notistack";

export const verifyPayments = createAsyncThunk(
  'requestStatusWallet/monedero/verify/payments',
  async ({ submitData, callBack }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/bank-account/${submitData.bank_account}/payment`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      if (res.data.balance) {
        dispatch(updateWallet(res.data.balance));
      }

      dispatch(updateNotistack({ status: res.status, text: res.data.msg, variant: res.data.balance ? 'success' : 'info' }));

      callBack();

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

export const reducersVerifyPayments = {
  [verifyPayments.pending]: (state, action) => {
    state.verifyPayments.loading = true;
  },
  [verifyPayments.rejected]: (state, action) => {
    state.verifyPayments.loading = false;
  },
  [verifyPayments.fulfilled]: (state, action) => {
    state.verifyPayments.loading = false;
  },
}