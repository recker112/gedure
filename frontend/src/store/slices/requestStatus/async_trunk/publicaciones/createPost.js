import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProgress } from "../..";
import { updateNotistack } from "../../../notistack";

export const createPost = createAsyncThunk(
  'requestUser/post/crear',
  async ({ submitData, reset }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/posts';
    
    // NOTA(RECKER): Onload
    const onUploadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress(percentCompleted));
    };

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: onUploadProgress,
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));

      reset();

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

export const reducersCreatePost = {
  [createPost.pending]: (state, action) => {
    state.createPost.loading = true;
  },
  [createPost.rejected]: (state, action) => {
    state.createPost.loading = false;
    state.createPost.progress = 0;
  },
  [createPost.fulfilled]: (state, action) => {
    state.createPost.loading = false;
    state.createPost.progress = 0;
  },
}