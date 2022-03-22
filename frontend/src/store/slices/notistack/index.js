import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notiText: '',
  notiStatus: '',
  notiErrors: {},
};

export const notistacksSlices = createSlice({
  name: "notistack",
  initialState,
  reducers: {
    updateNotistack: (state, action) => {
      const { text, status, errors } = action.payload;

      state.notiText = text;
      state.notiStatus = status;
      state.notiErrors = errors;
      console.log(action.payload);
    },
    resetNotistack: () => initialState,
  },
});

export default notistacksSlices.reducer;

export const { updateNotistack, resetNotistack } = notistacksSlices.actions;