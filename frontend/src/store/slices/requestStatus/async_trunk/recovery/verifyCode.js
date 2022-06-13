import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const verifyCodeRecovery = createAsyncThunk(
  'requestStatus/recovery/verifyCode',
  async ({ submitData, handleNext = null }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/auth-recovery/verify';

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

export const reducersVerifyCode = {
  [verifyCodeRecovery.pending]: (state, action) => {
    state.recovery.loading = true;
  },
  [verifyCodeRecovery.rejected]: (state, action) => {
    state.recovery.loading = false;
  },
  [verifyCodeRecovery.fulfilled]: (state, action) => {
    const data = action.payload;
    state.recovery.loading = false;
    state.recovery.data = data;
  },
}