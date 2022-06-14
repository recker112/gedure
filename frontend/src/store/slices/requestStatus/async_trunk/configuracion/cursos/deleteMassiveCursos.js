import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../../notistack";
import { refresh } from "../../../../tables";

export const deleteMassiveCursos = createAsyncThunk(
  'requestStatus/curso/deleteMassive',
  async (ids, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/massive/curso?ids=${encodeURI(JSON.stringify(ids))}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refresh({ select: 'cursos' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'Los curso seleccionados ya no existen';
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

export const reducersDeleteMassiveCursos = {
  [deleteMassiveCursos.pending]: (state, action) => {
    state.deleteMassiveCursos.loading = true;
  },
  [deleteMassiveCursos.rejected]: (state, action) => {
    state.deleteMassiveCursos.loading = false;
  },
  [deleteMassiveCursos.fulfilled]: (state, action) => {
    state.deleteMassiveCursos.loading = false;
    state.deleteMassiveCursos.data = {};
    state.deleteMassiveCursos.open = false;
  },
}