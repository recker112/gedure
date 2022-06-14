import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getUserInvitacion = createAsyncThunk(
  'requestStatus/user/invitation/get',
  async (key, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/invitation/${key}`;

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
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'Invitación no encontrada';
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

export const reducersGetUserInvitation = {
  [getUserInvitacion.pending]: state => {
    state.invitation.loading = true;
  },
  [getUserInvitacion.rejected]: (state, action) => {
    state.invitation.loading = false;
  },
  [getUserInvitacion.fulfilled]: (state, action) => {
    state.invitation.loading = false;
    state.invitation.data = action.payload;
  },
}