import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getBankAccounts = createAsyncThunk(
  'tables/bank/accounts',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tables.bankAccounts.tableData;
    let url = `v1/bank-account?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersBankAccounts = {
  [getBankAccounts.pending]: state => {
    state.bankAccounts.tableData.loading = true;
  },
  [getBankAccounts.rejected]: (state, action) => {
    state.bankAccounts.tableData.loading = false;
  },
  [getBankAccounts.fulfilled]: (state, action) => {
    const { totalRows, data } = action.payload;

    state.bankAccounts.tableData.loading = false;
    state.bankAccounts.tableData.data = data;
    state.bankAccounts.tableData.totalRows = totalRows;
    state.bankAccounts.tableData.pageCount = Math.ceil(totalRows / state.bankAccounts.tableData.pageSize);
  }
}