import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  access_key: '',
  user: {
		personal_data: {},
		wallet: {}
	},
	permissions: {}
};

export const AuthsSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      state.auth = action.payload;
    },
    updateUserData: (state, action) => {
      const { user, permissions } = action.payload;
      state.user = user;
      state.permissions = permissions;
    }
  },
});

export default AuthsSlices.reducer;

export const { updateAuth, updateUserData } = AuthsSlices.actions;