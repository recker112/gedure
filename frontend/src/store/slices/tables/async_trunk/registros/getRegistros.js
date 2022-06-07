import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getRegistros = createAsyncThunk(
  'tables/registros',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { type } = getState().tables.registros.filters;
    const { page, pageSize, search } = getState().tables.registros.tableData;
    let url = `v1/logs?page=${page}&per_page=${pageSize}&type=${type}&search=${encodeURI(search)}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      //dispatch(updateNotistack({ status: res.status, variant: 'success' }));

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

export const reducersRegistros = {
  [getRegistros.pending]: state => {
    state.registros.tableData.loading = true;
  },
  [getRegistros.rejected]: (state, action) => {
    state.registros.tableData.loading = false;
  },
  [getRegistros.fulfilled]: (state, action) => {
    const { page, totalRows, data } = action.payload;

    state.registros.tableData.loading = false;
    state.registros.tableData.page = page;
    state.registros.tableData.data = data;
    state.registros.tableData.totalRows = totalRows;
    state.registros.tableData.pageCount = Math.ceil(totalRows / state.registros.tableData.pageSize);
  }
}