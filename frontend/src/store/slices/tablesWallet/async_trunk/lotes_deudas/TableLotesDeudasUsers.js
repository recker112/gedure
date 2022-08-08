import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getLotesDeudasUsers = createAsyncThunk(
  'tables/lotes_deudas/users',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tablesWallet.lotesDeudasUsers.tableData;
    let url = `v1/deuda/lote/${id}/users?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersGetLotesDeudasUsers = {
  [getLotesDeudasUsers.pending]: state => {
    state.lotesDeudasUsers.tableData.loading = true;
  },
  [getLotesDeudasUsers.rejected]: (state, action) => {
    state.lotesDeudasUsers.tableData.loading = false;
  },
  [getLotesDeudasUsers.fulfilled]: (state, action) => {
    const { page, totalRows, data } = action.payload;

    state.lotesDeudasUsers.tableData.loading = false;
    state.lotesDeudasUsers.tableData.page = page;
    state.lotesDeudasUsers.tableData.data = data;
    state.lotesDeudasUsers.tableData.totalRows = totalRows;
    state.lotesDeudasUsers.tableData.pageCount = Math.ceil(totalRows / state.lotesDeudasUsers.tableData.pageSize);
  }
}