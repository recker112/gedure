import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProgress } from "../..";
import { updateNotistack } from "../../../notistack";
import { refresh } from "../../../tables";

export const uploadBoleta = createAsyncThunk(
  'requestStatus/boletas/upload',
  async ({ submitData }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/boleta`;

    // NOTA(RECKER): Onload
    const onUploadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress({select: 'uploadBoleta', percentCompleted}));
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

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      dispatch(setProgress({select: 'uploadBoleta', percentCompleted: 0}));
      dispatch(refresh({ select: 'boletas' }));

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

export const reducersUploadBoleta = {
  [uploadBoleta.pending]: state => {
    state.uploadBoleta.loading = true;
  },
  [uploadBoleta.rejected]: (state, action) => {
    state.uploadBoleta.loading = false;
  },
  [uploadBoleta.fulfilled]: (state, action) => {
    state.uploadBoleta.loading = false;
    state.uploadBoleta.data = {};
    state.uploadBoleta.open = false;
  }
}