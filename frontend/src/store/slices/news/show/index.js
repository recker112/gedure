import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";

export const newsData = createAsyncThunk(
  'news/show/data',
  async (slug, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { auth } = getState().auth;
    let url = '';

    if (auth) {
      url = `v1/posts/auth/${slug}`;
    }else {
      url = `v1/posts/${slug}`;
    }

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): Señal para cancelar petición
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
  loading: true,
  data: {},
};

export const newsShowSlices = createSlice({
  name: "news/show",
  initialState,
  reducers: {
    updateNews: (state, action) => {
      const { loading, data } = action.payload;

      state.loading = loading;
      state.data = data;
    },
    resetData: state => {
      state.loading = true;
      state.data = {};
    },
  },
  extraReducers: {
    [newsData.pending]: state => {
      state.loading = true;
      state.data = {};
    },
    [newsData.rejected]: state => {
      state.loading = false;
      state.data = {};
    },
    [newsData.fulfilled]: (state, action) => {
      const data = action.payload;

      state.loading = false;
      state.data = data;
    }
  }
});

export default newsShowSlices.reducer;

export const { updateNews, resetData } = newsShowSlices.actions;