import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notiText: '',
  notiStatus: '',
  notiVariant: 'success',
  notiErrors: {},
};

export const notistacksSlices = createSlice({
  name: "notistack",
  initialState,
  reducers: {
    updateNotistack: (state, action) => {
      const { text, status, errors, variant = 'success' } = action.payload;

      state.notiText = text;
      state.notiStatus = status;
      state.notiVariant = variant;
      state.notiErrors = errors;
    },
    resetNotistack: () => initialState,
  },
});

export default notistacksSlices.reducer;

export const { updateNotistack, resetNotistack } = notistacksSlices.actions;