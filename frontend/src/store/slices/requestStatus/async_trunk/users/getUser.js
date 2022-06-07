import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getUser = createAsyncThunk(
  'requestStatus/user/get',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/user/${id}`;

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

export const reducersGetUser = {
  [getUser.pending]: state => {
    state.userShow.loading = true;
  },
  [getUser.rejected]: (state, action) => {
    state.userShow.loading = false;
  },
  [getUser.fulfilled]: (state, action) => {
    const { user, permissions } = action.payload;

    state.userShow.loading = false;
    state.userShow.userSelected = user;
    state.userShow.permissions = permissions;
  },
}