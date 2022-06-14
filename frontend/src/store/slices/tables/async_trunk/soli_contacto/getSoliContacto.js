import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getSoliContacto = createAsyncThunk(
  'tables/soliContacto',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tables.soliContacto.tableData;
    let url = `v1/contacto?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersSoliContacto = {
  [getSoliContacto.pending]: state => {
    state.soliContacto.tableData.loading = true;
  },
  [getSoliContacto.rejected]: (state, action) => {
    state.soliContacto.tableData.loading = false;
  },
  [getSoliContacto.fulfilled]: (state, action) => {
    const { page, totalRows, data } = action.payload;

    state.soliContacto.tableData.loading = false;
    state.soliContacto.tableData.page = page;
    state.soliContacto.tableData.data = data;
    state.soliContacto.tableData.totalRows = totalRows;
    state.soliContacto.tableData.pageCount = Math.ceil(totalRows / state.soliContacto.tableData.pageSize);
  }
}