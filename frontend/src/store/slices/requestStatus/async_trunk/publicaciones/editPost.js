import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProgress } from "../..";
import { updateNotistack } from "../../../notistack";

export const editPost = createAsyncThunk(
  'requestUser/post/edit',
  async ({ submitData, slug }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/posts/${slug}`;
    
    // NOTA(RECKER): Onload
    const onUploadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress({ select: 'editPost', percentCompleted}));
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

export const reducersEditPost = {
  [editPost.pending]: (state, action) => {
    state.editPost.loading = true;
  },
  [editPost.rejected]: (state, action) => {
    state.editPost.loading = false;
    state.editPost.progress = 0;
  },
  [editPost.fulfilled]: (state, action) => {
    state.editPost.loading = false;
    state.editPost.progress = 0;
  },
}