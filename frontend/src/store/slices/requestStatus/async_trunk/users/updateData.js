import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUserSelected } from "../..";
import { updateNotistack } from "../../../notistack";

export const updateData = createAsyncThunk(
  'requestStatus/user/personal',
  async ({submitData, id, errors, personal=false, handleUpdate = null}, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url;
    if (personal) {
      url = `v1/user`;
    } else {
      url = `v1/user/${id}`;
    }

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: 'Datos actualizados' }));

      // NOTA(RECKER): Update userSelected
      const { user, permissions } = res.data;
      handleUpdate ? handleUpdate({ user }) : dispatch(setUserSelected({user, permissions}));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
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

export const reducersUpdateData = {
  [updateData.pending]: (state, action) => {
    const { loading } = action.meta.arg;
    state.personalData[loading] = true;
  },
  [updateData.rejected]: (state, action) => {
    const { loading } = action.meta.arg;
    state.personalData[loading] = false;
  },
  [updateData.fulfilled]: (state, action) => {
    const { loading } = action.meta.arg;
    state.personalData[loading] = false;
  },
}