import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getMonedero = createAsyncThunk(
  'tablesWallet/monedero/get',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tablesWallet.monedero.tableData;
    let url = `v1/transaction/user?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersGetMonedero = {
  [getMonedero.pending]: state => {
    state.monedero.tableData.loading = true;
  },
  [getMonedero.rejected]: (state, action) => {
    state.monedero.tableData.loading = false;
  },
  [getMonedero.fulfilled]: (state, action) => {
    const { totalRows, data } = action.payload;

    state.monedero.tableData.loading = false;
    state.monedero.tableData.data = data;
    state.monedero.tableData.totalRows = totalRows;
    state.monedero.tableData.pageCount = Math.ceil(totalRows / state.monedero.tableData.pageSize);
  }
}