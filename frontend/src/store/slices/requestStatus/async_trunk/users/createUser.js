import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refresh } from "../../../tables";

export const createUser = createAsyncThunk(
  'requestUser/user/crear',
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

      dispatch(refresh({ select: 'users' }));

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

export const reducersUserCreate = {
  [createUser.pending]: (state, action) => {
    state.createUser.loading = true;
  },
  [createUser.rejected]: (state, action) => {
    state.createUser.loading = false;
  },
  [createUser.fulfilled]: (state, action) => {
    state.createUser.loading = false;
  },
}