import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const editPost = createAsyncThunk(
  'gdPUBE/editPost',
  async ({ submitData, slug }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/posts/${slug}`;
    
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

export const requestPost = createAsyncThunk(
  'gdPUBE/requestPost',
  async (slug, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/posts/auth/${slug}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

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


const initialState = {
  loadingRequest: false,
  dataRequest: {},
  loading: false,
  progress: 0,
};

export const gdPUBESlices = createSlice({
  name: "gdPUBE",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      const { payload } = action;
      state.progress = payload;
    }
  },
  extraReducers: {
    [editPost.pending]: (state, action) => {
      state.loading = true;
    },
    [editPost.rejected]: (state, action) => {
      state.loading = false;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [requestPost.pending]: (state, action) => {
      state.loadingRequest = true;
    },
    [requestPost.rejected]: (state, action) => {
      state.loadingRequest = false;
    },
    [requestPost.fulfilled]: (state, action) => {
      state.loadingRequest = false;
      state.dataRequest = action.payload;
    },
  }
});

export default gdPUBESlices.reducer;

export const { setProgress } = gdPUBESlices.actions;