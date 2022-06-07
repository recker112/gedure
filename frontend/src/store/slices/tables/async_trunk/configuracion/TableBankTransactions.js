import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getBankTransactions = createAsyncThunk(
  'tables/bank/transactions',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tables.bankAccounts.tableData;
    let url = `v1/bank-transaction?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersBankTransactions = {
  [getBankTransactions.pending]: state => {
    state.bankTransactions.tableData.loading = true;
  },
  [getBankTransactions.rejected]: (state, action) => {
    state.bankTransactions.tableData.loading = false;
  },
  [getBankTransactions.fulfilled]: (state, action) => {
    const { page, totalRows, data } = action.payload;

    state.bankTransactions.tableData.loading = false;
    state.bankTransactions.tableData.page = page;
    state.bankTransactions.tableData.data = data;
    state.bankTransactions.tableData.totalRows = totalRows;
    state.bankTransactions.tableData.pageCount = Math.ceil(totalRows / state.bankTransactions.tableData.pageSize);
  }
}