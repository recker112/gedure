import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const acceptInvitation = createAsyncThunk(
  'requestStatus/user/invitation/accept',
  async ({ submitData, handleFinish }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/invitation/register';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, text: res.data.msg, variant: 'success' }));

      handleFinish();

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

export const reducersAcceptInvitation = {
  [acceptInvitation.pending]: state => {
    state.invitation.loadingAccept = true;
  },
  [acceptInvitation.rejected]: (state, action) => {
    state.invitation.loadingAccept = false;
  },
  [acceptInvitation.fulfilled]: (state, action) => {
    state.invitation.loadingAccept = false;
  },
}