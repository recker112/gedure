import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../notistack";

export const newsPreview = createAsyncThunk(
  'news/preview',
  async (id, { getState, signal, dispatch }) => {
    const axios = window.axios;
    const { auth } = getState().auth;
    const { search, data } = getState().news;
    const limit = 12;
    const offset = data.length;
    let url = '';

    if (auth) {
      url = `v1/posts/auth?offset=${offset}&limit=${limit}&search=${encodeURI(search)}`;
    }else {
      url = `v1/posts?offset=${offset}&limit=${limit}&search=${encodeURI(search)}`;
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
  hasFinish: false,
  search: '',
  data: [],
  error: false,
};

export const newsSlices = createSlice({
  name: "news",
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.search = action.payload;
      state.data = [];
    },
    resetData: state => {
      state.data = [];
      state.search = '';
    },
    resetNotistack: state => {
      state.notistack.text = '';
      state.notistack.variant = '';
    }
  },
  extraReducers: {
    [newsPreview.pending]: state => {
      state.loading = true;
      state.error = false;
      state.hasFinish = false;
    },
    [newsPreview.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [newsPreview.fulfilled]: (state, action) => {
      const { data, finish } = action.payload;

      state.loading = false;
      state.data = [...state.data, ...data];
      state.hasFinish = finish;
    }
  }
});

export default newsSlices.reducer;

export const { updateSearch, resetData } = newsSlices.actions;