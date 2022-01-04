import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const newsPreview = createAsyncThunk(
  'news/preview',
  async (id, { getState, signal }) => {
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

    const res = await axios.get(url, {
      signal,
    });

    return res.data;
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
    }
  },
  extraReducers: {
    [newsPreview.pending]: state => {
      state.loading = true;
      state.error = false;
      state.hasFinish = false;
    },
    [newsPreview.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [newsPreview.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload.data];
      state.hasFinish = action.payload.finish;
    }
  }
});

export default newsSlices.reducer;

export const { updateSearch, resetData } = newsSlices.actions;