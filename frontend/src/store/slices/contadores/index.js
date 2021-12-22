import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  value: 1,
};

export const fetch = createAsyncThunk(
  'contadores/datos',
  async () => {
    const axios = window.axios;
    const res = await axios.get('http://localhost:8000/api/v1/posts?offset=0&limit=10');
    console.log(res);
    return res.data;
  }
);

export const contadoresSlices = createSlice({
  name: "contadores",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value += action.payload;
    }
  },
  extraReducers: {
    [fetch.pending]: state => {
      state.value = 'LOADING';
    },
    [fetch.rejected]: (state, action) => {
      state.value = 'ERROR';
      console.log(action);
    },
    [fetch.fulfilled]: (state, action) => {
      state.value = 'FINITO';
      console.log(action);
    }
  }
});

export default contadoresSlices.reducer;

export const { setValue } = contadoresSlices.actions;