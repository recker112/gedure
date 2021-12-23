import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tema: localStorage.getItem('gd-theme') || 'light',
  drawer: false,
  tour: {},
};

export const configsSlices = createSlice({
  name: "configs",
  initialState,
  reducers: {
    updateTema: state => {
      state.tema = state.tema === 'light' ? 'dark' : 'light';

      localStorage.setItem('gd-theme', state.tema);
    },
    updateDrawer: (state, action) => {
      state.drawer = action.payload;
    }
  },
});

export default configsSlices.reducer;

export const { updateTema, updateDrawer } = configsSlices.actions;