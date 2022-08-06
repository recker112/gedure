import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProgress } from "../..";
import { downloadFiles } from "../../../../../components/Utils/DownloadFiles";
import { updateNotistack } from "../../../notistack";

export const downloadBoletasUser = createAsyncThunk(
  'requestStatus/boletas/userDownload',
  async ({ id, curso, lapso, setLoading }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/download/boleta/${id}`;

    // NOTA(RECKER): Onload
    const onDownloadProgress = (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
      dispatch(setProgress({select: 'verBoletasUser', percentCompleted}));
    };

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        responseType: 'blob',
        onDownloadProgress,
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      downloadFiles(res.data, `Boleta_${curso.curso}-${curso.seccion}_${lapso}_lapso.pdf`);

      setLoading(false);

      return true;
    } catch (error) {
      setLoading(false);
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

export const reducersDownloadBoletasUser = {
  [downloadBoletasUser.fulfilled]: (state, action) => {
    state.verBoletasUser.progress = 0;
  }
}