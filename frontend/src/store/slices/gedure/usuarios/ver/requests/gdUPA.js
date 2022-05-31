import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUserSelected } from "..";
import { updateNotistack } from "../../../../notistack";

export const uploadAvatar = createAsyncThunk(
  'gdUPA/uploadAvatar',
  async ({data, id, personal=false}, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url;
    if (personal) {
      url = `v1/user`;
    }else {
      url = `v1/user/${id}`;
    }
    
    // NOTA(RECKER): Onload
    const onUploadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress(percentCompleted));
    };

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: onUploadProgress,
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: 'Avatar actualizado' }));

      // NOTA(RECKER): Update userSelected
      const { user, permissions } = res.data;
      dispatch(setUserSelected({user, permissions}));

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
  loadingUpload: false,
  loadingDelete: false,
  progress: 0,
};

export const gdUPASlices = createSlice({
  name: "gdUPA",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      const { payload } = action;
      state.progress = payload;
    }
  },
  extraReducers: {
    [uploadAvatar.pending]: (state, action) => {
      const { type } = action.meta.arg;
      
      if (type === 1) {
        state.loadingUpload = true;
      } else if (type === 2) {
        state.loadingDelete = true;
      }
    },
    [uploadAvatar.rejected]: (state, action) => {
      const { type } = action.meta.arg;
      
      if (type === 1) {
        state.loadingUpload = false;
      } else if (type === 2) {
        state.loadingDelete = false;
      }
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      const { type } = action.meta.arg;

      if (type === 1) {
        state.loadingUpload = false;
      } else if (type === 2) {
        state.loadingDelete = false;
      }
    },
  }
});

export default gdUPASlices.reducer;

export const { setProgress } = gdUPASlices.actions;