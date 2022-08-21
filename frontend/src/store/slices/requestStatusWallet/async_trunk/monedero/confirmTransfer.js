import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateWallet } from "../../../auth";
import { updateNotistack } from "../../../notistack";

export const confirmTransfer = createAsyncThunk(
  'requestStatusWallet/monedero/verify/confirm',
  async ({ submitData, callBack, errors }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/wallet/transfer/confirm`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, text: res.data.msg, variant: 'success' }));

      dispatch(updateWallet(res.data.balance));

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

export const reducersConfirmTransfer = {
  [confirmTransfer.pending]: (state, action) => {
    state.confirmTransfer.loading = true;
  },
  [confirmTransfer.rejected]: (state, action) => {
    state.confirmTransfer.loading = false;
  },
  [confirmTransfer.fulfilled]: (state, action) => {
    state.confirmTransfer.loading = false;
  },
}