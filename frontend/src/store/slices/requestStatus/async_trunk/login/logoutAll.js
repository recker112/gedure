import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutApp } from "../../../auth";
import { updateNotistack } from "../../../notistack";

export const logoutAll = createAsyncThunk(
  'requestStatus/logout/all',
  async (handleDestroy, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/auth/logout/all';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'info', text: res.data.msg }));

      // NOTA(RECKER): Destruir sesión
      dispatch(logoutApp());

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'El usuario ya no existe';
        }

        // NOTA(RECKER): Respuesta del servidor
        dispatch(updateNotistack({ status: status, text: data.msg }));
      } else {
        // NOTA(RECKER): Sin respuesta por parte del servidor
        dispatch(updateNotistack({ status: 'offline', }));
      }
      throw error;
    }
  }
);

export const reducersLogoutAll = {
  [logoutAll.pending]: (state, action) => {
    state.personalData.loadingLogoutAll = true;
  },
  [logoutAll.rejected]: (state, action) => {
    state.personalData.loadingLogoutAll = false;
  },
  [logoutAll.fulfilled]: (state, action) => {
    state.personalData.loadingLogoutAll = false;
  },
}