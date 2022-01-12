import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";

export const newsData = createAsyncThunk(
  'news/show/data',
  async (id, { getState, signal, dispatch }) => {
    const axios = window.axios;
    const { auth } = getState().auth;
    let url = '';

    if (auth) {
      url = `v1/posts/auth`;
    }else {
      url = `v1/posts`;
    }

    try {
      const res = await axios.get(url, {
        signal,
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Al cancelar el AJAX
      } else if (error.response) {
        const { data, status } = error.response;
        dispatch(updateNotistack({ status: status, text: data.msg }));
      } else {
        dispatch(updateNotistack({ status: 'offline', }));
      }
      throw error;
    }
  }
);

const initialState = {
  loading: true,
  data: {},
};

export const newsShowSlices = createSlice({
  name: "news/show",
  initialState,
  reducers: {
    updateNews: (state, action) => {
      const { loading, data } = action.payload;

      state.loading = loading;
      state.data = data;
    },
    resetData: state => {
      state.loading = true;
      state.data = {};
    },
  },
  extraReducers: {
    [newsData.pending]: state => {
      state.loading = true;
    },
    [newsData.rejected]: state => {
      state.loading = false;
    },
    [newsData.fulfilled]: (state, action) => {
      const { data } = action.payload;

      state.loading = false;
      state.data = data;
    }
  }
});

export default newsShowSlices.reducer;

export const { updateNews, resetData } = newsShowSlices.actions;