import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProgress } from "../../..";
import { downloadFiles } from "../../../../../../components/Utils/DownloadFiles";
import { updateNotistack } from "../../../../notistack";

export const downloadDataUser = createAsyncThunk(
  'requestStatus/users/donwloadData',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/download/students`;

    // NOTA(RECKER): Onload
    const onDownloadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress({select: 'downloadDataUsers', percentCompleted}));
    };

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        responseType: 'blob',
        onDownloadProgress,
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      downloadFiles(res.data, `estudiantes.xlsx`);

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

export const reducersDownloadDataUser = {
  [downloadDataUser.pending]: (state, action) => {
    state.downloadDataUsers.loading = true;
  },
  [downloadDataUser.rejected]: (state, action) => {
    state.downloadDataUsers.loading = false;
    state.downloadDataUsers.progress = 0;
  },
  [downloadDataUser.fulfilled]: (state, action) => {
    state.downloadDataUsers.loading = false;
    state.downloadDataUsers.progress = 0;
  }
}