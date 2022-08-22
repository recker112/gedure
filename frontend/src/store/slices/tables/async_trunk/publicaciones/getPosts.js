import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getPosts = createAsyncThunk(
  'tables/posts',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tables.posts.tableData;
    let url = `v1/table-posts?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersPosts = {
  [getPosts.pending]: state => {
    state.posts.tableData.loading = true;
  },
  [getPosts.rejected]: (state, action) => {
    state.posts.tableData.loading = false;
  },
  [getPosts.fulfilled]: (state, action) => {
    const { totalRows, data } = action.payload;

    state.posts.tableData.loading = false;
    state.posts.tableData.data = data;
    state.posts.tableData.totalRows = totalRows;
    state.posts.tableData.pageCount = Math.ceil(totalRows / state.posts.tableData.pageSize);
  }
}