import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../../notistack";
import { refresh } from "../../../../tables";

export const restoreMassiveUser = createAsyncThunk(
  'requestStatus/users_disabled/restoreMassive',
  async (ids, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/user-disabled/restore?ids=${encodeURI(JSON.stringify(ids))}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, { _method: 'PATCH' }, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refresh({ select: 'users_disabled' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'Los usuario seleccionados ya no existen';
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

export const reducersRestoreMassiveUser = {
  [restoreMassiveUser.pending]: (state, action) => {
    state.restoreMassiveUser.loading = true;
  },
  [restoreMassiveUser.rejected]: (state, action) => {
    state.restoreMassiveUser.loading = false;
  },
  [restoreMassiveUser.fulfilled]: (state, action) => {
    state.restoreMassiveUser.loading = false;
    state.restoreMassiveUser.data = {};
    state.restoreMassiveUser.open = false;
  },
}