import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getTransactions = createAsyncThunk(
  'tablesWallet/transactions/get',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tablesWallet.transacciones.tableData;
    let url = `v1/transaction?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersGetTransactions = {
  [getTransactions.pending]: state => {
    state.transacciones.tableData.loading = true;
  },
  [getTransactions.rejected]: (state, action) => {
    state.transacciones.tableData.loading = false;
  },
  [getTransactions.fulfilled]: (state, action) => {
    const { totalRows, data } = action.payload;

    state.transacciones.tableData.loading = false;
    state.transacciones.tableData.data = data;
    state.transacciones.tableData.totalRows = totalRows;
    state.transacciones.tableData.pageCount = Math.ceil(totalRows / state.transacciones.tableData.pageSize);
  }
}