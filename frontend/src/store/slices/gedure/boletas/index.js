import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { downloadFiles } from "../../../../components/Utils/DownloadFiles";
import { updateNotistack } from "../../notistack";

export const getDataUserBF = createAsyncThunk(
  'gdBVerForm/getData',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/boletas`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      //dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));

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

export const downloadBoletaUserBF = createAsyncThunk(
  'gdBVerForm/download',
  async ({ id, curso, lapso }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/download/boleta/${id}`;

    // NOTA(RECKER): Onload
    const onDownloadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress({select: 'download', percentCompleted}));
    };

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        responseType: 'blob',
        onDownloadProgress,
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      downloadFiles(res.data, `Boleta_${curso.curso}-${curso.seccion}_${lapso}_lapso.pdf`);
      dispatch(setProgress({select: 'download', percentCompleted: 0}));

      return true;
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
  getData: {
    loading: true,
    data: [],
  },
  download: {
    progress: 0,
  },
};

export const gdUserBFormSlices = createSlice({
  name: "gdUserBForm",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      const { select, percentCompleted } = action.payload;
      state[select].progress = percentCompleted;
    },
    setLoadingUserBF: (state, action) => {
      const { loading, select } = action.payload;
      state[select].loading = loading;
    },
    resetDataUserBF: (state, action) => ({...initialState})
  },
  extraReducers: {
    [getDataUserBF.pending]: state => {
      state.getData.loading = true;
    },
    [getDataUserBF.rejected]: (state, action) => {
      state.getData.loading = false;
    },
    [getDataUserBF.fulfilled]: (state, action) => {
      state.getData.loading = false;
      state.getData.data = action.payload;
    },
  }
});

export default gdUserBFormSlices.reducer;

export const { setProgress, setLoadingUserBF, resetDataUserBF } = gdUserBFormSlices.actions;