import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getWallets = createAsyncThunk(
  'tablesWallet/wallets/get',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tablesWallet.wallets.tableData;
    let url = `v1/wallet?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersGetWallets = {
  [getWallets.pending]: state => {
    state.wallets.tableData.loading = true;
  },
  [getWallets.rejected]: (state, action) => {
    state.wallets.tableData.loading = false;
  },
  [getWallets.fulfilled]: (state, action) => {
    const { totalRows, data } = action.payload;

    state.wallets.tableData.loading = false;
    state.wallets.tableData.data = data;
    state.wallets.tableData.totalRows = totalRows;
    state.wallets.tableData.pageCount = Math.ceil(totalRows / state.wallets.tableData.pageSize);
  }
}