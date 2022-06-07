import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getCursos = createAsyncThunk(
  'requestUser/user/curso',
  async (value, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/find/curso?search=${encodeURI(value)}`;

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

export const reducersGetCurso = {
  [getCursos.rejected]: (state, action) => {
    state.createUser.data = [];
  },
  [getCursos.fulfilled]: (state, action) => {
    const { payload } = action;
    state.createUser.data = payload;
  },
}