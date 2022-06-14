import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../../notistack";
import { refresh } from "../../../../tables";

export const destroyMassiveUser = createAsyncThunk(
  'requestStatus/users_disabled/destroyMassive',
  async (ids, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/user-disabled?ids=${encodeURI(JSON.stringify(ids))}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refresh({ select: 'usersDisabled' }));

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

export const reducersDestroyMassiveUser = {
  [destroyMassiveUser.pending]: (state, action) => {
    state.destroyMassiveUser.loading = true;
  },
  [destroyMassiveUser.rejected]: (state, action) => {
    state.destroyMassiveUser.loading = false;
  },
  [destroyMassiveUser.fulfilled]: (state, action) => {
    state.destroyMassiveUser.loading = false;
    state.destroyMassiveUser.data = {};
    state.destroyMassiveUser.open = false;
  },
}