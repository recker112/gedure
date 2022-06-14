import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProgress } from "../..";
import { updateNotistack } from "../../../notistack";

export const replaceBoleta = createAsyncThunk(
  'requestStatus/boletas/replace',
  async ({ id, submitData }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/boleta/${id}`;

    // NOTA(RECKER): Onload
    const onUploadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress({select: 'replaceBoleta', percentCompleted}));
    };

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        headers: {
					'Content-Type': 'multipart/form-data'
				},
        onUploadProgress,
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      dispatch(setProgress({select: 'replaceBoleta', percentCompleted: 0}));

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

export const reducersReplaceBoleta = {
  [replaceBoleta.pending]: state => {
    state.replaceBoleta.loading = true;
  },
  [replaceBoleta.rejected]: (state, action) => {
    state.replaceBoleta.loading = false;
  },
  [replaceBoleta.fulfilled]: (state, action) => {
    state.replaceBoleta.loading = false;
    state.replaceBoleta.data = {};
    state.replaceBoleta.open = false;
  }
}