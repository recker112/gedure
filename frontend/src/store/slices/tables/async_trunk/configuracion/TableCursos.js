import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getCursos = createAsyncThunk(
  'tables/cursos',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().tables.cursos.tableData;
    let url = `v1/curso?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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

export const reducersCursos = {
  [getCursos.pending]: state => {
    state.cursos.tableData.loading = true;
  },
  [getCursos.rejected]: (state, action) => {
    state.cursos.tableData.loading = false;
  },
  [getCursos.fulfilled]: (state, action) => {
    const { page, totalRows, data } = action.payload;

    state.cursos.tableData.loading = false;
    state.cursos.tableData.page = page;
    state.cursos.tableData.data = data;
    state.cursos.tableData.totalRows = totalRows;
    state.cursos.tableData.pageCount = Math.ceil(totalRows / state.cursos.tableData.pageSize);
  }
}