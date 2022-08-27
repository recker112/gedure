import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getDeudas = createAsyncThunk(
  'tablesWallet/deudas/get',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { future } = getState().tablesWallet.deudas.filters;
    const { page, pageSize, search } = getState().tablesWallet.deudas.tableData;
    let url = `v1/deuda?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}&future=${future}`;

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

export const reducersGetDeudas = {
  [getDeudas.pending]: state => {
    state.deudas.tableData.loading = true;
  },
  [getDeudas.rejected]: (state, action) => {
    state.deudas.tableData.loading = false;
  },
  [getDeudas.fulfilled]: (state, action) => {
    const { totalRows, data } = action.payload;

    state.deudas.tableData.loading = false;
    state.deudas.tableData.data = data;
    state.deudas.tableData.totalRows = totalRows;
    state.deudas.tableData.pageCount = Math.ceil(totalRows / state.deudas.tableData.pageSize);
  }
}