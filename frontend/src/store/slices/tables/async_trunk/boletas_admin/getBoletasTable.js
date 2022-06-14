import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getBoletas = createAsyncThunk(
  'tables/boletas',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { curso, seccion } = getState().tables.boletas.filters;
    const { page, pageSize, search } = getState().tables.boletas.tableData;
    let url = `v1/boleta?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}&curso=${curso}&seccion=${seccion}`;

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

export const reducersBoletas = {
  [getBoletas.pending]: state => {
    state.boletas.tableData.loading = true;
  },
  [getBoletas.rejected]: (state, action) => {
    state.boletas.tableData.loading = false;
  },
  [getBoletas.fulfilled]: (state, action) => {
    const { page, totalRows, data } = action.payload;

    state.boletas.tableData.loading = false;
    state.boletas.tableData.page = page;
    state.boletas.tableData.data = data;
    state.boletas.tableData.totalRows = totalRows;
    state.boletas.tableData.pageCount = Math.ceil(totalRows / state.boletas.tableData.pageSize);
  }
}