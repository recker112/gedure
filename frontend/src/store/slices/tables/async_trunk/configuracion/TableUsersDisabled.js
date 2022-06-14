import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getUsersDisabled = createAsyncThunk(
  'tables/users_disabled',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().gdGCDUTable.tableData;
    let url = `v1/user-disabled?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersUsersDisabled = {
  [getUsersDisabled.pending]: state => {
    state.users_disabled.tableData.loading = true;
  },
  [getUsersDisabled.rejected]: (state, action) => {
    state.users_disabled.tableData.loading = false;
  },
  [getUsersDisabled.fulfilled]: (state, action) => {
    const { page, totalRows, data } = action.payload;

    state.users_disabled.tableData.loading = false;
    state.users_disabled.tableData.page = page;
    state.users_disabled.tableData.data = data;
    state.users_disabled.tableData.totalRows = totalRows;
    state.users_disabled.tableData.pageCount = Math.ceil(totalRows / state.users_disabled.tableData.pageSize);
  }
}