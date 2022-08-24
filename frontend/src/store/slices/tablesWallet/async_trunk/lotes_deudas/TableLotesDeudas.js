import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getLotesDeudas = createAsyncThunk(
  'tablesWallet/lotes_deudas/get',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tablesWallet.lotes_deudas.tableData;
    let url = `v1/deuda/lote?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersGetLotesDeudas = {
  [getLotesDeudas.pending]: state => {
    state.lotes_deudas.tableData.loading = true;
  },
  [getLotesDeudas.rejected]: (state, action) => {
    state.lotes_deudas.tableData.loading = false;
  },
  [getLotesDeudas.fulfilled]: (state, action) => {
    const { totalRows, data } = action.payload;

    state.lotes_deudas.tableData.loading = false;
    state.lotes_deudas.tableData.data = data;
    state.lotes_deudas.tableData.totalRows = totalRows;
    state.lotes_deudas.tableData.pageCount = Math.ceil(totalRows / state.lotes_deudas.tableData.pageSize);
  }
}