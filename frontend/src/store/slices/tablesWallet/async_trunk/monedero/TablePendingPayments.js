import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getPendingPayments = createAsyncThunk(
  'tablesWallet/pending-payments/get',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tablesWallet.pendingPayments.tableData;
    let url = `v1/pending-payment?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersGetPendingPayments = {
  [getPendingPayments.pending]: state => {
    state.pendingPayments.tableData.loading = true;
  },
  [getPendingPayments.rejected]: (state, action) => {
    state.pendingPayments.tableData.loading = false;
  },
  [getPendingPayments.fulfilled]: (state, action) => {
    const { totalRows, data } = action.payload;

    state.pendingPayments.tableData.loading = false;
    state.pendingPayments.tableData.data = data;
    state.pendingPayments.tableData.totalRows = totalRows;
    state.pendingPayments.tableData.pageCount = Math.ceil(totalRows / state.pendingPayments.tableData.pageSize);
  }
}