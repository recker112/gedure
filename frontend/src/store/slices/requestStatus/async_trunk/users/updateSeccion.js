import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refresh } from "../../../tables";

export const updateSeccion = createAsyncThunk(
  'requestStatus/user/seccion',
  async (data, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/massive/user/seccion';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, data, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      dispatch(refresh({ select: 'users' }));

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

export const reducersUpdateSeccion = {
  [updateSeccion.pending]: state => {
    state.updateSeccion.loading = true;
  },
  [updateSeccion.rejected]: (state, action) => {
    state.updateSeccion.loading = false;
  },
  [updateSeccion.fulfilled]: (state, action) => {
    state.updateSeccion.loading = false;
    state.updateSeccion.data = {};
    state.updateSeccion.open = false;
  },
}