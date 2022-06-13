import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";
import { refresh } from "../../tables";

export const deletePost = createAsyncThunk(
  'gdPUBConfirm/delete',
  async (slug, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/posts/${slug}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refresh({ select: 'posts' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'Esta noticia ya no existe';
        }

        // NOTA(RECKER): Respuesta del servidor
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
  delete: {
    open: false,
    loading: false,
    data: {},
  }
};

export const gdPUBConfirmSlices = createSlice({
  name: "gdPUBConfirm",
  initialState,
  reducers: {
    setConfirmConfgsPUB: (state, action) => {
      const { open, loading, data, confirm } = action.payload;

      (open !== undefined) && (state[confirm].open = open);
      loading && (state[confirm].loading = loading);
      data && (state[confirm].data = data);
    }
  },
  extraReducers: {
    [deletePost.pending]: state => {
      state.delete.loading = true;
    },
    [deletePost.rejected]: (state, action) => {
      state.delete.loading = false;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.delete.loading = false;
      state.delete.data = {};
      state.delete.open = false;
    },
  }
});

export default gdPUBConfirmSlices.reducer;

export const { setConfirmConfgsPUB } = gdPUBConfirmSlices.actions;