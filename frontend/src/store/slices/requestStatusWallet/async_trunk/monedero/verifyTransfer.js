import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const verifyTransfer = createAsyncThunk(
  'requestStatusWallet/monedero/verify/transfer',
  async ({ submitData, callBack, errors }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/wallet/transfer/verify`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      callBack();

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        // NOTA(RECKER): Respuesta del servidor
        const { data, status } = error.response;

        // NOTA(RECKER): Setear errores en inputs
        if (status === 422 && Boolean(data.errors)) {
          for (let key in data.errors) {
						errors && errors(key, {
							type: 'fetchRequest',
							message: 'Error: '+data.errors[key][0],
						});
					}
        }

        dispatch(updateNotistack({ status: status, text: data.msg }));
      } else {
        // NOTA(RECKER): Sin respuesta por parte del servidor
        dispatch(updateNotistack({ status: 'offline', }));
      }
      throw error;
    }
  }
);

export const reducersVerifyTransfer = {
  [verifyTransfer.pending]: (state, action) => {
    state.verifyTransfer.loading = true;
  },
  [verifyTransfer.rejected]: (state, action) => {
    state.verifyTransfer.loading = false;
  },
  [verifyTransfer.fulfilled]: (state, action) => {
    state.verifyTransfer.loading = false;
    state.verifyTransfer.data = action.payload;
  },
}