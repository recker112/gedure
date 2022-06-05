import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";
import { refreshBT } from "./table";

export const deleteBoletaMassive = createAsyncThunk(
  'gdBConfirm/deleteMassive',
  async ({ lapso, ids }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/massive/boleta?ids=${encodeURI(JSON.stringify(ids))}&lapso=${lapso}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      dispatch(refreshBT());

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

export const deleteBoleta = createAsyncThunk(
  'gdBConfirm/delete',
  async ({ submitData, refresh }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/boleta/${submitData.id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      refresh();

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'La boleta ya no existe';
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

export const replaceBoleta = createAsyncThunk(
  'gdBVerForm/replace',
  async ({ id, submitData }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/boleta/${id}`;

    // NOTA(RECKER): Onload
    const onUploadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress({select: 'replaceBoleta', percentCompleted}));
    };

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        headers: {
					'Content-Type': 'multipart/form-data'
				},
        onUploadProgress,
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      dispatch(setProgress({select: 'replaceBoleta', percentCompleted: 0}));

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
  deleteBoletaMassive: {
    open: false,
    loading: false,
    data: {},
  },
  deleteBoleta: {
    open: false,
    loading: false,
    data: {},
  },
  replaceBoleta: {
    open: false,
    loading: false,
    data: {},
    progress: 0,
  }
};

export const gdBConfirmSlices = createSlice({
  name: "gdBConfirm",
  initialState,
  reducers: {
    setConfgsBC: (state, action) => {
      const { open, loading, data, confirm } = action.payload;

      (open !== undefined) && (state[confirm].open = open);
      loading && (state[confirm].loading = loading);
      data && (state[confirm].data = data);
    },
    setProgress: (state, action) => {
      const { select, percentCompleted } = action.payload;
      state[select].progress = percentCompleted;
    },
  },
  extraReducers: {
    [deleteBoletaMassive.pending]: state => {
      state.deleteBoletaMassive.loading = true;
    },
    [deleteBoletaMassive.rejected]: (state, action) => {
      state.deleteBoletaMassive.loading = false;
    },
    [deleteBoletaMassive.fulfilled]: (state, action) => {
      state.deleteBoletaMassive.loading = false;
      state.deleteBoletaMassive.data = {};
      state.deleteBoletaMassive.open = false;
    },
    [deleteBoleta.pending]: state => {
      state.deleteBoleta.loading = true;
    },
    [deleteBoleta.rejected]: (state, action) => {
      state.deleteBoleta.loading = false;
    },
    [deleteBoleta.fulfilled]: (state, action) => {
      state.deleteBoleta.loading = false;
      state.deleteBoleta.data = {};
      state.deleteBoleta.open = false;
    },
    [replaceBoleta.pending]: state => {
      state.replaceBoleta.loading = true;
    },
    [replaceBoleta.rejected]: (state, action) => {
      state.replaceBoleta.loading = false;
      state.replaceBoleta.progress = 0;
    },
    [replaceBoleta.fulfilled]: (state, action) => {
      state.replaceBoleta.loading = false;
      state.replaceBoleta.data = {};
      state.replaceBoleta.open = false;
      state.replaceBoleta.progress = 0;
    },
  }
});

export default gdBConfirmSlices.reducer;

export const { setConfgsBC, setProgress } = gdBConfirmSlices.actions;