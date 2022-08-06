import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProgress } from "../..";
import { updateNotistack } from "../../../notistack";

export const uploadMatricula = createAsyncThunk(
  'requestUser/user/matricula',
  async ({submitData, errors, handleClose}, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/user/matricula';

    // NOTA(RECKER): Onload
    const onUploadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress({ select: 'uploadMatricula', percentCompleted }));
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

      handleClose();

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

export const reducersUploadMatricula = {
  [uploadMatricula.pending]: (state, action) => {
    state.uploadMatricula.loading = true;
  },
  [uploadMatricula.rejected]: (state, action) => {
    state.uploadMatricula.loading = false;
    state.uploadMatricula.progress = 0;
  },
  [uploadMatricula.fulfilled]: (state, action) => {
    state.uploadMatricula.loading = false;
    state.uploadMatricula.progress = 0;
  }
}