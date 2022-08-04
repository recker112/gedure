import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProgress } from "../../..";
import { updateNotistack } from "../../../../notistack";

export const uploadTransactionsRequest = createAsyncThunk(
  'requestUser/bankAccount/transactions',
  async ({submitData, id}, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/bank-account/${id}/transaction`;

    // NOTA(RECKER): Onload
    const onUploadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress({ select: 'uploadTransactions', percentCompleted }));
    };

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
        headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: onUploadProgress,
      });

      dispatch(updateNotistack({ status: res.status, text: res.data.msg, variant: 'info' }));

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

export const reducersUploadTransactions = {
  [uploadTransactionsRequest.pending]: (state, action) => {
    state.uploadTransactions.loading = true;
  },
  [uploadTransactionsRequest.rejected]: (state, action) => {
    state.uploadTransactions.loading = false;
    state.uploadTransactions.progress = 0;
  },
  [uploadTransactionsRequest.fulfilled]: (state, action) => {
    state.uploadTransactions.loading = false;
    state.uploadTransactions.progress = 0;
  }
}