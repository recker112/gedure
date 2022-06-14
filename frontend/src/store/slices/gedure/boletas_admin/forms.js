import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";
import { refresh } from "../../tables";

export const uploadBoleta = createAsyncThunk(
  'gdBForm/upload',
  async ({ submitData }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/boleta`;

    // NOTA(RECKER): Onload
    const onUploadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress(percentCompleted));
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


const initialState = {
  upload: {
    open: false,
    loading: false,
    progress: 0,
  }
};

export const gdBFormSlices = createSlice({
  name: "gdBForm",
  initialState,
  reducers: {
    setOpenBF: (state, action) => {
      const { select, open } = action.payload;
      state[select].open = open;
    },
    setProgress: (state, action) => {
      const { payload } = action;
      state.upload.progress = payload;
    }
  },
  extraReducers: {
    [uploadBoleta.pending]: state => {
      state.upload.loading = true;
    },
    [uploadBoleta.rejected]: (state, action) => {
      state.upload.loading = false;
    },
    [uploadBoleta.fulfilled]: (state, action) => {
      state.upload.loading = false;
      state.upload.data = {};
      state.upload.open = false;
    },
  }
});

export default gdBFormSlices.reducer;

export const { setOpenBF, setProgress } = gdBFormSlices.actions;