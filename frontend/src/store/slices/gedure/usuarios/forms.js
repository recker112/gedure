import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";
import { refresh } from "./table";


export const getCurso = createAsyncThunk(
  'gdUForms/getCurso',
  async (value, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/find/curso?search=${encodeURI(value)}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      //dispatch(updateNotistack({ status: res.status, variant: 'success' }));

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

export const createData = createAsyncThunk(
  'gdUForms/crear',
  async ({submitData, errors, handleClose}, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url;
		if (submitData.invitation_mode) {
			url = 'v1/invitation';
		}else {
			url = 'v1/user';
		}

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, text: res.data.msg, variant: 'success' }));

      if (!submitData.create_more) {
        handleClose();
      }

      dispatch(refresh());

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        // NOTA(RECKER): Respuesta del servidor
        const { data, status } = error.response;

        // NOTA(RECKER): Setear errores en inputs
        if (status === 422 && Boolean(data.errors)) {
          for (let key in data.errors) {
						errors && errors(key, {
							type: 'fetchRequest',
							message: 'Error: '+data.errors[key][0],
						});
					}
        }

        dispatch(updateNotistack({ status: status, text: data.msg }));
      } else {
        // NOTA(RECKER): Sin respuesta por parte del servidor
        dispatch(updateNotistack({ status: 'offline', }));
      }
      throw error;
    }
  }
);

export const uploadMatricula = createAsyncThunk(
  'gdUForms/uploadMatricula',
  async ({submitData, errors, handleClose}, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/user/matricula';

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

      dispatch(updateNotistack({ status: res.status, text: res.data.msg, variant: 'success' }));

      if (!submitData.create_more) {
        handleClose();
      }

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        // NOTA(RECKER): Respuesta del servidor
        const { data, status } = error.response;

        // NOTA(RECKER): Setear errores en inputs
        if (status === 422 && Boolean(data.errors)) {
          for (let key in data.errors) {
						errors && errors(key, {
							type: 'fetchRequest',
							message: 'Error: '+data.errors[key][0],
						});
					}
        }

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
  create: {
    open: false,
    loading: false,
    data: null,
  },
  upload: {
    open: false,
    loading: false,
    progress: 0,
  }
};
export const gdUFormsSlices = createSlice({
  name: "gdUForms",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      const { select, open } = action.payload;
      state[select].open = open;
    },
    setProgress: (state, action) => {
      const { payload } = action;
      state.upload.progress = payload;
    }
  },
  extraReducers: {
    [getCurso.rejected]: (state, action) => {
      state.create.data = [];
    },
    [getCurso.fulfilled]: (state, action) => {
      const { payload } = action;
      state.create.data = payload;
    },
    [createData.pending]: (state, action) => {
      state.create.loading = true;
    },
    [createData.rejected]: (state, action) => {
      state.create.loading = false;
    },
    [createData.fulfilled]: (state, action) => {
      state.create.loading = false;
    },
    [uploadMatricula.pending]: (state, action) => {
      state.upload.loading = true;
    },
    [uploadMatricula.rejected]: (state, action) => {
      state.upload.loading = false;
      state.upload.progress = 0;
    },
    [uploadMatricula.fulfilled]: (state, action) => {
      state.upload.loading = false;
      state.upload.progress = 0;
    }
  }
});

export default gdUFormsSlices.reducer;

export const { setOpen, setProgress } = gdUFormsSlices.actions;