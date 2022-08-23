import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getUsers = createAsyncThunk(
  'tables/users',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { type, curso, seccion } = getState().tables.users.filters;
    const { page, pageSize, search } = getState().tables.users.tableData;
    let url = `v1/user?page=${page}&per_page=${pageSize}&type=${type}&curso=${curso}&seccion=${seccion}&search=${encodeURI(search)}`;

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

export const reducersUsers = {
  [getUsers.pending]: state => {
    state.users.tableData.loading = true;
  },
  [getUsers.rejected]: (state, action) => {
    state.users.tableData.loading = false;
  },
  [getUsers.fulfilled]: (state, action) => {
    const { totalRows, data } = action.payload;

    state.users.tableData.loading = false;
    state.users.tableData.data = data;
    state.users.tableData.totalRows = totalRows;
    state.users.tableData.pageCount = Math.ceil(totalRows / state.users.tableData.pageSize);
  }
}