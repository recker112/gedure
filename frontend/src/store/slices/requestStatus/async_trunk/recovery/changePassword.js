import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const changePasswordRecovery = createAsyncThunk(
  'requestStatus/recovery/changePassword',
  async ({ submitData, handleNext = null }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/recovery-chpass';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      handleNext && handleNext();

      dispatch(updateNotistack({ status: res.status, text: res.data.msg, variant: 'success' }));

      return submitData;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

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

export const reducersChangePassword = {
  [changePasswordRecovery.pending]: (state, action) => {
    state.recovery.loading = true;
  },
  [changePasswordRecovery.rejected]: (state, action) => {
    state.recovery.loading = false;
  },
  [changePasswordRecovery.fulfilled]: (state, action) => {
    state.recovery.loading = false;
    state.recovery.data = {};
  },
}