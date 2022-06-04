import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getDataBV = createAsyncThunk(
  'gdBVerForm/getData',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/boleta/${id}`;

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


const initialState = {
  getData: {
    loading: true,
    data: {
      boletas: [],
      user: '',
    }
  },
  change: {
    loading: false,
    progress: 0,
  }
};

export const gdBVerFormSlices = createSlice({
  name: "gdBVerForm",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      const { payload } = action;
      state.upload.progress = payload;
    },
    setLoadingBV: (state, action) => {
      const { loading, select } = action.payload;
      state[select].loading = loading;
    }
  },
  extraReducers: {
    [getDataBV.pending]: state => {
      state.getData.loading = true;
    },
    [getDataBV.rejected]: (state, action) => {
      state.getData.loading = false;
    },
    [getDataBV.fulfilled]: (state, action) => {
      state.getData.loading = false;
      state.getData.data = action.payload;
    },
  }
});

export default gdBVerFormSlices.reducer;

export const { setProgress, setLoadingBV } = gdBVerFormSlices.actions;