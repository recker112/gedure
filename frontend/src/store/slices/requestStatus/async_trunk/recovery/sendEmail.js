import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const sendEmailRecovery = createAsyncThunk(
  'requestStatus/recovery/sendEmail',
  async ({ submitData, handleNext = null }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/recovery-password';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      handleNext && handleNext();

      dispatch(updateNotistack({ status: res.data.status, text: 'Correo solicitado', variant: 'success' }));

      return submitData;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'Correo no encontrado';
        }

        if (status === 400) {
          handleNext && handleNext();
          dispatch(updateNotistack({ status: 200, text: 'Correo solicitado', variant: 'success' }));
          return submitData;
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

export const reducersSendEmail = {
  [sendEmailRecovery.pending]: (state, action) => {
    state.recovery.loading = true;
  },
  [sendEmailRecovery.rejected]: (state, action) => {
    state.recovery.loading = false;
  },
  [sendEmailRecovery.fulfilled]: (state, action) => {
    const data = action.payload;
    state.recovery.loading = false;
    state.recovery.data = data;
  },
}